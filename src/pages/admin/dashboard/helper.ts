import { useQuery } from '@tanstack/react-query';
import { analyticsService, bookingService, vendorService } from '@/services';

export function useAdminDashboard() {
  const statsQuery = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => analyticsService.getDashboardStats(),
  });

  const vendorsQuery = useQuery({
    queryKey: ['admin-vendors'],
    queryFn: () => vendorService.getAdminVendors(),
  });

  const bookingsQuery = useQuery({
    queryKey: ['admin-all-bookings'],
    queryFn: () => bookingService.getAllBookings(),
  });

  const pendingVendors = (vendorsQuery.data?.data ?? []).filter(
    v => v.status === 'pending' || v.status === 'under_review',
  );

  const recentBookings = (bookingsQuery.data?.data ?? []).slice(0, 5);

  return {
    stats: statsQuery.data?.data,
    pendingVendors,
    recentBookings,
    isLoading:
      statsQuery.isLoading || vendorsQuery.isLoading || bookingsQuery.isLoading,
  };
}
