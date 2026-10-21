import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { useNotifications } from '@/hooks/notifications/use-notifications';
import { bookingService } from '@/services';
export function useCustomerDashboard() {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const bookings = useQuery({
    queryKey: ['customer-bookings', userId],
    queryFn: async () => {
      const res = await bookingService.getCustomerBookings(userId);
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
    enabled: !!userId,
  });
  const notifications = useNotifications();
  const upcoming = (bookings.data ?? []).filter(
    b => b.status !== 'completed' && b.status !== 'cancelled',
  );
  const unread = (notifications.data ?? []).filter(n => !n.read).length;
  return {
    upcoming: upcoming.length,
    unread,
    bookings: bookings.data ?? [],
    isLoading: bookings.isLoading,
  };
}
