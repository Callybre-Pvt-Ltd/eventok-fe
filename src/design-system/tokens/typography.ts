/**
 * EVENTOK DESIGN SYSTEM — Typography
 *
 * Plus Jakarta Sans: emotional headlines (celebration, dreams)
 * Inter: readable body (clarity during planning stress)
 */

export const fontFamilies = {
  display: "'Plus Jakarta Sans', -apple-system, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'SF Mono', 'Fira Code', monospace",
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

/** Fluid type scale — never fixed px for headings */
export const typeScale = {
  /** Hero — one per page max */
  display: {
    size: 'clamp(2.75rem, 7vw, 5rem)',
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    weight: fontWeights.extrabold,
    family: fontFamilies.display,
  },
  /** Section openers — left-aligned storytelling */
  headline: {
    size: 'clamp(2rem, 4.5vw, 3.25rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.025em',
    weight: fontWeights.bold,
    family: fontFamilies.display,
  },
  /** Sub-section titles */
  title: {
    size: 'clamp(1.375rem, 2.5vw, 1.75rem)',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    weight: fontWeights.semibold,
    family: fontFamilies.display,
  },
  /** Card titles, vendor names */
  subtitle: {
    size: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
    lineHeight: 1.35,
    letterSpacing: '-0.01em',
    weight: fontWeights.semibold,
    family: fontFamilies.body,
  },
  /** Body copy */
  body: {
    size: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
    lineHeight: 1.65,
    letterSpacing: '0',
    weight: fontWeights.regular,
    family: fontFamilies.body,
  },
  /** Lead paragraphs under headlines */
  lead: {
    size: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
    lineHeight: 1.6,
    letterSpacing: '0',
    weight: fontWeights.regular,
    family: fontFamilies.body,
  },
  /** Small labels */
  caption: {
    size: '0.8125rem',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    weight: fontWeights.medium,
    family: fontFamilies.body,
  },
  /** Section eyebrows — "HOW IT WORKS", never centered alone */
  eyebrow: {
    size: '0.75rem',
    lineHeight: 1.4,
    letterSpacing: '0.12em',
    weight: fontWeights.semibold,
    family: fontFamilies.body,
    textTransform: 'uppercase' as const,
  },
} as const;

export type TypeVariant = keyof typeof typeScale;
