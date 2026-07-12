import { useQuery } from '@tanstack/react-query';
import { bookingService } from '@/services';
export function useAdminBookings() {
  const query = useQuery({
    queryKey: ['all-bookings'],
    queryFn: () => bookingService.getAllBookings(),
  });
  return { bookings: query.data?.data ?? [], isLoading: query.isLoading };
}
