import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { Category, Review, ServiceResponse } from '@/types';

interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  is_active: boolean;
  created_at: string;
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

export const categoryService = {
  async getAll(): Promise<ServiceResponse<Category[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiCategory>('/categories', {
        auth: false,
        query: { page: 1, page_size: 100 },
      });
      return page.items.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        icon: c.icon ?? 'sparkles',
        description: '',
      }));
    });
  },

  async create(
    payload: Omit<Category, 'id'>,
  ): Promise<ServiceResponse<Category>> {
    return wrap(async () => {
      const created = await apiRequest<ApiCategory>('/admin/categories', {
        method: 'POST',
        body: { name: payload.name, icon: payload.icon ?? null },
      });
      return {
        id: created.id,
        name: created.name,
        slug: created.slug,
        icon: created.icon ?? 'sparkles',
        description: '',
      };
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
