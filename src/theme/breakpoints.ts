export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

export const media = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  xxl: `@media (min-width: ${breakpoints.xxl}px)`,
  belowMd: `@media (max-width: ${breakpoints.md - 1}px)`,
  belowLg: `@media (max-width: ${breakpoints.lg - 1}px)`,
  belowXl: `@media (max-width: ${breakpoints.xl - 1}px)`,
  belowSm: `@media (max-width: ${breakpoints.sm - 1}px)`,
} as const;
