import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { apiRequest } from '@/api/client';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { vendorService, type ApiServiceAddon } from '@/services/vendorService';
import type { AdminApiService } from '@/services/vendorService';
import {
  marketplaceService,
  type ApiCategory,
  type ApiServiceImage,
} from '@/services/marketplaceService';

/** Mirrors the backend `ServiceStatus` enum; there is no approval state — vendors publish. */
export type ServiceStatusFilter = 'all' | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

export const ALL_CATEGORIES = 'all';
export const ALL_VENDORS = 'all';

export function useAdminServices() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ServiceStatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);
  const [vendorFilter, setVendorFilter] = useState(ALL_VENDORS);
  const [selectedService, setSelectedService] =
    useState<AdminApiService | null>(null);

  const debouncedSearch = useDebouncedValue(searchTerm);

  const { data: categories = [] } = useQuery<ApiCategory[]>({
    queryKey: ['categories'],
    queryFn: async () => (await marketplaceService.listCategories()).data ?? [],
    staleTime: 60_000,
  });

  const categoryMap = useMemo(
    () => new Map(categories.map(category => [category.id, category.name])),
    [categories],
  );

  const { data: vendors = [] } = useQuery({
    queryKey: ['admin', 'vendors', 'options'],
    queryFn: async () => {
      const res = await vendorService.getAdminVendors();
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
    staleTime: 60_000,
  });

  const vendorOptions = useMemo(
    () => [
      { value: ALL_VENDORS, label: 'All vendors' },
      ...vendors.map(vendor => ({
        value: vendor.id,
        label: vendor.businessName,
      })),
    ],
    [vendors],
  );

  const servicesQuery = useQuery({
    queryKey: [
      'admin-services',
      statusFilter,
      categoryFilter,
      vendorFilter,
      debouncedSearch,
    ],
    queryFn: async () => {
      const res = await vendorService.listAdminServices({
        status: statusFilter === 'all' ? undefined : statusFilter,
        category_id:
          categoryFilter === ALL_CATEGORIES ? undefined : categoryFilter,
        vendor_id: vendorFilter === ALL_VENDORS ? undefined : vendorFilter,
        q: debouncedSearch || undefined,
        page_size: 100,
      });
      if (res.error) throw new Error(res.error);
      return res.data?.items ?? [];
    },
  });

  const { data: drawerImages = [] } = useQuery<ApiServiceImage[]>({
    queryKey: ['admin-service-images', selectedService?.id],
    queryFn: async () => {
      if (!selectedService) return [];
      try {
        return (
          (await apiRequest<ApiServiceImage[]>(
            `/services/${selectedService.id}/images`,
            { auth: false },
          )) ?? []
        );
      } catch {
        return [];
      }
    },
    enabled: Boolean(selectedService),
  });

  const { data: drawerAddons = [] } = useQuery<ApiServiceAddon[]>({
    queryKey: ['admin-service-addons', selectedService?.id],
    queryFn: async () => {
      if (!selectedService) return [];
      const res = await vendorService.listServiceAddons(selectedService.id);
      return res.data ?? [];
    },
    enabled: Boolean(selectedService),
  });

  const deleteMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const res = await vendorService.deleteAdminService(serviceId);
      if (res.error) throw new Error(res.error);
    },
    onSuccess: () => {
      message.success('Service removed from the marketplace');
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setSelectedService(null);
    },
    onError: (error: Error) => message.error(error.message),
  });

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    vendorFilter,
    setVendorFilter,
    vendorOptions,
    categories,
    categoryMap,
    services: servicesQuery.data ?? [],
    isLoading: servicesQuery.isLoading,
    isFetching: servicesQuery.isFetching,
    error:
      servicesQuery.error instanceof Error ? servicesQuery.error.message : null,
    refetch: servicesQuery.refetch,
    selectedService,
    setSelectedService,
    drawerImages,
    drawerAddons,
    deleteMutation,
  };
}
