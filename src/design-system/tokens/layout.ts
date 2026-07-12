import { breakpoints } from '@/theme/breakpoints';

export const layout = {
  breakpoints,
  columns: 12,
  gutter: 'clamp(1rem, 3vw, 1.5rem)',
} as const;

export const media = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  belowMd: `@media (max-width: ${breakpoints.md - 1}px)`,
  belowLg: `@media (max-width: ${breakpoints.lg - 1}px)`,
} as const;
