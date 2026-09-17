import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';

export function usePackagesShowcase() {
  const { data } = useQuery({
    queryKey: ['storefront', 'packages'],
    queryFn: async () => (await catalogService.getPackages()).data ?? [],
  });

  return { packages: data ?? [] };
}
