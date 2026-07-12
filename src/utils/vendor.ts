import type { PublicVendor, VendorPrivate } from '@/types';

export const toPublicVendor = (vendor: VendorPrivate): PublicVendor => ({
  id: vendor.id,
  businessName: vendor.businessName,
  city: vendor.city,
  experience: vendor.experience,
  description: vendor.description,
  categories: vendor.categories,
  tags: vendor.tags,
  rating: vendor.rating,
  reviewCount: vendor.reviewCount,
  featured: vendor.featured,
  portfolio: vendor.portfolio,
});
