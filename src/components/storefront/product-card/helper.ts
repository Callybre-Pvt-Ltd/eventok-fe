import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '@/hooks/storefront/use-basket';
import type { CatalogService } from '@/types/catalog';
import {
  discountPercent,
  formatPrice,
  savedAmount,
} from '@/utils/storefront/pricing';

export function useProductCard(service: CatalogService) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useBasket();

  const book = useCallback(() => {
    addToCart(service.slug);
    navigate('/cart');
  }, [addToCart, navigate, service.slug]);

  return {
    to: `/product/${service.slug}`,
    price: formatPrice(service.price),
    original: formatPrice(service.originalPrice),
    saved: formatPrice(savedAmount(service)),
    discount: discountPercent(service),
    wishlisted: isWishlisted(service.slug),
    toggleWish: () => toggleWishlist(service.slug),
    book,
  };
}
