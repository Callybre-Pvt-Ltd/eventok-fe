import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { bookingService } from '@/services';
import { withNextPath } from '@/utils/auth/auth-return';
import { marketplaceService } from '@/services/marketplaceService';
import type { CatalogService } from '@/types/catalog';
import { catalogService } from '@/services';

export interface PackageDetail {
  id: string;
  name: string;
  description: string;
  vendorName: string;
  price: number;
  customerPrice: number;
  individualTotal: number;
  savings: number;
  services: CatalogService[];
}

export function usePackageDetailPage() {
  const { packageId = '' } = useParams<{ packageId: string }>();
  const { session } = useAuth();
  const navigate = useNavigate();
  const [eventDate, setEventDate] = useState('');

  const { data, isLoading, error } = useQuery<PackageDetail | null>({
    queryKey: ['storefront', 'package', packageId],
    queryFn: async () => {
      const res = await marketplaceService.getPackage(packageId);
      if (res.error || !res.data) {
        throw new Error(res.error ?? 'Package not found');
      }
      const pkg = res.data;
      // Each bundled service is resolved so the page can show what is actually included
      // rather than just a price.
      const services = await catalogService.getManyBySlug(pkg.service_ids);
      return {
        id: pkg.id,
        name: pkg.name,
        description: pkg.description ?? '',
        vendorName: pkg.vendor_name ?? '',
        price: Number(pkg.price) || 0,
        customerPrice: Number(pkg.customer_price) || 0,
        individualTotal: Number(pkg.individual_total) || 0,
        savings: Number(pkg.savings) || 0,
        services,
      };
    },
    enabled: Boolean(packageId),
  });

  useEffect(() => {
    if (!data) return;
    const previous = document.title;
    document.title = data.name;
    return () => {
      document.title = previous;
    };
  }, [data]);

  const bookMutation = useMutation({
    mutationFn: async () => {
      const res = await bookingService.createDirectBooking({
        package_id: packageId,
        booking_date: eventDate,
      });
      if (res.error || !res.data)
        throw new Error(res.error ?? 'Booking failed');
      return res.data;
    },
    onSuccess: () => {
      message.success('Booking request sent — the vendor will confirm shortly');
      navigate(ROUTES.CUSTOMER_BOOKINGS);
    },
    onError: (bookingError: Error) => message.error(bookingError.message),
  });

  const book = useCallback(() => {
    if (!session) {
      navigate(withNextPath(ROUTES.LOGIN, `${ROUTES.PACKAGES}/${packageId}`));
      return;
    }
    if (!eventDate) {
      message.error('Pick the event date first');
      return;
    }
    bookMutation.mutate();
  }, [bookMutation, eventDate, navigate, packageId, session]);

  return {
    pkg: data ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    eventDate,
    setEventDate,
    book,
    isBooking: bookMutation.isPending,
    isSignedIn: Boolean(session),
  };
}
