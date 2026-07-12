import { useQuery } from '@tanstack/react-query';
import { paymentService } from '@/services';
export function useAdminPayments() {
  const query = useQuery({
    queryKey: ['all-payments'],
    queryFn: () => paymentService.getAllPayments(),
  });
  return { payments: query.data?.data ?? [], isLoading: query.isLoading };
}
