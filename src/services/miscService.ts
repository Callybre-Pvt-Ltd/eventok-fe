import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { Category, Review, ServiceResponse } from '@/types';

interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  service_count?: number;
}

interface DashboardStats {
  total_users: Record<string, number>;
  total_vendors: Record<string, number>;
  pending_vendor_verifications: number;
  total_bookings: Record<string, number>;
  bookings_this_month: number;
  pending_payouts: number;
  open_enquiries: number;
  pending_reviews: number;
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

const mapCategory = (c: ApiCategory): Category => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  icon: c.icon ?? 'sparkles',
  description: '',
  isActive: c.is_active !== false,
  serviceCount: c.service_count ?? 0,
});

/** The catalogue is small but can exceed the API's default page; ask for the whole thing. */
const CATEGORY_PAGE_SIZE = 100;

export const categoryService = {
  async getAll(): Promise<ServiceResponse<Category[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiCategory>('/categories', {
        auth: false,
        query: { page: 1, page_size: CATEGORY_PAGE_SIZE },
      });
      return (page.items ?? [])
        .filter(c => c.is_active !== false)
        .map(mapCategory);
    });
  },

  /** Admin view: every category, deactivated ones included. */
  async listForAdmin(): Promise<ServiceResponse<Category[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiCategory>('/categories', {
        query: {
          page: 1,
          page_size: CATEGORY_PAGE_SIZE,
          include_inactive: true,
        },
      });
      return (page.items ?? []).map(mapCategory);
    });
  },

  /** Slug is derived server-side from the name, so it is never sent. */
  async create(payload: {
    name: string;
    icon?: string | null;
  }): Promise<ServiceResponse<Category>> {
    return wrap(async () => {
      const created = await apiRequest<ApiCategory>('/admin/categories', {
        method: 'POST',
        body: { name: payload.name, icon: payload.icon || null },
      });
      return mapCategory(created);
    });
  },

  async update(
    id: string,
    payload: { name?: string; icon?: string | null; isActive?: boolean },
  ): Promise<ServiceResponse<Category>> {
    return wrap(async () => {
      const updated = await apiRequest<ApiCategory>(`/admin/categories/${id}`, {
        method: 'PATCH',
        body: {
          ...(payload.name !== undefined ? { name: payload.name } : null),
          ...(payload.icon !== undefined
            ? { icon: payload.icon || null }
            : null),
          ...(payload.isActive !== undefined
            ? { is_active: payload.isActive }
            : null),
        },
      });
      return mapCategory(updated);
    });
  },

  async remove(id: string): Promise<ServiceResponse<null>> {
    return wrap(async () => {
      await apiRequest(`/admin/categories/${id}`, { method: 'DELETE' });
      return null;
    });
  },
};

export const reviewService = {
  async getByVendor(_vendorId: string): Promise<ServiceResponse<Review[]>> {
    return { data: [], error: null };
  },

  async getFeatured(): Promise<ServiceResponse<Review[]>> {
    return { data: [], error: null };
  },
};

export const analyticsService = {
  async getDashboardStats(): Promise<
    ServiceResponse<{
      totalVendors: number;
      pendingApprovals: number;
      totalBookings: number;
      totalRevenue: number;
      totalCustomers: number;
      openEnquiries: number;
      bookingsThisMonth: number;
      raw: DashboardStats;
    }>
  > {
    return wrap(async () => {
      const raw = await apiRequest<DashboardStats>('/admin/dashboard');
      const vendors = raw.total_vendors ?? {};
      const users = raw.total_users ?? {};
      const bookings = raw.total_bookings ?? {};
      return {
        totalVendors: Object.values(vendors).reduce((a, b) => a + b, 0),
        pendingApprovals: raw.pending_vendor_verifications,
        totalBookings: Object.values(bookings).reduce((a, b) => a + b, 0),
        totalRevenue: 0,
        totalCustomers: users.CLIENT ?? users.client ?? 0,
        openEnquiries: raw.open_enquiries,
        bookingsThisMonth: raw.bookings_this_month,
        raw,
      };
    });
  },

  async getAnalytics(fromDate: string, toDate: string) {
    return wrap(() =>
      apiRequest('/admin/analytics', {
        query: { from_date: fromDate, to_date: toDate },
      }),
    );
  },
};
