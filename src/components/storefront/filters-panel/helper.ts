import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';
import type { CatalogCategory, CatalogEventType } from '@/types/catalog';

export function useFiltersPanel(
  activeEventType: CatalogEventType | 'all' = 'all',
) {
  const [categorySearch, setCategorySearch] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sort: true,
    eventType: true,
    budget: true,
    categories: true,
    preferences: true,
  });

  const { data } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async (): Promise<CatalogCategory[]> =>
      (await catalogService.getCategories()).data ?? [],
    staleTime: 5 * 60_000,
  });

  const allCategories = useMemo(() => data ?? [], [data]);

  const filteredCategories = useMemo(() => {
    const q = categorySearch.trim().toLowerCase();
    return allCategories.filter(cat => {
      const matchesEvent =
        activeEventType === 'all' || cat.eventType === activeEventType;
      const matchesQuery = !q || cat.name.toLowerCase().includes(q);
      return matchesEvent && matchesQuery;
    });
  }, [allCategories, activeEventType, categorySearch]);

  const toggleSection = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  return {
    categories: filteredCategories,
    totalCategories: allCategories.length,
    categorySearch,
    setCategorySearch,
    openSections,
    toggleSection,
  };
}
