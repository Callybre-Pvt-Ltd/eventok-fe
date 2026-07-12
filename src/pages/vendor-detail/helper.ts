import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { vendorService, reviewService, categoryService } from '@/services';
import { useTheme } from '@/theme';

export const MOCK_TIMELINE = [
  {
    year: '2018',
    title: 'Founded studio',
    desc: 'Started with intimate weddings in Mumbai.',
  },
  {
    year: '2020',
    title: '100 events milestone',
    desc: 'Expanded to corporate and luxury celebrations.',
  },
  {
    year: '2023',
    title: 'National recognition',
    desc: 'Featured in top wedding publications.',
  },
  {
    year: '2025',
    title: 'EventOK partner',
    desc: 'Joined as a verified premium vendor.',
  },
];

export const MOCK_SERVICES = [
  'Full wedding planning & coordination',
  'Venue styling & decor',
  'Guest experience design',
  'Day-of event management',
  'Corporate gala production',
];

export const MOCK_VIDEOS = [
  {
    id: 'v1',
    title: 'Behind the scenes',
    thumb:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=85',
  },
  {
    id: 'v2',
    title: 'Wedding highlight',
    thumb:
      'https://images.unsplash.com/photo-1519167758481-83f29da8c2c3?w=600&q=85',
  },
];

export const MOCK_BEFORE_AFTER = [
  {
    before:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=85',
    after:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=85',
  },
];

export const MOCK_FAQ = [
  {
    q: 'How do I request a quote?',
    a: 'Submit a booking request and our admin team will coordinate with the vendor.',
  },
  {
    q: 'Can I meet the vendor directly?',
    a: 'All communication goes through EventOK admin for your safety.',
  },
  {
    q: 'What is included in a consultation?',
    a: 'A 30-minute call to discuss your vision, guest count, and timeline.',
  },
];

export function useVendorDetailPage() {
  const { palette } = useTheme();
  const { id = '' } = useParams();

  const vendorQuery = useQuery({
    queryKey: ['vendor', id],
    queryFn: () => vendorService.getPublicVendorById(id),
    enabled: !!id,
  });

  const reviewsQuery = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => reviewService.getByVendor(id),
    enabled: !!id,
  });

  const relatedQuery = useQuery({
    queryKey: ['vendors-related'],
    queryFn: () => vendorService.getPublicVendors(),
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });

  const vendor = vendorQuery.data?.data;
  const related = (relatedQuery.data?.data ?? [])
    .filter(v => v.id !== id)
    .slice(0, 3);

  const categoryMap = Object.fromEntries(
    (categoriesQuery.data?.data ?? []).map(c => [c.id, c.name]),
  );

  return {
    palette,
    vendor,
    reviews: reviewsQuery.data?.data ?? [],
    related,
    categoryMap,
    timeline: MOCK_TIMELINE,
    services: MOCK_SERVICES,
    videos: MOCK_VIDEOS,
    beforeAfter: MOCK_BEFORE_AFTER,
    faq: MOCK_FAQ,
    isLoading: vendorQuery.isLoading,
    error: vendorQuery.error,
    refetch: vendorQuery.refetch,
  };
}
