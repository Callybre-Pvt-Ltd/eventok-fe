import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';

export type PackageSort =
  | 'recommended'
  | 'price_asc'
  | 'price_desc'
  | 'savings';

export const PACKAGE_BUDGET_LIMITS = [
  { id: 'all', label: 'Any budget', max: Number.POSITIVE_INFINITY },
  { id: '25k', label: 'Under ₹25,000', max: 25000 },
  { id: '50k', label: 'Under ₹50,000', max: 50000 },
  { id: '1l', label: 'Under ₹1,00,000', max: 100000 },
] as const;

export function usePackagesShowcase() {
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState('all');
  const [budgetId, setBudgetId] = useState<string>('all');
  const [sort, setSort] = useState<PackageSort>('recommended');

  const { data } = useQuery({
    queryKey: ['storefront', 'packages'],
    queryFn: async () => (await catalogService.getPackages()).data ?? [],
  });

  const allPackages = useMemo(() => data ?? [], [data]);

  const providers = useMemo(() => {
    const names = new Set(
      allPackages.map(pkg => pkg.vendorName.trim()).filter(Boolean),
    );
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [allPackages]);

  const filteredPackages = useMemo(() => {
    const term = query.trim().toLowerCase();
    const maxBudget =
      PACKAGE_BUDGET_LIMITS.find(b => b.id === budgetId)?.max ??
      Number.POSITIVE_INFINITY;

    const list = allPackages.filter(pkg => {
      if (provider !== 'all' && pkg.vendorName.trim() !== provider) {
        return false;
      }
      if (pkg.startingPrice > maxBudget) return false;
      if (!term) return true;
      return (
        pkg.name.toLowerCase().includes(term) ||
        pkg.description.toLowerCase().includes(term) ||
        pkg.vendorName.toLowerCase().includes(term)
      );
    });

    if (sort === 'price_asc') {
      return [...list].sort((a, b) => a.startingPrice - b.startingPrice);
    }
    if (sort === 'price_desc') {
      return [...list].sort((a, b) => b.startingPrice - a.startingPrice);
    }
    if (sort === 'savings') {
      return [...list].sort((a, b) => b.savings - a.savings);
    }
    return list;
  }, [allPackages, budgetId, provider, query, sort]);

  const hasFilters =
    Boolean(query.trim()) ||
    provider !== 'all' ||
    budgetId !== 'all' ||
    sort !== 'recommended';

  const reset = () => {
    setQuery('');
    setProvider('all');
    setBudgetId('all');
    setSort('recommended');
  };

  return {
    packages: allPackages,
    filteredPackages,
    providers,
    query,
    setQuery,
    provider,
    setProvider,
    budgetId,
    setBudgetId,
    sort,
    setSort,
    hasFilters,
    reset,
  };
}
