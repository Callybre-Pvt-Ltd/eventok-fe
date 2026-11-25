import { useCallback, useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { CATALOG_MAX_PRICE, EVENT_TYPE_FILTERS } from '@/constants/catalog';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { catalogService } from '@/services';
import type { CatalogEventType, CatalogSortOption } from '@/types/catalog';
import { formatPrice } from '@/utils/storefront/pricing';

export interface ActiveFilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

export function useShopPage() {
  const [params, setParams] = useSearchParams();
  const { slug: categorySlug } = useParams<{ slug?: string }>();

  const search = params.get('q') ?? '';
  const eventType = (params.get('event') ?? 'all') as CatalogEventType | 'all';
  const minPrice = Math.max(0, Number(params.get('min') ?? 0) || 0);
  const rawMax = params.get('max');
  const maxPrice =
    rawMax !== null
      ? Math.min(CATALOG_MAX_PRICE, Math.max(minPrice, Number(rawMax) || 0))
      : CATALOG_MAX_PRICE;
  const sort = (params.get('sort') ?? 'recommended') as CatalogSortOption;
  const hasPhotosOnly = params.get('photos') === '1';
  const hasInclusionsOnly = params.get('included') === '1';
  const hasPolicyOnly = params.get('flexible') === '1';
  const selectedTags = useMemo(
    () => params.getAll('tag').filter(Boolean),
    [params],
  );

  const { data: categories } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async () => (await catalogService.getCategories()).data ?? [],
    staleTime: 5 * 60_000,
  });

  // Debounce free-text search and budget sliders so dragging or typing stays smooth.
  const debouncedSearch = useDebouncedValue(search, 300);
  const debouncedMinPrice = useDebouncedValue(minPrice, 250);
  const debouncedMaxPrice = useDebouncedValue(maxPrice, 250);

  const {
    data: fetched,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      'storefront',
      'shop',
      {
        search: debouncedSearch,
        categorySlug,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
        sort,
      },
    ],
    queryFn: async () =>
      (
        await catalogService.list({
          search: debouncedSearch,
          categorySlug,
          minPrice: debouncedMinPrice,
          maxPrice: debouncedMaxPrice,
          sort,
        })
      ).data ?? [],
    placeholderData: keepPreviousData,
  });

  const services = useMemo(
    () =>
      (fetched ?? []).filter(item => {
        if (eventType !== 'all' && item.eventType !== eventType) return false;
        if (
          selectedTags.length > 0 &&
          !selectedTags.some(tag => item.tags.includes(tag))
        ) {
          return false;
        }
        if (hasPhotosOnly && item.images.length === 0) return false;
        if (hasInclusionsOnly && item.whatsIncluded.length === 0) return false;
        if (hasPolicyOnly && item.cancellationPolicy.length === 0) return false;
        return true;
      }),
    [
      eventType,
      fetched,
      hasInclusionsOnly,
      hasPhotosOnly,
      hasPolicyOnly,
      selectedTags,
    ],
  );

  const update = useCallback(
    (mutate: (next: URLSearchParams) => void) => {
      const next = new URLSearchParams(params);
      mutate(next);
      setParams(next, { replace: true });
    },
    [params, setParams],
  );

  const setSearch = useCallback(
    (value: string) =>
      update(next => {
        if (!value) next.delete('q');
        else next.set('q', value);
      }),
    [update],
  );

  const setEventType = useCallback(
    (value: CatalogEventType | 'all') =>
      update(next => {
        if (value === 'all') next.delete('event');
        else next.set('event', value);
      }),
    [update],
  );

  const setPriceRange = useCallback(
    (min: number, max: number) =>
      update(next => {
        if (min <= 0) next.delete('min');
        else next.set('min', String(min));
        if (max >= CATALOG_MAX_PRICE) next.delete('max');
        else next.set('max', String(max));
      }),
    [update],
  );

  const setSort = useCallback(
    (value: CatalogSortOption) =>
      update(next => {
        if (value === 'recommended') next.delete('sort');
        else next.set('sort', value);
      }),
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

  const togglePref = useCallback(
    (pref: 'photos' | 'included' | 'flexible') =>
      update(next => {
        if (next.get(pref) === '1') next.delete(pref);
        else next.set(pref, '1');
      }),
    [update],
  );

  const reset = useCallback(
    () => setParams(new URLSearchParams(), { replace: true }),
    [setParams],
  );

  const category = (categories ?? []).find(item => item.slug === categorySlug);

  const [filtersOpen, setFiltersOpen] = useState(false);
  useBodyScrollLock(filtersOpen);

  const activeFilters = useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = [];
    if (search.trim()) {
      chips.push({
        key: 'q',
        label: `“${search.trim()}”`,
        onRemove: () => setSearch(''),
      });
    }
    if (eventType !== 'all') {
      const label =
        EVENT_TYPE_FILTERS.find(f => f.value === eventType)?.label ?? eventType;
      chips.push({
        key: 'event',
        label,
        onRemove: () => setEventType('all'),
      });
    }
    if (minPrice > 0 || maxPrice < CATALOG_MAX_PRICE) {
      const label =
        minPrice > 0 && maxPrice < CATALOG_MAX_PRICE
          ? `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`
          : minPrice > 0
          ? `${formatPrice(minPrice)}+`
          : `Under ${formatPrice(maxPrice)}`;
      chips.push({
        key: 'budget',
        label,
        onRemove: () => setPriceRange(0, CATALOG_MAX_PRICE),
      });
    }
    selectedTags.forEach(tag => {
      chips.push({
        key: `tag:${tag}`,
        label: tag,
        onRemove: () => toggleTag(tag),
      });
    });
    if (hasPhotosOnly) {
      chips.push({
        key: 'photos',
        label: 'With photos',
        onRemove: () => togglePref('photos'),
      });
    }
    if (hasInclusionsOnly) {
      chips.push({
        key: 'included',
        label: 'Detailed inclusions',
        onRemove: () => togglePref('included'),
      });
    }
    if (hasPolicyOnly) {
      chips.push({
        key: 'flexible',
        label: 'Cancellation policy',
        onRemove: () => togglePref('flexible'),
      });
    }
    return chips;
  }, [
    eventType,
    hasInclusionsOnly,
    hasPhotosOnly,
    hasPolicyOnly,
    maxPrice,
    minPrice,
    search,
    selectedTags,
    setEventType,
    setPriceRange,
    setSearch,
    togglePref,
    toggleTag,
  ]);

  const activeFilterCount = activeFilters.length;

  return {
    services,
    isLoading,
    isFetching,
    filtersOpen,
    openFilters: () => setFiltersOpen(true),
    closeFilters: () => setFiltersOpen(false),
    activeFilters,
    activeFilterCount,
    search,
    eventType,
    minPrice,
    maxPrice,
    sort,
    hasPhotosOnly,
    hasInclusionsOnly,
    hasPolicyOnly,
    selectedTags,
    category,
    setSearch,
    setEventType,
    setPriceRange,
    setSort,
    toggleTag,
    togglePref,
    reset,
  };
}
