import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { vendorService, bookingService } from '@/services';
export function useVendorBookings() {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const vendorQuery = useQuery({
    queryKey: ['vendor-profile', userId],
    queryFn: () => vendorService.getVendorByUserId(userId),
    enabled: !!userId,
  });
  const vendorId = vendorQuery.data?.data?.id ?? '';
  const query = useQuery({
    queryKey: ['vendor-bookings', vendorId],
    queryFn: () => bookingService.getVendorBookings(vendorId),
    enabled: !!vendorId,
  });
  return { bookings: query.data?.data ?? [], isLoading: query.isLoading };
}
