import { useQuery } from '@tanstack/react-query';
import { paymentService } from '@/services';

export function useAdminRefunds() {
  const query = useQuery({
    queryKey: ['admin-refunds'],
    queryFn: () => paymentService.getAllRefunds(),
  });
  return { refunds: query.data?.data ?? [], isLoading: query.isLoading };
}
