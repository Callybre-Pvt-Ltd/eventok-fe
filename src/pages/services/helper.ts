import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { gsap, useGSAP } from '@/hooks/gsap/setup';
import { marketplaceService } from '@/services';
import {
  applyQuickChip,
  clearFilterKey,
  defaultFilters,
  filterVendors,
  getActiveFilterPills,
  PAGE_SIZE,
  type DiscoveryFilters,
  type DiscoveryVendor,
} from './filters';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const sortToApi = (sort: DiscoveryFilters['sort']) => {
  if (sort === 'newest') return 'newest';
  if (sort === 'budget') return 'price_asc';
  if (sort === 'premium') return 'price_desc';
  if (sort === 'alpha') return 'title';
  return undefined;
};

export function useServicesPage() {
  const scope = useRef<HTMLElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<DiscoveryFilters>(() => {
    const type = searchParams.get('type') ?? '';
    const q = searchParams.get('q') ?? '';
    return {
      ...defaultFilters,
      ...(type ? { categories: [type] } : null),
      ...(q ? { query: q } : null),
    };
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [consultVendor, setConsultVendor] = useState<DiscoveryVendor | null>(
    null,
  );
  const [consultSent, setConsultSent] = useState(false);

  const categoriesQuery = useQuery({
    queryKey: ['marketplace', 'categories'],
    queryFn: async () => {
      const res = await marketplaceService.listCategories();
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
  });

  const categoryId = useMemo(() => {
    if (!filters.categories.length) return undefined;
    const cats = categoriesQuery.data ?? [];
    const match = cats.find(
      c =>
        filters.categories.includes(c.slug) ||
        filters.categories.includes(c.id) ||
        filters.categories.includes(c.name.toLowerCase()),
    );
    return match?.id;
  }, [filters.categories, categoriesQuery.data]);

  const servicesQuery = useQuery({
    queryKey: [
      'marketplace',
      'services',
      filters.query,
      categoryId,
      filters.budgetMin,
      filters.budgetMax,
      filters.cities[0],
      filters.sort,
    ],
    queryFn: async () => {
      const res = await marketplaceService.listServices({
        q: filters.query || undefined,
        category_id: categoryId,
        min_price: filters.budgetMin > 25_000 ? filters.budgetMin : undefined,
        max_price:
          filters.budgetMax < 1_000_000 ? filters.budgetMax : undefined,
        city: filters.cities[0],
        sort: sortToApi(filters.sort),
        page: 1,
        page_size: 20,
      });
      if (res.error) throw new Error(res.error);
      return res.data ?? { items: [], total: 0, pages: 0 };
    },
  });

  const filtered = useMemo(() => {
    const items = servicesQuery.data?.items ?? [];
    return filterVendors(items, {
      ...filters,
      // category already applied via API when id matched
      categories: categoryId ? [] : filters.categories,
      budgetMin: 25_000,
      budgetMax: 1_000_000,
      query: '',
    });
  }, [servicesQuery.data?.items, filters, categoryId]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  const pills = useMemo(() => getActiveFilterPills(filters), [filters]);
  const hasMore = visibleCount < filtered.length;
  const activeFilterCount = pills.length;
  const isFiltering = servicesQuery.isFetching;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  const patch = useCallback((partial: Partial<DiscoveryFilters>) => {
    setFilters(prev => ({ ...prev, ...partial }));
  }, []);

  const clearAll = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const removePill = useCallback((key: string) => {
    setFilters(prev => clearFilterKey(prev, key));
  }, []);

  const toggleQuick = useCallback((chipId: string) => {
    setFilters(prev => applyQuickChip(prev, chipId));
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  }, []);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore || isFiltering) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) loadMore();
      },
      { rootMargin: '220px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, isFiltering, loadMore, visible.length]);

  const openConsult = useCallback((vendor: DiscoveryVendor) => {
    setConsultVendor(vendor);
    setConsultSent(false);
  }, []);

  const closeConsult = useCallback(() => {
    setConsultVendor(null);
    setConsultSent(false);
  }, []);

  const submitConsult = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConsultSent(true);
  }, []);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;
      gsap.from('[data-disc-hero]', {
        opacity: 0,
        y: 18,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.06,
      });
      gsap.from('[data-disc-filter]', {
        opacity: 0,
        y: 10,
        duration: 0.45,
        delay: 0.08,
        ease: 'power3.out',
      });
    },
    { scope },
  );

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion() || isFiltering) return;
      const cards = gsap.utils.toArray<HTMLElement>('[data-disc-card]', root);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power3.out',
          clearProps: 'transform',
        },
      );
    },
    { scope, dependencies: [visible.length, isFiltering, filters] },
  );

  return {
    scope,
    loadMoreRef,
    filters,
    patch,
    clearAll,
    removePill,
    toggleQuick,
    pills,
    filtered,
    visible,
    hasMore,
    loadMore,
    isFiltering,
    mobileOpen,
    setMobileOpen,
    moreOpen,
    setMoreOpen,
    sortOpen,
    setSortOpen,
    activeFilterCount,
    consultVendor,
    openConsult,
    closeConsult,
    consultSent,
    submitConsult,
    categories: categoriesQuery.data ?? [],
    error: servicesQuery.error ? (servicesQuery.error as Error).message : null,
  };
}
