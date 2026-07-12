import { photography } from '@/design-system/tokens/photography';

export const introSlides = [
  {
    id: 's1',
    image: photography.weddings[0],
    alt: 'Elegant wedding reception',
  },
  {
    id: 's2',
    image: photography.corporate[0],
    alt: 'Corporate gala evening',
  },
  {
    id: 's3',
    image: photography.weddings[2],
    alt: 'Outdoor celebration',
  },
  {
    id: 's4',
    image: photography.birthdays[0],
    alt: 'Birthday celebration',
  },
] as const;

export const portfolioSlides = [
  {
    id: 'p1',
    image: photography.gallery[0],
    titleKey: 'landing.festivityPortfolio1',
  },
  {
    id: 'p2',
    image: photography.gallery[1],
    titleKey: 'landing.festivityPortfolio2',
  },
  {
    id: 'p3',
    image: photography.gallery[2],
    titleKey: 'landing.festivityPortfolio3',
  },
  {
    id: 'p4',
    image: photography.gallery[3],
    titleKey: 'landing.festivityPortfolio4',
  },
  {
    id: 'p5',
    image: photography.gallery[4],
    titleKey: 'landing.festivityPortfolio5',
  },
  {
    id: 'p6',
    image: photography.gallery[5],
    titleKey: 'landing.festivityPortfolio6',
  },
] as const;

export const serviceItems = [
  { key: 'planning', labelKey: 'landing.festivityService1' },
  { key: 'wedding', labelKey: 'landing.festivityService2' },
  { key: 'corporate', labelKey: 'landing.festivityService3' },
  { key: 'social', labelKey: 'landing.festivityService4' },
  { key: 'destination', labelKey: 'landing.festivityService5' },
  { key: 'dayof', labelKey: 'landing.festivityService6' },
] as const;

export const insightPosts = [
  {
    id: 'i1',
    image: photography.weddings[1],
    titleKey: 'landing.festivityInsight1',
    dateKey: 'landing.festivityInsight1Date',
  },
  {
    id: 'i2',
    image: photography.corporate[1],
    titleKey: 'landing.festivityInsight2',
    dateKey: 'landing.festivityInsight2Date',
  },
  {
    id: 'i3',
    image: photography.birthdays[1],
    titleKey: 'landing.festivityInsight3',
    dateKey: 'landing.festivityInsight3Date',
  },
  {
    id: 'i4',
    image: photography.weddings[3],
    titleKey: 'landing.festivityInsight4',
    dateKey: 'landing.festivityInsight4Date',
  },
] as const;

export const festivityTestimonials = [
  {
    id: 't1',
    nameKey: 'landing.festivityTestimonial1Name',
    quoteKey: 'landing.festivityTestimonial1Quote',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  },
  {
    id: 't2',
    nameKey: 'landing.festivityTestimonial2Name',
    quoteKey: 'landing.festivityTestimonial2Quote',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  {
    id: 't3',
    nameKey: 'landing.festivityTestimonial3Name',
    quoteKey: 'landing.festivityTestimonial3Quote',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  },
] as const;
