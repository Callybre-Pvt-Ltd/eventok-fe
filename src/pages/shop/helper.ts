import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { CATALOG_MAX_PRICE } from '@/constants/catalog';
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
  });

  const { data: services, isLoading } = useQuery({
    queryKey: [
      'storefront',
      'shop',
      { search, eventType, categorySlug, maxPrice, selectedTags },
    ],
    queryFn: async () =>
      (
        await catalogService.list({
          search,
          eventType,
          categorySlug,
          maxPrice,
          tags: selectedTags,
        })
      ).data ?? [],
  });

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

  return {
    services: services ?? [],
    isLoading,
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
