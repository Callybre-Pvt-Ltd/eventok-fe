import { useQuery } from '@tanstack/react-query';
import { marketplaceService } from '@/services/marketplaceService';

export function usePdpAddons(serviceId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['storefront', 'addons', serviceId],
    queryFn: async () => {
      const res = await marketplaceService.listServiceAddons(serviceId);
      if (res.error) return [];
      return res.data ?? [];
    },
    enabled: Boolean(serviceId),
  });

  return { addons: data ?? [], isLoading };
}
