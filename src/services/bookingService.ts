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
  quotation_id: string | null;
  service_id?: string | null;
  package_id?: string | null;
  pricing_mode?: string;
  client_id: string;
  vendor_id: string;
  booking_date: string;
  total_amount: string | number;
  commission_amount?: string | number | null;
  advance_amount?: string | number | null;
  addon_selections?: {
    addon_id: string;
    name: string;
    unit_price: string;
    quantity: number;
  }[];
  status: string;
  created_at: string;
  /** Server-side enrichment: what was booked, plus the parties where the API reveals them. */
  item_title?: string | null;
  counterparty_name?: string | null;
  counterparty_phone?: string | null;
  vendor_name?: string | null;
  vendor_phone?: string | null;
  client_name?: string | null;
  client_email?: string | null;
  client_phone?: string | null;
}

const mapPricingMode = (mode?: string): Booking['pricingMode'] => {
  if (mode === 'DIRECT_SERVICE') return 'direct_service';
  if (mode === 'DIRECT_PACKAGE') return 'direct_package';
  return 'quotation';
};

const mapBookingStatus = (status: string): Booking['status'] => {
  switch (status) {
    case 'PENDING_VENDOR_ACCEPTANCE':
      return 'pending_vendor_acceptance';
    case 'PENDING_PAYMENT':
      return 'payment_pending';
    case 'CONFIRMED':
      return 'confirmed';
    case 'IN_PROGRESS':
      return 'in_progress';
    case 'COMPLETED':
      return 'completed';
    case 'REJECTED':
      return 'rejected';
    case 'CANCELLED':
      return 'cancelled';
    default:
      return 'requested';
  }
};

/** Statuses for which the API will reveal the customer's contact details to the vendor. */
const CONTACT_VISIBLE_STATUSES = new Set<Booking['status']>([
  'confirmed',
  'in_progress',
  'completed',
]);

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

const parseRequirements = (
  req: string | null,
): { serviceName?: string; preferredVendorId?: string } => {
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
  const { serviceName: parsedServiceName, preferredVendorId } =
    parseRequirements(enquiry.requirements);
  const matchedService = preferredVendorId
    ? servicesById?.get(preferredVendorId)
    : undefined;
  const serviceName =
    matchedService?.title || parsedServiceName || enquiry.event_type;
  const categoryId = matchedService?.category_id;
  const serviceCategory = categoryId
    ? categoriesById?.get(categoryId)?.name
    : enquiry.event_type;

  const user = usersById?.get(enquiry.client_id);
  const vendor =
    preferredVendorId && matchedService?.vendor_id
      ? vendorsById?.get(matchedService.vendor_id)
      : undefined;

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
    status: mapBookingStatus(booking.status),
    createdAt: booking.created_at,
    customerName: booking.client_name ?? user?.full_name,
    customerEmail: booking.client_email ?? user?.email,
    customerPhone: booking.client_phone ?? user?.phone ?? undefined,
    vendorPhone: booking.vendor_phone ?? undefined,
    serviceName: booking.item_title ?? undefined,
    counterpartyName: booking.counterparty_name ?? undefined,
    counterpartyPhone: booking.counterparty_phone ?? undefined,
    vendorName: booking.vendor_name ?? vendor?.business_name,
    vendorBusinessName: booking.vendor_name ?? vendor?.business_name,
    totalAmount: booking.total_amount,
    pricingMode: mapPricingMode(booking.pricing_mode),
    serviceId: booking.service_id ?? null,
    packageId: booking.package_id ?? null,
    commissionAmount: booking.commission_amount ?? null,
    advanceAmount: booking.advance_amount ?? null,
    addonSelections: booking.addon_selections ?? [],
  };
};

