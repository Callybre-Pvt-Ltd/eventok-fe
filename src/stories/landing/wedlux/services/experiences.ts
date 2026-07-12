import { photography } from '@/design-system/tokens/photography';

export type ExperienceCategory =
  | 'all'
  | 'wedding'
  | 'corporate'
  | 'birthday'
  | 'photography'
  | 'destination'
  | 'luxury';

export type ExperienceLayout = 'featured' | 'medium' | 'panorama' | 'compact';

export interface Experience {
  id: string;
  category: Exclude<ExperienceCategory, 'all'>;
  layout: ExperienceLayout;
  image: string;
  gallery?: readonly string[];
  categoryKey: string;
  titleKey: string;
  locationKey: string;
  storyKey: string;
  rating: number;
  reviewCount: number;
  guests: string;
  availabilityKey: string;
  partnerInitials: string;
}

export const experienceCategories = [
  { id: 'all' as const, labelKey: 'landing.wedluxExpCatAll' },
  { id: 'wedding' as const, labelKey: 'landing.wedluxExpCatWedding' },
  { id: 'corporate' as const, labelKey: 'landing.wedluxExpCatCorporate' },
  { id: 'birthday' as const, labelKey: 'landing.wedluxExpCatBirthday' },
  { id: 'photography' as const, labelKey: 'landing.wedluxExpCatPhotography' },
  { id: 'destination' as const, labelKey: 'landing.wedluxExpCatDestination' },
  { id: 'luxury' as const, labelKey: 'landing.wedluxExpCatLuxury' },
] as const;

export const experiences: Experience[] = [
  {
    id: 'exp-udaipur',
    category: 'wedding',
    layout: 'featured',
    image: photography.weddings[0],
    gallery: [
      photography.weddings[1],
      photography.weddings[2],
      photography.gallery[1],
    ],
    categoryKey: 'landing.wedluxExp1Category',
    titleKey: 'landing.wedluxExp1Title',
    locationKey: 'landing.wedluxExp1Location',
    storyKey: 'landing.wedluxExp1Story',
    rating: 4.9,
    reviewCount: 128,
    guests: '180–250',
    availabilityKey: 'landing.wedluxExpAvailable',
    partnerInitials: 'EC',
  },
  {
    id: 'exp-stars',
    category: 'birthday',
    layout: 'medium',
    image: photography.birthdays[0],
    categoryKey: 'landing.wedluxExp2Category',
    titleKey: 'landing.wedluxExp2Title',
    locationKey: 'landing.wedluxExp2Location',
    storyKey: 'landing.wedluxExp2Story',
    rating: 4.8,
    reviewCount: 94,
    guests: '40–80',
    availabilityKey: 'landing.wedluxExpLimited',
    partnerInitials: 'MS',
  },
  {
    id: 'exp-launch',
    category: 'corporate',
    layout: 'medium',
    image: photography.corporate[0],
    categoryKey: 'landing.wedluxExp3Category',
    titleKey: 'landing.wedluxExp3Title',
    locationKey: 'landing.wedluxExp3Location',
    storyKey: 'landing.wedluxExp3Story',
    rating: 4.9,
    reviewCount: 76,
    guests: '200–400',
    availabilityKey: 'landing.wedluxExpAvailable',
    partnerInitials: 'LX',
  },
  {
    id: 'exp-goa',
    category: 'destination',
    layout: 'panorama',
    image: photography.gallery[0],
    categoryKey: 'landing.wedluxExp4Category',
    titleKey: 'landing.wedluxExp4Title',
    locationKey: 'landing.wedluxExp4Location',
    storyKey: 'landing.wedluxExp4Story',
    rating: 4.9,
    reviewCount: 112,
    guests: '120–200',
    availabilityKey: 'landing.wedluxExpAvailable',
    partnerInitials: 'DS',
  },
  {
    id: 'exp-film',
    category: 'photography',
    layout: 'compact',
    image: photography.weddings[2],
    categoryKey: 'landing.wedluxExp5Category',
    titleKey: 'landing.wedluxExp5Title',
    locationKey: 'landing.wedluxExp5Location',
    storyKey: 'landing.wedluxExp5Story',
    rating: 5.0,
    reviewCount: 210,
    guests: 'Full day',
    availabilityKey: 'landing.wedluxExpAvailable',
    partnerInitials: 'CV',
  },
  {
    id: 'exp-garden',
    category: 'luxury',
    layout: 'compact',
    image: photography.gallery[2],
    categoryKey: 'landing.wedluxExp6Category',
    titleKey: 'landing.wedluxExp6Title',
    locationKey: 'landing.wedluxExp6Location',
    storyKey: 'landing.wedluxExp6Story',
    rating: 4.8,
    reviewCount: 88,
    guests: '60–100',
    availabilityKey: 'landing.wedluxExpLimited',
    partnerInitials: 'GL',
  },
  {
    id: 'exp-mehendi',
    category: 'wedding',
    layout: 'compact',
    image: photography.weddings[3],
    categoryKey: 'landing.wedluxExp7Category',
    titleKey: 'landing.wedluxExp7Title',
    locationKey: 'landing.wedluxExp7Location',
    storyKey: 'landing.wedluxExp7Story',
    rating: 4.9,
    reviewCount: 64,
    guests: '80–150',
    availabilityKey: 'landing.wedluxExpAvailable',
    partnerInitials: 'RH',
  },
];
