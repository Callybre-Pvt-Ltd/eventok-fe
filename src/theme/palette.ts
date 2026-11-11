import { brandColors } from './brand';

const { success500, success50, warning500, danger500 } = brandColors;

export const lightPalette = {
  // Vibrant Celebration Orange primary action
  primary: '#EA580C',
  primaryLight: '#FFF7ED',
  primaryDark: '#C2410C',
  accentBlue: '#0284C7',
  accentPink: '#FED7AA',
  accentOrange: '#EA580C',
  accentSoft: '#FFF7ED',
  // Warm Ivory, Cream & Soft Sandstone surfaces
  surface: '#FFFFFF',
  surfaceElevated: '#FFFDFB',
  background: '#FAF7F2',
  backgroundAlt: '#F3ECE2',
  backgroundTint: '#FFF3E6',
  ink: '#1C1917',
  inkElevated: '#292524',
  hero: '#1C1917',
  onInk: '#FFFFFF',
  onInkMuted: 'rgba(255, 255, 255, 0.85)',
  // High contrast Rich Warm Charcoal text
  text: '#1C1917',
  textSecondary: '#57534E',
  textMuted: '#8C827A',
  textOnPrimary: '#FFFFFF',
  // Semantics
  success: success500,
  successSoft: success50,
  warning: warning500,
  error: danger500,
  info: '#0284C7',
  infoSoft: '#F0F9FF',
  // Refined warm subtle borders & natural warm shadows
  border: '#E8E1D5',
  borderLight: '#F2ECE1',
  overlay: 'rgba(28, 25, 23, 0.6)',
  glass: 'rgba(255, 253, 250, 0.95)',
  shadow: 'rgba(60, 42, 25, 0.06)',
  shadowStrong: 'rgba(60, 42, 25, 0.14)',
  // Solid colors only — zero gradients
  gradientHero: '#FAF7F2',
  gradientPrimary: '#EA580C',
  gradientCard: '#FFFFFF',
} as const;

export const darkPalette = {
  // Vibrant Orange primary action
  primary: '#F97316',
  primaryLight: '#2C150A',
  primaryDark: '#EA580C',
  accentBlue: '#38BDF8',
  accentPink: '#FDBA74',
  accentOrange: '#FB923C',
  accentSoft: '#2C150A',
  // Rich Midnight & Deep Slate surfaces
  surface: '#121A2B',
  surfaceElevated: '#1A253D',
  background: '#090D16',
  backgroundAlt: '#0E1424',
  backgroundTint: '#141C30',
  ink: '#04070E',
  inkElevated: '#121A2B',
  hero: '#0E1424',
  onInk: '#FFFFFF',
  onInkMuted: 'rgba(255, 255, 255, 0.75)',
  // Crisp light text
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#8896AB',
  textOnPrimary: '#FFFFFF',
  // Semantics
  success: '#10B981',
  successSoft: '#064E3B',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#38BDF8',
  infoSoft: '#082F49',
  // Subtle dark borders & depth
  border: '#232F47',
  borderLight: '#162032',
  overlay: 'rgba(4, 7, 14, 0.85)',
  glass: '#121A2B',
  shadow: 'rgba(0, 0, 0, 0.45)',
  shadowStrong: 'rgba(0, 0, 0, 0.7)',
  // Solid colors only — zero gradients
  gradientHero: '#0E1424',
  gradientPrimary: '#F97316',
  gradientCard: '#121A2B',
} as const;

export type ThemePalette = typeof lightPalette | typeof darkPalette;
