import React from 'react';
import { StatusPill } from './styled';

export * from './styled';

export type StatusVariant = 'success' | 'warning' | 'error' | 'neutral' | 'info';

export function getStatusVariant(status: string): StatusVariant {
  const s = status.toLowerCase().trim();
  switch (s) {
    case 'approved':
    case 'published':
    case 'live':
    case 'confirmed':
    case 'completed':
    case 'active':
      return 'success';

    case 'pending':
    case 'under_review':
    case 'payment_pending':
    case 'pending_vendor_acceptance':
    case 'admin_review':
    case 'requested':
      return 'warning';

    case 'vendor_assigned':
    case 'in_progress':
      return 'info';

    case 'rejected':
    case 'cancelled':
    case 'suspended':
      return 'error';

    case 'draft':
    case 'archived':
    default:
      return 'neutral';
  }
}

interface AdminStatusBadgeProps {
  status: string;
  label?: string;
}

export const AdminStatusBadge: React.FC<AdminStatusBadgeProps> = ({
  status,
  label,
}) => {
  const variant = getStatusVariant(status);
  const displayLabel = label || status.replace(/_/g, ' ');
  return <StatusPill $variant={variant}>{displayLabel}</StatusPill>;
};
