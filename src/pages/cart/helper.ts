import { useState } from 'react';
import { useCartLines } from '@/hooks/storefront/use-cart-lines';

export function useCartPage() {
  const { lines, totals, basket } = useCartLines();
  const [coupon, setCoupon] = useState('');

  return { lines, totals, basket, coupon, setCoupon };
}
