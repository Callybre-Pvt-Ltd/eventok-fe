import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { vendorService, categoryService } from '@/services';
import { useTheme } from '@/theme';

export function useVendorsPage() {
  const { palette } = useTheme();
  const [params] = useSearchParams();
  const categorySlug = params.get('category') ?? '';
  const cityFilter = params.get('city') ?? params.get('location') ?? '';
  const vendorsQuery = useQuery({
    queryKey: ['vendors'],
    queryFn: () => vendorService.getPublicVendors(),
  });
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });
  const categories = categoriesQuery.data?.data ?? [];
  const categoryId = categories.find(c => c.slug === categorySlug)?.id;
  const filtered = useMemo(() => {
    let list = vendorsQuery.data?.data ?? [];
    if (categoryId) list = list.filter(v => v.categories.includes(categoryId));
    if (cityFilter) {
      const q = cityFilter.toLowerCase();
      list = list.filter(v => v.city.toLowerCase().includes(q));
    }
    return list;
  }, [vendorsQuery.data?.data, categoryId, cityFilter]);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map(c => [c.id, c.name])),
    [categories],
  );

  return {
    palette,
    filtered,
    categoryMap,
    isLoading: vendorsQuery.isLoading,
    error: vendorsQuery.error,
    refetch: vendorsQuery.refetch,
  };
}
