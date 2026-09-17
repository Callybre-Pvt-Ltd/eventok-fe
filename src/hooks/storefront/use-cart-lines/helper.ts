import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';
import { useBasket } from '@/hooks/storefront/use-basket';
import type { CatalogService } from '@/types/catalog';
import { cartTotals } from '@/utils/storefront/pricing';

export function useCartLines() {
  const basket = useBasket();
  const slugs = basket.cart.map(line => line.serviceSlug);

  const { data } = useQuery({
    queryKey: ['storefront', 'cart-services', slugs],
    queryFn: () => catalogService.getManyBySlug(slugs),
    enabled: slugs.length > 0,
  });

  const services: CatalogService[] = data ?? [];
  const lines = basket.cart
    .map(line => {
      const service = services.find(item => item.slug === line.serviceSlug);
      return service ? { ...line, service } : null;
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));

  return { lines, totals: cartTotals(lines), basket };
}
