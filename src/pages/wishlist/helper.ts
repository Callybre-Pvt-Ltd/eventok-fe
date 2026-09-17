import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';
import { useBasket } from '@/hooks/storefront/use-basket';

export function useWishlistPage() {
  const basket = useBasket();

  const { data } = useQuery({
    queryKey: ['storefront', 'wishlist-services', basket.wishlist],
    queryFn: () => catalogService.getManyBySlug(basket.wishlist),
    enabled: basket.wishlist.length > 0,
  });

  return { services: data ?? [], basket };
}
