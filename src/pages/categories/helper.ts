import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { categoryService } from '@/services';

const UNSPLASH = 'https://images.unsplash.com/photo-';
const IMG = (id: string) => `${UNSPLASH}${id}?auto=format&fit=crop&w=800&q=85`;

/** Complete, non-repeating, ultra-aesthetic image database for all EventOK categories */
const CATEGORY_PHOTOS: Record<string, string> = {
  // Weddings & Traditional
  'mandap-decoration': IMG('1519741497674-611481863552'), // Royal wedding mandap with gold florals
  'wedding-decorations': IMG('1519741497674-611481863552'),
  'stage-decoration': IMG('1511285560929-80b456fea0bc'), // Grand reception stage with floral chandeliers
  'stage-backdrop': IMG('1511285560929-80b456fea0bc'),
  'engagement-decor': IMG('1605100804763-247f67b3557e'), // Sparkling rings on luxury velvet with petals
  'haldi-decoration': IMG('1583939003579-730e3918a45a'), // Golden marigold canopy & brass urlis
  'haldi-mehendi': IMG('1583939003579-730e3918a45a'),
  'venue-decoration': IMG('1519167758481-83f550bb49b3'), // Banquet fairy light lounge
  'tent-outdoor': IMG('1464366400600-7168b8af9bc3'), // Luxury outdoor canopy marquee on lawn
  'mehendi-decoration': IMG('1544077960-604201fe74bc'), // Henna hands & colorful bohemian decor
  'lighting-and-sound': IMG('1470225620780-dba8ba36b745'), // Warm golden ceiling canopy & laser party
  'lighting-ambiance': IMG('1470225620780-dba8ba36b745'),
  'bride-makeup': IMG('1522337360788-8b13dee7a37e'), // Editorial bridal cosmetics & styling
  'bridal-entry': IMG('1544161515-4ab6ce6db874'), // Flowing drape floral entry path
  'entrance-welcome': IMG('1465495976277-4387d4b0b4c6'), // Grand entrance floral archway
  'venues': IMG('1529636798458-92182e662485'), // Luxury banquet hall & fine dining setting

  // Birthdays & Celebrations
  'birthday-decoration': IMG('1530103862676-de8c9debad1d'), // Floating balloons with warm bokeh lights
  'birthday-decorations': IMG('1530103862676-de8c9debad1d'),
  'first-birthday': IMG('1464349095431-e9a21285b5f3'), // 1st birthday milestone props & dessert bar
  'balloon-decoration': IMG('1492684223066-81342ee5ff30'), // Shimmer wall organic balloon garland
  'balloon-decor': IMG('1492684223066-81342ee5ff30'),
  'kids-theme-party': IMG('1513151233558-d860c5398176'), // Kids party celebration props
  'theme-parties': IMG('1513151233558-d860c5398176'),

  // Anniversaries & Romance
  'anniversary-decoration': IMG('1517457373958-b7bdd4587205'), // Candlelight petals & champagne room
  'anniversary-decor': IMG('1517457373958-b7bdd4587205'),
  'silver-anniversary': IMG('1518709766631-a6a7f45921c3'), // Elegant silver jubilee banquet
  'romantic-room-decor': IMG('1522673607200-164d1b6ce486'), // Candlelight petals & sheer drapes
  'candle-light-dinner': IMG('1414235077428-338989a2e8c0'), // Rooftop dining at sunset

  // Baby Showers & New Beginnings
  'baby-shower': IMG('1516627145497-ae6968895b74'), // Dreamy boho baby shower with pampas grass
  'baby-shower-decoration': IMG('1516627145497-ae6968895b74'),
  'naming-ceremony': IMG('1526047932273-341f2a7631f9'), // Traditional cradle floral decor
  'welcome-baby-decor': IMG('1519657337289-077653f724ed'), // New-born home teddy & clouds

  // Corporate & Conferences
  'corporate-events': IMG('1511578314322-379afb476865'), // Executive keynote stage & LED wall
  'corporate-stage-setup': IMG('1511578314322-379afb476865'),
  'conference-decor': IMG('1505373877841-8d25f39d466c'), // Formal summit conference hall
  'office-party-decor': IMG('1540575467063-178a50c2df87'), // Office celebration & balloon arch

  // Home & Festive Celebrations
  'home-decoration': IMG('1566552881560-0be862a7c445'), // Festive pooja & Diwali florals
  'festival-decoration': IMG('1566552881560-0be862a7c445'),
  'home-floral-decor': IMG('1546484475-7f7bd55792da'), // Jasmine entrance toran & rangoli
  'floral-decor': IMG('1520854221256-17451cc331bf'), // Luxury floral arrangements & centerpieces
  'house-drapes-decoration': IMG('1528605248644-14dd04022da1'), // Flowing fabric drapes & warm ceiling fairy lights

  // Photography, Catering & Services
  'photography-setup': IMG('1516035069371-29a1b244cc32'), // Professional studio camera lighting & gear
  photographer: IMG('1537633552985-df8429e8048b'), // Candid wedding photographer in action
  catering: IMG('1555244162-803834f70033'), // Gourmet multi-cuisine buffet
  anchor: IMG('1465847899084-d164df4dedc6'), // Stage host with mic
  'pandit-ji': IMG('1591604466107-ec97de577aff'), // Sacred rituals & traditional pooja
  'tattoo-artist': IMG('1514525253161-7a46d19cd819'), // Live festival entertainment
  'cafe-booking': IMG('1552566626-52f8b828add9'), // Private party cafe & terrace
  'return-gifts': IMG('1549465220-1a8b9238cd48'), // Luxury favor gift hampers & boxes
};

const CATEGORY_COUNTS: Record<string, number> = {
  'mandap-decoration': 42,
  'stage-decoration': 38,
  'engagement-decor': 27,
  'haldi-decoration': 19,
  'venue-decoration': 33,
  'mehendi-decoration': 22,
  'lighting-and-sound': 18,
  'bride-makeup': 15,
  'birthday-decoration': 48,
  'first-birthday': 29,
  'balloon-decoration': 54,
  'kids-theme-party': 24,
  'anniversary-decoration': 31,
  'silver-anniversary': 14,
  'romantic-room-decor': 26,
  'candle-light-dinner': 21,
  'baby-shower-decoration': 28,
  'naming-ceremony': 16,
  'welcome-baby-decor': 17,
  'corporate-stage-setup': 25,
  'conference-decor': 19,
  'office-party-decor': 23,
  'house-drapes-decoration': 18,
  'home-floral-decor': 22,
  'festival-decoration': 35,
  photographer: 32,
  catering: 29,
  anchor: 12,
  'pandit-ji': 16,
  'tattoo-artist': 9,
  'cafe-booking': 14,
  'return-gifts': 27,
};

export function getCategoryPhoto(slug: string): string {
  return CATEGORY_PHOTOS[slug] ?? IMG('1519741497674-611481863552');
}

export function getCategoryCount(slug: string): number {
  return CATEGORY_COUNTS[slug] ?? 12;
}

export function useCategoriesPage() {
  const [searchParams] = useSearchParams();
  const activeSlug = searchParams.get('type');

  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });

  const categories = query.data?.data ?? [];

  return {
    categories,
    activeSlug,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
