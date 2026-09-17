import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { catalogService } from '@/services';
import { useBasket } from '@/hooks/storefront/use-basket';

export type BuilderStep = 0 | 1 | 2;

export function usePackageBuilder() {
  const navigate = useNavigate();
  const { addToCart } = useBasket();
  const [step, setStep] = useState<BuilderStep>(0);
  const [categorySlug, setCategorySlug] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const { data: categories } = useQuery({
    queryKey: ['storefront', 'categories'],
    queryFn: async () => (await catalogService.getCategories()).data ?? [],
  });

  const { data: services } = useQuery({
    queryKey: ['storefront', 'builder', categorySlug],
    queryFn: async () =>
      (await catalogService.list({ categorySlug: categorySlug ?? undefined }))
        .data ?? [],
    enabled: Boolean(categorySlug),
  });

  const chosen = useMemo(
    () => (services ?? []).filter(service => selected.includes(service.slug)),
    [services, selected],
  );

  const total = chosen.reduce((sum, service) => sum + service.price, 0);
  const dueNow = chosen.reduce(
    (sum, service) => sum + service.bookingAmount,
    0,
  );

  const pickCategory = useCallback((slug: string) => {
    setCategorySlug(slug);
    setSelected([]);
    setStep(1);
  }, []);

  const toggleService = useCallback((slug: string) => {
    setSelected(prev =>
      prev.includes(slug)
        ? prev.filter(item => item !== slug)
        : [...prev, slug],
    );
  }, []);

  const addBundle = useCallback(() => {
    selected.forEach(slug => addToCart(slug));
    navigate(ROUTES.CART);
  }, [addToCart, navigate, selected]);

  return {
    step,
    setStep,
    categories: categories ?? [],
    services: services ?? [],
    categorySlug,
    selected,
    chosen,
    total,
    dueNow,
    pickCategory,
    toggleService,
    addBundle,
  };
}
