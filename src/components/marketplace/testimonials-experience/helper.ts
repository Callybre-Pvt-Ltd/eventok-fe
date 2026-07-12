import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/services';
import { useTheme } from '@/theme';
import { photography } from '@/design-system/tokens/photography';

export type TestimonialFilter = 'all' | 'wedding' | 'corporate' | 'birthday';

const FILTERS: { id: TestimonialFilter; labelKey: string }[] = [
  { id: 'all', labelKey: 'marketplace.testimonialsFilterAll' },
  { id: 'wedding', labelKey: 'marketplace.testimonialsFilterWedding' },
  { id: 'corporate', labelKey: 'marketplace.testimonialsFilterCorporate' },
  { id: 'birthday', labelKey: 'marketplace.testimonialsFilterBirthday' },
];

export function useTestimonialsExperience() {
  const { palette } = useTheme();
  const [filter, setFilter] = useState<TestimonialFilter>('all');

  const reviewsQuery = useQuery({
    queryKey: ['reviews-featured'],
    queryFn: () => reviewService.getFeatured(),
  });

  const reviews = reviewsQuery.data?.data ?? [];

  const stories = useMemo(() => {
    if (filter === 'all') return reviews;
    return reviews;
  }, [reviews, filter]);

  const featured = {
    name: 'Anita & Vikram',
    event: 'Mumbai Wedding',
    quote:
      'EventOK turned our dream wedding into reality. Every vendor was exceptional, and the admin team made us feel supported at every step.',
    photo:
      'https://images.unsplash.com/photo-1520854221256-17451b9916eb?w=800&q=85',
  };

  const videos = [
    {
      id: 'v1',
      title: "Priya & Rohan's wedding",
      thumb:
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85',
    },
    {
      id: 'v2',
      title: 'Corporate gala 2025',
      thumb:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=85',
    },
    {
      id: 'v3',
      title: 'Milestone birthday',
      thumb:
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=85',
    },
  ];

  return {
    palette,
    filter,
    setFilter,
    filters: FILTERS,
    trustScore: '98%',
    avgRating: '4.9',
    featured,
    stories,
    videos,
    reviews,
    gallery: photography.gallery,
  };
}
