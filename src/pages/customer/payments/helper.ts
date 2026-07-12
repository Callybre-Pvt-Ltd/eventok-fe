import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { paymentService } from '@/services';
export function useCustomerPayments() {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const query = useQuery({
    queryKey: ['payments', userId],
    queryFn: () => paymentService.getHistory(userId),
    enabled: !!userId,
  });
  return { payments: query.data?.data ?? [], isLoading: query.isLoading };
}
