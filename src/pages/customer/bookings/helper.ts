import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { bookingService } from '@/services';
export function useCustomerBookings() {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const query = useQuery({
    queryKey: ['customer-bookings', userId],
    queryFn: () => bookingService.getCustomerBookings(userId),
    enabled: !!userId,
  });
  return {
    bookings: query.data?.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
