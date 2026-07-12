import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { notificationService } from '@/services';
export function useCustomerNotifications() {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const query = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => notificationService.getAll(userId),
    enabled: !!userId,
  });
  return { notifications: query.data?.data ?? [], isLoading: query.isLoading };
}
