import { brandColors } from './brand';

const { success500, success50, warning500, danger500 } = brandColors;

export const lightPalette = {
  // Soft Violet & Periwinkle primary brand
  primary: '#7C3AED',
  primaryLight: '#F5F3FF',
  primaryDark: '#5B21B6',
  accentBlue: '#93C5FD',
  accentPink: '#FDA4AF',
  accentOrange: '#6366F1',
  accentSoft: '#EDE9FE',
  // White space & soft radiant surfaces
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  background: '#FAFAFE',
  backgroundAlt: '#F4F4FD',
  backgroundTint: '#F5F3FF',
  ink: '#0F1123',
  inkElevated: '#1A203E',
  hero: '#FFFFFF',
  onInk: '#FFFFFF',
  onInkMuted: 'rgba(255, 255, 255, 0.75)',
  // Deep charcoal/navy text
  text: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textOnPrimary: '#FFFFFF',
  // Semantics
  success: success500,
  successSoft: success50,
  warning: warning500,
  error: danger500,
  info: '#6366F1',
  infoSoft: '#EEF2FF',
  // Soft borders and shadows
  border: 'rgba(226, 232, 240, 0.85)',
  borderLight: 'rgba(241, 245, 249, 0.9)',
  overlay: 'rgba(15, 23, 42, 0.55)',
  glass: 'rgba(255, 255, 255, 0.92)',
  shadow: 'rgba(99, 102, 241, 0.05)',
  shadowStrong: 'rgba(99, 102, 241, 0.12)',
  // Soft lavender-blue-peach gradients & subtle accents
  gradientHero:
    'linear-gradient(135deg, #FAFAFE 0%, #F5F3FF 45%, #EFF6FF 80%, #FFF1F2 100%)',
  gradientPrimary:
    'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #818CF8 100%)',
  gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFE 100%)',
} as const;

export const darkPalette = {
  // Luminous Violet & Periwinkle buttons and accents
  primary: '#8B5CF6',
  primaryLight: '#1E1838',
  primaryDark: '#7C3AED',
  accentBlue: '#93C5FD',
  accentPink: '#FDA4AF',
  accentOrange: '#818CF8',
  accentSoft: '#1E2045',
  // Deep Midnight / Navy surfaces & dark UI
  surface: '#141A32',
  surfaceElevated: '#1A2242',
  background: '#0A0D18',
  backgroundAlt: '#0F1426',
  backgroundTint: '#141A32',
  ink: '#070913',
  inkElevated: '#0A0D18',
  hero: '#0A0D18',
  onInk: '#FFFFFF',
  onInkMuted: 'rgba(255, 255, 255, 0.75)',
  // White typography & Slate highlights
  text: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textOnPrimary: '#FFFFFF',
  // Semantics
  success: '#10B981',
  successSoft: '#064E3B',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#818CF8',
  infoSoft: '#1E2045',
  // Elegant borders and shadows
  border: 'rgba(255, 255, 255, 0.08)',
  borderLight: 'rgba(255, 255, 255, 0.05)',
  overlay: 'rgba(7, 9, 19, 0.8)',
  glass: 'rgba(20, 26, 50, 0.88)',
  shadow: 'rgba(0, 0, 0, 0.45)',
  shadowStrong: 'rgba(0, 0, 0, 0.65)',
  // Subtle gradients & highlights
  gradientHero:
    'linear-gradient(135deg, #0A0D18 0%, #0F1123 45%, #181938 100%)',
  gradientPrimary:
    'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 50%, #6366F1 100%)',
  gradientCard:
    'linear-gradient(180deg, rgba(20, 26, 50, 0.95) 0%, rgba(26, 34, 66, 0.95) 100%)',
} as const;

export type ThemePalette = typeof lightPalette | typeof darkPalette;
