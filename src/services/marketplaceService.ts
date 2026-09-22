import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { ServiceResponse } from '@/types';
import type { DiscoveryVendor } from '@/pages/services/filters';

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  service_count: number;
}

export interface ApiService {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  starting_price: string | number;
  status: string;
  created_at: string;
  vendor_id?: string;
  whats_included?: string[];
  good_to_know?: string[];
  cancellation_policy?: string[];
}

export interface ApiServiceImage {
  id: string;
  service_id: string;
  display_order: number;
  image_url: string;
  created_at: string;
}

export interface ServiceListFilters {
  q?: string;
  category_id?: string;
  vendor_id?: string;
  min_price?: number;
  max_price?: number;
  city?: string;
  sort?: string;
  page?: number;
  page_size?: number;
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

/** Default list page size — keep payloads small for storefront. */
export const DEFAULT_PAGE_SIZE = 20;

const CATEGORIES_TTL_MS = 60_000;
let categoriesCache: { at: number; items: ApiCategory[] } | null = null;
let categoriesInflight: Promise<ApiCategory[]> | null = null;

const initialsOf = (title: string) =>
  title
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('') || 'EO';

export const toDiscoveryCard = (
  service: ApiService,
  category?: Pick<ApiCategory, 'id' | 'name' | 'slug'> | null,
  images: string[] = [],
): DiscoveryVendor => {
  const price = Number(service.starting_price) || 0;
  const categoryName = category?.name;
  return {
    id: service.id,
    displayName: service.title,
    description: service.description ?? '',
    initials: initialsOf(service.title),
    category: categoryName ?? 'Service',
    categorySlug: category?.slug ?? service.category_id,
    city: '',
    state: '',
    country: 'India',
    locationLabel: 'India',
    rating: 0,
    projects: 0,
    bookings: 0,
    views: 0,
    budgetFrom: price,
    years: 0,
    portfolioCount: images.length,
    image: images[0] ?? '',
    images,
    tags: categoryName ? [categoryName] : [],
    eventTypes: [],
    whatsIncluded: service.whats_included ?? [],
    goodToKnow: service.good_to_know ?? [],
    cancellationPolicy: service.cancellation_policy ?? [],
    verified: true,
    featured: false,
    trending: false,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: service.created_at,
    keywords: [service.title, service.description ?? '', categoryName ?? '']
      .join(' ')
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean),
  };
};

async function fetchCategories(): Promise<ApiCategory[]> {
  if (
    categoriesCache &&
    Date.now() - categoriesCache.at < CATEGORIES_TTL_MS
  ) {
    return categoriesCache.items;
  }
  if (categoriesInflight) return categoriesInflight;

  categoriesInflight = (async () => {
    const page = await apiRequestPaginated<ApiCategory>('/categories', {
      auth: false,
      query: { page: 1, page_size: DEFAULT_PAGE_SIZE },
    });
    const items = page.items.filter(c => c.is_active !== false);
    categoriesCache = { at: Date.now(), items };
    return items;
  })().finally(() => {
    categoriesInflight = null;
  });

  return categoriesInflight;
}

export const marketplaceService = {
  async listCategories(): Promise<ServiceResponse<ApiCategory[]>> {
    return wrap(async () => fetchCategories());
  },

  async listServices(
    filters: ServiceListFilters = {},
  ): Promise<
    ServiceResponse<{ items: DiscoveryVendor[]; total: number; pages: number }>
  > {
    return wrap(async () => {
      const categories = await fetchCategories();
      const byId = new Map(categories.map(c => [c.id, c]));

      const page = await apiRequestPaginated<ApiService>('/services', {
        auth: false,
        query: {
          q: filters.q,
          category_id: filters.category_id,
          vendor_id: filters.vendor_id,
          min_price: filters.min_price,
          max_price: filters.max_price,
          city: filters.city,
          sort: filters.sort,
          page: filters.page ?? 1,
          page_size: filters.page_size ?? DEFAULT_PAGE_SIZE,
        },
      });

      const items = await Promise.all(
        page.items.map(async service => {
          const cat = byId.get(service.category_id);
          let images: string[] = [];
          try {
            const imgs = await apiRequest<ApiServiceImage[]>(
              `/services/${service.id}/images`,
              { auth: false },
            );
            images = imgs.map(i => i.image_url);
          } catch {
            images = [];
          }
          return toDiscoveryCard(service, cat ?? null, images);
        }),
      );

      return { items, total: page.total, pages: page.pages };
    });
  },

  async getService(
    id: string,
  ): Promise<ServiceResponse<DiscoveryVendor & { raw: ApiService }>> {
    return wrap(async () => {
      const service = await apiRequest<ApiService>(`/services/${id}`, {
        auth: false,
      });
      const categories = await fetchCategories();
      const cat = categories.find(c => c.id === service.category_id);
      let images: string[] = [];
      try {
        const imgs = await apiRequest<ApiServiceImage[]>(
          `/services/${id}/images`,
          { auth: false },
        );
        images = imgs.map(i => i.image_url);
      } catch {
        images = [];
      }
      return {
        ...toDiscoveryCard(service, cat ?? null, images),
        raw: service,
      };
    });
  },
};
