import { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/use-auth';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';
import type { UserRole } from '@/types';

function getRedirect(role: UserRole, vendorStatus?: string): string {
  if (role === 'admin') return ROUTES.ADMIN_DASHBOARD;
  if (role === 'vendor')
    return vendorStatus === 'pending'
      ? ROUTES.VENDOR_PENDING
      : ROUTES.VENDOR_DASHBOARD;
  return ROUTES.CUSTOMER_DASHBOARD;
}

export function useLoginPage() {
  const { palette } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      const err = await login(email, password);
      setLoading(false);
      if (err) {
        setError(err);
        return;
      }
      const from = (location.state as { from?: { pathname: string } })?.from
        ?.pathname;
      if (from) {
        navigate(from, { replace: true });
        return;
      }
      const session = JSON.parse(
        localStorage.getItem('eventok_session') || '{}',
      );
      navigate(getRedirect(session.user?.role, session.user?.vendorStatus), {
        replace: true,
      });
    },
    [login, navigate, location],
  );

  return { palette, error, loading, onSubmit };
}
