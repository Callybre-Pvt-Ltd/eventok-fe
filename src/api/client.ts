import { ENV } from '@/config/env';
import { tokenStore } from './tokens';

export class ApiError extends Error {
  code: string;
  status: number;
  details: Record<string, unknown>;

  constructor(
    message: string,
    code = 'UNKNOWN',
    status = 0,
    details: Record<string, unknown> = {},
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

type QueryValue = string | number | boolean | null | undefined;

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  query?: Record<string, QueryValue>;
  body?: unknown;
  formData?: FormData;
  auth?: boolean;
  signal?: AbortSignal;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface PaginatedEnvelope<T> {
  success: boolean;
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

interface ErrorEnvelope {
  success: false;
  error: {
    code?: string;
    message?: string;
    details?: Record<string, unknown>;
  };
}

let refreshPromise: Promise<boolean> | null = null;

const buildUrl = (path: string, query?: Record<string, QueryValue>) => {
  const base = ENV.apiBaseUrl.replace(/\/$/, '');
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  if (!query) return url;
  const parts = Object.entries(query)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    );
  return parts.length ? `${url}?${parts.join('&')}` : url;
};

const parseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const toApiError = (payload: unknown, status: number): ApiError => {
  if (payload && typeof payload === 'object' && 'error' in payload) {
    const error = (payload as ErrorEnvelope).error;
    return new ApiError(
      error?.message ?? 'Request failed',
      error?.code ?? 'UNKNOWN',
      status,
      error?.details ?? {},
    );
  }
  return new ApiError('Request failed', 'UNKNOWN', status);
};

const refreshTokens = async (): Promise<boolean> => {
  const refresh = tokenStore.getRefresh();
  if (!refresh) return false;
  const response = await fetch(buildUrl('/auth/refresh'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refresh }),
  });
  if (!response.ok) {
    tokenStore.clear();
    return false;
  }
  const payload = (await parseBody(response)) as ApiEnvelope<{
    access_token: string;
    refresh_token: string;
  }> | null;
  if (!payload?.data?.access_token || !payload.data.refresh_token) {
    tokenStore.clear();
    return false;
  }
  tokenStore.set(payload.data.access_token, payload.data.refresh_token);
  return true;
};

const ensureRefreshed = () => {
  if (!refreshPromise) {
    refreshPromise = refreshTokens().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

const execute = async (
  path: string,
  options: RequestOptions,
  accessToken: string | null,
): Promise<Response> => {
  const headers: Record<string, string> = {};
  if (options.formData === undefined && options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ENV.requestTimeoutMs);
  try {
    return await fetch(buildUrl(path, options.query), {
      method: options.method ?? 'GET',
      headers,
      body:
        options.formData ??
        (options.body === undefined ? undefined : JSON.stringify(options.body)),
      signal: options.signal ?? controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

export const apiRequest = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> => {
  const withAuth = options.auth !== false;
  let access = withAuth ? tokenStore.getAccess() : null;

  let response: Response;
  try {
    response = await execute(path, options, access);
  } catch (error) {
    const aborted = error instanceof Error && error.name === 'AbortError';
    throw new ApiError(
      aborted ? 'Request timed out' : 'Network unavailable',
      aborted ? 'TIMEOUT' : 'NETWORK_ERROR',
      0,
    );
  }

  if (response.status === 401 && withAuth && tokenStore.getRefresh()) {
    const ok = await ensureRefreshed();
    if (!ok) {
      tokenStore.clear();
      throw new ApiError('Session expired', 'UNAUTHENTICATED', 401);
    }
    access = tokenStore.getAccess();
    response = await execute(path, options, access);
  }

  const payload = await parseBody(response);
  if (!response.ok) {
    if (response.status === 401 && withAuth) tokenStore.clear();
    throw toApiError(payload, response.status);
  }

  if (payload && typeof payload === 'object' && 'items' in payload) {
    return payload as T;
  }
  return ((payload as ApiEnvelope<T>)?.data ?? payload) as T;
};

export const apiRequestPaginated = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<PaginatedEnvelope<T>> => {
  const withAuth = options.auth !== false;
  let access = withAuth ? tokenStore.getAccess() : null;
  let response = await execute(path, options, access);

  if (response.status === 401 && withAuth && tokenStore.getRefresh()) {
    const ok = await ensureRefreshed();
    if (ok) {
      access = tokenStore.getAccess();
      response = await execute(path, options, access);
    }
  }

  const payload = await parseBody(response);
  if (!response.ok) throw toApiError(payload, response.status);

  // Backend wraps pagination: { success, data: { items, total, ... } } OR flat
  if (payload && typeof payload === 'object') {
    const root = payload as Record<string, unknown>;
    if (root.data && typeof root.data === 'object' && 'items' in (root.data as object)) {
      return root.data as PaginatedEnvelope<T>;
    }
    if ('items' in root) return payload as PaginatedEnvelope<T>;
  }
  return {
    success: true,
    items: [],
    total: 0,
    page: 1,
    page_size: 20,
    pages: 0,
  };
};

export type { PaginatedEnvelope };
