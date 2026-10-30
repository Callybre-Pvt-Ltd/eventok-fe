import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { vendorService } from '@/services';
import { findCity } from '@/constants/indiaLocations';

export interface GroupedStateCoverage {
  stateId: string;
  stateName: string;
  count: number;
  cities: { cityId: string; cityName: string }[];
}

export function useLocationPicker(vendorId: string) {
  const queryClient = useQueryClient();

  const statesQuery = useQuery({
    queryKey: ['states'],
    queryFn: () => vendorService.listStates(),
  });
  const states = useMemo(
    () => statesQuery.data?.data ?? [],
    [statesQuery.data],
  );

  const [selectedStateId, setSelectedStateId] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const citiesQuery = useQuery({
    queryKey: ['cities', selectedStateId],
    queryFn: () => vendorService.listCities(selectedStateId),
    enabled: !!selectedStateId,
  });
  const cities = useMemo(
    () => citiesQuery.data?.data ?? [],
    [citiesQuery.data],
  );

  const locationsQuery = useQuery({
    queryKey: ['vendor-locations', vendorId],
    queryFn: () => vendorService.getVendorLocations(vendorId),
    enabled: !!vendorId,
  });

  const [selectedCityIds, setSelectedCityIds] = useState<string[]>([]);
  const [knownCities, setKnownCities] = useState<
    Map<
      string,
      { cityId: string; cityName: string; stateId: string; stateName: string }
    >
  >(new Map());

  const savedLocations = useMemo(
    () => locationsQuery.data?.data ?? [],
    [locationsQuery.data],
  );

  // Sync saved locations into selected IDs and registry
  useEffect(() => {
    if (savedLocations.length > 0) {
      setSelectedCityIds(savedLocations.map(l => l.city_id));
      setKnownCities(prev => {
        const next = new Map(prev);
        for (const loc of savedLocations) {
          next.set(loc.city_id, {
            cityId: loc.city_id,
            cityName: loc.city_name,
            stateId: loc.state_id,
            stateName: loc.state_name,
          });
        }
        return next;
      });
      // Optionally focus on the first saved state if none selected
      if (!selectedStateId && savedLocations[0]?.state_id) {
        setSelectedStateId(savedLocations[0].state_id);
      }
    }
  }, [savedLocations, selectedStateId]);

  // Sync freshly loaded cities for active state into registry
  useEffect(() => {
    if (cities.length > 0 && selectedStateId) {
      const stateObj = states.find(s => s.id === selectedStateId);
      const stateName = stateObj?.name ?? 'State';
      setKnownCities(prev => {
        const next = new Map(prev);
        for (const city of cities) {
          next.set(city.id, {
            cityId: city.id,
            cityName: city.name,
            stateId: selectedStateId,
            stateName,
          });
        }
        return next;
      });
    }
  }, [cities, selectedStateId, states]);

  const toggleCity = (cityId: string) => {
    setSelectedCityIds(prev =>
      prev.includes(cityId)
        ? prev.filter(id => id !== cityId)
        : [...prev, cityId],
    );
  };

  const removeCity = (cityId: string) => {
    setSelectedCityIds(prev => prev.filter(id => id !== cityId));
  };

  const currentStateCities = cities;

  const selectedStateCityIds = useMemo(() => {
    if (!selectedStateId || !currentStateCities.length) return [];
    const set = new Set(currentStateCities.map(c => c.id));
    return selectedCityIds.filter(id => set.has(id));
  }, [selectedStateId, currentStateCities, selectedCityIds]);

  const setSelectedStateCityIds = (newCityIdsForCurrentState: string[]) => {
    const currentStateCityIds = new Set(currentStateCities.map(c => c.id));
    setSelectedCityIds(prev => {
      const otherStateCityIds = prev.filter(id => !currentStateCityIds.has(id));
      return [...otherStateCityIds, ...newCityIdsForCurrentState];
    });
  };

  const filteredCurrentCities = useMemo(() => {
    if (!citySearch.trim()) return currentStateCities;
    const q = citySearch.toLowerCase();
    return currentStateCities.filter(c => c.name.toLowerCase().includes(q));
  }, [currentStateCities, citySearch]);

  const allCurrentStateSelected = useMemo(() => {
    if (!currentStateCities.length) return false;
    return currentStateCities.every(c => selectedCityIds.includes(c.id));
  }, [currentStateCities, selectedCityIds]);

  const toggleAllCurrentState = () => {
    const currentIds = currentStateCities.map(c => c.id);
    if (allCurrentStateSelected) {
      setSelectedCityIds(prev => prev.filter(id => !currentIds.includes(id)));
    } else {
      setSelectedCityIds(prev => Array.from(new Set([...prev, ...currentIds])));
    }
  };

  const removeStateCities = (stateId: string) => {
    const citiesToRemove = Array.from(knownCities.values())
      .filter(c => c.stateId === stateId)
      .map(c => c.cityId);
    setSelectedCityIds(prev => prev.filter(id => !citiesToRemove.includes(id)));
  };

  const groupedCoverage = useMemo<GroupedStateCoverage[]>(() => {
    const map = new Map<
      string,
      { stateName: string; cities: { cityId: string; cityName: string }[] }
    >();
    for (const cityId of selectedCityIds) {
      let meta = knownCities.get(cityId);
      if (!meta) {
        const found = findCity(cityId);
        if (found) {
          meta = {
            cityId: found.city.id,
            cityName: found.city.name,
            stateId: found.state.id,
            stateName: found.state.name,
          };
        }
      }
      if (!meta) continue;
      const existing = map.get(meta.stateId) || {
        stateName: meta.stateName,
        cities: [],
      };
      existing.cities.push({ cityId: meta.cityId, cityName: meta.cityName });
      map.set(meta.stateId, existing);
    }
    return Array.from(map.entries()).map(([stateId, data]) => ({
      stateId,
      stateName: data.stateName,
      count: data.cities.length,
      cities: data.cities,
    }));
  }, [selectedCityIds, knownCities]);

  const saveMutation = useMutation({
    mutationFn: () =>
      vendorService.replaceVendorLocations(vendorId, selectedCityIds),
    onSuccess: res => {
      if (res.error) {
        message.error(res.error);
        return;
      }
      message.success('Service locations updated');
      queryClient.invalidateQueries({
        queryKey: ['vendor-locations', vendorId],
      });
    },
  });

  return {
    states,
    selectedStateId,
    setSelectedStateId,
    cities: filteredCurrentCities,
    allCitiesInCurrentState: currentStateCities,
    selectedCityIds,
    selectedStateCityIds,
    setSelectedStateCityIds,
    toggleCity,
    removeCity,
    citySearch,
    setCitySearch,
    allCurrentStateSelected,
    toggleAllCurrentState,
    removeStateCities,
    groupedCoverage,
    savedLocations,
    isLoading: statesQuery.isLoading || locationsQuery.isLoading,
    isCitiesLoading: citiesQuery.isLoading,
    saveMutation,
  };
}
