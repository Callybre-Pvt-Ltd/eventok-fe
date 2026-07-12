import { useDesignTokens } from '@/design-system';
import { brandGradients } from '@/theme/brand';

export const categories = [
  {
    slug: 'wedding',
    labelKey: 'categoryWedding',
    count: 24,
    photo:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85',
    gradient: brandGradients.card,
  },
  {
    slug: 'birthday',
    labelKey: 'categoryBirthday',
    count: 18,
    photo:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=85',
    gradient: brandGradients.card,
  },
  {
    slug: 'corporate',
    labelKey: 'categoryCorporate',
    count: 12,
    photo:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=85',
    gradient: brandGradients.card,
  },
  {
    slug: 'photography',
    labelKey: 'categoryPhotography',
    count: 31,
    photo:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=85',
    gradient: brandGradients.card,
  },
  {
    slug: 'catering',
    labelKey: 'categoryCatering',
    count: 15,
    photo:
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=85',
    gradient: brandGradients.card,
  },
  {
    slug: 'decoration',
    labelKey: 'categoryDecoration',
    count: 20,
    photo:
      'https://images.unsplash.com/photo-1519167758481-83f29da8c2c3?w=600&q=85',
    gradient: brandGradients.card,
  },
] as const;

export function useCategoryDiscovery() {
  const { colors } = useDesignTokens();
  return { colors, categories };
}
