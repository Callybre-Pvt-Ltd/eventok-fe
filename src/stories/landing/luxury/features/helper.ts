import { Package, Palette, ShieldCheck, Truck } from 'lucide-react';

export const luxuryFeatures = [
  {
    key: 'verified',
    icon: ShieldCheck,
    titleKey: 'landing.luxuryFeature1Title',
    descKey: 'landing.luxuryFeature1Desc',
  },
  {
    key: 'curated',
    icon: Palette,
    titleKey: 'landing.luxuryFeature2Title',
    descKey: 'landing.luxuryFeature2Desc',
  },
  {
    key: 'concierge',
    icon: Package,
    titleKey: 'landing.luxuryFeature3Title',
    descKey: 'landing.luxuryFeature3Desc',
  },
  {
    key: 'nationwide',
    icon: Truck,
    titleKey: 'landing.luxuryFeature4Title',
    descKey: 'landing.luxuryFeature4Desc',
  },
] as const;
