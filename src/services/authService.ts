import { peekAuthIntent } from '@/utils/auth/post-auth';
import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { ServiceResponse, Session, User, UserRole } from '@/types';

type BackendRole = 'CLIENT' | 'VENDOR' | 'ADMIN' | 'SUPER_ADMIN';

interface BackendUser {
  id: string;
  email: string;
  phone: string | null;
  full_name: string;
  role: BackendRole;
  status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';
  created_at: string;
  vendor_id?: string | null;
  vendor_status?: string | null;
}

const toFeRole = (role: BackendRole): UserRole => {
  if (role === 'SUPER_ADMIN') return 'super_admin';
  if (role === 'ADMIN') return 'admin';
  if (role === 'VENDOR') return 'vendor';
  return 'customer';
};

const toBeRole = (role: UserRole): BackendRole => {
  if (role === 'super_admin') return 'SUPER_ADMIN';
  if (role === 'admin') return 'ADMIN';
  if (role === 'vendor') return 'VENDOR';
  return 'CLIENT';
};

const mapUser = (raw: BackendUser, extras?: Partial<User>): User => ({
  id: raw.id,
  email: raw.email,
  name: raw.full_name,
  phone: raw.phone ?? '',
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
  } catch (error) {
    // Only a missing profile may be created; a timeout must not POST a duplicate.
    if (!(error instanceof ApiError && error.status === 404)) throw error;
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
  // `/auth/me` creates the profile on first access, so the sign-up intent has to ride
  // along — otherwise a brand-new vendor would be provisioned as a CLIENT.
  const raw = await apiRequest<BackendUser>('/auth/me', {
    query: { role: peekAuthIntent() === 'vendor' ? 'VENDOR' : 'CLIENT' },
  });
  const meta = loadMeta();
  let vendorStatus = meta.vendorStatus;
  let vendorId = meta.vendorId;

  if (raw.vendor_id) {
    vendorId = raw.vendor_id;
    vendorStatus = mapVendorStatus(raw.vendor_status ?? 'PENDING');
    saveMeta({ ...meta, vendorStatus, vendorId, city: meta.city });
  } else if (raw.role === 'VENDOR') {
    try {
      const vendor = await ensureVendorProfile({
        businessName: raw.full_name,
        city: meta.city,
      });
      vendorId = vendor.id;
      vendorStatus = mapVendorStatus(vendor.status);
      saveMeta({ ...meta, vendorStatus, vendorId, city: meta.city });
    } catch {
      vendorStatus ??= 'pending';
    }
  } else if (
    (raw.role === 'ADMIN' || raw.role === 'SUPER_ADMIN') &&
    vendorId &&
    !vendorStatus
  ) {
    try {
      const vendor = await apiRequest<{ id: string; status: string }>(
        '/vendors/me',
      );
      vendorId = vendor.id;
      vendorStatus = mapVendorStatus(vendor.status);
      saveMeta({ ...meta, vendorStatus, vendorId, city: meta.city });
    } catch {
      // Not a vendor or not found
    }
  }

  return mapUser(raw, { ...meta, vendorStatus, vendorId });
};

export const authService = {
  async getSession(): Promise<Session> {
    return { user: await fetchMe() };
  },

  /** Creates (or re-links) the EventOK profile; every detail is optional. */
  async onboard(
    payload: {
      fullName?: string;
      phone?: string;
      city?: string;
    } = {},
  ): Promise<Session> {
    const raw = await apiRequest<BackendUser>('/auth/onboarding', {
      method: 'PUT',
      body: {
        full_name: payload.fullName || null,
        phone: payload.phone || null,
      },
    });

    let vendorStatus: User['vendorStatus'];
    let vendorId: string | undefined;

    if (raw.vendor_id) {
      vendorId = raw.vendor_id;
      vendorStatus = mapVendorStatus(raw.vendor_status ?? 'PENDING');
    } else if (raw.role === 'VENDOR') {
      const vendor = await ensureVendorProfile({
        businessName: raw.full_name,
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

  async listUsers(role?: UserRole): Promise<ServiceResponse<User[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<BackendUser>('/admin/users', {
        query: {
          page: 1,
          page_size: 100,
          ...(role ? { role: toBeRole(role) } : null),
        },
      });
      return page.items.map(user => mapUser(user));
    });
  },

  async listSuperAdmins(): Promise<ServiceResponse<User[]>> {
    return wrap(async () => {
      const items = await apiRequest<BackendUser[]>('/admin/super-admins');
      return items.map(user => mapUser(user));
    });
  },

  async promoteToSuperAdmin(userId: string): Promise<ServiceResponse<User>> {
    return wrap(async () => {
      const raw = await apiRequest<BackendUser>(
        `/admin/super-admins/${userId}/promote`,
        {
          method: 'POST',
        },
      );
      return mapUser(raw);
    });
  },

  async demoteSuperAdmin(userId: string): Promise<ServiceResponse<User>> {
    return wrap(async () => {
      const raw = await apiRequest<BackendUser>(
        `/admin/super-admins/${userId}/demote`,
        {
          method: 'POST',
        },
      );
      return mapUser(raw);
    });
  },

  async updateUserRole(
    userId: string,
    role: UserRole,
  ): Promise<ServiceResponse<User>> {
    return wrap(async () => {
      const raw = await apiRequest<BackendUser>(`/admin/users/${userId}`, {
        method: 'PATCH',
        body: { role: toBeRole(role) },
      });
      return mapUser(raw);
    });
  },

  getUsers(): User[] {
    return [];
  },
};
