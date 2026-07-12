/**
 * EVENTOK DESIGN SYSTEM — Section Patterns
 *
 * Each section type has a DISTINCT identity.
 * No two adjacent sections share the same layout grammar.
 * Sections flow into each other — never end abruptly.
 */

export type SectionVariant =
  | 'immersive' // Full-bleed photo, text overlay — opens chapters
  | 'editorial' // Asymmetric split: photo left, copy right (or flip)
  | 'rail' // Horizontal scroll discovery — momentum
  | 'mosaic' // Masonry photo grid — Pinterest energy
  | 'quote' // Full-width testimonial with large photography
  | 'steps' // Horizontal timeline with connecting line
  | 'stats' // Numbers that build trust — compact, not dashboard
  | 'search' // Interactive discovery moment
  | 'cta' // Emotional close with gradient + single action
  | 'faq' // Accordion, narrow column, intimate
  | 'contact'; // Form beside warm photography

export interface SectionPattern {
  variant: SectionVariant;
  bg: 'default' | 'warm' | 'cool' | 'dark' | 'photo';
  alignment: 'left' | 'center' | 'split';
  density: 'airy' | 'balanced' | 'compact';
  /** How this section connects to the next */
  flowOut: 'fade' | 'overlap' | 'divider' | 'continue';
}

/** Landing page story arc — each beat has unique identity */
export const landingStoryArc: SectionPattern[] = [
  {
    variant: 'immersive',
    bg: 'photo',
    alignment: 'left',
    density: 'airy',
    flowOut: 'overlap',
  },
  {
    variant: 'stats',
    bg: 'default',
    alignment: 'center',
    density: 'compact',
    flowOut: 'continue',
  },
  {
    variant: 'rail',
    bg: 'warm',
    alignment: 'left',
    density: 'balanced',
    flowOut: 'fade',
  },
  {
    variant: 'search',
    bg: 'cool',
    alignment: 'center',
    density: 'airy',
    flowOut: 'divider',
  },
  {
    variant: 'steps',
    bg: 'default',
    alignment: 'split',
    density: 'balanced',
    flowOut: 'continue',
  },
  {
    variant: 'editorial',
    bg: 'warm',
    alignment: 'split',
    density: 'airy',
    flowOut: 'overlap',
  },
  {
    variant: 'mosaic',
    bg: 'default',
    alignment: 'left',
    density: 'balanced',
    flowOut: 'fade',
  },
  {
    variant: 'editorial',
    bg: 'cool',
    alignment: 'split',
    density: 'airy',
    flowOut: 'continue',
  },
  {
    variant: 'rail',
    bg: 'default',
    alignment: 'left',
    density: 'balanced',
    flowOut: 'divider',
  },
  {
    variant: 'mosaic',
    bg: 'dark',
    alignment: 'left',
    density: 'compact',
    flowOut: 'fade',
  },
  {
    variant: 'quote',
    bg: 'photo',
    alignment: 'center',
    density: 'airy',
    flowOut: 'continue',
  },
  {
    variant: 'stats',
    bg: 'warm',
    alignment: 'center',
    density: 'compact',
    flowOut: 'divider',
  },
  {
    variant: 'faq',
    bg: 'default',
    alignment: 'left',
    density: 'balanced',
    flowOut: 'continue',
  },
  {
    variant: 'contact',
    bg: 'warm',
    alignment: 'split',
    density: 'airy',
    flowOut: 'fade',
  },
  {
    variant: 'cta',
    bg: 'dark',
    alignment: 'center',
    density: 'airy',
    flowOut: 'continue',
  },
];
