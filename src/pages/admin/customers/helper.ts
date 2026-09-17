import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services';
import type { User } from '@/types';

export function useAdminCustomers() {
  const query = useQuery({
    queryKey: ['admin-customers'],
    queryFn: async () => {
      const res = await authService.listUsers('CLIENT');
      if (res.error) throw new Error(res.error);
      return (res.data ?? []) as User[];
    },
  });

  return {
    customers: query.data ?? [],
    isLoading: query.isLoading,
  };
}
