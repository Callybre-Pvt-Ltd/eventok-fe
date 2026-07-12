import { useTheme } from '@/theme';

export function useAboutPage() {
  const { palette } = useTheme();

  const stats = [
    { value: '2,400+', label: 'Verified vendors' },
    { value: '18,000+', label: 'Events hosted' },
    { value: '42', label: 'Cities' },
    { value: '4.9★', label: 'Average rating' },
  ];

  return { palette, stats };
}
