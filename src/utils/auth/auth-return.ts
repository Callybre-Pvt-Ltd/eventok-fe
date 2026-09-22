/**
 * Where to send someone once authentication finishes.
 *
 * The destination travels as a `?next=` query parameter through every hop of the auth
 * flow — login, the switch to signup, the Google round trip and the SSO callback — so
 * a shopper who was sent to sign in from checkout lands back on checkout.
 *
 * It is a query parameter rather than stored state on purpose: it survives full page
 * reloads and the external redirect to Google, it is visible when debugging, and it is
 * read-only (reading it twice is harmless, unlike consuming a stored value).
 */

import { ROUTES } from '@/constants/routes';

export const NEXT_PARAM = 'next';

/** Paths a visitor may be returned to after auth. Anything else is ignored. */
const ALLOWED_PREFIXES = ['/admin', '/vendor', '/customer'];
const ALLOWED_EXACT: string[] = [ROUTES.CHECKOUT, ROUTES.CART];

/**
 * Only same-site app paths are honoured, so a crafted `?next=` cannot bounce someone
 * to another origin after they sign in.
 */
export function isSafeNextPath(
  path: string | null | undefined,
): path is string {
  if (!path) return false;
  // Reject protocol-relative ("//evil.com") and absolute URLs outright.
  if (!path.startsWith('/') || path.startsWith('//')) return false;
  const [pathname] = path.split('?');
  if (ALLOWED_EXACT.includes(pathname)) return true;
  return ALLOWED_PREFIXES.some(prefix => pathname.startsWith(prefix));
}

/** Reads a validated `next` destination out of a location search string. */
export function readNextPath(search: string): string | null {
  const value = new URLSearchParams(search).get(NEXT_PARAM);
  return isSafeNextPath(value) ? value : null;
}

/** Appends `?next=…` to a path, dropping it when the destination is not allowed. */
export function withNextPath(
  path: string,
  next: string | null | undefined,
): string {
  if (!isSafeNextPath(next)) return path;
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}${NEXT_PARAM}=${encodeURIComponent(next)}`;
}
