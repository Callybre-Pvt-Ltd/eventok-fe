import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { ServiceResponse, Session, User, UserRole } from '@/types';

type BackendRole = 'CLIENT' | 'VENDOR' | 'ADMIN';

interface BackendUser {
  id: string;
  email: string;
  phone: string;
  full_name: string;
  role: BackendRole;
  status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';
  created_at: string;
}

const toFeRole = (role: BackendRole): UserRole => {
  if (role === 'VENDOR') return 'vendor';
  if (role === 'ADMIN') return 'admin';
  return 'customer';
};

const toBackendRole = (role: UserRole): 'CLIENT' | 'VENDOR' =>
  role === 'vendor' ? 'VENDOR' : 'CLIENT';

const mapUser = (raw: BackendUser, extras?: Partial<User>): User => ({
  id: raw.id,
  email: raw.email,
  name: raw.full_name,
  phone: raw.phone,
  role: toFeRole(raw.role),
  city: extras?.city ?? '',
  vendorStatus: extras?.vendorStatus,
  vendorId: extras?.vendorId,
  createdAt: raw.created_at,
});

const wrap = async <T>(fn: () => Promise<T>): Promise<ServiceResponse<T>> => {
  try {
    return { data: await fn(), error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof ApiError ? error.message : 'Request failed',
    };
  }
};

const SESSION_META_KEY = 'eventok_session_meta';

const loadMeta = (): Partial<User> => {
  try {
    return JSON.parse(
      localStorage.getItem(SESSION_META_KEY) ?? '{}',
    ) as Partial<User>;
  } catch {
    return {};
  }
};

const saveMeta = (meta: Partial<User>) => {
  localStorage.setItem(SESSION_META_KEY, JSON.stringify(meta));
};

const mapVendorStatus = (status: string): User['vendorStatus'] => {
  if (status === 'APPROVED') return 'approved';
  if (status === 'REJECTED') return 'rejected';
  return 'pending';
};

const ensureVendorProfile = async (input: {
  businessName: string;
  city?: string;
}): Promise<{ id: string; status: string }> => {
  try {
    return await apiRequest<{ id: string; status: string }>('/vendors/me');
  } catch {
    return apiRequest<{ id: string; status: string }>('/vendors', {
      method: 'POST',
      body: {
        business_name: input.businessName || 'EventOK Vendor',
        city: input.city || null,
        description: null,
      },
    });
  }
};

const fetchMe = async (): Promise<User> => {
  const raw = await apiRequest<BackendUser>('/auth/me');
  const meta = loadMeta();
  let vendorStatus = meta.vendorStatus;
  let vendorId = meta.vendorId;
  if (raw.role === 'VENDOR') {
    try {
      let vendor: { id: string; status: string };
      try {
        vendor = await apiRequest<{ id: string; status: string }>(
          '/vendors/me',
        );
      } catch {
        vendor = await ensureVendorProfile({
          businessName: raw.full_name,
          city: meta.city,
        });
      }
      vendorId = vendor.id;
      vendorStatus = mapVendorStatus(vendor.status);
      saveMeta({ ...meta, vendorStatus, vendorId, city: meta.city });
    } catch {
      vendorStatus ??= 'pending';
    }
  }
  return mapUser(raw, { ...meta, vendorStatus, vendorId });
};

export const authService = {
  async getSession(): Promise<Session> {
    return { user: await fetchMe() };
  },

  async onboard(payload: {
    fullName: string;
    phone: string;
    role: UserRole;
    city?: string;
  }): Promise<Session> {
    if (payload.role === 'admin') {
      throw new ApiError('Cannot self-provision an Admin', 'FORBIDDEN', 403);
    }
    const raw = await apiRequest<BackendUser>('/auth/onboarding', {
      method: 'PUT',
      body: {
        full_name: payload.fullName,
        phone: payload.phone,
        role: toBackendRole(payload.role),
      },
    });

    let vendorStatus: User['vendorStatus'];
    let vendorId: string | undefined;
    if (payload.role === 'vendor') {
      const vendor = await ensureVendorProfile({
        businessName: payload.fullName,
        city: payload.city,
      });
      vendorId = vendor.id;
      vendorStatus = mapVendorStatus(vendor.status);
    }

    saveMeta({
      city: payload.city ?? '',
      vendorStatus,
      vendorId,
    });
    return { user: mapUser(raw, loadMeta()) };
  },

  clearLocalState(): void {
    localStorage.removeItem(SESSION_META_KEY);
  },

  async updateMe(payload: {
    full_name?: string;
    phone?: string;
  }): Promise<ServiceResponse<User>> {
    return wrap(async () => {
      const raw = await apiRequest<BackendUser>('/users/me', {
        method: 'PATCH',
        body: payload,
      });
      return mapUser(raw, loadMeta());
    });
  },

  async listUsers(role?: BackendRole): Promise<ServiceResponse<User[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<BackendUser>('/admin/users', {
        query: { page: 1, page_size: 100, ...(role ? { role } : null) },
      });
      return page.items.map(user => mapUser(user));
    });
  },

  getUsers(): User[] {
    return [];
  },
};
