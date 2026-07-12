import { useTheme } from '@/theme';

export function useLandingPage() {
  const { palette } = useTheme();
  return { palette };
}
