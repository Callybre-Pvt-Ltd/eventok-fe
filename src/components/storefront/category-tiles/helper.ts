import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';
import type { CatalogCategory } from '@/types/catalog';

export function useCategoryTiles(limit?: number) {
  const { data, isLoading } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async () => (await catalogService.getCategories()).data ?? [],
  });

  const categories: CatalogCategory[] = limit
    ? (data ?? []).slice(0, limit)
    : data ?? [];

  return { categories, isLoading };
}
