import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/use-auth';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';
import { readNextPath, withNextPath } from '@/utils/auth/auth-return';
import { getSafeReturnPath, setAuthIntent } from '@/utils/auth/post-auth';

export function useLoginPage() {
  const { palette } = useTheme();
  const { login, verifyLoginCode, session, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Destination carried in the URL, e.g. /login?next=/checkout.
  const nextPath = readNextPath(location.search);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsCode, setNeedsCode] = useState(false);
  const [code, setCode] = useState('');

  // Arriving on the customer login fixes the intent: anyone completing auth from here
  // is a shopper. This also clears a stale 'vendor' intent left in sessionStorage by an
  // earlier visit to /vendor-login, which would otherwise onboard them as a vendor.
  useEffect(() => {
    setAuthIntent('customer');
  }, []);

  useEffect(() => {
    if (isLoading || loading || !session) return;
    const from =
      nextPath ??
      (location.state as { from?: { pathname: string } })?.from?.pathname;
    navigate(
      getSafeReturnPath(from, session.user.role, session.user.vendorStatus),
      { replace: true },
    );
  }, [isLoading, loading, location.state, navigate, nextPath, session]);

  const finish = useCallback(
    () =>
      navigate(withNextPath(ROUTES.AUTH_CONTINUE, nextPath), { replace: true }),
    [navigate, nextPath],
  );

  const onSubmit = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      const result = await login(email, password);
      setLoading(false);
      if (result.error) {
        setError(result.error);
        return;
      }
      if (result.needsCode) {
        setNeedsCode(true);
        return;
      }
      finish();
    },
    [finish, login],
  );

  const onVerifyCode = useCallback(async () => {
    setLoading(true);
    setError(null);
    const err = await verifyLoginCode(code);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    finish();
  }, [code, finish, verifyLoginCode]);

  const cancelCode = () => {
    setNeedsCode(false);
    setCode('');
    setError(null);
  };

  return {
    palette,
    error,
    loading,
    authLoading: isLoading,
    nextPath,
    onSubmit,
    needsCode,
    code,
    setCode,
    onVerifyCode,
    cancelCode,
  };
}
