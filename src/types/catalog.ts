export type CatalogEventType =
  | 'wedding'
  | 'birthday'
  | 'anniversary'
  | 'baby-shower'
  | 'corporate'
  | 'home-decoration';

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  eventType: CatalogEventType;
  icon: string;
  serviceCount: number;
  featuredOnHome: boolean;
}

export interface CatalogIncludedItem {
  label: string;
  included: boolean;
}

export interface CatalogService {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  eventType: CatalogEventType;
  description: string;
  price: number;
  originalPrice: number;
  bookingAmount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  tags: string[];
  attributes: string[];
  whatsIncluded: CatalogIncludedItem[];
  goodToKnow: string[];
  aboutExperience: string;
  cancellationPolicy: string[];
  isNew?: boolean;
}

export interface CatalogPackage {
  id: string;
  slug: string;
  name: string;
  description: string;
  startingPrice: number;
  image: string;
  serviceSlugs: string[];
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  titleTrail: string;
  subtitle: string;
  image: string;
  ctaHref: string;
}

export interface VenueListing {
  id: string;
  name: string;
  location: string;
  tag: string;
  startingPricePerPerson: number;
  image: string;
}

export interface PreviousWorkItem {
  id: string;
  caption: string;
  image: string;
}

export interface CatalogFilters {
  search?: string;
  eventType?: CatalogEventType | 'all';
  categorySlug?: string;
  tags?: string[];
  maxPrice?: number;
}

export interface CartLine {
  serviceSlug: string;
  quantity: number;
  eventDate?: string;
}
