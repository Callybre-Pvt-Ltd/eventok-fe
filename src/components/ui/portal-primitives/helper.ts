import { useTheme } from '@/theme';

export function usePortalPalette() {
  const { palette } = useTheme();
  return { palette };
}
