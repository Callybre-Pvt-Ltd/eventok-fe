import { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/use-auth';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';

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
      navigate(ROUTES.ONBOARDING, { replace: true });
    },
    [login, navigate, location],
  );

  return { palette, error, loading, onSubmit };
}
