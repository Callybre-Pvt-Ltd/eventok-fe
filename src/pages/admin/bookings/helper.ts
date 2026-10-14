import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { bookingService, vendorService } from '@/services';

export const ALL_VENDORS = 'all';

export function useAdminBookings() {
  const [search, setSearch] = useState('');
  const [vendorId, setVendorId] = useState<string>(ALL_VENDORS);
  const debouncedSearch = useDebouncedValue(search);

  const vendorsQuery = useQuery({
    queryKey: ['admin', 'vendors', 'options'],
    queryFn: async () => {
      const res = await vendorService.getAdminVendors();
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
    staleTime: 60_000,
  });

  const bookingsQuery = useQuery({
    queryKey: ['admin', 'bookings', debouncedSearch, vendorId],
    queryFn: async () => {
      const res = await bookingService.getAdminBookings({
        q: debouncedSearch || undefined,
        vendorId: vendorId === ALL_VENDORS ? undefined : vendorId,
      });
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
  });

  const vendorOptions = useMemo(
    () => [
      { value: ALL_VENDORS, label: 'All vendors' },
      ...(vendorsQuery.data ?? []).map(vendor => ({
        value: vendor.id,
        label: vendor.businessName,
      })),
    ],
    [vendorsQuery.data],
  );

  return {
    bookings: bookingsQuery.data ?? [],
    isLoading: bookingsQuery.isLoading,
    isFetching: bookingsQuery.isFetching,
    error:
      bookingsQuery.error instanceof Error ? bookingsQuery.error.message : null,
    refetch: bookingsQuery.refetch,
    search,
    setSearch,
    vendorId,
    setVendorId,
    vendorOptions,
  };
}
