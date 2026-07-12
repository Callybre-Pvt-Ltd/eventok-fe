import { Navigate, useLocation } from 'react-router-dom';
import { LoadingState } from '@/components/global/loading-state';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole[];
  allowPendingVendor?: boolean;
}

function getDefaultRoute(role: UserRole, vendorStatus?: string): string {
  if (role === 'admin') return ROUTES.ADMIN_DASHBOARD;
  if (role === 'vendor') {
    return vendorStatus === 'pending'
      ? ROUTES.VENDOR_PENDING
      : ROUTES.VENDOR_DASHBOARD;
  }
  return ROUTES.CUSTOMER_DASHBOARD;
}

export function ProtectedRoute({
  children,
  roles,
  allowPendingVendor = false,
}: ProtectedRouteProps) {
  const { session, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingState />;

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  const { user } = session;

  if (roles && !roles.includes(user.role)) {
    return (
      <Navigate to={getDefaultRoute(user.role, user.vendorStatus)} replace />
    );
  }

  if (
    user.role === 'vendor' &&
    user.vendorStatus === 'pending' &&
    !allowPendingVendor
  ) {
    return <Navigate to={ROUTES.VENDOR_PENDING} replace />;
  }

  return <>{children}</>;
}
