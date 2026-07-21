import { photography } from '@/design-system/tokens/photography';

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

export const categoryOptions = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'photography', label: 'Photography' },
  { value: 'decoration', label: 'Decoration' },
  { value: 'catering', label: 'Catering' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'venue', label: 'Venue' },
  { value: 'makeup', label: 'Makeup' },
  { value: 'mehendi', label: 'Mehendi' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'music', label: 'Music' },
  { value: 'anchor', label: 'Anchor' },
  { value: 'florist', label: 'Florist' },
  { value: 'invitations', label: 'Invitations' },
  { value: 'cake', label: 'Cake' },
  { value: 'transport', label: 'Transport' },
  { value: 'videography', label: 'Videography' },
] as const;

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
  verified: boolean;
  featured: boolean;
  trending: boolean;
  weekendReady: boolean;
  availableThisMonth: boolean;
  createdAt: string;
  keywords: string[];
};

const p = photography;

export const discoveryVendors: DiscoveryVendor[] = [
  {
    id: 'dv-1',
    displayName: 'Signature Destination Wedding',
    description: 'Full destination wedding planning with décor, guest flow, and day-of direction.',
    initials: 'AC',
    category: 'Wedding',
    categorySlug: 'wedding',
    city: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    locationLabel: 'Udaipur, Rajasthan, India',
    rating: 4.9,
    projects: 186,
    bookings: 210,
    views: 12400,
    budgetFrom: 350_000,
    years: 12,
    portfolioCount: 48,
    image: p.weddings[0],
    images: [p.weddings[0], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Luxury', 'Destination', 'Royal'],
    eventTypes: ['destination', 'luxury', 'royal', 'outdoor'],
    verified: true,
    featured: true,
    trending: true,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-06-01',
    keywords: [
      'wedding decor',
      'destination wedding',
      'palace',
      'traditional wedding',
    ],
  },
  {
    id: 'dv-2',
    displayName: 'Cinematic Wedding Photography',
    description: 'Cinematic photography capturing ceremonies, portraits, and candid moments.',
    initials: 'LL',
    category: 'Photography',
    categorySlug: 'photography',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    locationLabel: 'Jaipur, Rajasthan, India',
    rating: 5,
    projects: 312,
    bookings: 340,
    views: 18200,
    budgetFrom: 85_000,
    years: 9,
    portfolioCount: 120,
    image: p.weddings[2],
    images: [p.weddings[2], p.weddings[1], p.weddings[2], p.gallery[0], p.gallery[1]],
    tags: ['Luxury', 'Modern', 'Destination'],
    eventTypes: ['luxury', 'modern', 'destination', 'outdoor'],
    verified: true,
    featured: true,
    trending: true,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-06-18',
    keywords: ['luxury photography', 'wedding photography', 'destination'],
  },
  {
    id: 'dv-3',
    displayName: 'Corporate Stage & AV',
    description: 'Stage design, lighting, and AV production for conferences and launches.',
    initials: 'SS',
    category: 'Corporate',
    categorySlug: 'corporate',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    locationLabel: 'Mumbai, Maharashtra, India',
    rating: 4.8,
    projects: 94,
    bookings: 110,
    views: 7600,
    budgetFrom: 220_000,
    years: 8,
    portfolioCount: 36,
    image: p.corporate[0],
    images: [p.corporate[0], p.corporate[1], p.corporate[2], p.gallery[2], p.gallery[4]],
    tags: ['Modern', 'Indoor', 'Luxury'],
    eventTypes: ['indoor', 'modern', 'luxury'],
    verified: true,
    featured: false,
    trending: false,
    weekendReady: false,
    availableThisMonth: true,
    createdAt: '2026-05-12',
    keywords: ['corporate', 'conference', 'stage', 'av'],
  },
  {
    id: 'dv-4',
    displayName: 'Milestone Birthday Styling',
    description: 'Styled birthday celebrations with theme décor and guest experiences.',
    initials: 'MB',
    category: 'Birthday',
    categorySlug: 'birthday',
    city: 'Goa',
    state: 'Goa',
    country: 'India',
    locationLabel: 'Goa, Goa, India',
    rating: 4.9,
    projects: 128,
    bookings: 150,
    views: 9800,
    budgetFrom: 55_000,
    years: 6,
    portfolioCount: 42,
    image: p.birthdays[0],
    images: [p.birthdays[0], p.birthdays[1], p.birthdays[2], p.gallery[3], p.gallery[5]],
    tags: ['Beach', 'Outdoor', 'Modern'],
    eventTypes: ['beach', 'outdoor', 'modern'],
    verified: true,
    featured: true,
    trending: true,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-07-01',
    keywords: ['birthday', 'beach', 'party', 'outdoor'],
  },
  {
    id: 'dv-5',
    displayName: 'Luxury Floral & Décor',
    description: 'Floral installations and spatial styling for ceremonies and receptions.',
    initials: 'SD',
    category: 'Decoration',
    categorySlug: 'decoration',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    locationLabel: 'Delhi, Delhi, India',
    rating: 4.8,
    projects: 205,
    bookings: 230,
    views: 11200,
    budgetFrom: 120_000,
    years: 11,
    portfolioCount: 64,
    image: p.gallery[2],
    images: [p.gallery[2], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Traditional', 'Luxury', 'Indoor'],
    eventTypes: ['traditional', 'luxury', 'indoor', 'garden'],
    verified: true,
    featured: true,
    trending: false,
    weekendReady: true,
    availableThisMonth: false,
    createdAt: '2026-04-22',
    keywords: ['wedding decor', 'floral', 'traditional wedding'],
  },
  {
    id: 'dv-6',
    displayName: 'Premium Event Catering',
    description: 'Multi-cuisine catering with live counters for events of every scale.',
    initials: 'CT',
    category: 'Catering',
    categorySlug: 'catering',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    locationLabel: 'Bengaluru, Karnataka, India',
    rating: 4.9,
    projects: 167,
    bookings: 190,
    views: 8400,
    budgetFrom: 95_000,
    years: 7,
    portfolioCount: 28,
    image: p.gallery[3],
    images: [p.gallery[3], p.gallery[3], p.gallery[0], p.weddings[1], p.gallery[2]],
    tags: ['Luxury', 'Garden', 'Outdoor'],
    eventTypes: ['outdoor', 'garden', 'luxury', 'minimal'],
    verified: true,
    featured: false,
    trending: true,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-06-28',
    keywords: ['catering', 'farm to table', 'luxury dining'],
  },
  {
    id: 'dv-7',
    displayName: 'Live Band Entertainment',
    description: 'Live musicians curated to match your celebration energy and mood.',
    initials: 'PL',
    category: 'Entertainment',
    categorySlug: 'entertainment',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    locationLabel: 'Mumbai, Maharashtra, India',
    rating: 4.7,
    projects: 88,
    bookings: 120,
    views: 15100,
    budgetFrom: 45_000,
    years: 5,
    portfolioCount: 22,
    image: p.gallery[5],
    images: [p.gallery[5], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Modern', 'Indoor', 'Outdoor'],
    eventTypes: ['modern', 'indoor', 'outdoor'],
    verified: true,
    featured: false,
    trending: true,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-07-05',
    keywords: ['live band', 'dj', 'music', 'entertainment'],
  },
  {
    id: 'dv-8',
    displayName: 'Garden Venue Styling',
    description: 'Outdoor and garden venue styling for open-air gatherings.',
    initials: 'VV',
    category: 'Venue',
    categorySlug: 'venue',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    locationLabel: 'Pune, Maharashtra, India',
    rating: 4.6,
    projects: 74,
    bookings: 90,
    views: 6200,
    budgetFrom: 180_000,
    years: 10,
    portfolioCount: 30,
    image: p.gallery[1],
    images: [p.gallery[1], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Garden', 'Outdoor', 'Minimal'],
    eventTypes: ['garden', 'outdoor', 'minimal'],
    verified: true,
    featured: false,
    trending: false,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-03-18',
    keywords: ['venue', 'garden', 'outdoor wedding'],
  },
  {
    id: 'dv-9',
    displayName: 'Bridal Beauty Package',
    description: 'Bridal and family beauty looks with on-site touch-ups.',
    initials: 'GG',
    category: 'Makeup',
    categorySlug: 'makeup',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    locationLabel: 'Hyderabad, Telangana, India',
    rating: 4.9,
    projects: 240,
    bookings: 260,
    views: 9900,
    budgetFrom: 28_000,
    years: 8,
    portfolioCount: 90,
    image: p.weddings[3],
    images: [p.weddings[3], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Traditional', 'Luxury', 'Modern'],
    eventTypes: ['traditional', 'luxury', 'modern'],
    verified: true,
    featured: true,
    trending: false,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-05-30',
    keywords: ['makeup', 'bridal', 'mehendi'],
  },
  {
    id: 'dv-10',
    displayName: 'Mehendi Celebration Setup',
    description: 'Traditional mehendi setups with seating, décor, and ambience.',
    initials: 'HH',
    category: 'Mehendi',
    categorySlug: 'mehendi',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    locationLabel: 'Jaipur, Rajasthan, India',
    rating: 4.8,
    projects: 156,
    bookings: 170,
    views: 7100,
    budgetFrom: 22_000,
    years: 14,
    portfolioCount: 55,
    image: p.weddings[1],
    images: [p.weddings[1], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Traditional', 'Royal', 'Indoor'],
    eventTypes: ['traditional', 'royal', 'indoor'],
    verified: true,
    featured: false,
    trending: false,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-02-14',
    keywords: ['mehendi', 'henna', 'traditional wedding'],
  },
  {
    id: 'dv-11',
    displayName: 'Event Lighting Design',
    description: 'Architectural lighting that transforms venues after dark.',
    initials: 'LM',
    category: 'Lighting',
    categorySlug: 'lighting',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locationLabel: 'Chennai, Tamil Nadu, India',
    rating: 4.7,
    projects: 102,
    bookings: 115,
    views: 5400,
    budgetFrom: 60_000,
    years: 6,
    portfolioCount: 34,
    image: p.gallery[0],
    images: [p.gallery[0], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Modern', 'Luxury', 'Outdoor'],
    eventTypes: ['modern', 'luxury', 'outdoor', 'indoor'],
    verified: true,
    featured: false,
    trending: true,
    weekendReady: false,
    availableThisMonth: true,
    createdAt: '2026-06-10',
    keywords: ['lighting', 'led', 'ambiance'],
  },
  {
    id: 'dv-12',
    displayName: 'Documentary Film Coverage',
    description: 'Story-driven film coverage for weddings and brand events.',
    initials: 'FF',
    category: 'Videography',
    categorySlug: 'videography',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    locationLabel: 'Bengaluru, Karnataka, India',
    rating: 5,
    projects: 198,
    bookings: 220,
    views: 14300,
    budgetFrom: 110_000,
    years: 7,
    portfolioCount: 78,
    image: p.gallery[4],
    images: [p.gallery[4], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Luxury', 'Modern', 'Destination'],
    eventTypes: ['luxury', 'modern', 'destination'],
    verified: true,
    featured: true,
    trending: true,
    weekendReady: true,
    availableThisMonth: false,
    createdAt: '2026-07-08',
    keywords: ['videography', 'cinematic', 'luxury photography'],
  },
  {
    id: 'dv-13',
    displayName: 'Invitation & Stationery Suite',
    description: 'Printed and digital invitation suites with cohesive design.',
    initials: 'PP',
    category: 'Florist',
    categorySlug: 'florist',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    locationLabel: 'Kolkata, West Bengal, India',
    rating: 4.6,
    projects: 89,
    bookings: 95,
    views: 4100,
    budgetFrom: 35_000,
    years: 5,
    portfolioCount: 40,
    image: p.birthdays[1],
    images: [p.birthdays[1], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Garden', 'Minimal', 'Outdoor'],
    eventTypes: ['garden', 'minimal', 'outdoor'],
    verified: false,
    featured: false,
    trending: false,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-07-10',
    keywords: ['florist', 'flowers', 'decor'],
  },
  {
    id: 'dv-14',
    displayName: 'Custom Guest Experience Kit',
    description: 'Welcome gifts and guest kits tailored to your event theme.',
    initials: 'II',
    category: 'Invitations',
    categorySlug: 'invitations',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    locationLabel: 'Delhi, Delhi, India',
    rating: 4.5,
    projects: 210,
    bookings: 240,
    views: 5800,
    budgetFrom: 18_000,
    years: 4,
    portfolioCount: 66,
    image: p.birthdays[2],
    images: [p.birthdays[2], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Minimal', 'Modern', 'Luxury'],
    eventTypes: ['minimal', 'modern', 'luxury'],
    verified: true,
    featured: false,
    trending: false,
    weekendReady: false,
    availableThisMonth: true,
    createdAt: '2026-01-20',
    keywords: ['invitations', 'stationery', 'wedding'],
  },
  {
    id: 'dv-15',
    displayName: 'Celebration Cake Design',
    description: 'Custom celebration cakes and dessert tables.',
    initials: 'SA',
    category: 'Cake',
    categorySlug: 'cake',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    locationLabel: 'Mumbai, Maharashtra, India',
    rating: 4.9,
    projects: 276,
    bookings: 300,
    views: 8700,
    budgetFrom: 12_000,
    years: 9,
    portfolioCount: 100,
    image: p.birthdays[0],
    images: [p.birthdays[0], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Luxury', 'Modern', 'Minimal'],
    eventTypes: ['luxury', 'modern', 'minimal'],
    verified: true,
    featured: true,
    trending: false,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-04-02',
    keywords: ['cake', 'dessert', 'wedding cake'],
  },
  {
    id: 'dv-16',
    displayName: 'Guest Transport Concierge',
    description: 'Coordinated guest transport for venues and airport transfers.',
    initials: 'RC',
    category: 'Transport',
    categorySlug: 'transport',
    city: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    locationLabel: 'Udaipur, Rajasthan, India',
    rating: 4.4,
    projects: 64,
    bookings: 80,
    views: 3200,
    budgetFrom: 40_000,
    years: 15,
    portfolioCount: 18,
    image: p.hero.wedding,
    images: [p.hero.wedding, p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Royal', 'Traditional', 'Destination'],
    eventTypes: ['royal', 'traditional', 'destination'],
    verified: true,
    featured: false,
    trending: false,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2025-12-01',
    keywords: ['transport', 'vintage car', 'baraat'],
  },
  {
    id: 'dv-17',
    displayName: 'Host & Emcee Service',
    description: 'Professional hosts who keep the programme flowing smoothly.',
    initials: 'SH',
    category: 'Anchor',
    categorySlug: 'anchor',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    locationLabel: 'Hyderabad, Telangana, India',
    rating: 4.7,
    projects: 132,
    bookings: 145,
    views: 6900,
    budgetFrom: 25_000,
    years: 6,
    portfolioCount: 24,
    image: p.corporate[1],
    images: [p.corporate[1], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Modern', 'Indoor', 'Corporate'],
    eventTypes: ['modern', 'indoor'],
    verified: true,
    featured: false,
    trending: true,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-06-22',
    keywords: ['anchor', 'emcee', 'host', 'corporate'],
  },
  {
    id: 'dv-18',
    displayName: 'DJ & Sound Production',
    description: 'DJ sets with premium sound systems for receptions and parties.',
    initials: 'SW',
    category: 'Music',
    categorySlug: 'music',
    city: 'Goa',
    state: 'Goa',
    country: 'India',
    locationLabel: 'Goa, Goa, India',
    rating: 4.8,
    projects: 145,
    bookings: 180,
    views: 16800,
    budgetFrom: 30_000,
    years: 8,
    portfolioCount: 32,
    image: p.corporate[2],
    images: [p.corporate[2], p.weddings[1], p.weddings[2], p.weddings[3], p.gallery[2]],
    tags: ['Beach', 'Outdoor', 'Modern'],
    eventTypes: ['beach', 'outdoor', 'modern'],
    verified: true,
    featured: true,
    trending: true,
    weekendReady: true,
    availableThisMonth: true,
    createdAt: '2026-07-09',
    keywords: ['dj', 'music', 'beach wedding', 'party'],
  },
];

export function applyQuickChip(
  filters: DiscoveryFilters,
  chipId: string,
): DiscoveryFilters {
  const active = filters.quick.includes(chipId);
  const quick = active
    ? filters.quick.filter(id => id !== chipId)
    : [...filters.quick, chipId];
  let next: DiscoveryFilters = { ...filters, quick };

  const on = !active;
  switch (chipId) {
    case 'luxury':
      return {
        ...next,
        luxuryOnly: on,
        eventTypes: on
          ? Array.from(new Set([...next.eventTypes, 'luxury']))
          : next.eventTypes.filter(v => v !== 'luxury'),
      };
    case 'trending':
      return { ...next, trending: on };
    case 'wedding':
      return {
        ...next,
        categories: on
          ? Array.from(new Set([...next.categories, 'wedding']))
          : next.categories.filter(v => v !== 'wedding'),
      };
    case 'destination':
      return {
        ...next,
        destinationOnly: on,
        eventTypes: on
          ? Array.from(new Set([...next.eventTypes, 'destination']))
          : next.eventTypes.filter(v => v !== 'destination'),
      };
    case 'verified':
      return { ...next, verifiedOnly: on };
    case 'photography':
      return {
        ...next,
        categories: on
          ? Array.from(new Set([...next.categories, 'photography']))
          : next.categories.filter(v => v !== 'photography'),
      };
    case 'under1l':
      return {
        ...next,
        budgetMax: on ? 100_000 : BUDGET_MAX,
        budgetMin: BUDGET_MIN,
      };
    case 'outdoor':
      return {
        ...next,
        outdoor: on,
        eventTypes: on
          ? Array.from(new Set([...next.eventTypes, 'outdoor']))
          : next.eventTypes.filter(v => v !== 'outdoor'),
      };
    case 'beach':
      return {
        ...next,
        eventTypes: on
          ? Array.from(new Set([...next.eventTypes, 'beach']))
          : next.eventTypes.filter(v => v !== 'beach'),
      };
    case 'royal':
      return {
        ...next,
        eventTypes: on
          ? Array.from(new Set([...next.eventTypes, 'royal']))
          : next.eventTypes.filter(v => v !== 'royal'),
      };
    case 'minimal':
      return {
        ...next,
        eventTypes: on
          ? Array.from(new Set([...next.eventTypes, 'minimal']))
          : next.eventTypes.filter(v => v !== 'minimal'),
      };
    case 'corporate':
      return {
        ...next,
        categories: on
          ? Array.from(new Set([...next.categories, 'corporate']))
          : next.categories.filter(v => v !== 'corporate'),
      };
    case 'recent':
      return { ...next, recentlyAdded: on, sort: on ? 'newest' : next.sort };
    default:
      return next;
  }
}

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
