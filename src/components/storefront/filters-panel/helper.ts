import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';

export function useFiltersPanel() {
  const { data } = useQuery({
    queryKey: ['storefront', 'tags'],
    queryFn: async (): Promise<string[]> =>
      (await catalogService.getTags()).data ?? [],
  });

  return { tags: data ?? [] };
}
