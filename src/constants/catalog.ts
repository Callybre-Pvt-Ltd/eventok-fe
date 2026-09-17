import type { CatalogEventType } from '@/types/catalog';

export const CATALOG_MAX_PRICE = 150000;

export const CART_STORAGE_KEY = 'eventok.cart.v1';
export const WISHLIST_STORAGE_KEY = 'eventok.wishlist.v1';

export const EVENT_TYPE_FILTERS: {
  value: CatalogEventType | 'all';
  label: string;
}[] = [
  { value: 'all', label: 'All Services' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'baby-shower', label: 'Baby Shower' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'home-decoration', label: 'Home Decoration' },
];

export const PDP_TABS = [
  'whatsIncluded',
  'goodToKnow',
  'aboutExperience',
  'cancellationPolicy',
] as const;

export type PdpTab = (typeof PDP_TABS)[number];
