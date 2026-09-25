import { useClerk, useAuth as useClerkAuth } from '@clerk/react';
import { useSignIn, useSignUp } from '@clerk/react/legacy';
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ApiError, setAuthTokenProvider } from '@/api/client';
import { ROUTES } from '@/constants/routes';
import { withNextPath } from '@/utils/auth/auth-return';
import { peekAuthIntent } from '@/utils/auth/post-auth';
import { authService } from '@/services';
import type { Session } from '@/types';

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

/** `needsCode`: Clerk wants an email code before it trusts this device. */
export interface LoginResult {
  error: string | null;
  needsCode?: boolean;
}

interface AuthContextValue {
  session: Session | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  verifyLoginCode: (code: string) => Promise<string | null>;
  logout: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<string | null>;
  resendRegistrationCode: () => Promise<string | null>;
  verifyRegistration: (code: string) => Promise<string | null>;
  signInWithGoogle: (nextPath?: string | null) => Promise<string | null>;
  refreshSession: () => Promise<Session | null>;
  /** Signs in with the session Clerk created (e.g. after a password reset). */
  activateSession: (sessionId: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const absoluteUrl = (path: string) => {
  if (typeof window === 'undefined') return path;
  return new URL(path, window.location.origin).toString();
};

const clerkError = (error: unknown): string => {
  if (error && typeof error === 'object' && 'errors' in error) {
    const errors = (
      error as { errors?: { longMessage?: string; message?: string }[] }
    ).errors;
    return (
      errors?.[0]?.longMessage ??
      errors?.[0]?.message ??
      'Authentication failed'
    );
  }
  return error instanceof Error ? error.message : 'Authentication failed';
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const clerk = useClerkAuth();
  const clerkApi = useClerk();
  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const sessionInflight = useRef<Promise<Session | null> | null>(null);
  const clerkLoaded = clerk.isLoaded;
  const clerkSignedIn = Boolean(clerk.isSignedIn);
  const getToken = clerk.getToken;

  useEffect(() => {
    setAuthTokenProvider(async () => getToken());
  }, [getToken]);

  const refreshSession = useCallback(async (): Promise<Session | null> => {
    if (!clerkLoaded) return null;
    if (sessionInflight.current) return sessionInflight.current;

    const run = async (): Promise<Session | null> => {
      const load = async (skipCache = false) => {
        const token = await getToken(
          skipCache ? { skipCache: true } : undefined,
        );
        if (!token) return { kind: 'signed_out' as const };
        try {
          const next = await authService.getSession();
          return { kind: 'ok' as const, next };
        } catch (error) {
          if (
            error instanceof ApiError &&
            error.code === 'ONBOARDING_REQUIRED'
          ) {
            return { kind: 'onboarding' as const };
          }
          if (error instanceof ApiError && error.status === 401) {
            return { kind: 'unauthorized' as const, error };
          }
          throw error;
        }
      };

      try {
        let result = await load(false);
        if (result.kind === 'unauthorized') {
          // Token/azp races after OAuth — retry once with a fresh Clerk token.
          await new Promise(resolve => setTimeout(resolve, 250));
          result = await load(true);
        }

        if (result.kind === 'signed_out') {
          setSession(null);
          return null;
        }
        if (result.kind === 'onboarding') {
          // First sign-in: create the EventOK profile silently. Profile details
          // (phone, city…) are collected later, never as a gate on logging in.
          const provisioned = await authService.onboard({
            role: peekAuthIntent() === 'vendor' ? 'vendor' : 'customer',
          });
          setSession(provisioned);
          return provisioned;
        }
        if (result.kind === 'unauthorized') {
          setSession(null);
          console.error('Session refresh unauthorized:', result.error.message);
          return null;
        }

        setSession(result.next);
        return result.next;
      } catch (error) {
        console.error('Session refresh failed:', error);
        setSession(null);
        return null;
      }
    };

    sessionInflight.current = run().finally(() => {
      sessionInflight.current = null;
    });
    return sessionInflight.current;
  }, [clerkLoaded, getToken]);

  useEffect(() => {
    if (!clerkLoaded) return;
    let cancelled = false;
    setIsLoading(true);
    void refreshSession().finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
    // Intentionally omit refreshSession — only re-run on Clerk auth flips.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- auth-state gated
  }, [clerkLoaded, clerkSignedIn]);

  const activateSession = useCallback(
    async (sessionId: string) => {
      try {
        setIsLoading(true);
        await clerkApi.setActive({ session: sessionId });
        const next = await refreshSession();
        return next
          ? null
          : 'We could not open your account. Please try again.';
      } catch (error) {
        return clerkError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [clerkApi, refreshSession],
  );

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      if (!signInLoaded || !signIn) return { error: 'Clerk is still loading' };
      try {
        const result = await signIn.create({ identifier: email, password });
        if (result.status === 'complete' && result.createdSessionId) {
          return { error: await activateSession(result.createdSessionId) };
        }
        // New-device check (Device Trust) or email MFA: confirm with an email code.
        const emailFactor = result.supportedSecondFactors?.find(
          factor => factor.strategy === 'email_code',
        );
        if (
          (result.status === 'needs_client_trust' ||
            result.status === 'needs_second_factor') &&
          emailFactor &&
          'emailAddressId' in emailFactor
        ) {
          await signIn.prepareSecondFactor({
            strategy: 'email_code',
            emailAddressId: emailFactor.emailAddressId,
          });
          return { error: null, needsCode: true };
        }
        return { error: 'Additional sign-in verification is required' };
      } catch (error) {
        return { error: clerkError(error) };
      }
    },
    [activateSession, signIn, signInLoaded],
  );

  const verifyLoginCode = useCallback(
    async (code: string) => {
      if (!signInLoaded || !signIn) return 'Clerk is still loading';
      try {
        const result = await signIn.attemptSecondFactor({
          strategy: 'email_code',
          code: code.trim(),
        });
        if (result.status !== 'complete' || !result.createdSessionId) {
          return 'Verification is incomplete';
        }
        return await activateSession(result.createdSessionId);
      } catch (error) {
        return clerkError(error);
      }
    },
    [activateSession, signIn, signInLoaded],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      if (!signUpLoaded || !signUp) return 'Clerk is still loading';
      const [firstName, ...rest] = payload.name.trim().split(/\s+/);
      try {
        await signUp.create({
          emailAddress: payload.email.trim(),
          password: payload.password,
          firstName: firstName || undefined,
          lastName: rest.join(' ') || undefined,
        });
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });
        return null;
      } catch (error) {
        return clerkError(error);
      }
    },
    [signUp, signUpLoaded],
  );

  const resendRegistrationCode = useCallback(async () => {
    if (!signUpLoaded || !signUp) return 'Clerk is still loading';
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      return null;
    } catch (error) {
      return clerkError(error);
    }
  }, [signUp, signUpLoaded]);

  const verifyRegistration = useCallback(
    async (code: string) => {
      if (!signUpLoaded || !signUp) return 'Clerk is still loading';
      try {
        const result = await signUp.attemptEmailAddressVerification({
          code: code.trim(),
        });
        if (result.status !== 'complete' || !result.createdSessionId) {
          return 'Email verification is incomplete';
        }
        return await activateSession(result.createdSessionId);
      } catch (error) {
        return clerkError(error);
      }
    },
    [activateSession, signUp, signUpLoaded],
  );

  const signInWithGoogle = useCallback(
    async (nextPath?: string | null) => {
      if (!signInLoaded || !signIn) return 'Clerk is still loading';
      try {
        // The destination rides along in the completion URL, so it survives the
        // full-page round trip out to Google and back.
        await signIn.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: absoluteUrl(withNextPath(ROUTES.SSO_CALLBACK, nextPath)),
          redirectUrlComplete: absoluteUrl(
            withNextPath(ROUTES.AUTH_CONTINUE, nextPath),
          ),
        });
        return null;
      } catch (error) {
        return clerkError(error);
      }
    },
    [signIn, signInLoaded],
  );

  const logout = useCallback(async () => {
    await clerk.signOut();
    authService.clearLocalState();
    setSession(null);
  }, [clerk]);

  const value = useMemo(
    () => ({
      session,
      isLoading: isLoading || !clerkLoaded,
      isSignedIn: clerkSignedIn,
      login,
      verifyLoginCode,
      logout,
      register,
      resendRegistrationCode,
      verifyRegistration,
      signInWithGoogle,
      refreshSession,
      activateSession,
    }),
    [
      activateSession,
      clerkLoaded,
      clerkSignedIn,
      isLoading,
      login,
      logout,
      refreshSession,
      register,
      resendRegistrationCode,
      session,
      signInWithGoogle,
      verifyLoginCode,
      verifyRegistration,
    ],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
