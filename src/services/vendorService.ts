import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { PublicVendor, VendorPrivate, ServiceResponse } from '@/types';

interface ApiVendor {
  id: string;
  user_id: string;
  business_name: string;
  description: string | null;
  experience_years: number | null;
  address: string | null;
  city: string | null;
  state: string | null;
  is_verified: boolean;
  status: string;
  created_at: string;
}

interface ApiService {
  id: string;
  vendor_id: string;
  category_id: string;
  title: string;
  description: string | null;
  starting_price: string | number;
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

const mapStatus = (status: string): VendorPrivate['status'] => {
  if (status === 'APPROVED') return 'approved';
  if (status === 'REJECTED') return 'rejected';
  return 'pending';
};

const toPrivate = (v: ApiVendor): VendorPrivate => ({
  id: v.id,
  userId: v.user_id,
  businessName: v.business_name,
  description: v.description ?? '',
  city: v.city ?? '',
  experience: v.experience_years ?? 0,
  categories: [],
  tags: [],
  rating: 0,
  reviewCount: 0,
  featured: false,
  status: mapStatus(v.status),
  phone: '',
  email: '',
  address: v.address ?? '',
  pricing: '',
  portfolio: [],
});

export const vendorService = {
  async getPublicVendors(): Promise<ServiceResponse<PublicVendor[]>> {
    return { data: [], error: null };
  },

  async getFeaturedVendors(): Promise<ServiceResponse<PublicVendor[]>> {
    return { data: [], error: null };
  },

  async getPublicVendorById(
    _id: string,
  ): Promise<ServiceResponse<PublicVendor>> {
    return { data: null, error: 'Vendor profiles are not public' };
  },

  async getAdminVendors(): Promise<ServiceResponse<VendorPrivate[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiVendor>('/admin/vendors', {
        query: { page: 1, page_size: 100 },
      });
      return page.items.map(toPrivate);
    });
  },

  async approveVendor(id: string): Promise<ServiceResponse<VendorPrivate>> {
    return wrap(async () => {
      // Backend: PENDING → UNDER_REVIEW → APPROVED
      const current = await apiRequest<ApiVendor>(`/admin/vendors/${id}`);
      if (current.status === 'PENDING') {
        await apiRequest<ApiVendor>(`/admin/vendors/${id}`, {
          method: 'PATCH',
          body: { status: 'UNDER_REVIEW' },
        });
      }
      const vendor = await apiRequest<ApiVendor>(`/admin/vendors/${id}`, {
        method: 'PATCH',
        body: { status: 'APPROVED' },
      });
      return toPrivate(vendor);
    });
  },

  async rejectVendor(
    id: string,
    _reason: string,
  ): Promise<ServiceResponse<VendorPrivate>> {
    return wrap(async () => {
      const current = await apiRequest<ApiVendor>(`/admin/vendors/${id}`);
      if (current.status === 'PENDING') {
        await apiRequest<ApiVendor>(`/admin/vendors/${id}`, {
          method: 'PATCH',
          body: { status: 'UNDER_REVIEW' },
        });
      }
      const vendor = await apiRequest<ApiVendor>(`/admin/vendors/${id}`, {
        method: 'PATCH',
        body: { status: 'REJECTED' },
      });
      return toPrivate(vendor);
    });
  },

  async getVendorByUserId(
    _userId: string,
  ): Promise<ServiceResponse<VendorPrivate>> {
    return wrap(async () => toPrivate(await apiRequest<ApiVendor>('/vendors/me')));
  },

  async getMe(): Promise<ServiceResponse<VendorPrivate>> {
    return wrap(async () => toPrivate(await apiRequest<ApiVendor>('/vendors/me')));
  },

  async listMyServices(
    vendorId: string,
  ): Promise<ServiceResponse<ApiService[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiService>(
        `/vendors/${vendorId}/services`,
        { query: { page: 1, page_size: 100 } },
      );
      return page.items;
    });
  },

  async createService(
    vendorId: string,
    payload: {
      category_id: string;
      title: string;
      description?: string;
      starting_price: number;
    },
  ): Promise<ServiceResponse<ApiService>> {
    return wrap(() =>
      apiRequest<ApiService>(`/vendors/${vendorId}/services`, {
        method: 'POST',
        body: payload,
      }),
    );
  },

  async updateService(
    serviceId: string,
    payload: {
      title?: string;
      description?: string;
      starting_price?: number;
      status?: string;
      category_id?: string;
    },
  ): Promise<ServiceResponse<ApiService>> {
    return wrap(() =>
      apiRequest<ApiService>(`/services/${serviceId}`, {
        method: 'PATCH',
        body: payload,
      }),
    );
  },

  async deleteService(serviceId: string): Promise<ServiceResponse<null>> {
    return wrap(async () => {
      await apiRequest(`/services/${serviceId}`, { method: 'DELETE' });
      return null;
    });
  },

  async uploadServiceImage(
    serviceId: string,
    file: File,
  ): Promise<ServiceResponse<{ id: string; image_url: string }>> {
    return wrap(async () => {
      const formData = new FormData();
      formData.append('file', file);
      return apiRequest<{ id: string; image_url: string }>(
        `/services/${serviceId}/images`,
        { method: 'POST', formData },
      );
    });
  },

  async updatePortfolio(
    vendorId: string,
    portfolio: VendorPrivate['portfolio'],
  ): Promise<ServiceResponse<VendorPrivate>> {
    return wrap(async () => {
      const vendor = await apiRequest<ApiVendor>(`/vendors/${vendorId}`, {
        method: 'PATCH',
        body: {},
      });
      return { ...toPrivate(vendor), portfolio };
    });
  },

  getAll() {
    return [] as VendorPrivate[];
  },
};

export type { ApiService as VendorApiService, ApiVendor };
