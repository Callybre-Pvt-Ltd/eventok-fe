import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';

export interface WeddingTileItem {
  id: string;
  name: string;
  slug: string;
  photo: string;
  tag: string;
  description: string;
  startingPrice: string;
  count: number;
}

const CURATED_WEDDING_TILES: WeddingTileItem[] = [
  {
    id: 'w-1',
    name: 'Royal Mandap Decoration',
    slug: 'mandap-decoration',
    tag: 'Mandap & Pheras',
    description: 'Sacred Vedic setups, fresh floral canopies & royal seating',
    startingPrice: '₹24,999',
    count: 42,
    photo:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'w-2',
    name: 'Varmala & Reception Stage',
    slug: 'stage-decoration',
    tag: 'Stage Decor',
    description:
      'Grand floral backdrops, crystal chandeliers & ambient lighting',
    startingPrice: '₹19,999',
    count: 38,
    photo:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'w-3',
    name: 'Haldi & Marigold Ceremony',
    slug: 'haldi-decoration',
    tag: 'Haldi Celebration',
    description:
      'Traditional yellow marigold canopies, brass urlis & photo backdrops',
    startingPrice: '₹7,999',
    count: 24,
    photo:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'w-4',
    name: 'Mehendi & Sangeet Night',
    slug: 'mehendi-decoration',
    tag: 'Sangeet & Dance',
    description:
      'Bohemian Rajasthani drapes, low seating, fairy lights & DJ stage',
    startingPrice: '₹9,999',
    count: 22,
    photo:
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'w-5',
    name: 'Engagement & Ring Ceremony',
    slug: 'engagement-decor',
    tag: 'Ring Ceremony',
    description:
      'Modern pastel floral walls, neon typography & romantic arches',
    startingPrice: '₹12,999',
    count: 27,
    photo:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'w-6',
    name: 'Bridal Entry & Floral Walkway',
    slug: 'bride-makeup',
    tag: 'Bridal Walkway',
    description:
      'Phoolon ki chaadar, fireworks entry & candlelit floral carpet',
    startingPrice: '₹6,999',
    count: 18,
    photo:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'w-7',
    name: 'Luxury Banquets & Lawns',
    slug: 'venue-decoration',
    tag: 'Venues & Lawns',
    description: 'Royal farmhouses, AC banquets & open-air garden properties',
    startingPrice: '₹45,000',
    count: 33,
    photo:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'w-8',
    name: 'Wedding Drone & Photography',
    slug: 'photography-setup',
    tag: 'Photo & Film',
    description:
      'Cinematic 4K wedding films, candid photography & aerial drone',
    startingPrice: '₹29,999',
    count: 32,
    photo:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=85',
  },
];

export function useWeddingServices() {
  const { data } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async () => (await catalogService.getCategories()).data ?? [],
    staleTime: 5 * 60_000,
  });

  const categories = data ?? [];

  // Map curated tiles with live category slugs if found, otherwise keep rich curated tile defaults
  const tiles: WeddingTileItem[] = CURATED_WEDDING_TILES.map(curated => {
    const matched = categories.find(
      cat =>
        cat.slug === curated.slug ||
        cat.name
          .toLowerCase()
          .includes(curated.name.toLowerCase().split(' ')[0]),
    );
    return {
      id: matched?.id || curated.id,
      name: curated.name,
      slug: matched?.slug || curated.slug,
      photo: curated.photo,
      tag: curated.tag,
      description: curated.description,
      startingPrice: curated.startingPrice,
      count: matched?.serviceCount || curated.count,
    };
  });

  return { tiles };
}
