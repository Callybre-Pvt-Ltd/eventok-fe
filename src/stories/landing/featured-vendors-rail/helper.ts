import { useQuery } from '@tanstack/react-query';
import { useDesignTokens } from '@/design-system';
import { vendorService } from '@/services';

export function useFeaturedVendorsRail() {
  const { colors } = useDesignTokens();
  const query = useQuery({
    queryKey: ['featured-vendors-rail'],
    queryFn: () => vendorService.getFeaturedVendors(),
  });

  return {
    colors,
    vendors: query.data?.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
