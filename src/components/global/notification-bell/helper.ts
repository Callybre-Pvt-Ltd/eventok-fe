import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { notificationService } from '@/services';
import type { Notification, UserRole } from '@/types';

/** Booking alerts are the only kind that currently has a destination. */
const BOOKING_TYPES = new Set([
  'BOOKING_REQUESTED',
  'BOOKING_CONFIRMED',
  'BOOKING_RESCHEDULED',
  'BOOKING_REMINDER',
]);

const BOOKINGS_ROUTE: Record<UserRole, string> = {
  admin: ROUTES.ADMIN_BOOKINGS,
  vendor: ROUTES.VENDOR_BOOKINGS,
  customer: ROUTES.CUSTOMER_BOOKINGS,
};

/** Where tapping a notification should land, or null when it has no destination. */
export function notificationTarget(
  notification: Notification,
  role: UserRole,
): string | null {
  if (!BOOKING_TYPES.has(notification.type)) return null;
  return BOOKINGS_ROUTE[role] ?? null;
}

const POLL_INTERVAL_MS = 60_000;

export function useNotificationBell(role: UserRole) {
  const { session } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = session?.user.id ?? '';
  const [open, setOpen] = useState(false);

  const query = useQuery({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      const res = await notificationService.list(userId);
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
    enabled: Boolean(userId),
    refetchInterval: POLL_INTERVAL_MS,
  });

  const markRead = useMutation({
    mutationFn: (id: string) => notificationService.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
    },
  });

  const notifications = useMemo(() => query.data ?? [], [query.data]);
  const unreadCount = notifications.filter(item => !item.read).length;

  const openNotification = useCallback(
    (notification: Notification) => {
      setOpen(false);
      if (!notification.read) markRead.mutate(notification.id);
      const target = notificationTarget(notification, role);
      if (target) navigate(target);
    },
    [markRead, navigate, role],
  );

  const markAllRead = useCallback(() => {
    notifications
      .filter(item => !item.read)
      .forEach(item => markRead.mutate(item.id));
  }, [markRead, notifications]);

  return {
    notifications,
    unreadCount,
    isLoading: query.isLoading,
    open,
    setOpen,
    openNotification,
    markAllRead,
    role,
  };
}
