import type { Payment, ServiceResponse } from '@/types';
import { mockPayments } from '@/mock';
import { delay } from '@/utils/delay';

let payments = [...mockPayments];

export const paymentService = {
  async getHistory(customerId: string): Promise<ServiceResponse<Payment[]>> {
    await delay();
    return {
      data: payments.filter(p => p.customerId === customerId),
      error: null,
    };
  },

  async getAllPayments(): Promise<ServiceResponse<Payment[]>> {
    await delay();
    return { data: [...payments], error: null };
  },

  async createPayment(payload: {
    bookingId: string;
    customerId: string;
    amount: number;
    type: Payment['type'];
  }): Promise<ServiceResponse<Payment>> {
    await delay(600);
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      ...payload,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };
    payments.push(payment);
    return { data: payment, error: null };
  },

  async refund(paymentId: string): Promise<ServiceResponse<Payment>> {
    await delay();
    const idx = payments.findIndex(p => p.id === paymentId);
    if (idx === -1) return { data: null, error: 'Payment not found' };
    payments[idx] = { ...payments[idx], status: 'refunded' };
    return { data: payments[idx], error: null };
  },
};
