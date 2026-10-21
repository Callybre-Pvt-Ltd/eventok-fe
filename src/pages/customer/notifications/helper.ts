import { useNotifications } from '@/hooks/notifications/use-notifications';

export function useCustomerNotifications() {
  const query = useNotifications();
  return { notifications: query.data ?? [], isLoading: query.isLoading };
}
