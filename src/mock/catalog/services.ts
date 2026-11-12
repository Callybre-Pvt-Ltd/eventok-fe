import type { CatalogEventType, CatalogService } from '@/types/catalog';

const UNSPLASH = 'https://images.unsplash.com/photo-';
const IMG = (id: string) => `${UNSPLASH}${id}?auto=format&fit=crop&w=900&q=85`;

interface Seed {
  slug: string;
  title: string;
  categorySlug: string;
  eventType: CatalogEventType;
  price: number;
  originalPrice: number;
  images: string[];
  tags: string[];
  attributes: string[];
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
}

const baseIncluded = [
  'Complete Theme & Color Setup',
  'Custom Balloon Arch & Backdrop Design',
  'Ambient LED Fairy Lights & Neon Signage',
  'On-Site Professional Setup & Teardown',
  'Verified Vendor Team & Quality Check',
  'Damage-Free Wall & Venue Props',
];

const baseGoodToKnow = [
  'Setup team arrives 3–4 hours before the event start time.',
  'Decoration stays up for 4 hours; extensions can be arranged on request.',
  'Venue permission for wall-safe adhesives is arranged by the customer.',
  'Exact flower and balloon shades may vary slightly with seasonal availability.',
];

const baseCancellation = [
  'Free cancellation up to 72 hours before the event date.',
  'Between 72 and 24 hours, 50% of the booking amount is adjusted to a future booking.',
  'Within 24 hours of the event, the booking amount is non-refundable.',
  'Refunds are processed to the original payment method within 5–7 working days.',
];

