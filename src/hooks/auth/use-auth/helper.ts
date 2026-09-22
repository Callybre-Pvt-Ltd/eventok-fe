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
import { authService } from '@/services';
import type { Session, UserRole } from '@/types';

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  phone: string;
  city: string;
  role: UserRole;
}

interface AuthContextValue {
  session: Session | null;
  isLoading: boolean;
  isSignedIn: boolean;
  onboardingRequired: boolean;
  verificationPending: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<string | null>;
  verifyRegistration: (code: string) => Promise<string | null>;
  completeOnboarding: (
    payload: Omit<RegisterPayload, 'email' | 'password'>,
  ) => Promise<string | null>;
  signInWithGoogle: (nextPath?: string | null) => Promise<string | null>;
  refreshSession: () => Promise<Session | null>;
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
  const [onboardingRequired, setOnboardingRequired] = useState(false);
  const [pendingRegistration, setPendingRegistration] =
    useState<RegisterPayload | null>(null);
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
          setOnboardingRequired(false);
          return null;
        }
        if (result.kind === 'onboarding') {
          setSession(null);
          setOnboardingRequired(true);
          return null;
        }
        if (result.kind === 'unauthorized') {
          setSession(null);
          setOnboardingRequired(false);
          console.error('Session refresh unauthorized:', result.error.message);
          return null;
        }

        setSession(result.next);
        setOnboardingRequired(false);
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

  const login = useCallback(
    async (email: string, password: string) => {
      if (!signInLoaded || !signIn) return 'Clerk is still loading';
      try {
        const result = await signIn.create({ identifier: email, password });
        if (result.status !== 'complete' || !result.createdSessionId) {
          return 'Additional sign-in verification is required';
        }
        setIsLoading(true);
        await clerkApi.setActive({ session: result.createdSessionId });
        await refreshSession();
        setIsLoading(false);
        return null;
      } catch (error) {
        setIsLoading(false);
        return clerkError(error);
      }
    },
    [clerkApi, refreshSession, signIn, signInLoaded],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      if (!signUpLoaded || !signUp) return 'Clerk is still loading';
      try {
        await signUp.create({
          emailAddress: payload.email,
          password: payload.password,
        });
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });
        setPendingRegistration(payload);
        return null;
      } catch (error) {
        return clerkError(error);
      }
    },
    [signUp, signUpLoaded],
  );

  const verifyRegistration = useCallback(
    async (code: string) => {
      if (!signUpLoaded || !signUp || !pendingRegistration) {
        return 'Registration is not ready for verification';
      }
      try {
        const result = await signUp.attemptEmailAddressVerification({ code });
        if (result.status !== 'complete' || !result.createdSessionId) {
          return 'Email verification is incomplete';
        }
        await clerkApi.setActive({ session: result.createdSessionId });
        const localSession = await authService.onboard({
          fullName: pendingRegistration.name,
          phone: pendingRegistration.phone,
          role: pendingRegistration.role,
          city: pendingRegistration.city,
        });
        setSession(localSession);
        setOnboardingRequired(false);
        setPendingRegistration(null);
        return null;
      } catch (error) {
        return clerkError(error);
      }
    },
    [clerkApi, pendingRegistration, signUp, signUpLoaded],
  );

  const completeOnboarding = useCallback(
    async (payload: Omit<RegisterPayload, 'email' | 'password'>) => {
      try {
        setSession(
          await authService.onboard({
            fullName: payload.name,
            phone: payload.phone,
            role: payload.role,
            city: payload.city,
          }),
        );
        setOnboardingRequired(false);
        return null;
      } catch (error) {
        return clerkError(error);
      }
    },
    [],
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
    setOnboardingRequired(false);
  }, [clerk]);

  const value = useMemo(
    () => ({
      session,
      isLoading: isLoading || !clerkLoaded,
      isSignedIn: clerkSignedIn,
      onboardingRequired,
      verificationPending: pendingRegistration !== null,
      login,
      logout,
      register,
      verifyRegistration,
      completeOnboarding,
      signInWithGoogle,
      refreshSession,
    }),
    [
      clerkLoaded,
      clerkSignedIn,
      completeOnboarding,
      isLoading,
      login,
      logout,
      onboardingRequired,
      pendingRegistration,
      refreshSession,
      register,
      session,
      signInWithGoogle,
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
