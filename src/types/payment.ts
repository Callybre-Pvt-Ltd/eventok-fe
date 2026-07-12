export type PaymentStatus = 'pending' | 'completed' | 'refunded' | 'failed';
export type PaymentType = 'advance' | 'full' | 'refund';

export interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  createdAt: string;
}

export interface Invoice {
  id: string;
  paymentId: string;
  bookingId: string;
  amount: number;
  issuedAt: string;
}