/** Package names for any direct-package bookings in the list, looked up once each. */
const resolvePackageNames = async (
  bookings: ApiBooking[],
): Promise<Map<string, string>> => {
  const ids = [
    ...new Set(
      bookings
        .map(booking => booking.package_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];
  const names = new Map<string, string>();
  await Promise.all(
    ids.map(async id => {
      try {
        const pkg = await apiRequest<{ name: string }>(`/packages/${id}`, {
          auth: false,
        });
        names.set(id, pkg.name);
      } catch {
        // A delisted package just keeps its generic label.
      }
    }),
  );
  return names;
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
      const [enquiriesRes, bookingsRes, servicesRes, categoriesRes] =
        await Promise.allSettled([
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

      const enquiries =
        enquiriesRes.status === 'fulfilled' ? enquiriesRes.value.items : [];
      const bookings =
        bookingsRes.status === 'fulfilled' ? bookingsRes.value.items : [];
      const services =
        servicesRes.status === 'fulfilled' ? servicesRes.value.items : [];
      const categories =
        categoriesRes.status === 'fulfilled' ? categoriesRes.value.items : [];

      const servicesById = new Map(services.map(s => [s.id, s]));
      const categoriesById = new Map(categories.map(c => [c.id, c]));

      // `/bookings` returns ids only, so what was booked is resolved from the public
      // catalogue — otherwise every row reads "Service booking".
      const packageNames = await resolvePackageNames(bookings);

      return [
        ...bookings.map(b => {
          const mapped = mapApiBooking(b);
          const service = b.service_id ? servicesById.get(b.service_id) : null;
          const category = service
            ? categoriesById.get(service.category_id)
            : null;
          return {
            ...mapped,
            serviceName:
              service?.title ??
              (b.package_id ? packageNames.get(b.package_id) : undefined) ??
              mapped.serviceName,
            serviceCategory: category?.name ?? mapped.serviceCategory,
          };
        }),
        ...enquiries.map(e =>
          mapEnquiryToBooking(
            e,
            undefined,
            undefined,
            servicesById,
            categoriesById,
          ),
        ),
      ];
    });
  },

  /**
   * The signed-in vendor's booking queue. `/bookings` is already role-scoped, so the vendor
   * id is only used to resolve what was booked — the API returns ids, and the vendor's own
   * catalogue supplies the titles.
   */
  async getVendorBookings(
    vendorId: string,
  ): Promise<ServiceResponse<Booking[]>> {
    return wrap(async () => {
      const [bookingsRes, servicesRes, packagesRes] = await Promise.allSettled([
        apiRequestPaginated<ApiBooking>('/bookings', {
          query: { page: 1, page_size: 50 },
        }),
        apiRequestPaginated<ServiceBasic>(`/vendors/${vendorId}/services`, {
          query: { page: 1, page_size: 100 },
        }),
        apiRequest<{ id: string; name: string }[]>(
          `/vendors/${vendorId}/packages`,
        ),
      ]);

      if (bookingsRes.status !== 'fulfilled') {
        throw bookingsRes.reason;
      }

      const titleById = new Map<string, string>();
      if (servicesRes.status === 'fulfilled') {
        for (const service of servicesRes.value.items) {
          titleById.set(service.id, service.title);
        }
      }
      if (packagesRes.status === 'fulfilled') {
        for (const pkg of packagesRes.value) {
          titleById.set(pkg.id, pkg.name);
        }
      }

      return Promise.all(
        bookingsRes.value.items.map(async item => {
          const mapped = mapApiBooking(item);
          const itemId = item.service_id ?? item.package_id ?? null;
          // The API only reveals the customer once the booking is confirmed; before that
          // the vendor sees the request without contact details, by design.
          const contact = CONTACT_VISIBLE_STATUSES.has(mapped.status)
            ? await bookingService.getContact(item.id)
            : null;
          return {
            ...mapped,
            serviceName:
              mapped.serviceName ??
              (itemId ? titleById.get(itemId) : undefined),
            customerName: contact?.data?.name ?? mapped.customerName,
            customerPhone:
              contact?.data?.mobile_number ?? mapped.customerPhone ?? undefined,
          };
        }),
      );
    });
  },

  /**
   * Admin booking queue. The API resolves the vendor, customer, and booked item, and does
   * the `vendor_id` / `q` filtering, so one search box covers vendors and bookings alike.
   */
  async getAdminBookings(
    filters: {
      q?: string;
      vendorId?: string;
    } = {},
  ): Promise<ServiceResponse<Booking[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiBooking>('/admin/bookings', {
        query: {
          page: 1,
          page_size: 100,
          q: filters.q,
          vendor_id: filters.vendorId,
        },
      });
      return page.items.map(item => mapApiBooking(item));
    });
  },

  async getAllBookings(): Promise<ServiceResponse<Booking[]>> {
    return wrap(async () => {
      const [
        enquiriesRes,
        bookingsRes,
        usersRes,
        vendorsRes,
        servicesRes,
        categoriesRes,
      ] = await Promise.allSettled([
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

      const enquiries =
        enquiriesRes.status === 'fulfilled' ? enquiriesRes.value.items : [];
      const bookings =
        bookingsRes.status === 'fulfilled' ? bookingsRes.value.items : [];
      const users = usersRes.status === 'fulfilled' ? usersRes.value.items : [];
      const vendors =
        vendorsRes.status === 'fulfilled' ? vendorsRes.value.items : [];
      const services =
        servicesRes.status === 'fulfilled' ? servicesRes.value.items : [];
      const categories =
        categoriesRes.status === 'fulfilled' ? categoriesRes.value.items : [];

      const usersById = new Map(users.map(u => [u.id, u]));
      const vendorsById = new Map(vendors.map(v => [v.id, v]));
      const servicesById = new Map(services.map(s => [s.id, s]));
      const categoriesById = new Map(categories.map(c => [c.id, c]));

      return [
        ...bookings.map(b => mapApiBooking(b, usersById, vendorsById)),
        ...enquiries.map(e =>
          mapEnquiryToBooking(
            e,
            usersById,
            vendorsById,
            servicesById,
            categoriesById,
          ),
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

  /** Direct "Book Now" flow for a published Service or Package — fixed, backend-computed price. */
  async createDirectBooking(payload: {
    service_id?: string;
    package_id?: string;
    booking_date: string;
    addons?: { addon_id: string; quantity: number }[];
  }): Promise<ServiceResponse<Booking>> {
    return wrap(async () => {
      const booking = await apiRequest<ApiBooking>('/bookings/direct', {
        method: 'POST',
        body: payload,
      });
      return mapApiBooking(booking);
    });
  },

  async vendorAccept(bookingId: string): Promise<ServiceResponse<Booking>> {
    return wrap(async () => {
      const booking = await apiRequest<ApiBooking>(
        `/bookings/${bookingId}/accept`,
        { method: 'POST' },
      );
      return mapApiBooking(booking);
    });
  },

  async vendorReject(
    bookingId: string,
    reason: string,
  ): Promise<ServiceResponse<Booking>> {
    return wrap(async () => {
      const booking = await apiRequest<ApiBooking>(
        `/bookings/${bookingId}/reject`,
        { method: 'POST', body: { reason } },
      );
      return mapApiBooking(booking);
    });
  },

  async getContact(
    bookingId: string,
  ): Promise<ServiceResponse<{ name: string; mobile_number: string | null }>> {
    return wrap(() =>
      apiRequest<{ name: string; mobile_number: string | null }>(
        `/bookings/${bookingId}/contact`,
      ),
    );
  },
};
