/**
 * EVENTOK DESIGN SYSTEM
 *
 * Single source of truth. Define before pages.
 * Import from @/design-system — never hardcode visual values in pages.
 */

export { lightColors, darkColors, type ColorTokens } from './tokens/colors';
export {
  fontFamilies,
  fontWeights,
  typeScale,
  type TypeVariant,
} from './tokens/typography';
export {
  space,
  sectionSpacing,
  container,
  radii,
  shadows,
  zIndex,
} from './tokens/spacing';
export { duration, easing, motionPresets, viewport } from './tokens/motion';
export {
  aspectRatios,
  photoTreatment,
  photography,
  type AspectRatio,
} from './tokens/photography';
export {
  landingStoryArc,
  type SectionVariant,
  type SectionPattern,
} from './tokens/sections';
export { layout, media } from './tokens/layout';

export { useDesignTokens } from './hooks/useDesignTokens';
export * from './primitives';
