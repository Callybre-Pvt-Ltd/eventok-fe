import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import { tokenStore } from '@/api/tokens';
import type { Session, User, UserRole, ServiceResponse } from '@/types';

type BackendRole = 'CLIENT' | 'VENDOR' | 'ADMIN' | 'FINANCE' | 'SUPPORT';

interface BackendUser {
  id: string;
  email: string;
  phone: string;
  full_name: string | null;
  role: BackendRole;
  status: string;
  is_email_verified: boolean;
  created_at: string;
}

interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

const toFeRole = (role: BackendRole): UserRole => {
  if (role === 'VENDOR') return 'vendor';
  if (role === 'ADMIN' || role === 'FINANCE' || role === 'SUPPORT')
    return 'admin';
  return 'customer';
};

const toBackendRole = (role: UserRole): 'CLIENT' | 'VENDOR' =>
  role === 'vendor' ? 'VENDOR' : 'CLIENT';

const mapUser = (raw: BackendUser, extras?: Partial<User>): User => ({
  id: raw.id,
  email: raw.email,
  name: raw.full_name?.trim() || raw.email.split('@')[0],
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
    const message =
      error instanceof ApiError ? error.message : 'Request failed';
    return { data: null, error: message };
  }
};

const SESSION_META_KEY = 'eventok_session_meta';

const saveMeta = (meta: {
  city?: string;
  vendorStatus?: string;
  vendorId?: string;
}) => {
  localStorage.setItem(SESSION_META_KEY, JSON.stringify(meta));
};

const loadMeta = (): {
  city?: string;
  vendorStatus?: User['vendorStatus'];
  vendorId?: string;
} => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_META_KEY) ?? '{}') as {
      city?: string;
      vendorStatus?: User['vendorStatus'];
      vendorId?: string;
    };
  } catch {
    return {};
  }
};

const fetchMe = async (): Promise<User> => {
  const raw = await apiRequest<BackendUser>('/auth/me');
  const meta = loadMeta();
  let vendorStatus = meta.vendorStatus;
  let vendorId = meta.vendorId;

  if (toFeRole(raw.role) === 'vendor') {
    try {
      const vendor = await apiRequest<{
        id: string;
        status: string;
      }>('/vendors/me');
      vendorId = vendor.id;
      vendorStatus =
        vendor.status === 'APPROVED'
          ? 'approved'
          : vendor.status === 'REJECTED'
          ? 'rejected'
          : 'pending';
      saveMeta({ city: meta.city, vendorStatus, vendorId });
    } catch {
      vendorStatus = vendorStatus ?? 'pending';
    }
  }

  return mapUser(raw, { city: meta.city, vendorStatus, vendorId });
};

export const authService = {
  async login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<Session>> {
    return wrap(async () => {
      const tokens = await apiRequest<TokenPair>('/auth/login', {
        method: 'POST',
        auth: false,
        body: { email, password },
      });
      tokenStore.set(tokens.access_token, tokens.refresh_token);
      const user = await fetchMe();
      return {
        user,
        token: tokens.access_token,
        refreshToken: tokens.refresh_token,
      };
    });
  },

  async register(payload: {
    email: string;
    password: string;
    name: string;
    city: string;
    phone?: string;
    role: UserRole;
  }): Promise<ServiceResponse<Session>> {
    return wrap(async () => {
      if (payload.role === 'admin') {
        throw new ApiError('Cannot register as admin', 'FORBIDDEN', 403);
      }
      const phone =
        payload.phone?.trim() || `+91${String(Date.now()).slice(-10)}`;
      await apiRequest<BackendUser>('/auth/register', {
        method: 'POST',
        auth: false,
        body: {
          email: payload.email,
          phone,
          password: payload.password,
          role: toBackendRole(payload.role),
        },
      });

      const tokens = await apiRequest<TokenPair>('/auth/login', {
        method: 'POST',
        auth: false,
        body: { email: payload.email, password: payload.password },
      });
      tokenStore.set(tokens.access_token, tokens.refresh_token);

      try {
        await apiRequest('/users/me', {
          method: 'PATCH',
          body: { full_name: payload.name },
        });
      } catch {
        // non-fatal
      }

      saveMeta({
        city: payload.city,
        vendorStatus: payload.role === 'vendor' ? 'pending' : undefined,
      });

      if (payload.role === 'vendor') {
        try {
          const vendor = await apiRequest<{ id: string; status: string }>(
            '/vendors',
            {
              method: 'POST',
              body: {
                business_name: payload.name || payload.email.split('@')[0],
                city: payload.city || null,
                description: null,
              },
            },
          );
          saveMeta({
            city: payload.city,
            vendorStatus: vendor.status === 'APPROVED' ? 'approved' : 'pending',
            vendorId: vendor.id,
          });
        } catch {
          // vendor profile may already exist
        }
      }

      const user = await fetchMe();
      return {
        user,
        token: tokens.access_token,
        refreshToken: tokens.refresh_token,
      };
    });
  },

  async getSession(): Promise<ServiceResponse<Session>> {
    return wrap(async () => {
      if (!tokenStore.getAccess() && !tokenStore.getRefresh()) {
        throw new ApiError('No session', 'UNAUTHENTICATED', 401);
      }
      const user = await fetchMe();
      return {
        user,
        token: tokenStore.getAccess() ?? '',
        refreshToken: tokenStore.getRefresh() ?? undefined,
      };
    }).then(res => {
      if (res.error === 'No session' || res.error === 'Session expired') {
        return { data: null, error: null };
      }
      return res;
    });
  },

  async logout(): Promise<void> {
    const refresh = tokenStore.getRefresh();
    try {
      if (refresh) {
        await apiRequest('/auth/logout', {
          method: 'POST',
          body: { refresh_token: refresh },
        });
      }
    } catch {
      // ignore
    } finally {
      tokenStore.clear();
      localStorage.removeItem(SESSION_META_KEY);
    }
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
      const meta = loadMeta();
      return mapUser(raw, {
        city: meta?.city,
        vendorStatus: meta?.vendorStatus,
        vendorId: meta?.vendorId,
      });
    });
  },

  async listUsers(role?: BackendRole): Promise<ServiceResponse<User[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<BackendUser>('/admin/users', {
        query: {
          page: 1,
          page_size: 100,
          ...(role ? { role } : null),
        },
      });
      return page.items.map(u => mapUser(u));
    });
  },

  /** @deprecated Prefer listUsers — sync helper kept for older portal pages */
  getUsers(): User[] {
    return [];
  },
};
