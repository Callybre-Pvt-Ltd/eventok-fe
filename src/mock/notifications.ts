import type { Notification } from '@/types';

export const mockNotifications: Notification[] = [
  {
    id: 'n-1',
    userId: 'u-customer-1',
    title: 'Booking Confirmed',
    body: 'Your wedding booking with Priya Events Studio has been confirmed.',
    type: 'booking_confirmed',
    read: false,
    createdAt: '2026-02-15T12:00:00Z',
  },
  {
    id: 'n-2',
    userId: 'u-customer-1',
    title: 'Payment Successful',
    body: 'Advance payment of ₹50,000 received successfully.',
    type: 'payment_success',
    read: true,
    createdAt: '2026-02-15T10:30:00Z',
  },
  {
    id: 'n-3',
    userId: 'u-vendor-1',
    title: 'New Booking Assigned',
    body: 'You have been assigned a new wedding booking.',
    type: 'booking_assigned',
    read: false,
    createdAt: '2026-02-12T09:00:00Z',
  },
];
