import { useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';

export function useServiceRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<string>('all');

  const { data: categories } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async () => (await catalogService.getCategories()).data ?? [],
  });

  const { data } = useQuery({
    queryKey: ['storefront', 'services', 'all'],
    queryFn: async () => (await catalogService.list()).data ?? [],
  });

  const tabs = useMemo(() => {
    const base = [{ value: 'all', label: 'All' }];
    const cats = (categories ?? []).slice(0, 6).map(c => ({
      value: c.slug,
      label: c.name,
    }));
    return [...base, ...cats];
  }, [categories]);

  const services = useMemo(() => {
    const all = data ?? [];
    if (tab === 'all') return all;
    return all.filter(service => service.categorySlug === tab);
  }, [data, tab]);

  const scrollBy = (direction: 1 | -1) => {
    railRef.current?.scrollBy({
      left: direction * (railRef.current.clientWidth * 0.8),
      behavior: 'smooth',
    });
  };

  return { tabs, tab, setTab, services, railRef, scrollBy };
}
