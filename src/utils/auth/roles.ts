import type { UserRole } from '@/types';

/** Canonical product roles shown in the UI. */
export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  vendor: 'Vendor',
  customer: '',
};

export function getRoleLabel(
  role?: UserRole | string | null,
  vendorStatus?: string,
): string {
  if (role === 'super_admin') return ROLE_LABELS.super_admin;
  if (role === 'admin') return ROLE_LABELS.admin;
  if (role === 'vendor') {
    return vendorStatus && vendorStatus !== 'approved'
      ? 'Vendor (waitlist)'
      : ROLE_LABELS.vendor;
  }
  return '';
}

export function formatEmailWithRole(
  email: string,
  role?: UserRole | string | null,
  vendorStatus?: string,
): string {
  return `${email} · ${getRoleLabel(role, vendorStatus)}`;
}
