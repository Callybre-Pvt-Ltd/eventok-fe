import { useTheme } from '@/theme';

export function useSocialButtons(onSocial?: (p: 'google' | 'apple') => void) {
  const { palette } = useTheme();
  const handleGoogle = () => onSocial?.('google');
  const handleApple = () => onSocial?.('apple');
  return { palette, handleGoogle, handleApple };
}
