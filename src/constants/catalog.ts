import type {
  CatalogCategory,
  CatalogEventType,
  CatalogSortOption,
} from '@/types/catalog';

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

export const CATALOG_MAX_PRICE = 150000;

export const BUDGET_PRESETS: {
  id: string;
  label: string;
  min: number;
  max: number;
}[] = [
  { id: 'any', label: 'Any budget', min: 0, max: CATALOG_MAX_PRICE },
  { id: 'under-5k', label: 'Under ₹5,000', min: 0, max: 5000 },
  { id: '5k-15k', label: '₹5,000 – ₹15,000', min: 5000, max: 15000 },
  { id: '15k-35k', label: '₹15,000 – ₹35,000', min: 15000, max: 35000 },
  { id: '35k-plus', label: '₹35,000+', min: 35000, max: CATALOG_MAX_PRICE },
];

export const SORT_OPTIONS: {
  value: CatalogSortOption;
  label: string;
}[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

export const CART_STORAGE_KEY = 'eventok.cart.v1';
export const WISHLIST_STORAGE_KEY = 'eventok.wishlist.v1';

export const EVENT_TYPE_FILTERS: {
  value: CatalogEventType | 'all';
  label: string;
}[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'baby-shower', label: 'Baby Shower' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'home-decoration', label: 'Home Decor' },
];

export const PDP_TABS = [
  'whatsIncluded',
  'goodToKnow',
  'aboutExperience',
  'cancellationPolicy',
] as const;

export type PdpTab = (typeof PDP_TABS)[number];
