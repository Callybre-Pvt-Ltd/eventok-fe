import type {
  CatalogPackage,
  HeroSlide,
  PreviousWorkItem,
  VenueListing,
} from '@/types/catalog';

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=85`;

export const mockHeroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    eyebrow: 'We plan. You celebrate.',
    titleLead: 'Perfect Events,',
    titleAccent: 'Beautiful',
    titleTrail: 'Memories',
    subtitle:
      'Book verified decorators, photographers and caterers for your dream wedding and reception.',
    image: IMG('1519741497674-611481863552'),
    imageLight: IMG('1519741497674-611481863552'),
    imageDark: IMG('1511285560929-80b456fea0bc'),
    objectPosition: '75% 35%',
    ctaHref: '/shop?event=wedding',
  },
  {
    id: 'hero-2',
    eyebrow: 'Curated venues & banquet halls',
    titleLead: 'Grand Venues,',
    titleAccent: 'Unforgettable',
    titleTrail: 'Evenings',
    subtitle:
      'Explore luxury farmhouses, ballrooms, and open lawns with transparent pricing and verified host reviews.',
    image: IMG('1464366400600-7168b8af9bc3'),
    imageLight: IMG('1464366400600-7168b8af9bc3'),
    imageDark: IMG('1519167758481-83f550bb49b3'),
    objectPosition: '70% 40%',
    ctaHref: '/shop?category=venues',
  },
  {
    id: 'hero-3',
    eyebrow: 'Birthdays & milestones',
    titleLead: 'Magical Birthdays,',
    titleAccent: 'Crafted With',
    titleTrail: 'Joy',
    subtitle:
      'Custom theme decorations, balloon styling, and complete birthday setups starting from ₹2,999.',
    image: IMG('1558636508-e0db3814bd1d'),
    imageLight: IMG('1558636508-e0db3814bd1d'),
    imageDark: IMG('1527529482837-4698179dc6ce'),
    objectPosition: '75% 30%',
    ctaHref: '/shop?event=birthday',
  },
  {
    id: 'hero-4',
    eyebrow: 'Corporate events & conferences',
    titleLead: 'Flawless Corporate,',
    titleAccent: 'Professional',
    titleTrail: 'Staging',
    subtitle:
      'Seamless AV equipment, executive backdrops, and corporate gala staging managed by certified event professionals.',
    image: IMG('1540575467063-178a50c2df87'),
    imageLight: IMG('1540575467063-178a50c2df87'),
    imageDark: IMG('1505373877841-8d25f7d46678'),
    objectPosition: '75% 35%',
    ctaHref: '/shop?event=corporate',
  },
];

export const mockPackages: CatalogPackage[] = [
  {
    id: 'pk-1',
    slug: 'complete-wedding-package',
    name: 'Complete Royal Wedding Package',
    description:
      'Mandap decor, royal stage, ambient lighting and bridal make-up in one bundled suite.',
    startingPrice: 149999,
    image: IMG('1520854221256-17451b9916eb'),
    serviceSlugs: [
      'royal-mandap-floral-setup',
      'reception-stage-grand-theme',
      'haldi-marigold-decoration',
      'cinematic-wedding-film-photography',
    ],
    vendorName: 'Priya Events Studio',
    individualTotal: 185000,
    savings: 35001,
  },
  {
    id: 'pk-2',
    slug: 'birthday-party-package',
    name: 'Mega Birthday Party Package',
    description:
      'Theme organic balloon arch, LED neon number, cake table styling and return gifts.',
    startingPrice: 9999,
    image: IMG('1464349095431-e9a21285b5f3'),
    serviceSlugs: ['neon-balloon-arch-setup', 'first-birthday-jungle-theme'],
    vendorName: 'EventOK Studio',
    individualTotal: 12999,
    savings: 3000,
  },
  {
    id: 'pk-3',
    slug: 'anniversary-romance-package',
    name: 'Candlelight Romance Package',
    description:
      'Canopy bed drapes, rose petals, rooftop candlelight dinner and private photo moment wall.',
    startingPrice: 14999,
    image: IMG('1518709766631-a6a7f45921c3'),
    serviceSlugs: [
      'romantic-candlelight-room-decor',
      'candle-light-dinner-terrace',
    ],
    vendorName: 'EventOK Studio',
    individualTotal: 18999,
    savings: 4000,
  },
  {
    id: 'pk-4',
    slug: 'baby-shower-package',
    name: 'Pastel Dreams Baby Shower Package',
    description:
      'Pastel organic backdrop, cloud props, mom-to-be seating decor and welcome sign.',
    startingPrice: 11999,
    image: IMG('1516627145497-ae6968895b74'),
    serviceSlugs: ['pastel-baby-shower-setup', 'welcome-baby-boy-decor'],
    vendorName: 'EventOK Studio',
    individualTotal: 14999,
    savings: 3000,
  },
];

export const mockVenues: VenueListing[] = [
  {
    id: 'v-1',
    name: 'The Terrace Story',
    location: 'Koregaon Park, Pune',
    tag: 'Pure Veg',
    startingPricePerPerson: 799,
    image: IMG('1533105079780-92b9be482077'),
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
    tag: 'Outdoor Lawn',
    startingPricePerPerson: 949,
    image: IMG('1517248135467-4c7edcad34c4'),
  },
  {
    id: 'v-4',
    name: 'Studio 21 Lounge',
    location: 'Hitech City, Hyderabad',
    tag: 'Private Hall',
    startingPricePerPerson: 1299,
    image: IMG('1505373877841-8d25f39d466c'),
  },
];

export const mockPreviousWork: PreviousWorkItem[] = [
  {
    id: 'pw-1',
    caption: 'Rohit & Sneha • Jaipur Sangeet',
    image: IMG('1533174072545-7a4b6ad7a6c3'),
  },
  {
    id: 'pw-2',
    caption: 'Aditya & Ritu • Royal Varmala',
    image: IMG('1606216794074-735e91aa2c92'),
  },
  {
    id: 'pw-3',
    caption: 'Aarav’s 1st Birthday • Safari Wonderland',
    image: IMG('1558618666-fcd25c85f82e'),
  },
  {
    id: 'pw-4',
    caption: 'Meera’s Haldi • Marigold Canopy',
    image: IMG('1591604466107-ec97de577aff'),
  },
  {
    id: 'pw-5',
    caption: '25th Silver Jubilee • Skyline Terrace',
    image: IMG('1511795409834-ef04bbd61622'),
  },
  {
    id: 'pw-6',
    caption: 'Tanya’s Baby Shower • Pastel Cloud Theme',
    image: IMG('1526047932273-341f2a7631f9'),
  },
];
