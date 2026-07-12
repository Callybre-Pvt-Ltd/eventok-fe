import type { Review } from '@/types';

export const mockReviews: Review[] = [
  {
    id: 'r-1',
    vendorId: 'v-1',
    customerName: 'Anita K.',
    rating: 5,
    comment:
      'Absolutely magical wedding! Priya Events exceeded every expectation.',
    createdAt: '2025-12-01T00:00:00Z',
  },
  {
    id: 'r-2',
    vendorId: 'v-1',
    customerName: 'Vikram S.',
    rating: 5,
    comment: 'Professional team, flawless execution for our corporate event.',
    createdAt: '2025-11-15T00:00:00Z',
  },
  {
    id: 'r-3',
    vendorId: 'v-3',
    customerName: 'Meera P.',
    rating: 5,
    comment: 'Stunning photos that captured every emotion perfectly.',
    createdAt: '2025-10-20T00:00:00Z',
  },
];
