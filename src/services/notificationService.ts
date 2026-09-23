import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { Notification, ServiceResponse } from '@/types';

interface ApiNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

const wrap = async <T>(fn: () => Promise<T>): Promise<ServiceResponse<T>> => {
  try {
    return { data: await fn(), error: null };
  } catch (error) {
    const message =
      error instanceof ApiError ? error.message : 'Request failed';
    return { data: null, error: message };
  }
};

const mapNotification = (n: ApiNotification, userId: string): Notification => ({
  id: n.id,
  userId,
  title: n.title,
  body: n.body,
  type: n.type,
  read: n.is_read,
  createdAt: n.created_at,
});

export const notificationService = {
  async list(userId: string): Promise<ServiceResponse<Notification[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiNotification>(
        '/notifications',
        { query: { page: 1, page_size: 100 } },
      );
      return page.items.map(n => mapNotification(n, userId));
    });
  },

  async getAll(userId: string): Promise<ServiceResponse<Notification[]>> {
    return notificationService.list(userId);
  },

  async markRead(id: string): Promise<ServiceResponse<null>> {
    return wrap(async () => {
      await apiRequest(`/notifications/${id}`, {
        method: 'PATCH',
        body: { is_read: true },
      });
      return null;
    });
  },
};
