import { useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';
import type { CatalogEventType } from '@/types/catalog';

const TABS: { value: CatalogEventType; labelKey: string }[] = [
  { value: 'anniversary', labelKey: 'storefront.navAnniversary' },
  { value: 'baby-shower', labelKey: 'storefront.navBabyShower' },
  { value: 'birthday', labelKey: 'storefront.navBirthday' },
  { value: 'wedding', labelKey: 'storefront.navWedding' },
  { value: 'home-decoration', labelKey: 'storefront.navHomeDecoration' },
];

export function useServiceRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<CatalogEventType>('anniversary');

  const { data } = useQuery({
    queryKey: ['storefront', 'services', 'all'],
    queryFn: async () => (await catalogService.list()).data ?? [],
  });

  const services = useMemo(
    () => (data ?? []).filter(service => service.eventType === tab),
    [data, tab],
  );

  const scrollBy = (direction: 1 | -1) => {
    railRef.current?.scrollBy({
      left: direction * (railRef.current.clientWidth * 0.8),
      behavior: 'smooth',
    });
  };

  return { tabs: TABS, tab, setTab, services, railRef, scrollBy };
}
