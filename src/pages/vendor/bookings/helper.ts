import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { vendorService, bookingService } from '@/services';
import type { Booking, BookingStatus } from '@/types';

const toNumber = (value: string | number | null | undefined): number => {
  if (value === null || value === undefined) return 0;
  return typeof value === 'number' ? value : Number(value) || 0;
};

export function useVendorBookings() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
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

  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>(
    'all',
  );
  const [rejectTarget, setRejectTarget] = useState<Booking | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const bookings = useMemo(() => query.data?.data ?? [], [query.data]);
  const filtered = useMemo(
    () =>
      statusFilter === 'all'
        ? bookings
        : bookings.filter(b => b.status === statusFilter),
    [bookings, statusFilter],
  );

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['vendor-bookings', vendorId] });

  const acceptMutation = useMutation({
    mutationFn: (bookingId: string) => bookingService.vendorAccept(bookingId),
    onSuccess: res => {
      if (res.error) {
        message.error(res.error);
        return;
      }
      message.success('Booking accepted');
      invalidate();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({
      bookingId,
      reason,
    }: {
      bookingId: string;
      reason: string;
    }) => bookingService.vendorReject(bookingId, reason),
    onSuccess: res => {
      if (res.error) {
        message.error(res.error);
        return;
      }
      message.success('Booking rejected');
      setRejectTarget(null);
      setRejectReason('');
      invalidate();
    },
  });

  const openReject = (booking: Booking) => {
    setRejectTarget(booking);
    setRejectReason('');
  };

  const closeReject = () => {
    setRejectTarget(null);
    setRejectReason('');
  };

  const confirmReject = () => {
    if (!rejectTarget || !rejectReason.trim()) return;
    rejectMutation.mutate({
      bookingId: rejectTarget.id,
      reason: rejectReason.trim(),
    });
  };

  return {
    bookings: filtered,
    isLoading: query.isLoading,
    statusFilter,
    setStatusFilter,
    acceptMutation,
    rejectMutation,
    rejectTarget,
    rejectReason,
    setRejectReason,
    openReject,
    closeReject,
    confirmReject,
    refundAmount: toNumber(rejectTarget?.advanceAmount),
  };
}
