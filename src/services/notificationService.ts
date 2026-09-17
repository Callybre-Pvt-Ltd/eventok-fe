import type { Notification, ServiceResponse } from '@/types';

export const notificationService = {
  async list(_userId: string): Promise<ServiceResponse<Notification[]>> {
    return { data: [], error: null };
  },

  async getAll(userId: string): Promise<ServiceResponse<Notification[]>> {
    return notificationService.list(userId);
  },

  async markRead(_id: string): Promise<ServiceResponse<null>> {
    return { data: null, error: null };
  },
};
