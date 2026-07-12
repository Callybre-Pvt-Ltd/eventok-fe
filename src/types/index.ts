export type { User, UserRole, Session, VendorStatus } from './user';
export type {
  Category,
  PublicVendor,
  VendorPrivate,
  PortfolioMedia,
} from './vendor';
export type { Booking, BookingRequest, BookingStatus } from './booking';
export type { Review } from './review';
export type { ChatThread, Message } from './chat';
export type { Payment, Invoice, PaymentStatus, PaymentType } from './payment';
export type { Notification } from './notification';
export type { ServicePackage } from './servicePackage';

export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
}
