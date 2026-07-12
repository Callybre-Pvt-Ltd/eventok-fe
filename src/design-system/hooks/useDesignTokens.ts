import { useTheme } from '@/theme';
import { lightColors, darkColors, type ColorTokens } from '../tokens/colors';

export function useDesignTokens() {
  const { mode, palette, toggleTheme } = useTheme();
  const colors: ColorTokens = mode === 'dark' ? darkColors : lightColors;

  return { mode, colors, palette, toggleTheme };
}
