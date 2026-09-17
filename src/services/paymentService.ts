import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { Payment, ServiceResponse } from '@/types';

export interface PaymentCreateResult {
  payment_id: string;
  booking_id: string;
  razorpay_order_id: string;
  razorpay_key_id: string | null;
  amount: string | number;
  currency: string;
  status: string;
}

interface ApiPayment {
  id: string;
  booking_id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  amount: string | number;
  currency: string;
  status: string;
  paid_at: string | null;
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

const mapPayment = (p: ApiPayment, customerId = ''): Payment => ({
  id: p.id,
  bookingId: p.booking_id,
  customerId,
  amount: Number(p.amount),
  type: 'advance',
  status:
    p.status === 'SUCCESS'
      ? 'completed'
      : p.status === 'REFUNDED'
        ? 'refunded'
        : p.status === 'FAILED' || p.status === 'CANCELLED'
          ? 'failed'
          : 'pending',
  createdAt: p.created_at,
});

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

const loadRazorpayScript = () =>
  new Promise<boolean>(resolve => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export const paymentService = {
  async getHistory(_customerId: string): Promise<ServiceResponse<Payment[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiPayment>('/admin/payments', {
        query: { page: 1, page_size: 50 },
      }).catch(async () => {
        // clients may not have admin access — return empty gracefully
        return {
          success: true,
          items: [] as ApiPayment[],
          total: 0,
          page: 1,
          page_size: 50,
          pages: 0,
        };
      });
      return page.items.map(p => mapPayment(p, _customerId));
    });
  },

  async getAllPayments(): Promise<ServiceResponse<Payment[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiPayment>('/admin/payments', {
        query: { page: 1, page_size: 100 },
      });
      return page.items.map(p => mapPayment(p));
    });
  },

  async createForBooking(
    bookingId: string,
  ): Promise<ServiceResponse<PaymentCreateResult>> {
    return wrap(() =>
      apiRequest<PaymentCreateResult>(`/bookings/${bookingId}/payments`, {
        method: 'POST',
      }),
    );
  },

  async openCheckout(options: {
    bookingId: string;
    name?: string;
    email?: string;
    onSuccess?: () => void;
    onDismiss?: () => void;
  }): Promise<ServiceResponse<{ configured: boolean; message?: string }>> {
    return wrap(async () => {
      const order = await apiRequest<PaymentCreateResult>(
        `/bookings/${options.bookingId}/payments`,
        { method: 'POST' },
      );

      if (!order.razorpay_key_id) {
        return {
          configured: false,
          message:
            'Payments are not configured. Set RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET on the API.',
        };
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new ApiError('Could not load Razorpay checkout', 'EXTERNAL', 502);
      }

      const rzp = new window.Razorpay({
        key: order.razorpay_key_id,
        amount: Math.round(Number(order.amount) * 100),
        currency: order.currency || 'INR',
        name: 'EventOK',
        description: 'Service booking payment',
        order_id: order.razorpay_order_id,
        prefill: {
          name: options.name,
          email: options.email,
        },
        handler: () => {
          options.onSuccess?.();
        },
        modal: {
          ondismiss: () => options.onDismiss?.(),
        },
      });
      rzp.open();
      return { configured: true };
    });
  },

  async createPayment(payload: {
    bookingId: string;
    customerId: string;
    amount: number;
    type: Payment['type'];
  }): Promise<ServiceResponse<Payment>> {
    return wrap(async () => {
      const order = await apiRequest<PaymentCreateResult>(
        `/bookings/${payload.bookingId}/payments`,
        { method: 'POST' },
      );
      return {
        id: order.payment_id,
        bookingId: order.booking_id,
        customerId: payload.customerId,
        amount: Number(order.amount),
        type: payload.type,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
    });
  },

  async refund(paymentId: string): Promise<ServiceResponse<Payment>> {
    return wrap(async () => {
      await apiRequest(`/payments/${paymentId}/refunds`, {
        method: 'POST',
        body: { amount: null, reason: 'Admin refund' },
      });
      const payment = await apiRequest<ApiPayment>(`/payments/${paymentId}`);
      return mapPayment(payment);
    });
  },
};
