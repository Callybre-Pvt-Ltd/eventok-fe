import type { Payment } from '@/types';

export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    bookingId: 'b-1',
    customerId: 'u-customer-1',
    amount: 50000,
    type: 'advance',
    status: 'completed',
    createdAt: '2026-02-15T10:00:00Z',
  },
];
