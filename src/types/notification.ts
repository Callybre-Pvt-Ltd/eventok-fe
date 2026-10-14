export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  read: boolean;
  createdAt: string;
  /** Type-specific payload, e.g. `booking_id` on booking notifications. */
  data?: Record<string, unknown> | null;
}
