import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { categoryService } from '@/services';
import { categories as curatedCategories } from '@/stories/landing/category-discovery/helper';

const photoBySlug = Object.fromEntries(
  curatedCategories.map(item => [item.slug, item.photo]),
) as Record<string, string>;

const countBySlug = Object.fromEntries(
  curatedCategories.map(item => [item.slug, item.count]),
) as Record<string, number>;

export function getCategoryPhoto(slug: string) {
  return (
    photoBySlug[slug] ??
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85'
  );
}

export function getCategoryCount(slug: string) {
  return countBySlug[slug] ?? 0;
}

export function useCategoriesPage() {
  const [searchParams] = useSearchParams();
  const activeSlug = searchParams.get('type');

  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });

  const categories = query.data?.data ?? [];

  return {
    categories,
    activeSlug,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
