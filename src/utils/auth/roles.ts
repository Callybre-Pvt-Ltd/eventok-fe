import type { UserRole } from '@/types';

/** Canonical product roles shown in the UI. */
export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Super admin',
  vendor: 'Vendor',
  customer: 'User',
};

export function getRoleLabel(
  role?: UserRole | string | null,
  vendorStatus?: string,
): string {
  if (role === 'admin') return ROLE_LABELS.admin;
  if (role === 'vendor') {
    return vendorStatus && vendorStatus !== 'approved'
      ? 'Vendor (waitlist)'
      : ROLE_LABELS.vendor;
  }
  if (role === 'customer') return ROLE_LABELS.customer;
  return 'User';
}

export function formatEmailWithRole(
  email: string,
  role?: UserRole | string | null,
  vendorStatus?: string,
): string {
  return `${email} · ${getRoleLabel(role, vendorStatus)}`;
}
