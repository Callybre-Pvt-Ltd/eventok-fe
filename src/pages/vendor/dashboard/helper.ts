import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { vendorService, bookingService } from '@/services';
export function useVendorDashboard() {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const vendorQuery = useQuery({
    queryKey: ['vendor-profile', userId],
    queryFn: () => vendorService.getVendorByUserId(userId),
    enabled: !!userId,
  });
  const vendor = vendorQuery.data?.data;
  const bookingsQuery = useQuery({
    queryKey: ['vendor-bookings', vendor?.id],
    queryFn: () => bookingService.getVendorBookings(vendor!.id),
    enabled: !!vendor?.id,
  });
  const bookings = bookingsQuery.data?.data ?? [];
  const active = bookings.filter(
    b => !['completed', 'cancelled'].includes(b.status),
  );
  return {
    vendor,
    totalBookings: bookings.length,
    activeBookings: active.length,
    rating: vendor?.rating ?? 0,
    isLoading: vendorQuery.isLoading,
    isPending: session?.user.vendorStatus === 'pending',
  };
}
