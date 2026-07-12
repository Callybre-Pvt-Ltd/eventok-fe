import type { Booking } from '@/types';

export const mockBookings: Booking[] = [
  {
    id: 'b-1',
    customerId: 'u-customer-1',
    vendorId: 'v-1',
    assignedVendorId: 'v-1',
    eventDate: '2026-08-15',
    eventType: 'Wedding',
    guestCount: 300,
    city: 'Mumbai',
    notes: 'Outdoor venue, need full decor package',
    status: 'confirmed',
    adminNotes: 'Vendor assigned and advance received',
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'b-2',
    customerId: 'u-customer-1',
    vendorId: 'v-3',
    eventDate: '2026-09-20',
    eventType: 'Corporate',
    guestCount: 150,
    city: 'Mumbai',
    notes: 'Annual company gala, need photography coverage',
    status: 'admin_review',
    createdAt: '2026-03-01T14:30:00Z',
  },
];
