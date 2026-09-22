import { DECORATION_CATEGORIES } from '@/constants/decorationCategories';
import { photography } from '@/design-system/tokens/photography';
import {
  DEFAULT_PAGE_SIZE,
  marketplaceService,
  type ApiCategory,
  type ApiService,
} from '@/services/marketplaceService';
import type {
  CatalogCategory,
  CatalogEventType,
  CatalogFilters,
  CatalogPackage,
  CatalogService,
  HeroSlide,
  PreviousWorkItem,
  VenueListing,
} from '@/types/catalog';
import type { ServiceResponse } from '@/types';

const EVENT_FROM_SLUG: Record<string, CatalogEventType> = {
  'wedding-decorations': 'wedding',
  'birthday-decorations': 'birthday',
  'engagement-decor': 'anniversary',
  'haldi-mehendi': 'wedding',
  'baby-shower': 'baby-shower',
  'anniversary-decor': 'anniversary',
  'corporate-events': 'corporate',
  'home-decoration': 'home-decoration',
  'theme-parties': 'birthday',
};

const wrap = async <T>(fn: () => Promise<T>): Promise<ServiceResponse<T>> => {
  try {
    return { data: await fn(), error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Request failed';
    return { data: null, error: message };
  }
};

const toCatalog = (
  service: ApiService,
  category?: ApiCategory | null,
  images: string[] = [],
): CatalogService => {
  const price = Number(service.starting_price) || 0;
  const slug = category?.slug ?? '';
  const eventType = EVENT_FROM_SLUG[slug] ?? 'wedding';
  const included = service.whats_included ?? [];
  const goodToKnow = service.good_to_know ?? [];
  const cancellation = service.cancellation_policy ?? [];
  return {
    id: service.id,
    slug: service.id,
    title: service.title,
    categorySlug: slug || service.category_id,
    eventType,
    description: service.description ?? '',
    price,
    originalPrice: price,
    bookingAmount: Math.max(19, Math.round(price * 0.05)),
    rating: 0,
    reviewCount: 0,
    images,
    tags: category ? [category.name] : [],
    attributes: category ? [category.name] : [],
    whatsIncluded: included.map(label => ({ label, included: true })),
    goodToKnow,
    aboutExperience: service.description ?? '',
    cancellationPolicy: cancellation,
  };
};

export const catalogService = {
  async list(
    filters: CatalogFilters = {},
  ): Promise<ServiceResponse<CatalogService[]>> {
    return wrap(async () => {
      const categoriesRes = await marketplaceService.listCategories();
      const categories = categoriesRes.data ?? [];
      const bySlug = new Map(categories.map(c => [c.slug, c]));
      const byName = new Map(categories.map(c => [c.name, c]));

      let categoryId: string | undefined;
      if (filters.categorySlug) {
        categoryId = bySlug.get(filters.categorySlug)?.id;
      }

      const page = await marketplaceService.listServices({
        q: filters.search,
        category_id: categoryId,
        max_price: filters.maxPrice,
        page: 1,
        page_size: DEFAULT_PAGE_SIZE,
      });
      if (page.error || !page.data) {
        throw new Error(page.error ?? 'Failed to load services');
      }

      let items: CatalogService[] = page.data.items.map(d => {
        const cat =
          bySlug.get(d.categorySlug) ??
          byName.get(d.category) ??
          categories.find(c => c.id === d.categorySlug) ??
          null;
        return {
          id: d.id,
          slug: d.id,
          title: d.displayName,
          categorySlug: cat?.slug ?? d.categorySlug,
          eventType: EVENT_FROM_SLUG[cat?.slug ?? ''] ?? 'wedding',
          description: d.description,
          price: d.budgetFrom,
          originalPrice: d.budgetFrom,
          bookingAmount: Math.max(19, Math.round(d.budgetFrom * 0.05)),
          rating: d.rating,
          reviewCount: 0,
          images: d.images,
          tags: d.tags,
          attributes: d.tags,
          whatsIncluded: (d.whatsIncluded ?? []).map(label => ({
            label,
            included: true,
          })),
          goodToKnow: d.goodToKnow ?? [],
          aboutExperience: d.description,
          cancellationPolicy: d.cancellationPolicy ?? [],
        };
      });

      if (filters.eventType && filters.eventType !== 'all') {
        items = items.filter(item => item.eventType === filters.eventType);
      }
      if (filters.tags?.length) {
        items = items.filter(item =>
          filters.tags!.some(tag => item.tags.includes(tag)),
        );
      }
      return items;
    });
  },

  async getBySlug(slug: string): Promise<ServiceResponse<CatalogService>> {
    return wrap(async () => {
      const res = await marketplaceService.getService(slug);
      if (res.error || !res.data) {
        throw new Error(res.error ?? 'Service not found');
      }
      const d = res.data;
      const categoriesRes = await marketplaceService.listCategories();
      const cat =
        (categoriesRes.data ?? []).find(c => c.id === d.raw.category_id) ??
        null;
      return toCatalog(d.raw, cat, d.images);
    });
  },

  async getManyBySlug(slugs: string[]): Promise<CatalogService[]> {
    const results = await Promise.all(
      slugs.map(async id => {
        const res = await catalogService.getBySlug(id);
        return res.data;
      }),
    );
    return results.filter((item): item is CatalogService => Boolean(item));
  },

  async getRelated(slug: string): Promise<ServiceResponse<CatalogService[]>> {
    const current = await catalogService.getBySlug(slug);
    const list = await catalogService.list(
      current.data?.categorySlug
        ? { categorySlug: current.data.categorySlug }
        : {},
    );
    return {
      data: (list.data ?? []).filter(item => item.slug !== slug).slice(0, 5),
      error: list.error,
    };
  },

  async getCategories(): Promise<ServiceResponse<CatalogCategory[]>> {
    return wrap(async () => {
      const res = await marketplaceService.listCategories();
      const api = res.data ?? [];
      const bySlug = new Map(api.map(c => [c.slug, c]));
      const byName = new Map(api.map(c => [c.name.toLowerCase(), c]));

      const merged: CatalogCategory[] = DECORATION_CATEGORIES.map(staticCat => {
        const hit =
          bySlug.get(staticCat.slug) ??
          byName.get(staticCat.name.toLowerCase());
        return {
          id: hit?.id ?? staticCat.slug,
          name: staticCat.name,
          slug: hit?.slug ?? staticCat.slug,
          eventType: EVENT_FROM_SLUG[staticCat.slug] ?? 'wedding',
          icon: staticCat.icon,
          serviceCount: hit?.service_count ?? 0,
          featuredOnHome: true,
        };
      });

      const known = new Set(merged.map(c => c.slug));
      for (const c of api) {
        if (!known.has(c.slug) && c.is_active !== false) {
          merged.push({
            id: c.id,
            name: c.name,
            slug: c.slug,
            eventType: EVENT_FROM_SLUG[c.slug] ?? 'wedding',
            icon: c.icon ?? 'Sparkles',
            serviceCount: c.service_count ?? 0,
            featuredOnHome: false,
          });
        }
      }
      return merged;
    });
  },

  async getHeroSlides(): Promise<ServiceResponse<HeroSlide[]>> {
    return {
      data: [
        {
          id: 'hero-1',
          eyebrow: 'We design. You celebrate.',
          titleLead: 'Perfect Events,',
          titleAccent: 'Beautiful',
          titleTrail: 'Memories',
          subtitle:
            'Browse decoration categories and book services created by verified vendors.',
          image: photography.hero.wedding,
          ctaHref: '/shop',
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
    return {
      data: (cats.data ?? []).map(c => c.name),
      error: cats.error,
    };
  },
};
