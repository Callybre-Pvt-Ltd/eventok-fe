import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/services';
import type { Review } from '@/types';

export function useTestimonials() {
  const query = useQuery({
    queryKey: ['featured-reviews'],
    queryFn: () => reviewService.getFeatured(),
  });

  const reviews: Review[] = query.data?.data ?? [];

  return {
    reviews,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
