import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { bookingService, notificationService } from '@/services';
export function useCustomerDashboard() {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const bookings = useQuery({
    queryKey: ['customer-bookings', userId],
    queryFn: () => bookingService.getCustomerBookings(userId),
    enabled: !!userId,
  });
  const notifications = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => notificationService.getAll(userId),
    enabled: !!userId,
  });
  const upcoming = (bookings.data?.data ?? []).filter(
    b => b.status !== 'completed' && b.status !== 'cancelled',
  );
  const unread = (notifications.data?.data ?? []).filter(n => !n.read).length;
  return {
    upcoming: upcoming.length,
    unread,
    bookings: bookings.data?.data ?? [],
    isLoading: bookings.isLoading,
  };
}
