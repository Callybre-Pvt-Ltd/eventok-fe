import type {
  CatalogPackage,
  HeroSlide,
  PreviousWorkItem,
  VenueListing,
} from '@/types/catalog';

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=70`;

export const mockHeroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    eyebrow: 'We design. You celebrate.',
    titleLead: 'Perfect Events,',
    titleAccent: 'Beautiful',
    titleTrail: 'Memories',
    subtitle:
      'Book verified decorators, photographers and caterers for every celebration — with transparent pricing and a small booking amount.',
    image: IMG('1519225421980-715cb0215aed'),
    ctaHref: '/shop',
  },
  {
    id: 'hero-2',
    eyebrow: 'Celebrate the season in style',
    titleLead: 'Festive Decor,',
    titleAccent: 'Ganapati',
    titleTrail: 'Special',
    subtitle:
      'Traditional mandap, floral and lighting setups delivered and installed at your home or society hall.',
    image: IMG('1566552881560-0be862a7c445'),
    ctaHref: '/shop?event=home-decoration',
  },
  {
    id: 'hero-3',
    eyebrow: 'Birthdays made effortless',
    titleLead: 'Balloons, Lights,',
    titleAccent: 'Happy',
    titleTrail: 'Surprises',
    subtitle:
      'Same-day birthday setups starting at ₹2,999 with on-site styling and free teardown.',
    image: IMG('1530103862676-de8c9debad1d'),
    ctaHref: '/shop?event=birthday',
  },
];

export const mockPackages: CatalogPackage[] = [
  {
    id: 'pk-1',
    slug: 'complete-wedding-package',
    name: 'Complete Wedding Package',
    description: 'Mandap, stage, lighting and bridal make-up in one bundle.',
    startingPrice: 149999,
    image: IMG('1519741497674-611481863552'),
    serviceSlugs: [
      'royal-mandap-floral-setup',
      'reception-stage-grand-theme',
      'haldi-marigold-decoration',
    ],
  },
  {
    id: 'pk-2',
    slug: 'birthday-party-package',
    name: 'Birthday Party Package',
    description: 'Theme decor, balloon arch, cake table and return gifts.',
    startingPrice: 9999,
    image: IMG('1464349095431-e9a21285b5f3'),
    serviceSlugs: [
      'neon-balloon-arch-setup',
      'first-birthday-jungle-theme',
      'barbie-theme-birthday-decor',
    ],
  },
  {
    id: 'pk-3',
    slug: 'anniversary-romance-package',
    name: 'Anniversary Romance Package',
    description: 'Room decor, candle light dinner and a photo moment wall.',
    startingPrice: 14999,
    image: IMG('1522673607200-164d1b6ce486'),
    serviceSlugs: [
      'romantic-candlelight-room-decor',
      'candle-light-dinner-terrace',
    ],
  },
  {
    id: 'pk-4',
    slug: 'baby-shower-package',
    name: 'Baby Shower Package',
    description: 'Pastel backdrop, props, seating decor and welcome board.',
    startingPrice: 11999,
    image: IMG('1515488042361-ee00e0ddd4e4'),
    serviceSlugs: ['pastel-baby-shower-setup', 'welcome-baby-boy-decor'],
  },
];

export const mockVenues: VenueListing[] = [
  {
    id: 'v-1',
    name: 'The Terrace Story',
    location: 'Koregaon Park, Pune',
    tag: 'Pure Veg',
    startingPricePerPerson: 799,
    image: IMG('1414235077428-338989a2e8c0'),
  },
  {
    id: 'v-2',
    name: 'Cafe Lumière',
    location: 'Bandra West, Mumbai',
    tag: 'Rooftop',
    startingPricePerPerson: 1099,
    image: IMG('1552566626-52f8b828add9'),
  },
  {
    id: 'v-3',
    name: 'Banyan Courtyard',
    location: 'Indiranagar, Bengaluru',
    tag: 'Outdoor',
    startingPricePerPerson: 949,
    image: IMG('1517248135467-4c7edcad34c4'),
  },
  {
    id: 'v-4',
    name: 'Studio 21 Lounge',
    location: 'Hitech City, Hyderabad',
    tag: 'Private Hall',
    startingPricePerPerson: 1299,
    image: IMG('1466978913421-dad2ebd01d17'),
  },
];

export const mockPreviousWork: PreviousWorkItem[] = [
  {
    id: 'pw-1',
    caption: 'Just you & me',
    image: IMG('1522673607200-164d1b6ce486'),
  },
  {
    id: 'pw-2',
    caption: 'Mandap mornings',
    image: IMG('1519225421980-715cb0215aed'),
  },
  {
    id: 'pw-3',
    caption: 'One year of you',
    image: IMG('1464349095431-e9a21285b5f3'),
  },
  {
    id: 'pw-4',
    caption: 'Haldi hues',
    image: IMG('1583939003579-730e3918a45a'),
  },
  {
    id: 'pw-5',
    caption: 'Silver together',
    image: IMG('1511795409834-ef04bbd61622'),
  },
  {
    id: 'pw-6',
    caption: 'Little one on the way',
    image: IMG('1515488042361-ee00e0ddd4e4'),
  },
];
