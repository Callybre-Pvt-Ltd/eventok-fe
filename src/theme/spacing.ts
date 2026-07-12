export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
  xxxl: '5rem',
  section: 'clamp(3rem, 8vw, 7rem)',
} as const;

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  full: '9999px',
} as const;

import { brandRgb } from './brand';

const c = brandRgb.charcoal;
const f = brandRgb.forest;

export const shadows = {
  sm: `0 1px 2px rgba(${c}, 0.05)`,
  md: `0 4px 16px rgba(${c}, 0.08)`,
  lg: `0 12px 40px rgba(${c}, 0.12)`,
  xl: `0 24px 64px rgba(${f}, 0.15)`,
  glow: `0 0 40px rgba(${f}, 0.25)`,
} as const;
