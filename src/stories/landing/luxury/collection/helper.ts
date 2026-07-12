import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services';

export function useLuxuryCollection() {
  const query = useQuery({
    queryKey: ['luxury-services'],
    queryFn: () => categoryService.getAll(),
  });

  return {
    services: (query.data?.data ?? []).slice(0, 3),
    isLoading: query.isLoading,
  };
}