const seeds: Seed[] = [
  // 1. Royal Garden Wedding Mandap
  {
    slug: 'royal-garden-wedding',
    title: 'Royal Garden Wedding Mandap',
    categorySlug: 'mandap-decoration',
    eventType: 'wedding',
    price: 89999,
    originalPrice: 119999,
    images: [
      IMG('1519741497674-611481863552'), // Grand floral mandap
      IMG('1519225421980-715cb0215aed'), // Floral archway
    ],
    tags: ['Wedding', 'Grand Mandap', 'Floral Setup'],
    attributes: ['Wedding', 'Royal', 'Floral', 'Outdoor Setup'],
    rating: 4.9,
    reviewCount: 428,
  },
  // 2. Neon Glow Milestone Birthday
  {
    slug: 'neon-glow-birthday',
    title: 'Neon Glow Milestone Birthday',
    categorySlug: 'birthday-decoration',
    eventType: 'birthday',
    price: 3499,
    originalPrice: 4499,
    images: [
      IMG('1530103862676-de8c9debad1d'), // Colorful balloons
      IMG('1513151233558-d860c5398176'), // Gold confetti
    ],
    tags: ['Birthday Decoration', 'Neon Lights', 'Balloons'],
    attributes: ['Birthday', 'Neon', 'Indoor Decoration', 'Vibrant'],
    rating: 4.8,
    reviewCount: 312,
  },
  // 3. Silvered Candlelight Anniversary Room
  {
    slug: 'silvered-anniversary',
    title: 'Silvered Candlelight Anniversary Room',
    categorySlug: 'romantic-room-decor',
    eventType: 'anniversary',
    price: 5999,
    originalPrice: 7999,
    images: [
      IMG('1522673607200-164d1b6ce486'), // Candlelight romance
      IMG('1518709766631-a6a7f45921c3'), // Luxury roses
    ],
    tags: ['Anniversary', 'Candlelight', 'Luxury'],
    attributes: ['Anniversary', 'Romantic', 'Silver & White', 'Elegant'],
    rating: 4.9,
    reviewCount: 285,
  },
  // 4. Pastel Boho Baby Shower Canopy
  {
    slug: 'boho-baby-shower',
    title: 'Pastel Boho Baby Shower Canopy',
    categorySlug: 'baby-shower-decoration',
    eventType: 'baby-shower',
    price: 6499,
    originalPrice: 8499,
    images: [
      IMG('1515488042361-ee00e0ddd4e4'), // Pastel baby shower balloons
      IMG('1526047932273-341f2a7631f9'), // Cute baby table styling
    ],
    tags: ['Baby Shower', 'Boho Style', 'Pastels'],
    attributes: ['Baby Shower', 'Pastel', 'Wooden Props', 'Warm'],
    rating: 4.8,
    reviewCount: 194,
  },
  // 5. Corporate Summit Keynote Stage
  {
    slug: 'corporate-gala-night',
    title: 'Corporate Summit Keynote Stage',
    categorySlug: 'corporate-stage-setup',
    eventType: 'corporate',
    price: 49999,
    originalPrice: 64999,
    images: [
      IMG('1511578314322-379afb476865'), // Modern conference keynote hall
      IMG('1505373877841-8d25f7d46678'), // Awards stage lighting
    ],
    tags: ['Corporate Event', 'Grand Hall', 'LED Lighting'],
    attributes: ['Corporate', 'Formal', 'Stage & Hall', 'Grand'],
    rating: 4.9,
    reviewCount: 167,
  },
  // 6. Haldi Sunshine Marigold Canopy
  {
    slug: 'haldi-marigold-decoration',
    title: 'Haldi Sunshine Marigold Canopy',
    categorySlug: 'haldi-decoration',
    eventType: 'wedding',
    price: 14999,
    originalPrice: 19999,
    images: [
      IMG('1583939003579-730e3918a45a'), // Haldi yellow marigolds
      IMG('1591604466107-ec97de577aff'), // Traditional celebration
    ],
    tags: ['Haldi', 'Marigold Floral', 'Traditional'],
    attributes: ['Haldi', 'Traditional', 'Outdoor Decoration'],
    rating: 4.8,
    reviewCount: 207,
  },
  // 7. Bohemian Mehndi Fairy Light Lounge
  {
    slug: 'mehendi-boho-backdrop',
    title: 'Bohemian Mehndi Fairy Light Lounge',
    categorySlug: 'mehendi-decoration',
    eventType: 'wedding',
    price: 18999,
    originalPrice: 24999,
    images: [
      IMG('1519167758481-83f550bb49b3'), // Mehndi fairy light lounge
      IMG('1544161515-4ab6ce6db874'), // Banquet lounge seating
    ],
    tags: ['Backdrop for Mehendi', 'Canopy Decoration', 'Boho'],
    attributes: ['Mehendi', 'Boho', 'Colourful', 'Outdoor Decoration'],
    isNew: true,
    rating: 4.7,
    reviewCount: 129,
  },
  // 8. Royal Varmala Stage Backdrop
  {
    slug: 'reception-stage-grand-theme',
    title: 'Royal Varmala & Reception Stage',
    categorySlug: 'stage-decoration',
    eventType: 'wedding',
    price: 69999,
    originalPrice: 89999,
    images: [
      IMG('1511285560929-80b456fea0bc'), // Varmala floral backdrop
      IMG('1465495976277-4387d4b0b4c6'), // Floral wedding path
    ],
    tags: ['Wedding', 'Stage Decoration', 'Reception'],
    attributes: ['Reception', 'Grand', 'Stage Setup'],
    rating: 4.9,
    reviewCount: 402,
  },
  // 9. Milestone 1st Birthday Safari Theme
  {
    slug: 'first-birthday-jungle-theme',
    title: 'Milestone 1st Birthday Safari Theme',
    categorySlug: 'first-birthday',
    eventType: 'birthday',
    price: 8999,
    originalPrice: 11999,
    images: [
      IMG('1558618666-fcd25c85f82e'), // Kids theme party
      IMG('1464349095431-e9a21285b5f3'), // Birthday cake candles
    ],
    tags: ['1st Birthday', 'Kids Theme', 'Balloon Arch'],
    attributes: ['Birthday', 'Playful', 'Indoor Decoration'],
    rating: 4.8,
    reviewCount: 275,
  },
  // 10. Shimmer Pastel Balloon Arch
  {
    slug: 'neon-balloon-arch-setup',
    title: 'Shimmer Pastel Balloon Arch',
    categorySlug: 'balloon-decoration',
    eventType: 'birthday',
    price: 3999,
    originalPrice: 4999,
    images: [
      IMG('1492684223066-81342ee5ff30'), // Shimmer neon party
      IMG('1527529482837-4698179dc6ce'), // Party table styling
    ],
    tags: ['Balloon Decoration', 'At Home', 'Birthday Decoration'],
    attributes: ['Birthday', 'Neon', 'Indoor Decoration'],
    rating: 4.6,
    reviewCount: 341,
  },
  // 11. Welcome Baby Boy Cloud Nursery Styling
  {
    slug: 'welcome-baby-boy-decor',
    title: 'Welcome Baby Cloud Nursery Styling',
    categorySlug: 'welcome-baby-decor',
    eventType: 'baby-shower',
    price: 5499,
    originalPrice: 6999,
    images: [
      IMG('1519657337289-077653f724ed'), // Teddy bear baby styling
      IMG('1529636798458-92182e662485'), // Warm nursery balloons
    ],
    tags: ['Baby Boy', 'Baby Room', 'At Home'],
    attributes: ['Baby Shower', 'Playful', 'Indoor Decoration'],
    rating: 4.6,
    reviewCount: 72,
  },
  // 12. Rooftop Sunset Candlelight Dinner
  {
    slug: 'candle-light-dinner-terrace',
    title: 'Rooftop Sunset Candlelight Dinner',
    categorySlug: 'candle-light-dinner',
    eventType: 'anniversary',
    price: 12999,
    originalPrice: 16999,
    images: [
      IMG('1414235077428-338989a2e8c0'), // Terrace restaurant sunset
      IMG('1552566626-52f8b828add9'), // Private evening dining
    ],
    tags: ['Candle Light Dinner', 'Anniversary Decoration', 'Rooftop'],
    attributes: [
      'Anniversary',
      'Romantic',
      'Outdoor Decoration',
      'Premium Setup',
    ],
    rating: 4.9,
    reviewCount: 289,
  },
  // 13. Wedding Cinematic Drone & Photography
  {
    slug: 'cinematic-wedding-film-photography',
    title: 'Wedding Cinematic Film & Photography',
    categorySlug: 'photographer',
    eventType: 'wedding',
    price: 75000,
    originalPrice: 95000,
    images: [
      IMG('1520854221256-17451cc331bf'), // Candid wedding photographer
      IMG('1537633552985-df8429e8048b'), // Professional camera gear
    ],
    tags: ['Photography', 'Cinematic Drone', 'Wedding Album'],
    attributes: ['Photography', 'Cinematic', 'Verified Artist', 'Full Day'],
    isNew: true,
    rating: 4.9,
    reviewCount: 184,
  },
  // 14. Royal Gourmet Multi-Cuisine Wedding Banquet
  {
    slug: 'royal-buffet-wedding-catering',
    title: 'Royal Gourmet Multi-Cuisine Banquet',
    categorySlug: 'catering',
    eventType: 'wedding',
    price: 1650,
    originalPrice: 2100,
    images: [
      IMG('1555244162-803834f70033'), // Luxury buffet spread
      IMG('1504674900247-0877df9cc836'), // Fine dining plated gourmet
    ],
    tags: ['Catering', 'Live Counters', 'Per Plate'],
    attributes: ['Catering', 'Multi-Cuisine', 'Live Counters', 'Veg & Non-Veg'],
    isNew: true,
    rating: 4.8,
    reviewCount: 203,
  },
  // 15. Live DJ & Sangeet Lighting Rig
  {
    slug: 'live-dj-sangeet-sound-lighting',
    title: 'Live DJ & Sangeet Laser Lighting Rig',
    categorySlug: 'lighting-and-sound',
    eventType: 'wedding',
    price: 28000,
    originalPrice: 35000,
    images: [
      IMG('1470225620780-dba8ba36b745'), // DJ console with vibrant laser lights
      IMG('1514525253161-7a46d19cd819'), // Live concert party crowd
    ],
    tags: ['DJ & Sound', 'Sangeet Party', 'Laser Lights'],
    attributes: ['Entertainment', 'Live DJ', 'High-Bass Sound', 'Lighting'],
    rating: 4.9,
    reviewCount: 142,
  },
  // 16. Ganpati & Festive Mandap Home Decor
  {
    slug: 'ganpati-festival-home-decor',
    title: 'Ganpati & Festive Floral Home Decor',
    categorySlug: 'festival-decoration',
    eventType: 'home-decoration',
    price: 11999,
    originalPrice: 15999,
    images: [
      IMG('1566552881560-0be862a7c445'), // Traditional Indian festival flowers
      IMG('1546484475-7f7bd55792da'), // Floral entrance toran
    ],
    tags: ['Festival Decoration', 'At Home', 'Floral'],
    attributes: ['Festive', 'Traditional', 'Indoor Decoration'],
    isNew: true,
    rating: 4.9,
    reviewCount: 152,
  },
  // 17. The Banyan Courtyard Farmhouse Lawn
  {
    slug: 'banyan-courtyard-outdoor-lawn',
    title: 'The Banyan Courtyard Farmhouse Lawn',
    categorySlug: 'venue-decoration',
    eventType: 'wedding',
    price: 125000,
    originalPrice: 160000,
    images: [
      IMG('1517248135467-4c7edcad34c4'), // Lush outdoor celebration lawn
      IMG('1466978913421-dad2ebd01d17'), // Private celebration pavilion
    ],
    tags: ['Venue', 'Outdoor Lawn', '500+ Guests'],
    attributes: ['Venue', 'Outdoor', 'Farmhouse', 'Grand'],
    rating: 4.9,
    reviewCount: 96,
  },
];

export const mockCatalogServices: CatalogService[] = seeds.map(
  (seed, index) => ({
    id: `svc-${String(index + 1).padStart(3, '0')}`,
    slug: seed.slug,
    title: seed.title,
    categorySlug: seed.categorySlug,
    eventType: seed.eventType,
    description: `${seed.title} is a fully managed setup delivered by an EventOK verified partner team. Everything from the props and florals to the on-site styling and teardown is handled for you, so you only arrive and celebrate.`,
    price: seed.price,
    originalPrice: seed.originalPrice,
    bookingAmount: seed.price >= 20000 ? 499 : seed.price >= 8000 ? 199 : 19,
    rating: seed.rating ?? 4.7,
    reviewCount: seed.reviewCount ?? 120,
    images: seed.images,
    tags: seed.tags,
    attributes: seed.attributes,
    whatsIncluded: baseIncluded.map(label => ({ label, included: true })),
    goodToKnow: baseGoodToKnow,
    aboutExperience: `Our styling team plans ${seed.title.toLowerCase()} around your venue dimensions, colour preference and celebration time. A supervisor stays on site through the setup, runs a quality check against the booked design, and returns after the event for teardown.`,
    cancellationPolicy: baseCancellation,
    isNew: seed.isNew,
  }),
);
