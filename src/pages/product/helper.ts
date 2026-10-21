import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { catalogService } from '@/services';

export function useProductPage() {
  const { slug = '' } = useParams<{ slug: string }>();

  const { data: service, isLoading } = useQuery({
    queryKey: ['storefront', 'product', slug],
    queryFn: async () => (await catalogService.getBySlug(slug)).data,
    enabled: Boolean(slug),
  });

  // Waits for the product so its category is reused instead of fetched twice.
  const { data: related } = useQuery({
    queryKey: ['storefront', 'product', slug, 'related'],
    queryFn: async () =>
      (await catalogService.getRelated(slug, service?.categorySlug)).data ?? [],
    enabled: Boolean(slug && service),
  });

  useEffect(() => {
    if (!service) return;
    const previous = document.title;
    document.title = service.title;
    return () => {
      document.title = previous;
    };
  }, [service]);

  return { service: service ?? null, related: related ?? [], isLoading };
}
