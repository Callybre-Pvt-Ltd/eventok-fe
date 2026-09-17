import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { Booking, ServiceResponse } from '@/types';

export interface EnquiryPayload {
  event_type: string;
  event_date: string;
  location: string;
  guest_count?: number | null;
  budget?: number;
  requirements?: string;
}

export interface ApiEnquiry {
  id: string;
  client_id: string;
  event_type: string;
  event_date: string;
  location: string;
  guest_count: number | null;
  budget: string | number | null;
  requirements: string | null;
  status: string;
  created_at: string;
}

export interface ApiBooking {
  id: string;
  quotation_id: string;
  client_id: string;
  vendor_id: string;
  booking_date: string;
  total_amount: string | number;
  status: string;
  created_at: string;
}

const wrap = async <T>(fn: () => Promise<T>): Promise<ServiceResponse<T>> => {
  try {
    return { data: await fn(), error: null };
  } catch (error) {
    const message =
      error instanceof ApiError ? error.message : 'Request failed';
    return { data: null, error: message };
  }
};

const mapEnquiryToBooking = (enquiry: ApiEnquiry): Booking => ({
  id: enquiry.id,
  customerId: enquiry.client_id,
  vendorId: '',
  eventDate: enquiry.event_date,
  eventType: enquiry.event_type,
  guestCount: enquiry.guest_count ?? 0,
  city: enquiry.location,
  notes: enquiry.requirements ?? '',
  status:
    enquiry.status === 'BOOKED'
      ? 'confirmed'
      : enquiry.status === 'CANCELLED'
        ? 'cancelled'
        : enquiry.status === 'ASSIGNED' || enquiry.status === 'QUOTED'
          ? 'vendor_assigned'
          : enquiry.status === 'UNDER_REVIEW'
            ? 'admin_review'
            : 'requested',
  createdAt: enquiry.created_at,
});

const mapApiBooking = (booking: ApiBooking): Booking => ({
  id: booking.id,
  customerId: booking.client_id,
  vendorId: booking.vendor_id,
  assignedVendorId: booking.vendor_id,
  eventDate: booking.booking_date,
  eventType: 'Service booking',
  guestCount: 0,
  city: '',
  notes: `Total: ${booking.total_amount}`,
  status:
    booking.status === 'PENDING_PAYMENT'
      ? 'payment_pending'
      : booking.status === 'CONFIRMED'
        ? 'confirmed'
        : booking.status === 'IN_PROGRESS'
          ? 'in_progress'
          : booking.status === 'COMPLETED'
            ? 'completed'
            : booking.status === 'CANCELLED'
              ? 'cancelled'
              : 'requested',
  createdAt: booking.created_at,
});

export const bookingService = {
  async createRequest(payload: {
    customerId: string;
    vendorId: string;
    eventDate: string;
    eventType: string;
    guestCount: number;
    city: string;
    notes: string;
  }): Promise<ServiceResponse<Booking>> {
    return wrap(async () => {
      const enquiry = await apiRequest<ApiEnquiry>('/enquiries', {
        method: 'POST',
        body: {
          event_type: payload.eventType,
          event_date: payload.eventDate,
          location: payload.city || 'India',
          guest_count: payload.guestCount || null,
          requirements: [
            payload.notes,
            payload.vendorId ? `Preferred service id: ${payload.vendorId}` : '',
          ]
            .filter(Boolean)
            .join('\n'),
        } satisfies EnquiryPayload,
      });

      const submitted = await apiRequest<ApiEnquiry>(`/enquiries/${enquiry.id}`, {
        method: 'PATCH',
        body: { status: 'SUBMITTED' },
      });

      return mapEnquiryToBooking(submitted);
    });
  },

  async getCustomerBookings(
    _customerId: string,
  ): Promise<ServiceResponse<Booking[]>> {
    return wrap(async () => {
      const [enquiries, bookings] = await Promise.all([
        apiRequestPaginated<ApiEnquiry>('/enquiries', {
          query: { page: 1, page_size: 50 },
        }),
        apiRequestPaginated<ApiBooking>('/bookings', {
          query: { page: 1, page_size: 50 },
        }),
      ]);
      return [
        ...bookings.items.map(mapApiBooking),
        ...enquiries.items.map(mapEnquiryToBooking),
      ];
    });
  },

  async getVendorBookings(
    _vendorId: string,
  ): Promise<ServiceResponse<Booking[]>> {
    return wrap(async () => {
      const bookings = await apiRequestPaginated<ApiBooking>('/bookings', {
        query: { page: 1, page_size: 50 },
      });
      return bookings.items.map(mapApiBooking);
    });
  },

  async getAllBookings(): Promise<ServiceResponse<Booking[]>> {
    return wrap(async () => {
      const bookings = await apiRequestPaginated<ApiBooking>('/bookings', {
        query: { page: 1, page_size: 100 },
      });
      return bookings.items.map(mapApiBooking);
    });
  },

  async assignVendor(
    bookingId: string,
    vendorId: string,
  ): Promise<ServiceResponse<Booking>> {
    return wrap(async () => {
      await apiRequest(`/enquiries/${bookingId}/assignments`, {
        method: 'POST',
        body: { vendor_ids: [vendorId] },
      });
      const enquiry = await apiRequest<ApiEnquiry>(`/enquiries/${bookingId}`);
      return {
        ...mapEnquiryToBooking(enquiry),
        assignedVendorId: vendorId,
        status: 'vendor_assigned' as const,
      };
    });
  },

  async updateStatus(
    bookingId: string,
    status: Booking['status'],
  ): Promise<ServiceResponse<Booking>> {
    return wrap(async () => {
      const backendStatus =
        status === 'confirmed'
          ? 'CONFIRMED'
          : status === 'in_progress'
            ? 'IN_PROGRESS'
            : status === 'completed'
              ? 'COMPLETED'
              : status === 'cancelled'
                ? 'CANCELLED'
                : null;
      if (!backendStatus) {
        const enquiry = await apiRequest<ApiEnquiry>(`/enquiries/${bookingId}`);
        return mapEnquiryToBooking(enquiry);
      }
      const booking = await apiRequest<ApiBooking>(`/bookings/${bookingId}`, {
        method: 'PATCH',
        body: { status: backendStatus },
      });
      return mapApiBooking(booking);
    });
  },

  async createBookingFromQuotation(payload: {
    quotation_id: string;
    booking_date: string;
  }): Promise<ServiceResponse<ApiBooking>> {
    return wrap(() =>
      apiRequest<ApiBooking>('/bookings', {
        method: 'POST',
        body: payload,
      }),
    );
  },
};
