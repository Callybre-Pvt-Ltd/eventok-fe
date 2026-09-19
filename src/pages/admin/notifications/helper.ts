import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { notificationService } from '@/services';

export function useAdminNotifications() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const userId = session?.user.id ?? '';

  const query = useQuery({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      const res = await notificationService.getAll(userId);
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
    enabled: !!userId,
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const res = await notificationService.markRead(id);
      if (res.error) throw new Error(res.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
    },
    onError: (err: Error) => message.error(err.message),
  });

  return {
    notifications: query.data ?? [],
    isLoading: query.isLoading,
    markRead,
  };
}
