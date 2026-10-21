import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import {
  notificationsQueryKey,
  useNotifications,
} from '@/hooks/notifications/use-notifications';
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const query = useNotifications({ refetchInterval: POLL_INTERVAL_MS });
  const { userId } = query;

  const invalidate = useCallback(
    () =>
      queryClient.invalidateQueries({
        queryKey: notificationsQueryKey(userId),
      }),
    [queryClient, userId],
  );

  const markRead = useMutation({
    mutationFn: (id: string) => notificationService.markRead(id),
    onSuccess: invalidate,
  });

  // One refetch for the whole batch instead of one per notification.
  const markAll = useMutation({
    mutationFn: (ids: string[]) =>
      Promise.all(ids.map(id => notificationService.markRead(id))),
    onSettled: invalidate,
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
    const unread = notifications
      .filter(item => !item.read)
      .map(item => item.id);
    if (unread.length) markAll.mutate(unread);
  }, [markAll, notifications]);

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
