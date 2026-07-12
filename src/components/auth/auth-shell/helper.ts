import { useTheme } from '@/theme';

const BENEFITS = [
  'marketplace.authBenefit1',
  'marketplace.authBenefit2',
  'marketplace.authBenefit3',
] as const;

export function useAuthShell() {
  const { palette } = useTheme();
  return { palette, benefits: BENEFITS };
}
