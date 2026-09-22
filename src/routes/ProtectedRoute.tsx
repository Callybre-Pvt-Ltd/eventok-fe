import { Navigate, useLocation } from 'react-router-dom';
import { LoadingState } from '@/components/global/loading-state';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import type { UserRole } from '@/types';
import { getPostAuthPath } from '@/utils/auth/post-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
  allowPendingVendor?: boolean;
}

export function ProtectedRoute({
  children,
  roles,
  allowPendingVendor = false,
}: ProtectedRouteProps) {
  const { session, isLoading, onboardingRequired } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingState />;

  if (onboardingRequired) {
    return <Navigate to={ROUTES.ONBOARDING} replace />;
  }

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  const { user } = session;

  if (roles && !roles.includes(user.role)) {
    return (
      <Navigate to={getPostAuthPath(user.role, user.vendorStatus)} replace />
    );
  }

  if (
    user.role === 'vendor' &&
    user.vendorStatus !== 'approved' &&
    !allowPendingVendor
  ) {
    return <Navigate to={ROUTES.VENDOR_PENDING} replace />;
  }

  return <>{children}</>;
}
