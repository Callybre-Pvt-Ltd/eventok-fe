import { useQuery } from '@tanstack/react-query';
import { vendorService } from '@/services';
import type { PublicVendor } from '@/types';

export function useFeaturedVendors() {
  const query = useQuery({
    queryKey: ['featured-vendors'],
    queryFn: () => vendorService.getFeaturedVendors(),
  });

  const vendors: PublicVendor[] = query.data?.data ?? [];

  return {
    vendors,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
