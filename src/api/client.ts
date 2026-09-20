import { ENV } from '@/config/env';

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
type TokenProvider = () => Promise<string | null>;

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  query?: Record<string, QueryValue>;
  body?: unknown;
  formData?: FormData;
  auth?: boolean;
  signal?: AbortSignal;
}

interface ApiEnvelope<T> {
  data: T;
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
  error?: {
    code?: string;
    message?: string;
    details?: Record<string, unknown>;
  };
}

let tokenProvider: TokenProvider = async () => null;

export const setAuthTokenProvider = (provider: TokenProvider) => {
  tokenProvider = provider;
};

const buildUrl = (path: string, query?: Record<string, QueryValue>) => {
  const base = ENV.apiBaseUrl.replace(/\/$/, '');
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  if (!query) return url;
  const parts = Object.entries(query)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    );
  return parts.length ? `${url}?${parts.join('&')}` : url;
};

const parseBody = async (response: Response): Promise<unknown> => {
  const body = await response.text();
  if (!body) return null;
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
};

const toApiError = (payload: unknown, status: number): ApiError => {
  if (payload && typeof payload === 'object') {
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

const execute = async (
  path: string,
  options: RequestOptions,
): Promise<Response> => {
  const headers: Record<string, string> = {};
  if (options.formData === undefined && options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (options.auth !== false) {
    const token = await tokenProvider();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

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
  let response: Response;
  try {
    response = await execute(path, options);
  } catch (error) {
    const aborted = error instanceof Error && error.name === 'AbortError';
    throw new ApiError(
      aborted ? 'Request timed out' : 'Network unavailable',
      aborted ? 'TIMEOUT' : 'NETWORK_ERROR',
    );
  }
  const payload = await parseBody(response);
  if (!response.ok) throw toApiError(payload, response.status);
  if (payload && typeof payload === 'object' && 'items' in payload)
    return payload as T;
  return ((payload as ApiEnvelope<T>)?.data ?? payload) as T;
};

export const apiRequestPaginated = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<PaginatedEnvelope<T>> => {
  const response = await execute(path, options);
  const payload = await parseBody(response);
  if (!response.ok) throw toApiError(payload, response.status);
  if (payload && typeof payload === 'object') {
    const root = payload as Record<string, unknown>;
    if (root.data && typeof root.data === 'object' && 'items' in root.data) {
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
