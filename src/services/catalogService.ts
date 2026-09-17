import { marketplaceService, type ApiService } from './marketplaceService';
import type {
  CatalogCategory,
  CatalogFilters,
  CatalogPackage,
  CatalogService,
  CatalogEventType,
  HeroSlide,
  PreviousWorkItem,
  VenueListing,
} from '@/types/catalog';
import type { ServiceResponse } from '@/types';
import type { DiscoveryVendor } from '@/pages/services/filters';
import { photography } from '@/design-system/tokens/photography';

const placeholder = photography.hero.wedding;

const toCatalog = (item: DiscoveryVendor): CatalogService => ({
  id: item.id,
  slug: item.id,
  title: item.displayName,
  description: item.description,
  categorySlug: item.categorySlug,
  eventType: 'wedding' as CatalogEventType,
  price: item.budgetFrom,
  originalPrice: item.budgetFrom,
  bookingAmount: Math.max(1, Math.round(item.budgetFrom * 0.3)),
  rating: item.rating,
  reviewCount: 0,
  images: item.images.length ? item.images : [placeholder],
  tags: item.tags,
  attributes: [],
  whatsIncluded: [],
  goodToKnow: [],
  aboutExperience: item.description,
  cancellationPolicy: [],
});

export const catalogService = {
  async list(
    filters: CatalogFilters = {},
  ): Promise<ServiceResponse<CatalogService[]>> {
    const res = await marketplaceService.listServices({
      q: filters.search,
      max_price: filters.maxPrice,
      page_size: 50,
    });
    if (res.error || !res.data) return { data: null, error: res.error };
    return { data: res.data.items.map(toCatalog), error: null };
  },

  async getBySlug(slug: string): Promise<ServiceResponse<CatalogService>> {
    const res = await marketplaceService.getService(slug);
    if (res.error || !res.data) return { data: null, error: res.error };
    return { data: toCatalog(res.data), error: null };
  },

  async getManyBySlug(slugs: string[]): Promise<CatalogService[]> {
    const results = await Promise.all(
      slugs.map(async slug => {
        const res = await marketplaceService.getService(slug);
        return res.data ? toCatalog(res.data) : null;
      }),
    );
    return results.filter((item): item is CatalogService => Boolean(item));
  },

  async getRelated(slug: string): Promise<ServiceResponse<CatalogService[]>> {
    const list = await catalogService.list({});
    return {
      data: (list.data ?? []).filter(item => item.slug !== slug).slice(0, 4),
      error: list.error,
    };
  },

  async getCategories(): Promise<ServiceResponse<CatalogCategory[]>> {
    const res = await marketplaceService.listCategories();
    if (res.error || !res.data) return { data: null, error: res.error };
    return {
      data: res.data.map(c => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        eventType: 'wedding' as CatalogEventType,
        icon: c.icon ?? 'sparkles',
        serviceCount: 0,
        featuredOnHome: true,
      })),
      error: null,
    };
  },

  async getHeroSlides(): Promise<ServiceResponse<HeroSlide[]>> {
    return {
      data: [
        {
          id: 'hero-1',
          eyebrow: 'EventOK',
          titleLead: 'Book services',
          titleAccent: 'for your event',
          titleTrail: '— not products',
          subtitle:
            'Decor, catering, photography and more. Request a booking for your date.',
          image: placeholder,
          ctaHref: '/services',
        },
      ],
      error: null,
    };
  },

  async getPackages(): Promise<ServiceResponse<CatalogPackage[]>> {
    return { data: [], error: null };
  },

  async getVenues(): Promise<ServiceResponse<VenueListing[]>> {
    return { data: [], error: null };
  },

  async getPreviousWork(): Promise<ServiceResponse<PreviousWorkItem[]>> {
    return { data: [], error: null };
  },

  async getTags(): Promise<ServiceResponse<string[]>> {
    const cats = await catalogService.getCategories();
    if (cats.error || !cats.data) return { data: [], error: cats.error };
    return { data: cats.data.map(c => c.slug), error: null };
  },
};

export type { ApiService };
