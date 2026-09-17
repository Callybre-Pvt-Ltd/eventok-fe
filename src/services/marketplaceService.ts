import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { ServiceResponse } from '@/types';
import type { DiscoveryVendor } from '@/pages/services/filters';
import { photography } from '@/design-system/tokens/photography';

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  is_active: boolean;
  created_at: string;
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

const placeholder = photography.hero.wedding;

const initialsOf = (title: string) =>
  title
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('') || 'EO';

export const toDiscoveryCard = (
  service: ApiService,
  categoryName?: string,
  images: string[] = [],
): DiscoveryVendor => {
  const price = Number(service.starting_price) || 0;
  const image = images[0] || placeholder;
  return {
    id: service.id,
    displayName: service.title,
    description: service.description ?? '',
    initials: initialsOf(service.title),
    category: categoryName ?? 'Service',
    categorySlug: service.category_id,
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
    image,
    images: images.length ? images : [image],
    tags: categoryName ? [categoryName] : [],
    eventTypes: [],
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

export const marketplaceService = {
  async listCategories(): Promise<ServiceResponse<ApiCategory[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiCategory>('/categories', {
        auth: false,
        query: { page: 1, page_size: 100 },
      });
      return page.items.filter(c => c.is_active);
    });
  },

  async listServices(
    filters: ServiceListFilters = {},
  ): Promise<
    ServiceResponse<{ items: DiscoveryVendor[]; total: number; pages: number }>
  > {
    return wrap(async () => {
      const categoriesRes = await marketplaceService.listCategories();
      const categories = categoriesRes.data ?? [];
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
          page_size: filters.page_size ?? 20,
        },
      });

      const items = await Promise.all(
        page.items.map(async service => {
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
          const cat = byId.get(service.category_id);
          return toDiscoveryCard(service, cat?.name, images);
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
      const categoriesRes = await marketplaceService.listCategories();
      const cat = (categoriesRes.data ?? []).find(
        c => c.id === service.category_id,
      );
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
        ...toDiscoveryCard(service, cat?.name, images),
        raw: service,
      };
    });
  },
};
