import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { categoryService } from '@/services';

export function useAdminCategories() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ['categories', 'decoration'],
    queryFn: async () => {
      await categoryService.ensureDecorationCategories();
      const res = await categoryService.getAll();
      if (res.error) throw new Error(res.error);
      return (res.data ?? []).filter(c => c.id);
    },
  });

  const ensureMutation = useMutation({
    mutationFn: async () => {
      const res = await categoryService.ensureDecorationCategories();
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['categories'] });
      message.success('Decoration categories synced');
    },
    onError: (err: Error) => message.error(err.message),
  });

  return {
    categories: query.data ?? [],
    isLoading: query.isLoading,
    ensureMutation,
  };
}
