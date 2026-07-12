import { useMemo } from 'react';
import { useTheme } from '@/theme';

export function usePasswordStrength(password: string) {
  const { palette } = useTheme();

  const score = useMemo(() => {
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return Math.min(s, 4);
  }, [password]);

  const labelKey =
    score <= 1
      ? 'marketplace.authWeak'
      : score <= 2
      ? 'marketplace.authFair'
      : 'marketplace.authStrong';

  const color =
    score <= 1 ? palette.error : score <= 2 ? palette.warning : palette.success;

  return { palette, score, labelKey, color };
}
