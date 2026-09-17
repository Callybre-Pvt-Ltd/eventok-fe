import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services';

export function useAdminAnalytics() {
  const dash = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => analyticsService.getDashboardStats(),
  });

  const range = useQuery({
    queryKey: ['admin-analytics-range'],
    queryFn: async () => {
      const to = new Date();
      const from = new Date();
      from.setDate(to.getDate() - 30);
      const res = await analyticsService.getAnalytics(
        from.toISOString().slice(0, 10),
        to.toISOString().slice(0, 10),
      );
      if (res.error) throw new Error(res.error);
      return res.data as {
        revenue?: { total_gross?: string | number };
      } | null;
    },
  });

  const stats = dash.data?.data
    ? {
        ...dash.data.data,
        totalRevenue: Number(range.data?.revenue?.total_gross ?? 0),
      }
    : undefined;

  return {
    stats,
    isLoading: dash.isLoading || range.isLoading,
  };
}
