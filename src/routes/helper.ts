import { ROUTES } from '@/constants/routes';
import type { User, UserRole } from '@/types';
import { getPostAuthPath } from '@/utils/auth/post-auth';

export interface RouteAccessResult {
  allowed: boolean;
  redirectTo?: string;
}

export function checkRouteAccess(
  user: User | null | undefined,
  roles?: UserRole[],
  allowPendingVendor: boolean = false,
): RouteAccessResult {
  if (!user) {
    return { allowed: false, redirectTo: ROUTES.LOGIN };
  }

  const isVendorRoute = Boolean(roles && roles.includes('vendor'));

  const isAuthorizedForVendor =
    isVendorRoute && (user.role === 'vendor' || Boolean(user.vendorId));

  const isAuthorizedByPrimaryRole = Boolean(roles && roles.includes(user.role));

  if (roles && !isAuthorizedByPrimaryRole && !isAuthorizedForVendor) {
    return {
      allowed: false,
      redirectTo: getPostAuthPath(user.role, user.vendorStatus),
    };
  }

  if (
    isVendorRoute &&
    user.vendorStatus !== 'approved' &&
    !allowPendingVendor
  ) {
    return { allowed: false, redirectTo: ROUTES.VENDOR_PENDING };
  }

  return { allowed: true };
}
