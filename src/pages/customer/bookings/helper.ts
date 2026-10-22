import { useMemo } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { bookingService } from '@/services';
import { isContactVisible } from '@/utils/booking-status';

export interface VendorContact {
  name: string;
  mobileNumber: string | null;
}

export function useCustomerBookings() {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';

  const query = useQuery({
    queryKey: ['customer-bookings', userId],
    queryFn: async () => {
      const res = await bookingService.getCustomerBookings(userId);
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
    enabled: Boolean(userId),
  });

  const bookings = useMemo(() => query.data ?? [], [query.data]);

  // The API only releases the vendor's details once the booking is accepted, so the lookup
  // is limited to those rows rather than attempted (and refused) for every booking.
  const contactable = bookings.filter(booking =>
    isContactVisible(booking.status),
  );

  const contactQueries = useQueries({
    queries: contactable.map(booking => ({
      queryKey: ['booking-contact', booking.id],
      queryFn: async () => {
        const res = await bookingService.getContact(booking.id);
        if (res.error || !res.data) return null;
        return {
          name: res.data.name,
          mobileNumber: res.data.mobile_number,
        } satisfies VendorContact;
      },
      staleTime: 5 * 60_000,
    })),
  });

  const vendorContacts = new Map<string, VendorContact>();
  contactable.forEach((booking, index) => {
    const contact = contactQueries[index]?.data;
    if (contact) vendorContacts.set(booking.id, contact);
  });

  return {
    bookings,
    vendorContacts,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
