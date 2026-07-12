import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services';
export function useAdminAnalytics() {
  const query = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => analyticsService.getDashboardStats(),
  });
  return { stats: query.data?.data, isLoading: query.isLoading };
}
