import { useQuery } from '@tanstack/react-query';
import { vendorService } from '@/services';
export function useAdminVendors() {
  const query = useQuery({
    queryKey: ['admin-vendors'],
    queryFn: () => vendorService.getAdminVendors(),
  });
  return { vendors: query.data?.data ?? [], isLoading: query.isLoading };
}
