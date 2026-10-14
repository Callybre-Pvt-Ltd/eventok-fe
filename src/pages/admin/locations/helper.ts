import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { vendorService, type ApiStateCoverage } from '@/services/vendorService';

export function useAdminLocations() {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: rawStates = [],
    isLoading,
    refetch,
  } = useQuery<ApiStateCoverage[]>({
    queryKey: ['admin-locations'],
    queryFn: async () => {
      const res = await vendorService.listAdminLocations();
      if (res.error) throw new Error(res.error);
      return res.data || [];
    },
  });

  const filteredStates = useMemo(() => {
    if (!searchTerm.trim()) return rawStates;
    const term = searchTerm.toLowerCase();

    return rawStates
      .map(state => {
        const stateMatches = state.name.toLowerCase().includes(term);
        const matchingCities = state.cities.filter(city =>
          city.name.toLowerCase().includes(term),
        );

        if (stateMatches) {
          return state;
        }
        if (matchingCities.length > 0) {
          return {
            ...state,
            cities: matchingCities,
          };
        }
        return null;
      })
      .filter((s): s is ApiStateCoverage => s !== null);
  }, [rawStates, searchTerm]);

  // Summary Metrics
  const metrics = useMemo(() => {
    const totalStates = rawStates.length;
    const totalCities = rawStates.reduce((acc, s) => acc + s.cities.length, 0);
    const totalVendors = rawStates.reduce((acc, s) => acc + s.total_vendors, 0);
    const activeStatesWithVendors = rawStates.filter(
      s => s.total_vendors > 0,
    ).length;

    return {
      totalStates,
      totalCities,
      totalVendors,
      activeStatesWithVendors,
    };
  }, [rawStates]);

  return {
    searchTerm,
    setSearchTerm,
    states: filteredStates,
    rawStates,
    metrics,
    isLoading,
    refetch,
  };
}
