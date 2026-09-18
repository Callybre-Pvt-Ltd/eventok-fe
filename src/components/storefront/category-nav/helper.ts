import { useMemo } from 'react';
import { ROUTES } from '@/constants/routes';

interface NavGroup {
  key: string;
  labelKey: string;
  to: string;
  children: { slug: string; name: string; serviceCount?: number }[];
}

const GROUPS: NavGroup[] = [
  {
    key: 'all',
    labelKey: 'storefront.navAllServices',
    to: ROUTES.SERVICES,
    children: [],
  },
  {
    key: 'wedding',
    labelKey: 'storefront.navWedding',
    to: `${ROUTES.SERVICES}?type=wedding`,
    children: [],
  },
  {
    key: 'birthday',
    labelKey: 'storefront.navBirthday',
    to: `${ROUTES.SERVICES}?type=birthday`,
    children: [],
  },
  {
    key: 'corporate',
    labelKey: 'storefront.navCorporate',
    to: `${ROUTES.SERVICES}?type=corporate`,
    children: [],
  },
  {
    key: 'photography',
    labelKey: 'storefront.navPhotography',
    to: `${ROUTES.SERVICES}?type=photography`,
    children: [],
  },
];

export function useCategoryNav() {
  const groups = useMemo(() => GROUPS, []);
  return { groups };
}
