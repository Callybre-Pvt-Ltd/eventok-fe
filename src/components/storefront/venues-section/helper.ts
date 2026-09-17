import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';

export function useVenuesSection() {
  const { data } = useQuery({
    queryKey: ['storefront', 'venues'],
    queryFn: async () => (await catalogService.getVenues()).data ?? [],
  });

  return { venues: data ?? [] };
}
