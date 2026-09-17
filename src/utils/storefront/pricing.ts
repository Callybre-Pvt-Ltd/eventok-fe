import type { CatalogService } from '@/types/catalog';

export function formatPrice(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

export function discountPercent(service: CatalogService): number {
  if (service.originalPrice <= service.price) return 0;
  return Math.round(
    ((service.originalPrice - service.price) / service.originalPrice) * 100,
  );
}

export function savedAmount(service: CatalogService): number {
  return Math.max(service.originalPrice - service.price, 0);
}

export function cartTotals(
  lines: { service: CatalogService; quantity: number }[],
): {
  subtotal: number;
  dueNow: number;
  dueLater: number;
  savings: number;
} {
  const subtotal = lines.reduce(
    (sum, line) => sum + line.service.price * line.quantity,
    0,
  );
  const dueNow = lines.reduce(
    (sum, line) => sum + line.service.bookingAmount * line.quantity,
    0,
  );
  const savings = lines.reduce(
    (sum, line) => sum + savedAmount(line.service) * line.quantity,
    0,
  );
  return { subtotal, dueNow, dueLater: subtotal - dueNow, savings };
}
