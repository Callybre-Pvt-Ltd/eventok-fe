import { useDesignTokens } from '@/design-system';

export const trustStats = [
  { key: 'statsVendors', value: '2,400+' },
  { key: 'statsEvents', value: '18,000+' },
  { key: 'statsCities', value: '45' },
] as const;

export function useTrustStrip() {
  const { colors } = useDesignTokens();
  return { colors, stats: trustStats };
}
