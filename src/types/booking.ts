export type BookingStatus =
  | 'requested'
  | 'admin_review'
  | 'vendor_assigned'
  | 'payment_pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface BookingRequest {
  id: string;
  customerId: string;
  vendorId: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  city: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Booking extends BookingRequest {
  assignedVendorId?: string;
  adminNotes?: string;
}
