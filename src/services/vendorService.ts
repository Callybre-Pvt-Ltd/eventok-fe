import type { PublicVendor, VendorPrivate, ServiceResponse } from '@/types';
import { mockVendors } from '@/mock';
import { delay } from '@/utils/delay';
import { toPublicVendor } from '@/utils/vendor';

let vendors = [...mockVendors];

export const vendorService = {
  async getPublicVendors(): Promise<ServiceResponse<PublicVendor[]>> {
    await delay();
    const approved = vendors
      .filter(v => v.status === 'approved')
      .map(toPublicVendor);
    return { data: approved, error: null };
  },

  async getFeaturedVendors(): Promise<ServiceResponse<PublicVendor[]>> {
    await delay();
    const featured = vendors
      .filter(v => v.status === 'approved' && v.featured)
      .map(toPublicVendor);
    return { data: featured, error: null };
  },

  async getPublicVendorById(
    id: string,
  ): Promise<ServiceResponse<PublicVendor>> {
    await delay();
    const vendor = vendors.find(v => v.id === id && v.status === 'approved');
    if (!vendor) return { data: null, error: 'Vendor not found' };
    return { data: toPublicVendor(vendor), error: null };
  },

  async getAdminVendors(): Promise<ServiceResponse<VendorPrivate[]>> {
    await delay();
    return { data: [...vendors], error: null };
  },

  async approveVendor(id: string): Promise<ServiceResponse<VendorPrivate>> {
    await delay();
    const idx = vendors.findIndex(v => v.id === id);
    if (idx === -1) return { data: null, error: 'Vendor not found' };
    vendors[idx] = { ...vendors[idx], status: 'approved' };
    return { data: vendors[idx], error: null };
  },

  async rejectVendor(
    id: string,
    _reason: string,
  ): Promise<ServiceResponse<VendorPrivate>> {
    await delay();
    const idx = vendors.findIndex(v => v.id === id);
    if (idx === -1) return { data: null, error: 'Vendor not found' };
    vendors[idx] = { ...vendors[idx], status: 'rejected' };
    return { data: vendors[idx], error: null };
  },

  async getVendorByUserId(
    userId: string,
  ): Promise<ServiceResponse<VendorPrivate>> {
    await delay();
    const vendor = vendors.find(v => v.userId === userId);
    if (!vendor) return { data: null, error: 'Vendor profile not found' };
    return { data: vendor, error: null };
  },

  async updatePortfolio(
    vendorId: string,
    portfolio: VendorPrivate['portfolio'],
  ): Promise<ServiceResponse<VendorPrivate>> {
    await delay();
    const idx = vendors.findIndex(v => v.id === vendorId);
    if (idx === -1) return { data: null, error: 'Vendor not found' };
    vendors[idx] = { ...vendors[idx], portfolio };
    return { data: vendors[idx], error: null };
  },

  getAll() {
    return vendors;
  },
};
