import { photography } from '@/design-system/tokens/photography';
import { useHeroMotion } from './useHeroMotion';

export const HERO_STATS = [
  {
    value: 500,
    suffix: '+',
    labelKey: 'landing.wedluxHeroStatEvents',
  },
  {
    value: 120,
    suffix: '+',
    labelKey: 'landing.wedluxHeroStatVendors',
  },
  {
    value: 98,
    suffix: '%',
    labelKey: 'landing.wedluxHeroStatHappy',
  },
  {
    value: 15,
    suffix: '+',
    labelKey: 'landing.wedluxHeroStatCities',
  },
] as const;

export const TRUST_BRANDS = [
  'Taj Hotels',
  'Reliance',
  'Infosys',
  'Google',
  'Amazon',
  'HDFC',
  'Marriott',
  'BMW',
] as const;

export const useWedluxHero = () => {
  const scope = useHeroMotion();

  return {
    scope,
    heroImage: photography.hero.wedding,
    accentImage: photography.gallery[3],
    titleLines: ['Event', 'Management'] as const,
    stats: HERO_STATS,
    brands: TRUST_BRANDS,
  };
};
