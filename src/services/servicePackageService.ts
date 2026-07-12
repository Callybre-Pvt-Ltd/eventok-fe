import type { ServicePackage, ServiceResponse } from '@/types';
import { mockServicePackages } from '@/mock/servicePackages';
import { delay } from '@/utils/delay';

export const servicePackageService = {
  async getAll(): Promise<ServiceResponse<ServicePackage[]>> {
    await delay();
    return { data: [...mockServicePackages], error: null };
  },

  async getByCategory(
    categorySlug: string,
  ): Promise<ServiceResponse<ServicePackage[]>> {
    await delay();
    return {
      data: mockServicePackages.filter(p => p.categorySlug === categorySlug),
      error: null,
    };
  },
};
