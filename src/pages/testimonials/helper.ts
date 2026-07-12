import { useTheme } from '@/theme';

export function useTestimonialsPage() {
  const { palette } = useTheme();
  return { palette };
}
