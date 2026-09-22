import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';

/** Polls vendor approval status and enters the portal once approved. */
export function useVendorPending() {
  const { session, refreshSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.user.role === 'vendor' && session.user.vendorStatus === 'approved') {
      navigate(ROUTES.VENDOR_DASHBOARD, { replace: true });
    }
  }, [navigate, session]);

  useEffect(() => {
    const id = window.setInterval(() => {
      void refreshSession();
    }, 8000);
    return () => window.clearInterval(id);
  }, [refreshSession]);
}
