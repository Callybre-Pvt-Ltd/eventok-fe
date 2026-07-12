/**
 * EVENTOK DESIGN SYSTEM — Spacing
 *
 * 4px base grid. Sections breathe but never feel hollow.
 * Use section tokens for vertical rhythm between story beats.
 */

const unit = 4;

export const space = {
  0: '0',
  1: `${unit}px`,
  2: `${unit * 2}px`,
  3: `${unit * 3}px`,
  4: `${unit * 4}px`,
  5: `${unit * 5}px`,
  6: `${unit * 6}px`,
  8: `${unit * 8}px`,
  10: `${unit * 10}px`,
  12: `${unit * 12}px`,
  16: `${unit * 16}px`,
  20: `${unit * 20}px`,
  24: `${unit * 24}px`,
  32: `${unit * 32}px`,
} as const;

/** Vertical rhythm between page sections */
export const sectionSpacing = {
  /** Tight continuation — section flows into next */
  flow: 'clamp(3rem, 6vw, 5rem)',
  /** Standard story beat */
  default: 'clamp(4rem, 8vw, 7rem)',
  /** Major chapter change */
  chapter: 'clamp(5rem, 10vw, 9rem)',
  /** Hero to first content — intentional overlap zone */
  heroOverlap: 'clamp(2rem, 4vw, 3rem)',
} as const;

export const container = {
  max: '1280px',
  wide: '1440px',
  narrow: '720px',
  padding: 'clamp(1rem, 4vw, 2rem)',
} as const;

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
} as const;

import { brandRgb } from '@/theme/brand';

const c = brandRgb.charcoal;
const f = brandRgb.forest;

export const shadows = {
  none: 'none',
  sm: `0 1px 3px rgba(${c}, 0.06)`,
  md: `0 4px 20px rgba(${c}, 0.08)`,
  lg: `0 12px 40px rgba(${c}, 0.1)`,
  xl: `0 24px 64px rgba(${c}, 0.12)`,
  photo: `0 20px 50px rgba(${c}, 0.2)`,
  glow: `0 0 48px rgba(${f}, 0.2)`,
  inner: `inset 0 1px 2px rgba(${c}, 0.06)`,
} as const;

export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  nav: 300,
  overlay: 400,
  modal: 500,
  toast: 600,
} as const;
