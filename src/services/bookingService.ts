import type { Booking, BookingRequest, ServiceResponse } from '@/types';
import { mockBookings } from '@/mock';
import { delay } from '@/utils/delay';

let bookings = [...mockBookings];

export const bookingService = {
  async createRequest(
    payload: Omit<BookingRequest, 'id' | 'status' | 'createdAt'>,
  ): Promise<ServiceResponse<Booking>> {
    await delay();
    const booking: Booking = {
      ...payload,
      id: `b-${Date.now()}`,
      status: 'requested',
      createdAt: new Date().toISOString(),
    };
    bookings.push(booking);
    return { data: booking, error: null };
  },

  async getCustomerBookings(
    customerId: string,
  ): Promise<ServiceResponse<Booking[]>> {
    await delay();
    return {
      data: bookings.filter(b => b.customerId === customerId),
      error: null,
    };
  },

  async getVendorBookings(
    vendorId: string,
  ): Promise<ServiceResponse<Booking[]>> {
    await delay();
    return {
      data: bookings.filter(
        b => b.assignedVendorId === vendorId || b.vendorId === vendorId,
      ),
      error: null,
    };
  },

  async getAllBookings(): Promise<ServiceResponse<Booking[]>> {
    await delay();
    return { data: [...bookings], error: null };
  },

  async assignVendor(
    bookingId: string,
    vendorId: string,
  ): Promise<ServiceResponse<Booking>> {
    await delay();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx === -1) return { data: null, error: 'Booking not found' };
    bookings[idx] = {
      ...bookings[idx],
      assignedVendorId: vendorId,
      status: 'vendor_assigned',
    };
    return { data: bookings[idx], error: null };
  },

  async updateStatus(
    bookingId: string,
    status: Booking['status'],
  ): Promise<ServiceResponse<Booking>> {
    await delay();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx === -1) return { data: null, error: 'Booking not found' };
    bookings[idx] = { ...bookings[idx], status };
    return { data: bookings[idx], error: null };
  },
};
