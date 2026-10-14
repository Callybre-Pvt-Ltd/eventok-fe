export type BookingStatus =
  | 'requested'
  | 'admin_review'
  | 'vendor_assigned'
  | 'pending_vendor_acceptance'
  | 'payment_pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export type PricingMode = 'quotation' | 'direct_service' | 'direct_package';

export interface AddonSelection {
  addon_id: string;
  name: string;
  unit_price: string;
  quantity: number;
}

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
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceName?: string;
  serviceCategory?: string;
  vendorName?: string;
  vendorPhone?: string;
  vendorBusinessName?: string;
  totalAmount?: string | number;
  pricingMode?: PricingMode;
  serviceId?: string | null;
  packageId?: string | null;
  commissionAmount?: string | number | null;
  advanceAmount?: string | number | null;
  addonSelections?: AddonSelection[];
  /** The other side of the deal, released only once the booking is confirmed. */
  counterpartyName?: string;
  counterpartyPhone?: string;
}

/** One page of bookings plus the totals the pager needs. */
export interface BookingPage {
  items: Booking[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
}
