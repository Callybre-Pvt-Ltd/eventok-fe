export interface ServicePackage {
  id: string;
  categorySlug: string;
  name: string;
  description: string;
  price: number;
  priceUnit: 'fixed' | 'per_plate' | 'per_hour';
  features: string[];
  popular?: boolean;
}
