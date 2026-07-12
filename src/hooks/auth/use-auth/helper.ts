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
import { authService } from '@/services';
import type { Session, UserRole } from '@/types';

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  city: string;
  role: UserRole;
}

interface AuthContextValue {
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<string | null>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    const res = await authService.getSession();
    setSession(res.data);
  }, []);

  useEffect(() => {
    refreshSession().finally(() => setIsLoading(false));
  }, [refreshSession]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login(email, password);
    if (res.error || !res.data) return res.error ?? 'auth.invalidCredentials';
    setSession(res.data);
    return null;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setSession(null);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const res = await authService.register(payload);
    if (res.error || !res.data) return res.error ?? 'common.error';
    setSession(res.data);
    return null;
  }, []);

  const value = useMemo(
    () => ({ session, isLoading, login, logout, register, refreshSession }),
    [session, isLoading, login, logout, register, refreshSession],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
