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
  owner_name?: string | null;
  mobile_number?: string | null;
  gstin?: string | null;
  masked_aadhaar?: string | null;
  masked_pan?: string | null;
}

export interface ApiVendorKyc {
  id: string;
  user_id: string;
  business_name: string;
  owner_name: string | null;
  mobile_number: string | null;
  aadhaar_number: string | null;
  pan_number: string | null;
  gstin: string | null;
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
  commission_amount?: string | number;
  customer_price?: string | number;
  status: string;
  created_at: string;
  whats_included?: string[];
  good_to_know?: string[];
  cancellation_policy?: string[];
}

/** `/admin/services` rows carry the vendor behind each listing. */
export interface AdminApiService extends ApiService {
  vendor_name?: string | null;
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
  if (status === 'UNDER_REVIEW') return 'under_review';
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
  ownerName: v.owner_name ?? '',
  mobileNumber: v.mobile_number ?? '',
  gstin: v.gstin ?? '',
  maskedAadhaar: v.masked_aadhaar ?? '',
  maskedPan: v.masked_pan ?? '',
  createdAt: v.created_at,
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
    reason: string,
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
        body: { status: 'REJECTED', reason: reason || undefined },
      });
      return toPrivate(vendor);
    });
  },

  async getVendorKyc(id: string): Promise<ServiceResponse<ApiVendorKyc>> {
    return wrap(() => apiRequest<ApiVendorKyc>(`/admin/vendors/${id}/kyc`));
  },

  async getVendorByUserId(
    _userId: string,
  ): Promise<ServiceResponse<VendorPrivate>> {
    return wrap(async () =>
      toPrivate(await apiRequest<ApiVendor>('/vendors/me')),
    );
  },

  async getMe(): Promise<ServiceResponse<VendorPrivate>> {
    return wrap(async () =>
      toPrivate(await apiRequest<ApiVendor>('/vendors/me')),
    );
  },

  async createProfile(payload: {
    business_name: string;
    description?: string;
    city?: string;
    state?: string;
  }): Promise<ServiceResponse<VendorPrivate>> {
    return wrap(async () =>
      toPrivate(
        await apiRequest<ApiVendor>('/vendors', {
          method: 'POST',
          body: payload,
        }),
      ),
    );
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
      whats_included?: string[];
      good_to_know?: string[];
      cancellation_policy?: string[];
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
      whats_included?: string[];
      good_to_know?: string[];
      cancellation_policy?: string[];
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

  async listServiceImages(
    serviceId: string,
  ): Promise<
    ServiceResponse<{ id: string; image_url: string; display_order: number }[]>
  > {
    return wrap(() =>
      apiRequest<{ id: string; image_url: string; display_order: number }[]>(
        `/services/${serviceId}/images`,
        { auth: true },
      ),
    );
  },

  async reorderServiceImages(
    serviceId: string,
    imageIds: string[],
  ): Promise<
    ServiceResponse<{ id: string; image_url: string; display_order: number }[]>
  > {
    return wrap(() =>
      apiRequest<{ id: string; image_url: string; display_order: number }[]>(
        `/services/${serviceId}/images/order`,
        { method: 'PUT', body: { image_ids: imageIds } },
      ),
    );
  },

  async getService(serviceId: string): Promise<ServiceResponse<ApiService>> {
    return wrap(() => apiRequest<ApiService>(`/services/${serviceId}`));
  },

  async deleteServiceImage(
    serviceId: string,
    imageId: string,
  ): Promise<ServiceResponse<null>> {
    return wrap(async () => {
      await apiRequest(`/services/${serviceId}/images/${imageId}`, {
        method: 'DELETE',
      });
      return null;
    });
  },

  async updateVendor(
    vendorId: string,
    payload: {
      business_name?: string;
      description?: string;
      experience_years?: number;
      address?: string;
      city?: string;
      state?: string;
      owner_name?: string;
      mobile_number?: string;
      aadhaar_number?: string;
      pan_number?: string;
      gstin?: string;
    },
  ): Promise<ServiceResponse<VendorPrivate>> {
    return wrap(async () =>
      toPrivate(
        await apiRequest<ApiVendor>(`/vendors/${vendorId}`, {
          method: 'PATCH',
          body: payload,
        }),
      ),
    );
  },

  async listVerifications(
    vendorId: string,
  ): Promise<ServiceResponse<ApiVendorVerification[]>> {
    return wrap(() =>
      apiRequest<ApiVendorVerification[]>(`/vendors/${vendorId}/verification`),
    );
  },

  async submitVerification(
    vendorId: string,
    documentType:
      | 'ID_PROOF'
      | 'BUSINESS_LICENSE'
      | 'ADDRESS_PROOF'
      | 'GST_CERTIFICATE'
      | 'AADHAAR_FRONT'
      | 'AADHAAR_BACK'
      | 'VENDOR_PROFILE_IMAGE'
      | 'OTHER',
    file: File,
  ): Promise<ServiceResponse<{ id: string; status: string }>> {
    return wrap(async () => {
      const formData = new FormData();
      formData.append('document_type', documentType);
      formData.append('file', file);
      return apiRequest<{ id: string; status: string }>(
        `/vendors/${vendorId}/verification`,
        { method: 'POST', formData },
      );
    });
  },

  async listMyPayouts(): Promise<
    ServiceResponse<
      {
        id: string;
        amount: string | number;
        vendor_amount: string | number;
        status: string;
        created_at: string;
      }[]
    >
  > {
    return wrap(async () => {
      const page = await apiRequestPaginated<{
        id: string;
        amount: string | number;
        vendor_amount: string | number;
        status: string;
        created_at: string;
      }>('/payouts/me', { query: { page: 1, page_size: 100 } });
      return page.items;
    });
  },

  getAll() {
    return [] as VendorPrivate[];
  },

  async listPackages(
    vendorId: string,
    activeOnly = false,
  ): Promise<ServiceResponse<ApiPackage[]>> {
    return wrap(() =>
      apiRequest<ApiPackage[]>(`/vendors/${vendorId}/packages`, {
        query: { active_only: activeOnly },
      }),
    );
  },

  async createPackage(
    vendorId: string,
    payload: {
      name: string;
      description?: string;
      price: number;
      service_ids: string[];
    },
  ): Promise<ServiceResponse<ApiPackage>> {
    return wrap(() =>
      apiRequest<ApiPackage>(`/vendors/${vendorId}/packages`, {
        method: 'POST',
        body: payload,
      }),
    );
  },

  async updatePackage(
    vendorId: string,
    packageId: string,
    payload: Partial<{
      name: string;
      description: string;
      price: number;
      service_ids: string[];
      is_active: boolean;
    }>,
  ): Promise<ServiceResponse<ApiPackage>> {
    return wrap(() =>
      apiRequest<ApiPackage>(`/vendors/${vendorId}/packages/${packageId}`, {
        method: 'PATCH',
        body: payload,
      }),
    );
  },

  async listServiceAddons(
    serviceId: string,
  ): Promise<ServiceResponse<ApiServiceAddon[]>> {
    return wrap(() =>
      apiRequest<ApiServiceAddon[]>(`/services/${serviceId}/addons`, {
        query: { active_only: false },
      }),
    );
  },

  async createServiceAddon(
    serviceId: string,
    payload: { name: string; description?: string; price: number },
  ): Promise<ServiceResponse<ApiServiceAddon>> {
    return wrap(() =>
      apiRequest<ApiServiceAddon>(`/services/${serviceId}/addons`, {
        method: 'POST',
        body: payload,
      }),
    );
  },

  async updateServiceAddon(
    serviceId: string,
    addonId: string,
    payload: Partial<{
      name: string;
      description: string;
      price: number;
      is_active: boolean;
    }>,
  ): Promise<ServiceResponse<ApiServiceAddon>> {
    return wrap(() =>
      apiRequest<ApiServiceAddon>(`/services/${serviceId}/addons/${addonId}`, {
        method: 'PATCH',
        body: payload,
      }),
    );
  },

  async deleteServiceAddon(
    serviceId: string,
    addonId: string,
  ): Promise<ServiceResponse<null>> {
    return wrap(async () => {
      await apiRequest(`/services/${serviceId}/addons/${addonId}`, {
        method: 'DELETE',
      });
      return null;
    });
  },

  async listStates(): Promise<ServiceResponse<ApiState[]>> {
    return wrap(() =>
      apiRequest<ApiState[]>('/locations/states', { auth: false }),
    );
  },

  async listCities(stateId: string): Promise<ServiceResponse<ApiCity[]>> {
    return wrap(() =>
      apiRequest<ApiCity[]>(`/locations/states/${stateId}/cities`, {
        auth: false,
      }),
    );
  },

  async getVendorLocations(
    vendorId: string,
  ): Promise<ServiceResponse<ApiVendorLocation[]>> {
    return wrap(() =>
      apiRequest<ApiVendorLocation[]>(`/vendors/${vendorId}/locations`),
    );
  },

  async replaceVendorLocations(
    vendorId: string,
    cityIds: string[],
  ): Promise<ServiceResponse<ApiVendorLocation[]>> {
    return wrap(() =>
      apiRequest<ApiVendorLocation[]>(`/vendors/${vendorId}/locations`, {
        method: 'PUT',
        body: { city_ids: cityIds },
      }),
    );
  },

  /** Admin catalogue. `q` is matched server-side against service title/description AND the
   *  vendor's business name, so one box searches services and vendors together. */
  async listAdminServices(filters?: {
    status?: string;
    category_id?: string;
    vendor_id?: string;
    q?: string;
    page?: number;
    page_size?: number;
  }): Promise<
    ServiceResponse<{ items: AdminApiService[]; total: number; pages: number }>
  > {
    return wrap(async () => {
      const page = await apiRequestPaginated<AdminApiService>(
        '/admin/services',
        {
          query: {
            page: filters?.page || 1,
            page_size: filters?.page_size || 50,
            status: filters?.status,
            category_id: filters?.category_id,
            vendor_id: filters?.vendor_id,
            q: filters?.q,
          },
        },
      );
      return {
        items: page.items,
        total: page.total,
        pages: page.pages,
      };
    });
  },

  async updateAdminServiceStatus(
    serviceId: string,
    status: string,
    reason?: string,
  ): Promise<ServiceResponse<ApiService>> {
    return wrap(() =>
      apiRequest<ApiService>(`/admin/services/${serviceId}/status`, {
        method: 'PATCH',
        body: { status, reason },
      }),
    );
  },

  async deleteAdminService(serviceId: string): Promise<ServiceResponse<null>> {
    return wrap(() =>
      apiRequest<null>(`/admin/services/${serviceId}`, {
        method: 'DELETE',
      }),
    );
  },

  async listAdminLocations(): Promise<ServiceResponse<ApiStateCoverage[]>> {
    return wrap(() => apiRequest<ApiStateCoverage[]>('/admin/locations'));
  },
};

export interface ApiPackage {
  id: string;
  vendor_id: string;
  name: string;
  description: string | null;
  price: string | number;
  is_active: boolean;
  service_ids: string[];
  individual_total: string | number;
  savings: string | number;
  commission_amount: string | number;
  customer_price: string | number;
  created_at: string;
}

export interface ApiServiceAddon {
  id: string;
  service_id: string;
  name: string;
  description: string | null;
  price: string | number;
  is_active: boolean;
  created_at: string;
}

export interface ApiState {
  id: string;
  name: string;
}

export interface ApiCity {
  id: string;
  state_id: string;
  name: string;
}

export interface ApiVendorLocation {
  city_id: string;
  city_name: string;
  state_id: string;
  state_name: string;
}

export interface ApiVendorVerification {
  id: string;
  vendor_id: string;
  document_type: string;
  file_url: string;
  status: string;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
}

export interface ApiCityCoverage {
  id: string;
  state_id: string;
  name: string;
  vendor_count: number;
}

export interface ApiStateCoverage {
  id: string;
  name: string;
  cities: ApiCityCoverage[];
  total_vendors: number;
}

export type { ApiService as VendorApiService, ApiVendor };
