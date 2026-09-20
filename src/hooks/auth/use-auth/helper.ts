import { useClerk, useAuth as useClerkAuth } from '@clerk/react';
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ApiError, setAuthTokenProvider } from '@/api/client';
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
  onboardingRequired: boolean;
  verificationPending: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<string | null>;
  verifyRegistration: (code: string) => Promise<string | null>;
  completeOnboarding: (
    payload: Omit<RegisterPayload, 'email' | 'password'>,
  ) => Promise<string | null>;
  signInWithGoogle: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

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
  const signIn = clerkApi.client.signIn;
  const signUp = clerkApi.client.signUp;
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingRequired, setOnboardingRequired] = useState(false);
  const [pendingRegistration, setPendingRegistration] =
    useState<RegisterPayload | null>(null);

  useEffect(() => {
    setAuthTokenProvider(async () => clerk.getToken());
  }, [clerk]);

  const refreshSession = useCallback(async () => {
    if (!clerk.isLoaded || !clerk.isSignedIn) {
      setSession(null);
      setOnboardingRequired(false);
      return;
    }
    try {
      setSession(await authService.getSession());
      setOnboardingRequired(false);
    } catch (error) {
      if (error instanceof ApiError && error.code === 'ONBOARDING_REQUIRED') {
        setSession(null);
        setOnboardingRequired(true);
        return;
      }
      if (error instanceof ApiError && error.status === 401) {
        await clerk.signOut();
        setSession(null);
        return;
      }
      throw error;
    }
  }, [clerk]);

  useEffect(() => {
    if (!clerk.isLoaded) return;
    refreshSession().finally(() => setIsLoading(false));
  }, [clerk.isLoaded, clerk.isSignedIn, refreshSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      if (!clerkApi.loaded) return 'Clerk is still loading';
      try {
        const result = await signIn.create({ identifier: email, password });
        if (result.status !== 'complete' || !result.createdSessionId) {
          return 'Additional sign-in verification is required';
        }
        setIsLoading(true);
        await clerkApi.setActive({ session: result.createdSessionId });
        return null;
      } catch (error) {
        setIsLoading(false);
        return clerkError(error);
      }
    },
    [clerkApi, signIn],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      if (!clerkApi.loaded) return 'Clerk is still loading';
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
    [clerkApi.loaded, signUp],
  );

  const verifyRegistration = useCallback(
    async (code: string) => {
      if (!clerkApi.loaded || !pendingRegistration) {
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
    [clerkApi, pendingRegistration, signUp],
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

  const signInWithGoogle = useCallback(async () => {
    if (!signIn) return;
    await signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/onboarding',
    });
  }, [signIn]);

  const logout = useCallback(async () => {
    await clerk.signOut();
    authService.clearLocalState();
    setSession(null);
    setOnboardingRequired(false);
  }, [clerk]);

  const value = useMemo(
    () => ({
      session,
      isLoading: isLoading || !clerk.isLoaded,
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
      clerk.isLoaded,
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
