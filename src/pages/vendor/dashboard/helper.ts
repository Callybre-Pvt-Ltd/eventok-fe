import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { vendorService, bookingService } from '@/services';
import type { Booking } from '@/types';

const toNumber = (value: string | number | null | undefined): number => {
  if (value === null || value === undefined) return 0;
  return typeof value === 'number' ? value : Number(value) || 0;
};

const isFutureOrToday = (isoDate: string): boolean => {
  const date = new Date(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

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
  const bookings = useMemo(
    () => bookingsQuery.data?.data ?? [],
    [bookingsQuery.data],
  );

  const packagesQuery = useQuery({
    queryKey: ['vendor-packages', vendor?.id],
    queryFn: () => vendorService.listPackages(vendor!.id),
    enabled: !!vendor?.id,
  });

  const servicesQuery = useQuery({
    queryKey: ['vendor-services-count', vendor?.id],
    queryFn: () => vendorService.listMyServices(vendor!.id),
    enabled: !!vendor?.id,
  });

  const pendingRequests = useMemo(
    () =>
      bookings.filter((b: Booking) => b.status === 'pending_vendor_acceptance'),
    [bookings],
  );

  const upcomingBookings = useMemo(
    () =>
      bookings
        .filter(
          (b: Booking) =>
            (b.status === 'confirmed' || b.status === 'in_progress') &&
            isFutureOrToday(b.eventDate),
        )
        .sort((a: Booking, b: Booking) =>
          a.eventDate.localeCompare(b.eventDate),
        ),
    [bookings],
  );

  const active = bookings.filter(
    (b: Booking) => !['completed', 'cancelled', 'rejected'].includes(b.status),
  );

  const revenue = useMemo(
    () =>
      bookings
        .filter((b: Booking) =>
          ['confirmed', 'in_progress', 'completed'].includes(b.status),
        )
        .reduce((sum: number, b: Booking) => sum + toNumber(b.totalAmount), 0),
    [bookings],
  );

  return {
    vendor,
    pendingRequests,
    upcomingBookings,
    totalBookings: bookings.length,
    activeBookings: active.length,
    revenue,
    servicesCount: servicesQuery.data?.data?.length ?? 0,
    packagesCount: packagesQuery.data?.data?.length ?? 0,
    rating: vendor?.rating ?? 0,
    isLoading: vendorQuery.isLoading,
    isPending: session?.user.vendorStatus === 'pending',
    vendorStatus: vendor?.status ?? 'pending',
  };
}
