import type { Notification, ServiceResponse } from '@/types';
import { mockNotifications } from '@/mock';
import { delay } from '@/utils/delay';

let notifications = [...mockNotifications];

export const notificationService = {
  async getAll(userId: string): Promise<ServiceResponse<Notification[]>> {
    await delay();
    return {
      data: notifications.filter(n => n.userId === userId),
      error: null,
    };
  },

  async markRead(id: string): Promise<ServiceResponse<Notification>> {
    await delay(200);
    const idx = notifications.findIndex(n => n.id === id);
    if (idx === -1) return { data: null, error: 'Notification not found' };
    notifications[idx] = { ...notifications[idx], read: true };
    return { data: notifications[idx], error: null };
  },

  async markAllRead(userId: string): Promise<ServiceResponse<null>> {
    await delay(200);
    notifications = notifications.map(n =>
      n.userId === userId ? { ...n, read: true } : n,
    );
    return { data: null, error: null };
  },
};
