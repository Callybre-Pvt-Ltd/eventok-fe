import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';
import type { CatalogCategory } from '@/types/catalog';

export const DEFAULT_CATEGORY_TILES: CatalogCategory[] = [
  {
    id: 'cat-anniversary',
    name: 'Anniversary Decor',
    slug: 'anniversary-decor',
    eventType: 'anniversary',
    icon: 'Sparkles',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-baby-shower',
    name: 'Baby Shower & Naming',
    slug: 'baby-shower-naming',
    eventType: 'baby-shower',
    icon: 'Baby',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-balloon',
    name: 'Balloon Decor',
    slug: 'balloon-decor',
    eventType: 'birthday',
    icon: 'PartyPopper',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-birthday',
    name: 'Birthday Decorations',
    slug: 'birthday-decorations',
    eventType: 'birthday',
    icon: 'Cake',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-corporate',
    name: 'Corporate & Office Events',
    slug: 'corporate-office-events',
    eventType: 'corporate',
    icon: 'Building2',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-engagement',
    name: 'Engagement & Ring Ceremony',
    slug: 'engagement-ring-ceremony',
    eventType: 'wedding',
    icon: 'Heart',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-entrance',
    name: 'Entrance & Welcome Gate',
    slug: 'entrance-welcome-gate',
    eventType: 'wedding',
    icon: 'DoorOpen',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-floral',
    name: 'Floral Decor',
    slug: 'floral-decor',
    eventType: 'wedding',
    icon: 'Flower',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-haldi',
    name: 'Haldi & Mehendi',
    slug: 'haldi-mehendi',
    eventType: 'wedding',
    icon: 'Flower2',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-home',
    name: 'Home Decoration',
    slug: 'home-decoration',
    eventType: 'home-decoration',
    icon: 'Home',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-lighting',
    name: 'Lighting & Ambiance',
    slug: 'lighting-ambiance',
    eventType: 'wedding',
    icon: 'Lightbulb',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-photo',
    name: 'Photo Booth & Props',
    slug: 'photo-booth-props',
    eventType: 'birthday',
    icon: 'Camera',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-stage',
    name: 'Stage & Backdrop',
    slug: 'stage-backdrop',
    eventType: 'wedding',
    icon: 'Clapperboard',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-tent',
    name: 'Tent & Outdoor Setup',
    slug: 'tent-outdoor-setup',
    eventType: 'wedding',
    icon: 'Tent',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-theme',
    name: 'Theme Parties',
    slug: 'theme-parties',
    eventType: 'birthday',
    icon: 'Palette',
    serviceCount: 0,
    featuredOnHome: true,
  },
  {
    id: 'cat-wedding',
    name: 'Wedding Decorations',
    slug: 'wedding-decorations',
    eventType: 'wedding',
    icon: 'Gem',
    serviceCount: 0,
    featuredOnHome: true,
  },
];

export function useCategoryTiles(limit?: number) {
  const { data, isLoading } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async () => {
      const res = await catalogService.getCategories();
      if (res.data && res.data.length > 0) return res.data;
      return DEFAULT_CATEGORY_TILES;
    },
    staleTime: 5 * 60_000,
  });

  const source = data && data.length > 0 ? data : DEFAULT_CATEGORY_TILES;
  const categories: CatalogCategory[] = limit ? source.slice(0, limit) : source;

  return { categories, isLoading };
}
