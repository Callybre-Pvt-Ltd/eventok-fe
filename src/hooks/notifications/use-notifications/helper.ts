import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { notificationService } from '@/services';

export const notificationsQueryKey = (userId: string) =>
  ['notifications', userId] as const;

/** The signed-in user's notifications; every caller shares one cache entry and shape. */
export function useNotifications(options: { refetchInterval?: number } = {}) {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';

  const query = useQuery({
    queryKey: notificationsQueryKey(userId),
    queryFn: async () => {
      const res = await notificationService.list(userId);
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
    enabled: Boolean(userId),
    refetchInterval: options.refetchInterval,
  });

  return { ...query, userId };
}
