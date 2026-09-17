import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';

export function usePreviousWork() {
  const { data } = useQuery({
    queryKey: ['storefront', 'previous-work'],
    queryFn: async () => (await catalogService.getPreviousWork()).data ?? [],
  });

  return { items: data ?? [] };
}
