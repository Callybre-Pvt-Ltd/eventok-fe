export type SortOption =
  | 'newest'
  | 'popular'
  | 'rating'
  | 'booked'
  | 'budget'
  | 'premium'
  | 'alpha';

export type AvailabilityMode =
  | 'any'
  | 'flexible'
  | 'weekend'
  | 'month'
  | 'date';

export interface DiscoveryFilters {
  query: string;
  categories: string[];
  eventTypes: string[];
  cities: string[];
  budgetMin: number;
  budgetMax: number;
  guestCount: number;
  ratingMin: number;
  yearsMin: number;
  availability: AvailabilityMode;
  availableDate: string;
  verifiedOnly: boolean;
  featuredOnly: boolean;
  trending: boolean;
  destinationOnly: boolean;
  luxuryOnly: boolean;
  outdoor: boolean;
  indoor: boolean;
  traditional: boolean;
  modern: boolean;
  premium: boolean;
  recentlyAdded: boolean;
  languages: string[];
  sort: SortOption;
  quick: string[];
}

export const BUDGET_MIN = 25_000;
export const BUDGET_MAX = 1_000_000;
export const GUEST_MAX = 1000;
export const PAGE_SIZE = 8;

export const budgetPresets = [
  { id: 'any', label: 'Any budget', min: BUDGET_MIN, max: BUDGET_MAX },
  { id: '50k', label: '₹50k+', min: 50_000, max: BUDGET_MAX },
  { id: '1l', label: '₹1L+', min: 100_000, max: BUDGET_MAX },
  { id: '5l', label: '₹5L+', min: 500_000, max: BUDGET_MAX },
  { id: '10l', label: '₹10L+', min: 1_000_000, max: BUDGET_MAX },
] as const;

export const guestPresets = [
  { id: 'any', label: 'Any size', guestCount: 20 },
  { id: 'small', label: 'Small', guestCount: 50 },
  { id: 'medium', label: 'Medium', guestCount: 150 },
  { id: 'large', label: 'Large', guestCount: 500 },
] as const;

export function getBudgetPresetId(min: number, max: number) {
  const match = budgetPresets.find(p => p.min === min && p.max === max);
  return match?.id ?? 'any';
}

export function getGuestPresetId(guestCount: number) {
  const match = guestPresets.find(p => p.guestCount === guestCount);
  return match?.id ?? 'any';
}

export const defaultFilters: DiscoveryFilters = {
  query: '',
  categories: [],
  eventTypes: [],
  cities: [],
  budgetMin: BUDGET_MIN,
  budgetMax: BUDGET_MAX,
  guestCount: 20,
  ratingMin: 0,
  yearsMin: 0,
  availability: 'any',
  availableDate: '',
  verifiedOnly: false,
  featuredOnly: false,
  trending: false,
  destinationOnly: false,
  luxuryOnly: false,
  outdoor: false,
  indoor: false,
  traditional: false,
  modern: false,
  premium: false,
  recentlyAdded: false,
  languages: [],
  sort: 'popular',
  quick: [],
};

import { DECORATION_CATEGORIES } from '@/constants/decorationCategories';

export const categoryOptions = DECORATION_CATEGORIES.map(c => ({
  value: c.slug,
  label: c.name,
}));

export function getResultsContext(filters: DiscoveryFilters) {
  const parts: string[] = [];
  if (filters.luxuryOnly || filters.eventTypes.includes('luxury')) {
    parts.push('Luxury');
  }
  if (filters.categories.length === 1) {
    const cat = categoryOptions.find(c => c.value === filters.categories[0]);
    if (cat) parts.push(cat.label);
  } else if (filters.categories.length > 1) {
    parts.push('multi-category');
  }
  const vendorWord = parts.length ? `${parts.join(' ')} vendors` : 'vendors';
  if (filters.cities.length === 1) {
    return `Showing ${vendorWord} in ${filters.cities[0]}`;
  }
  if (filters.cities.length > 1) {
    return `Showing ${vendorWord} in ${filters.cities.length} cities`;
  }
  if (parts.length === 0) return '';
  return `Showing ${vendorWord}`;
}

export const eventTypeOptions = [
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'destination', label: 'Destination' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'traditional', label: 'Traditional' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'royal', label: 'Royal' },
  { value: 'beach', label: 'Beach' },
  { value: 'garden', label: 'Garden' },
] as const;

export const cityOptions = [
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Bengaluru', label: 'Bengaluru' },
  { value: 'Udaipur', label: 'Udaipur' },
  { value: 'Jaipur', label: 'Jaipur' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Kolkata', label: 'Kolkata' },
] as const;

export const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'marathi', label: 'Marathi' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'telugu', label: 'Telugu' },
  { value: 'kannada', label: 'Kannada' },
  { value: 'bengali', label: 'Bengali' },
] as const;

