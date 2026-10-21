import { useCallback, useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { CATALOG_MAX_PRICE } from '@/constants/catalog';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { catalogService } from '@/services';
import type { CatalogEventType } from '@/types/catalog';

export function useShopPage() {
  const [params, setParams] = useSearchParams();
  const { slug: categorySlug } = useParams<{ slug?: string }>();

  const search = params.get('q') ?? '';
  const eventType = (params.get('event') ?? 'all') as CatalogEventType | 'all';
  const maxPrice = Number(params.get('max') ?? CATALOG_MAX_PRICE);
  const selectedTags = useMemo(
    () => params.getAll('tag').filter(Boolean),
    [params],
  );

  const { data: categories } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async () => (await catalogService.getCategories()).data ?? [],
    staleTime: 5 * 60_000,
  });

  // Only server-side filters belong in the key; the slider and search settle first so a
  // drag does not fire a request per step.
  const debouncedSearch = useDebouncedValue(search);
  const debouncedMaxPrice = useDebouncedValue(maxPrice);
  const { data: fetched, isLoading } = useQuery({
    queryKey: [
      'storefront',
      'shop',
      { search: debouncedSearch, categorySlug, maxPrice: debouncedMaxPrice },
    ],
    queryFn: async () =>
      (
        await catalogService.list({
          search: debouncedSearch,
          categorySlug,
          maxPrice: debouncedMaxPrice,
        })
      ).data ?? [],
    placeholderData: keepPreviousData,
  });

  const services = useMemo(
    () =>
      (fetched ?? []).filter(
        item =>
          (eventType === 'all' || item.eventType === eventType) &&
          (!selectedTags.length ||
            selectedTags.some(tag => item.tags.includes(tag))),
      ),
    [eventType, fetched, selectedTags],
  );

  const update = useCallback(
    (mutate: (next: URLSearchParams) => void) => {
      const next = new URLSearchParams(params);
      mutate(next);
      setParams(next, { replace: true });
    },
    [params, setParams],
  );

  const setEventType = useCallback(
    (value: CatalogEventType | 'all') =>
      update(next => {
        if (value === 'all') next.delete('event');
        else next.set('event', value);
      }),
    [update],
  );

  const setMaxPrice = useCallback(
    (value: number) => update(next => next.set('max', String(value))),
    [update],
  );

  const toggleTag = useCallback(
    (tag: string) =>
      update(next => {
        const current = next.getAll('tag');
        next.delete('tag');
        const toggled = current.includes(tag)
          ? current.filter(item => item !== tag)
          : [...current, tag];
        toggled.forEach(item => next.append('tag', item));
      }),
    [update],
  );

  const reset = useCallback(
    () => setParams(new URLSearchParams()),
    [setParams],
  );

  const category = (categories ?? []).find(item => item.slug === categorySlug);

  // Phones get the filters in a bottom sheet instead of a column above the results.
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount =
    selectedTags.length + (maxPrice < CATALOG_MAX_PRICE ? 1 : 0);

  return {
    services,
    isLoading,
    filtersOpen,
    openFilters: () => setFiltersOpen(true),
    closeFilters: () => setFiltersOpen(false),
    activeFilterCount,
    search,
    eventType,
    maxPrice,
    selectedTags,
    category,
    setEventType,
    setMaxPrice,
    toggleTag,
    reset,
  };
}
