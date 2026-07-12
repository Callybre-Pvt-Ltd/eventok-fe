import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { vendorService } from '@/services';
export function useVendorPortfolio() {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const query = useQuery({
    queryKey: ['vendor-profile', userId],
    queryFn: () => vendorService.getVendorByUserId(userId),
    enabled: !!userId,
  });
  return {
    portfolio: query.data?.data?.portfolio ?? [],
    isLoading: query.isLoading,
  };
}