export const ratingOptions = [
  { value: 0, label: 'Any rating' },
  { value: 4, label: '4+' },
  { value: 4.5, label: '4.5+' },
  { value: 5, label: '5' },
] as const;

export const yearsOptions = [
  { value: 0, label: 'Any experience' },
  { value: 3, label: '3+ years' },
  { value: 5, label: '5+ years' },
  { value: 8, label: '8+ years' },
  { value: 10, label: '10+ years' },
] as const;

export const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'booked', label: 'Most Booked' },
  { value: 'budget', label: 'Budget Friendly' },
  { value: 'premium', label: 'Premium' },
  { value: 'alpha', label: 'Alphabetical' },
] as const;

export const availabilityOptions = [
  { value: 'any', label: 'Any dates' },
  { value: 'flexible', label: 'Flexible Dates' },
  { value: 'weekend', label: 'Weekend Only' },
  { value: 'month', label: 'Available This Month' },
  { value: 'date', label: 'Pick a date' },
] as const;

export const quickChips = [
  { id: 'luxury', label: 'Luxury' },
  { id: 'trending', label: 'Trending' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'destination', label: 'Destination' },
  { id: 'verified', label: 'Verified' },
  { id: 'photography', label: 'Photography' },
  { id: 'under1l', label: 'Under ₹1L' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'beach', label: 'Beach' },
  { id: 'royal', label: 'Royal' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'recent', label: 'Recently Added' },
] as const;

export const searchSuggestions = [
  'Wedding Photographer',
  'Luxury Decor',
  'DJ',
  'Catering',
  'Corporate',
  'Birthday',
  'Decoration',
  'Venue',
  'Live Band',
  'Destination Wedding',
  'Traditional Wedding',
  'Makeup',
  'Mehendi',
  'Videography',
] as const;

export function formatBudget(value: number) {
  if (value >= 1_000_000) return '₹10L+';
  if (value >= 100_000) {
    const lakhs = value / 100_000;
    return Number.isInteger(lakhs) ? `₹${lakhs}L` : `₹${lakhs.toFixed(1)}L`;
  }
  if (value >= 1000) return `₹${Math.round(value / 1000)}k`;
  return `₹${value}`;
}

export function formatGuests(value: number) {
  return value >= GUEST_MAX ? '1000+' : String(value);
}

export function toggleValue(list: string[], value: string) {
  return list.includes(value)
    ? list.filter(item => item !== value)
    : [...list, value];
}

export type DiscoveryVendor = {
  id: string;
  displayName: string;
  description: string;
  initials: string;
  category: string;
  categorySlug: string;
  city: string;
  state: string;
  country: string;
  locationLabel: string;
  rating: number;
  projects: number;
  bookings: number;
  views: number;
  budgetFrom: number;
  years: number;
  portfolioCount: number;
  image: string;
  images: string[];
  tags: string[];
  eventTypes: string[];
  whatsIncluded?: string[];
  goodToKnow?: string[];
  cancellationPolicy?: string[];
  verified: boolean;
  featured: boolean;
  trending: boolean;
  weekendReady: boolean;
  availableThisMonth: boolean;
  createdAt: string;
  keywords: string[];
};

/** @deprecated Mock catalog removed — use marketplaceService.listServices */
export const discoveryVendors: DiscoveryVendor[] = [];

