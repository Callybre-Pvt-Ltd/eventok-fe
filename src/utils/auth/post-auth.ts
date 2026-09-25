import { ROUTES } from '@/constants/routes';
import type { UserRole } from '@/types';

const AUTH_INTENT_KEY = 'eventok_auth_intent';

export type AuthIntent = 'vendor' | 'customer';

export function setAuthIntent(intent: AuthIntent) {
  sessionStorage.setItem(AUTH_INTENT_KEY, intent);
}

export function peekAuthIntent(): AuthIntent | null {
  const value = sessionStorage.getItem(AUTH_INTENT_KEY);
  if (value === 'vendor' || value === 'customer') return value;
  return null;
}

export function consumeAuthIntent(): AuthIntent | null {
  const value = peekAuthIntent();
  sessionStorage.removeItem(AUTH_INTENT_KEY);
  return value;
}

export function getPostAuthPath(role: UserRole, vendorStatus?: string): string {
  if (role === 'admin') return ROUTES.ADMIN_DASHBOARD;
  if (role === 'vendor') {
    return vendorStatus === 'approved'
      ? ROUTES.VENDOR_DASHBOARD
      : ROUTES.VENDOR_PENDING;
  }
  // Shoppers have no portal: signing in is only there to hold their cart and bookings,
  // so they land back on the storefront the way they would on any shop.
  return ROUTES.HOME;
}

/** Deep-link back to where auth interrupted them, when that destination is safe. */
export function getSafeReturnPath(
  fromPath: string | undefined,
  _role: UserRole,
  _vendorStatus?: string,
): string {
  const fallback = ROUTES.HOME;
  if (!fromPath || fromPath === ROUTES.HOME) return fallback;
  if (
    fromPath.startsWith('/admin') ||
    fromPath.startsWith('/vendor') ||
    fromPath.startsWith('/customer') ||
    // Shoppers who signed in mid-purchase must land back on the purchase, not a dashboard.
    fromPath === ROUTES.CHECKOUT ||
    fromPath === ROUTES.CART
  ) {
    return fromPath;
  }
  return fallback;
}
