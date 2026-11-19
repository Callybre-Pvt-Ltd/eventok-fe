import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_CATEGORY_TILES } from '@/components/storefront/category-tiles/helper';
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
    queryFn: async () => {
      const res = await catalogService.getCategories();
      if (res.data && res.data.length > 0) return res.data;
      return DEFAULT_CATEGORY_TILES;
    },
    staleTime: 5 * 60_000,
  });

  const resolvedCategories =
    categories && categories.length > 0 ? categories : DEFAULT_CATEGORY_TILES;

  const groups = useMemo(
    () =>
      GROUPS.map(group => ({
        ...group,
        children: group.eventType
          ? resolvedCategories
              .filter(category => category.eventType === group.eventType)
              .slice(0, 8)
              .map(c => ({
                slug: c.slug,
                name: c.name,
                serviceCount: c.serviceCount,
              }))
          : [],
      })),
    [resolvedCategories],
  );

  return { groups };
}