export function filterVendors(
  vendors: DiscoveryVendor[],
  filters: DiscoveryFilters,
): DiscoveryVendor[] {
  const q = filters.query.trim().toLowerCase();

  let result = vendors.filter(vendor => {
    if (
      filters.categories.length &&
      !filters.categories.includes(vendor.categorySlug)
    ) {
      return false;
    }
    if (filters.eventTypes.length) {
      const hit = filters.eventTypes.some(
        type =>
          vendor.eventTypes.includes(type) ||
          vendor.tags.map(t => t.toLowerCase()).includes(type),
      );
      if (!hit) return false;
    }
    if (filters.cities.length) {
      if (!filters.cities.some(city => vendor.city === city)) return false;
    }
    if (
      filters.budgetMin > BUDGET_MIN &&
      vendor.budgetFrom < filters.budgetMin
    ) {
      return false;
    }
    if (
      filters.budgetMax < BUDGET_MAX &&
      vendor.budgetFrom > filters.budgetMax
    ) {
      return false;
    }
    const capacity = Math.min(GUEST_MAX, 40 + vendor.projects);
    if (capacity < filters.guestCount) return false;
    if (filters.ratingMin > 0 && vendor.rating < filters.ratingMin)
      return false;
    if (filters.yearsMin > 0 && vendor.years < filters.yearsMin) return false;
    if (filters.verifiedOnly && !vendor.verified) return false;
    if (filters.featuredOnly && !vendor.featured) return false;
    if (filters.trending && !vendor.trending) return false;
    if (filters.destinationOnly && !vendor.eventTypes.includes('destination')) {
      return false;
    }
    if (filters.luxuryOnly && !vendor.eventTypes.includes('luxury'))
      return false;
    if (filters.outdoor && !vendor.eventTypes.includes('outdoor')) return false;
    if (filters.indoor && !vendor.eventTypes.includes('indoor')) return false;
    if (filters.traditional && !vendor.eventTypes.includes('traditional')) {
      return false;
    }
    if (filters.modern && !vendor.eventTypes.includes('modern')) return false;
    if (filters.premium && vendor.budgetFrom < 150_000) return false;
    if (filters.recentlyAdded) {
      if (vendor.createdAt < '2026-06-01') return false;
    }
    if (filters.availability === 'weekend' && !vendor.weekendReady)
      return false;
    if (filters.availability === 'month' && !vendor.availableThisMonth) {
      return false;
    }
    if (filters.availability === 'date' && filters.availableDate) {
      if (!vendor.availableThisMonth && !vendor.weekendReady) return false;
    }
    if (q) {
      const hay = [
        vendor.displayName,
        vendor.category,
        vendor.city,
        ...vendor.tags,
        ...vendor.keywords,
      ]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  result = [...result].sort((a, b) => {
    switch (filters.sort) {
      case 'newest':
        return b.createdAt.localeCompare(a.createdAt);
      case 'rating':
        return b.rating - a.rating;
      case 'booked':
        return b.bookings - a.bookings;
      case 'budget':
        return a.budgetFrom - b.budgetFrom;
      case 'premium':
        return b.budgetFrom - a.budgetFrom;
      case 'alpha':
        return a.displayName.localeCompare(b.displayName);
      case 'popular':
      default:
        return b.views - a.views;
    }
  });

  return result;
}

export function getActiveFilterPills(filters: DiscoveryFilters) {
  const pills: { key: string; label: string }[] = [];

  if (filters.query.trim()) {
    pills.push({ key: 'query', label: `"${filters.query.trim()}"` });
  }
  for (const value of filters.categories) {
    const cat = categoryOptions.find(c => c.value === value);
    pills.push({ key: `categories:${value}`, label: cat?.label ?? value });
  }
  for (const value of filters.eventTypes) {
    const et = eventTypeOptions.find(c => c.value === value);
    pills.push({ key: `eventTypes:${value}`, label: et?.label ?? value });
  }
  for (const value of filters.cities) {
    pills.push({ key: `cities:${value}`, label: value });
  }
  if (filters.budgetMin > BUDGET_MIN || filters.budgetMax < BUDGET_MAX) {
    const preset = budgetPresets.find(
      p => p.min === filters.budgetMin && p.max === filters.budgetMax,
    );
    pills.push({
      key: 'budget',
      label: preset?.label ?? `${formatBudget(filters.budgetMin)}+`,
    });
  }
  if (filters.guestCount > 20) {
    const preset = guestPresets.find(p => p.guestCount === filters.guestCount);
    pills.push({
      key: 'guestCount',
      label: preset?.label ?? `${formatGuests(filters.guestCount)} guests`,
    });
  }
  if (filters.ratingMin > 0) {
    pills.push({ key: 'ratingMin', label: `${filters.ratingMin}+ ★` });
  }
  if (filters.yearsMin > 0) {
    pills.push({ key: 'yearsMin', label: `${filters.yearsMin}+ yrs` });
  }
  if (filters.availability !== 'any') {
    const av = availabilityOptions.find(a => a.value === filters.availability);
    pills.push({
      key: 'availability',
      label:
        filters.availability === 'date' && filters.availableDate
          ? filters.availableDate
          : av?.label ?? filters.availability,
    });
  }
  if (filters.verifiedOnly)
    pills.push({ key: 'verifiedOnly', label: 'Verified' });
  if (filters.featuredOnly)
    pills.push({ key: 'featuredOnly', label: 'Featured' });
  if (filters.trending) pills.push({ key: 'trending', label: 'Trending' });
  if (filters.destinationOnly) {
    pills.push({ key: 'destinationOnly', label: 'Destination' });
  }
  if (filters.luxuryOnly) pills.push({ key: 'luxuryOnly', label: 'Luxury' });
  if (filters.outdoor) pills.push({ key: 'outdoor', label: 'Outdoor' });
  if (filters.indoor) pills.push({ key: 'indoor', label: 'Indoor' });
  if (filters.traditional)
    pills.push({ key: 'traditional', label: 'Traditional' });
  if (filters.modern) pills.push({ key: 'modern', label: 'Modern' });
  if (filters.premium) pills.push({ key: 'premium', label: 'Premium' });
  if (filters.recentlyAdded) {
    pills.push({ key: 'recentlyAdded', label: 'Recently Added' });
  }
  for (const lang of filters.languages) {
    const opt = languageOptions.find(l => l.value === lang);
    pills.push({ key: `languages:${lang}`, label: opt?.label ?? lang });
  }

  return pills;
}

export function clearFilterKey(
  filters: DiscoveryFilters,
  key: string,
): DiscoveryFilters {
  if (key.startsWith('categories:')) {
    const value = key.slice('categories:'.length);
    return {
      ...filters,
      categories: filters.categories.filter(v => v !== value),
      quick: filters.quick.filter(q => q !== value),
    };
  }
  if (key.startsWith('eventTypes:')) {
    const value = key.slice('eventTypes:'.length);
    return {
      ...filters,
      eventTypes: filters.eventTypes.filter(v => v !== value),
      quick: filters.quick.filter(q => q !== value),
    };
  }
  if (key.startsWith('cities:')) {
    const value = key.slice('cities:'.length);
    return { ...filters, cities: filters.cities.filter(v => v !== value) };
  }
  if (key.startsWith('languages:')) {
    const value = key.slice('languages:'.length);
    return {
      ...filters,
      languages: filters.languages.filter(v => v !== value),
    };
  }

  switch (key) {
    case 'query':
      return { ...filters, query: '' };
    case 'budget':
      return {
        ...filters,
        budgetMin: BUDGET_MIN,
        budgetMax: BUDGET_MAX,
        quick: filters.quick.filter(q => q !== 'under1l'),
      };
    case 'guestCount':
      return { ...filters, guestCount: 20 };
    case 'ratingMin':
      return { ...filters, ratingMin: 0 };
    case 'yearsMin':
      return { ...filters, yearsMin: 0 };
    case 'availability':
      return { ...filters, availability: 'any', availableDate: '' };
    case 'verifiedOnly':
      return {
        ...filters,
        verifiedOnly: false,
        quick: filters.quick.filter(q => q !== 'verified'),
      };
    case 'featuredOnly':
      return { ...filters, featuredOnly: false };
    case 'trending':
      return {
        ...filters,
        trending: false,
        quick: filters.quick.filter(q => q !== 'trending'),
      };
    case 'destinationOnly':
      return {
        ...filters,
        destinationOnly: false,
        quick: filters.quick.filter(q => q !== 'destination'),
      };
    case 'luxuryOnly':
      return {
        ...filters,
        luxuryOnly: false,
        quick: filters.quick.filter(q => q !== 'luxury'),
      };
    case 'outdoor':
      return {
        ...filters,
        outdoor: false,
        quick: filters.quick.filter(q => q !== 'outdoor'),
      };
    case 'indoor':
      return { ...filters, indoor: false };
    case 'traditional':
      return { ...filters, traditional: false };
    case 'modern':
      return { ...filters, modern: false };
    case 'premium':
      return { ...filters, premium: false };
    case 'recentlyAdded':
      return {
        ...filters,
        recentlyAdded: false,
        quick: filters.quick.filter(q => q !== 'recent'),
      };
    default:
      return filters;
  }
}

export function getSortLabel(sort: SortOption) {
  return sortOptions.find(opt => opt.value === sort)?.label ?? 'Most Popular';
}

export function applyQuickChip(
  filters: DiscoveryFilters,
  chipId: string,
): DiscoveryFilters {
  const active = filters.quick.includes(chipId);
  const quick = active
    ? filters.quick.filter(q => q !== chipId)
    : [...filters.quick, chipId];
  const on = !active;
  const next = { ...filters, quick };

  switch (chipId) {
    case 'luxury':
      return { ...next, luxuryOnly: on };
    case 'trending':
      return { ...next, trending: on };
    case 'wedding':
    case 'photography':
    case 'corporate':
      return {
        ...next,
        categories: on
          ? [...new Set([...filters.categories, chipId])]
          : filters.categories.filter(c => c !== chipId),
      };
    case 'destination':
      return { ...next, destinationOnly: on };
    case 'verified':
      return { ...next, verifiedOnly: on };
    case 'under1l':
      return on
        ? { ...next, budgetMin: BUDGET_MIN, budgetMax: 100_000 }
        : { ...next, budgetMin: BUDGET_MIN, budgetMax: BUDGET_MAX };
    case 'outdoor':
      return { ...next, outdoor: on };
    case 'beach':
    case 'royal':
    case 'minimal':
      return {
        ...next,
        eventTypes: on
          ? [...new Set([...filters.eventTypes, chipId])]
          : filters.eventTypes.filter(e => e !== chipId),
      };
    case 'recent':
      return { ...next, recentlyAdded: on };
    default:
      return next;
  }
}
