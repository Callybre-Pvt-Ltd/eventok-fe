import { Navigate, useLocation } from 'react-router-dom';
import { LoadingState } from '@/components/global/loading-state';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import type { UserRole } from '@/types';
import { checkRouteAccess } from './helper';

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
  const { session, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingState />;

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  const access = checkRouteAccess(session.user, roles, allowPendingVendor);
  if (!access.allowed && access.redirectTo) {
    return <Navigate to={access.redirectTo} replace />;
  }

  return <>{children}</>;
}
