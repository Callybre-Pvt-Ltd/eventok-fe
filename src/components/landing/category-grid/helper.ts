import { useQuery } from '@tanstack/react-query';
import {
  Heart,
  Briefcase,
  Cake,
  Camera,
  UtensilsCrossed,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { categoryService } from '@/services';
import type { Category } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Briefcase,
  Cake,
  Camera,
  UtensilsCrossed,
  Sparkles,
};

export function getCategoryIcon(iconName: string): LucideIcon {
  return iconMap[iconName] ?? Sparkles;
}

export function useCategoryGrid() {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });

  const categories: Category[] = query.data?.data ?? [];

  return {
    categories,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
