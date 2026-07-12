import type { Category, Review, ServiceResponse } from '@/types';
import { mockCategories, mockReviews } from '@/mock';
import { delay } from '@/utils/delay';

let categories = [...mockCategories];

export const categoryService = {
  async getAll(): Promise<ServiceResponse<Category[]>> {
    await delay();
    return { data: [...categories], error: null };
  },

  async create(
    payload: Omit<Category, 'id'>,
  ): Promise<ServiceResponse<Category>> {
    await delay();
    const category: Category = { ...payload, id: `cat-${Date.now()}` };
    categories.push(category);
    return { data: category, error: null };
  },

  async remove(id: string): Promise<ServiceResponse<null>> {
    await delay();
    categories = categories.filter(c => c.id !== id);
    return { data: null, error: null };
  },
};

export const reviewService = {
  async getByVendor(vendorId: string): Promise<ServiceResponse<Review[]>> {
    await delay();
    return {
      data: mockReviews.filter(r => r.vendorId === vendorId),
      error: null,
    };
  },

  async getFeatured(): Promise<ServiceResponse<Review[]>> {
    await delay();
    return { data: mockReviews.slice(0, 3), error: null };
  },
};

export const analyticsService = {
  async getDashboardStats(): Promise<
    ServiceResponse<{
      totalVendors: number;
      pendingApprovals: number;
      totalBookings: number;
      totalRevenue: number;
      totalCustomers: number;
    }>
  > {
    await delay();
    return {
      data: {
        totalVendors: 4,
        pendingApprovals: 1,
        totalBookings: 2,
        totalRevenue: 50000,
        totalCustomers: 1,
      },
      error: null,
    };
  },
};
