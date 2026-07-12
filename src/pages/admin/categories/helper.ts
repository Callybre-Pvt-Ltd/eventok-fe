import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services';
export function useAdminCategories() {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });
  return { categories: query.data?.data ?? [], isLoading: query.isLoading };
}
