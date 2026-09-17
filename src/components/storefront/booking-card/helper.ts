import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useBasket } from '@/hooks/storefront/use-basket';
import type { CatalogService } from '@/types/catalog';
import { formatPrice } from '@/utils/storefront/pricing';

export type PaymentMode = 'booking' | 'full';

export function useBookingCard(service: CatalogService) {
  const navigate = useNavigate();
  const { addToCart } = useBasket();
  const [mode, setMode] = useState<PaymentMode>('booking');

  const book = useCallback(() => {
    addToCart(service.slug);
    navigate(ROUTES.CHECKOUT);
  }, [addToCart, navigate, service.slug]);

  const addOnly = useCallback(() => {
    addToCart(service.slug);
    navigate(ROUTES.CART);
  }, [addToCart, navigate, service.slug]);

  return {
    mode,
    setMode,
    book,
    addOnly,
    price: formatPrice(service.price),
    bookingAmount: formatPrice(service.bookingAmount),
  };
}
