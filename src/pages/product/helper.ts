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

  const { data: related } = useQuery({
    queryKey: ['storefront', 'product', slug, 'related'],
    queryFn: async () => (await catalogService.getRelated(slug)).data ?? [],
    enabled: Boolean(slug),
  });

  useEffect(() => {
    if (service) document.title = service.title;
  }, [service]);

  return { service: service ?? null, related: related ?? [], isLoading };
}
