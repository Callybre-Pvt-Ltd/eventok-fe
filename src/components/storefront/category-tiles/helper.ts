import { useQuery } from '@tanstack/react-query';
import { DEFAULT_CATEGORY_TILES } from '@/constants/catalog';
import { catalogService } from '@/services';
import type { CatalogCategory } from '@/types/catalog';

export { DEFAULT_CATEGORY_TILES };

export function useCategoryTiles(limit?: number) {
  const { data, isLoading } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async () => {
      const res = await catalogService.getCategories();
      if (res.data && res.data.length > 0) return res.data;
      return DEFAULT_CATEGORY_TILES;
    },
    staleTime: 5 * 60_000,
  });

  const source = data && data.length > 0 ? data : DEFAULT_CATEGORY_TILES;
  const categories: CatalogCategory[] = limit ? source.slice(0, limit) : source;

  return { categories, isLoading };
}
