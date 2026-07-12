import { photography } from '@/design-system/tokens/photography';

export type MemoryCategory =
  | 'all'
  | 'wedding'
  | 'corporate'
  | 'birthday'
  | 'photography'
  | 'luxury'
  | 'destination';

export type MemoryLayout =
  | 'hero'
  | 'landscape'
  | 'portrait'
  | 'square'
  | 'wide';

export interface Memory {
  id: string;
  src: string;
  category: Exclude<MemoryCategory, 'all'>;
  layout: MemoryLayout;
  titleKey: string;
  locationKey: string;
  categoryKey: string;
  year: string;
  vendorInitials: string;
}

export const memoryCategories = [
  { id: 'all' as const, labelKey: 'landing.wedluxMomentsCatAll' },
  { id: 'wedding' as const, labelKey: 'landing.wedluxMomentsCatWedding' },
  { id: 'corporate' as const, labelKey: 'landing.wedluxMomentsCatCorporate' },
  { id: 'birthday' as const, labelKey: 'landing.wedluxMomentsCatBirthday' },
  {
    id: 'photography' as const,
    labelKey: 'landing.wedluxMomentsCatPhotography',
  },
  { id: 'luxury' as const, labelKey: 'landing.wedluxMomentsCatLuxury' },
  {
    id: 'destination' as const,
    labelKey: 'landing.wedluxMomentsCatDestination',
  },
] as const;

export const memories: Memory[] = [
  {
    id: 'mem-1',
    src: photography.weddings[0],
    category: 'wedding',
    layout: 'hero',
    titleKey: 'landing.wedluxMem1Title',
    locationKey: 'landing.wedluxMem1Location',
    categoryKey: 'landing.wedluxMomentsCatWedding',
    year: '2025',
    vendorInitials: 'EC',
  },
  {
    id: 'mem-2',
    src: photography.gallery[0],
    category: 'luxury',
    layout: 'portrait',
    titleKey: 'landing.wedluxMem2Title',
    locationKey: 'landing.wedluxMem2Location',
    categoryKey: 'landing.wedluxMomentsCatLuxury',
    year: '2025',
    vendorInitials: 'LX',
  },
  {
    id: 'mem-3',
    src: photography.corporate[0],
    category: 'corporate',
    layout: 'landscape',
    titleKey: 'landing.wedluxMem3Title',
    locationKey: 'landing.wedluxMem3Location',
    categoryKey: 'landing.wedluxMomentsCatCorporate',
    year: '2024',
    vendorInitials: 'CV',
  },
  {
    id: 'mem-4',
    src: photography.birthdays[0],
    category: 'birthday',
    layout: 'square',
    titleKey: 'landing.wedluxMem4Title',
    locationKey: 'landing.wedluxMem4Location',
    categoryKey: 'landing.wedluxMomentsCatBirthday',
    year: '2025',
    vendorInitials: 'MS',
  },
  {
    id: 'mem-5',
    src: photography.weddings[2],
    category: 'destination',
    layout: 'wide',
    titleKey: 'landing.wedluxMem5Title',
    locationKey: 'landing.wedluxMem5Location',
    categoryKey: 'landing.wedluxMomentsCatDestination',
    year: '2024',
    vendorInitials: 'DS',
  },
  {
    id: 'mem-6',
    src: photography.gallery[2],
    category: 'photography',
    layout: 'portrait',
    titleKey: 'landing.wedluxMem6Title',
    locationKey: 'landing.wedluxMem6Location',
    categoryKey: 'landing.wedluxMomentsCatPhotography',
    year: '2025',
    vendorInitials: 'PH',
  },
  {
    id: 'mem-7',
    src: photography.weddings[1],
    category: 'wedding',
    layout: 'landscape',
    titleKey: 'landing.wedluxMem7Title',
    locationKey: 'landing.wedluxMem7Location',
    categoryKey: 'landing.wedluxMomentsCatWedding',
    year: '2025',
    vendorInitials: 'GL',
  },
  {
    id: 'mem-8',
    src: photography.corporate[1],
    category: 'corporate',
    layout: 'square',
    titleKey: 'landing.wedluxMem8Title',
    locationKey: 'landing.wedluxMem8Location',
    categoryKey: 'landing.wedluxMomentsCatCorporate',
    year: '2024',
    vendorInitials: 'BR',
  },
  {
    id: 'mem-9',
    src: photography.gallery[1],
    category: 'luxury',
    layout: 'wide',
    titleKey: 'landing.wedluxMem9Title',
    locationKey: 'landing.wedluxMem9Location',
    categoryKey: 'landing.wedluxMomentsCatLuxury',
    year: '2025',
    vendorInitials: 'UP',
  },
  {
    id: 'mem-10',
    src: photography.birthdays[1],
    category: 'birthday',
    layout: 'portrait',
    titleKey: 'landing.wedluxMem10Title',
    locationKey: 'landing.wedluxMem10Location',
    categoryKey: 'landing.wedluxMomentsCatBirthday',
    year: '2024',
    vendorInitials: 'RH',
  },
  {
    id: 'mem-11',
    src: photography.weddings[3],
    category: 'destination',
    layout: 'landscape',
    titleKey: 'landing.wedluxMem11Title',
    locationKey: 'landing.wedluxMem11Location',
    categoryKey: 'landing.wedluxMomentsCatDestination',
    year: '2025',
    vendorInitials: 'JK',
  },
  {
    id: 'mem-12',
    src: photography.gallery[4],
    category: 'photography',
    layout: 'square',
    titleKey: 'landing.wedluxMem12Title',
    locationKey: 'landing.wedluxMem12Location',
    categoryKey: 'landing.wedluxMomentsCatPhotography',
    year: '2025',
    vendorInitials: 'NV',
  },
];
