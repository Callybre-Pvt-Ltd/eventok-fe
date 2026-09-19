import { useQuery } from '@tanstack/react-query';
import { vendorService } from '@/services';

export function useVendorEarnings() {
  const query = useQuery({
    queryKey: ['vendor', 'payouts'],
    queryFn: async () => {
      const res = await vendorService.listMyPayouts();
      if (res.error) throw new Error(res.error);
      const items = res.data ?? [];
      const total = items.reduce(
        (sum, p) => sum + Number(p.vendor_amount ?? p.amount ?? 0),
        0,
      );
      const pending = items
        .filter(p => p.status === 'PENDING' || p.status === 'PROCESSING')
        .reduce(
          (sum, p) => sum + Number(p.vendor_amount ?? p.amount ?? 0),
          0,
        );
      return { total, pending, items };
    },
  });

  return {
    total: query.data?.total ?? 0,
    pending: query.data?.pending ?? 0,
    items: query.data?.items ?? [],
    isLoading: query.isLoading,
  };
}
