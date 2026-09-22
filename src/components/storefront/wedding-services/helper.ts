import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';

const WEDDING_SLUGS = [
  'mandap-decoration',
  'stage-decoration',
  'engagement-decor',
  'haldi-decoration',
  'venue-decoration',
  'mehendi-decoration',
  'lighting-and-sound',
  'bride-makeup',
];

const COLLAGE = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=70',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=70',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=70',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=70',
];

export function useWeddingServices() {
  const { data } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async () => (await catalogService.getCategories()).data ?? [],
    staleTime: 5 * 60_000,
  });

  const tiles = WEDDING_SLUGS.map(slug =>
    (data ?? []).find(category => category.slug === slug),
  ).filter((item): item is NonNullable<typeof item> => Boolean(item));

  return { tiles, collage: COLLAGE };
}
