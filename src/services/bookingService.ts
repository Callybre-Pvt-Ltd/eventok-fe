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

interface UserBasic {
  id: string;
  email: string;
  phone: string | null;
  full_name: string;
}

interface VendorBasic {
  id: string;
  user_id: string;
  business_name: string;
  city: string | null;
}

interface ServiceBasic {
  id: string;
  title: string;
  category_id: string;
  vendor_id?: string;
}

interface CategoryBasic {
  id: string;
  name: string;
}

const parseRequirements = (req: string | null): { serviceName?: string; preferredVendorId?: string } => {
  if (!req) return {};
  let serviceName: string | undefined;
  let preferredVendorId: string | undefined;

  const prefMatch = req.match(/Preferred service id:\s*([^\n\r]+)/i);
  if (prefMatch) {
    preferredVendorId = prefMatch[1].trim();
  }

  const srvMatch = req.match(/(?:Service|Booking request for):\s*([^\n\r]+)/i);
  if (srvMatch) {
    serviceName = srvMatch[1].trim();
  }

  return { serviceName, preferredVendorId };
};

const mapEnquiryToBooking = (
  enquiry: ApiEnquiry,
  usersById?: Map<string, UserBasic>,
  vendorsById?: Map<string, VendorBasic>,
  servicesById?: Map<string, ServiceBasic>,
  categoriesById?: Map<string, CategoryBasic>,
): Booking => {
  const { serviceName: parsedServiceName, preferredVendorId } = parseRequirements(enquiry.requirements);
  const matchedService = preferredVendorId ? servicesById?.get(preferredVendorId) : undefined;
  const serviceName = matchedService?.title || parsedServiceName || enquiry.event_type;
  const categoryId = matchedService?.category_id;
  const serviceCategory = categoryId ? categoriesById?.get(categoryId)?.name : enquiry.event_type;

  const user = usersById?.get(enquiry.client_id);
  const vendor = preferredVendorId && matchedService?.vendor_id ? vendorsById?.get(matchedService.vendor_id) : undefined;

  return {
    id: enquiry.id,
    customerId: enquiry.client_id,
    vendorId: vendor?.id || '',
    eventDate: enquiry.event_date,
    eventType: serviceName || enquiry.event_type,
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
    customerName: user?.full_name,
    customerEmail: user?.email,
    customerPhone: user?.phone ?? undefined,
    serviceName,
    serviceCategory,
    vendorName: vendor?.business_name,
    vendorBusinessName: vendor?.business_name,
    totalAmount: enquiry.budget ?? undefined,
  };
};

const mapApiBooking = (
  booking: ApiBooking,
  usersById?: Map<string, UserBasic>,
  vendorsById?: Map<string, VendorBasic>,
): Booking => {
  const user = usersById?.get(booking.client_id);
  const vendor = vendorsById?.get(booking.vendor_id);

  return {
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
    customerName: user?.full_name,
    customerEmail: user?.email,
    customerPhone: user?.phone ?? undefined,
    vendorName: vendor?.business_name,
    vendorBusinessName: vendor?.business_name,
    totalAmount: booking.total_amount,
  };
};

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

      const submitted = await apiRequest<ApiEnquiry>(
        `/enquiries/${enquiry.id}`,
        {
          method: 'PATCH',
          body: { status: 'SUBMITTED' },
        },
      );

      return mapEnquiryToBooking(submitted);
    });
  },

  async getCustomerBookings(
    _customerId: string,
  ): Promise<ServiceResponse<Booking[]>> {
    return wrap(async () => {
      const [enquiriesRes, bookingsRes, servicesRes, categoriesRes] = await Promise.allSettled([
        apiRequestPaginated<ApiEnquiry>('/enquiries', {
          query: { page: 1, page_size: 50 },
        }),
        apiRequestPaginated<ApiBooking>('/bookings', {
          query: { page: 1, page_size: 50 },
        }),
        apiRequestPaginated<ServiceBasic>('/services', {
          auth: false,
          query: { page: 1, page_size: 100 },
        }),
        apiRequestPaginated<CategoryBasic>('/categories', {
          auth: false,
          query: { page: 1, page_size: 100 },
        }),
      ]);

      const enquiries = enquiriesRes.status === 'fulfilled' ? enquiriesRes.value.items : [];
      const bookings = bookingsRes.status === 'fulfilled' ? bookingsRes.value.items : [];
      const services = servicesRes.status === 'fulfilled' ? servicesRes.value.items : [];
      const categories = categoriesRes.status === 'fulfilled' ? categoriesRes.value.items : [];

      const servicesById = new Map(services.map(s => [s.id, s]));
      const categoriesById = new Map(categories.map(c => [c.id, c]));

      return [
        ...bookings.map(b => mapApiBooking(b)),
        ...enquiries.map(e => mapEnquiryToBooking(e, undefined, undefined, servicesById, categoriesById)),
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
      return bookings.items.map(b => mapApiBooking(b));
    });
  },

  async getAllBookings(): Promise<ServiceResponse<Booking[]>> {
    return wrap(async () => {
      const [enquiriesRes, bookingsRes, usersRes, vendorsRes, servicesRes, categoriesRes] =
        await Promise.allSettled([
          apiRequestPaginated<ApiEnquiry>('/admin/enquiries', {
            query: { page: 1, page_size: 100 },
          }),
          apiRequestPaginated<ApiBooking>('/admin/bookings', {
            query: { page: 1, page_size: 100 },
          }),
          apiRequestPaginated<UserBasic>('/admin/users', {
            query: { page: 1, page_size: 100 },
          }),
          apiRequestPaginated<VendorBasic>('/admin/vendors', {
            query: { page: 1, page_size: 100 },
          }),
          apiRequestPaginated<ServiceBasic>('/services', {
            auth: false,
            query: { page: 1, page_size: 100 },
          }),
          apiRequestPaginated<CategoryBasic>('/categories', {
            auth: false,
            query: { page: 1, page_size: 100 },
          }),
        ]);

      const enquiries = enquiriesRes.status === 'fulfilled' ? enquiriesRes.value.items : [];
      const bookings = bookingsRes.status === 'fulfilled' ? bookingsRes.value.items : [];
      const users = usersRes.status === 'fulfilled' ? usersRes.value.items : [];
      const vendors = vendorsRes.status === 'fulfilled' ? vendorsRes.value.items : [];
      const services = servicesRes.status === 'fulfilled' ? servicesRes.value.items : [];
      const categories = categoriesRes.status === 'fulfilled' ? categoriesRes.value.items : [];

      const usersById = new Map(users.map(u => [u.id, u]));
      const vendorsById = new Map(vendors.map(v => [v.id, v]));
      const servicesById = new Map(services.map(s => [s.id, s]));
      const categoriesById = new Map(categories.map(c => [c.id, c]));

      return [
        ...bookings.map(b => mapApiBooking(b, usersById, vendorsById)),
        ...enquiries.map(e =>
          mapEnquiryToBooking(e, usersById, vendorsById, servicesById, categoriesById),
        ),
      ];
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
