import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';

export interface WeddingTileItem {
  id: string;
  name: string;
  slug: string;
  photo: string;
}

const CURATED_WEDDING_TILES: WeddingTileItem[] = [
  {
    id: 'w-1',
    name: 'Engagement / Ring Ceremony',
    slug: 'engagement-decor',
    photo:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=85',
  },
  {
    id: 'w-2',
    name: 'Haldi Ceremony',
    slug: 'haldi-decoration',
    photo:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=85',
  },
  {
    id: 'w-3',
    name: 'Mehendi & Sangeet Night',
    slug: 'mehendi-decoration',
    photo:
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=400&q=85',
  },
  {
    id: 'w-4',
    name: 'Varmala Stage',
    slug: 'stage-decoration',
    photo:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=85',
  },
  {
    id: 'w-5',
    name: 'Mandap Decor',
    slug: 'mandap-decoration',
    photo:
      'https://images.unsplash.com/photo-1520854221256-17451b9916eb?auto=format&fit=crop&w=400&q=85',
  },
  {
    id: 'w-6',
    name: 'Reception & Cocktail',
    slug: 'venue-decoration',
    photo:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=85',
  },
  {
    id: 'w-7',
    name: 'Wedding Drone Setup',
    slug: 'lighting-and-sound',
    photo:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=400&q=85',
  },
  {
    id: 'w-8',
    name: 'Bridal Entry Decor',
    slug: 'bride-makeup',
    photo:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=85',
  },
];

const COLLAGE = [
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=85', // Romantic Veil
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=85', // Rustic Floral Banquet
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=85', // Festive Evening Lights
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=85', // Petal Toss Aisle
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
        cat.name.toLowerCase().includes(curated.name.toLowerCase().split(' ')[0]),
    );
    return {
      id: matched?.id || curated.id,
      name: curated.name,
      slug: matched?.slug || curated.slug,
      photo: curated.photo,
    };
  });

  return { tiles, collage: COLLAGE };
}
