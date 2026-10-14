import type { BookingStatus } from '@/types';

export type BookingTone = 'pending' | 'positive' | 'active' | 'negative';

/** Statuses where the vendor has accepted, so the two parties may contact each other. */
const CONTACT_VISIBLE: BookingStatus[] = [
  'confirmed',
  'in_progress',
  'completed',
];

const TONES: Record<BookingStatus, BookingTone> = {
  requested: 'pending',
  admin_review: 'pending',
  vendor_assigned: 'pending',
  pending_vendor_acceptance: 'pending',
  payment_pending: 'pending',
  confirmed: 'positive',
  in_progress: 'active',
  completed: 'positive',
  rejected: 'negative',
  cancelled: 'negative',
};

const LABEL_KEYS: Record<BookingStatus, string> = {
  requested: 'customer.bookingStatusRequested',
  admin_review: 'customer.bookingStatusRequested',
  vendor_assigned: 'customer.bookingStatusRequested',
  pending_vendor_acceptance: 'customer.bookingStatusAwaitingVendor',
  payment_pending: 'customer.bookingStatusAwaitingPayment',
  confirmed: 'customer.bookingStatusConfirmed',
  in_progress: 'customer.bookingStatusInProgress',
  completed: 'customer.bookingStatusCompleted',
  rejected: 'customer.bookingStatusRejected',
  cancelled: 'customer.bookingStatusCancelled',
};

export const bookingTone = (status: BookingStatus): BookingTone =>
  TONES[status] ?? 'pending';

export const bookingLabelKey = (status: BookingStatus): string =>
  LABEL_KEYS[status] ?? 'customer.bookingStatusRequested';

export const isContactVisible = (status: BookingStatus): boolean =>
  CONTACT_VISIBLE.includes(status);
