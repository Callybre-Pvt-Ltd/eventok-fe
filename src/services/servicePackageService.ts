import type { ServicePackage, ServiceResponse } from '@/types';

export const servicePackageService = {
  async list(): Promise<ServiceResponse<ServicePackage[]>> {
    return { data: [], error: null };
  },
};
