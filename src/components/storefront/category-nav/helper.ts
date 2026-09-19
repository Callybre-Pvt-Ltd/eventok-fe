import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '@/constants/routes';
import { catalogService } from '@/services';
import type { CatalogEventType } from '@/types/catalog';

interface NavGroup {
  key: string;
  labelKey: string;
  to: string;
  eventType?: CatalogEventType;
  children: { slug: string; name: string; serviceCount?: number }[];
}

const GROUPS: Omit<NavGroup, 'children'>[] = [
  { key: 'all', labelKey: 'storefront.navAllServices', to: ROUTES.SHOP },
  { key: 'packages', labelKey: 'storefront.navPackages', to: ROUTES.PACKAGES },
  {
    key: 'wedding',
    labelKey: 'storefront.navWedding',
    to: `${ROUTES.SHOP}?event=wedding`,
    eventType: 'wedding',
  },
  {
    key: 'birthday',
    labelKey: 'storefront.navBirthday',
    to: `${ROUTES.SHOP}?event=birthday`,
    eventType: 'birthday',
  },
  {
    key: 'anniversary',
    labelKey: 'storefront.navAnniversary',
    to: `${ROUTES.SHOP}?event=anniversary`,
    eventType: 'anniversary',
  },
  {
    key: 'baby-shower',
    labelKey: 'storefront.navBabyShower',
    to: `${ROUTES.SHOP}?event=baby-shower`,
    eventType: 'baby-shower',
  },
  {
    key: 'corporate',
    labelKey: 'storefront.navCorporate',
    to: `${ROUTES.SHOP}?event=corporate`,
    eventType: 'corporate',
  },
];

export function useCategoryNav() {
  const { data: categories } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async () => (await catalogService.getCategories()).data ?? [],
  });

  const groups = useMemo(
    () =>
      GROUPS.map(group => ({
        ...group,
        children: group.eventType
          ? (categories ?? [])
              .filter(category => category.eventType === group.eventType)
              .slice(0, 8)
              .map(c => ({
                slug: c.slug,
                name: c.name,
                serviceCount: c.serviceCount,
              }))
          : [],
      })),
    [categories],
  );

  return { groups };
}
