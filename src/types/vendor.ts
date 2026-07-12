import type { VendorStatus } from './user';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface PortfolioMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
}

export interface VendorPrivate {
  id: string;
  userId: string;
  businessName: string;
  city: string;
  experience: number;
  description: string;
  categories: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  status: VendorStatus;
  phone: string;
  email: string;
  address: string;
  pricing: string;
  portfolio: PortfolioMedia[];
  socialMedia?: string;
}

export interface PublicVendor {
  id: string;
  businessName: string;
  city: string;
  experience: number;
  description: string;
  categories: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  portfolio: PortfolioMedia[];
}
