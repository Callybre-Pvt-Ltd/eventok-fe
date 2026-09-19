/** EventOK × EventDhara marketplace palette — magenta primary, accent orange, ink */
export const brandColors = {
  white: '#FFFFFF',
  ivory: '#FAFAFB',
  cream: '#FCFCFC',
  tan: '#ECECEE',
  sand: '#E5E7EB',
  taupe: '#9CA3AF',
  /** Primary magenta (legacy gold/brown keys map to brand) */
  gold: '#E8006F',
  brown: '#C4005D',
  chocolate: '#111111',
  offWhite: '#FAFAFB',
  gray100: '#F3F4F6',
  gray200: '#ECECEE',
  gray400: '#9CA3AF',
  gray600: '#6B7280',
  black: '#0A0A0A',
  charcoal: '#16121A',
  /** Brand pink / magenta */
  pink500: '#E8006F',
  pink600: '#C4005D',
  pink400: '#E91E63',
  pink100: '#FFF0F5',
  pink50: '#FAF4F6',
  /** Accent orange (urgency / install) */
  accent500: '#FF5A1F',
  accent600: '#E84E15',
  accent100: '#FFEDE3',
  /** Ink / near-dark */
  ink900: '#0A0A0A',
  ink800: '#16121A',
  heroBg: '#0B0F1A',
  /** Semantic */
  success500: '#16A34A',
  success50: '#F0FDF4',
  warning500: '#F59E0B',
  danger500: '#DC2626',
  info500: '#4F46E5',
  info50: '#EEF2FF',
  /** Legacy aliases */
  sage: '#FFFFFF',
  green: '#FFF0F5',
  forest: '#0A0A0A',
} as const;

export const brandRgb = {
  white: '255, 255, 255',
  ivory: '250, 250, 251',
  brown: '196, 0, 93',
  chocolate: '17, 17, 17',
  black: '10, 10, 10',
  charcoal: '22, 18, 26',
  pink: '232, 0, 111',
  accent: '255, 90, 31',
  ink: '10, 10, 10',
  sage: '255, 255, 255',
  green: '255, 240, 245',
  forest: '10, 10, 10',
} as const;

const {
  white,
  ivory,
  cream,
  tan,
  gold,
  brown,
  chocolate,
  gray400,
  black,
  pink100,
  pink50,
  ink900,
  heroBg,
  accent100,
} = brandColors;
const { pink: pk, ink: ik, accent: ac } = brandRgb;

export const brandScale = {
  50: pink50,
  100: pink100,
  200: tan,
  300: gray400,
  400: brandColors.pink400,
  500: gold,
  600: brown,
  700: chocolate,
  800: ink900,
  900: black,
} as const;

export const brandGradients = {
  primary: `linear-gradient(135deg, ${gold} 0%, ${brown} 100%)`,
  hero: `linear-gradient(135deg, ${heroBg} 0%, ${ink900} 55%, #1A0A14 100%)`,
  dusk: ink900,
  dawn: pink100,
  warm: `linear-gradient(180deg, #FFF3ED 0%, ${white} 100%)`,
  celebration: `linear-gradient(135deg, ${pink100} 0%, ${white} 100%)`,
  card: `linear-gradient(180deg, rgba(${ik}, 0) 0%, rgba(${ik}, 0.7) 100%)`,
  cardDark: `linear-gradient(180deg, rgba(${ik}, 0) 0%, rgba(${ik}, 0.85) 100%)`,
  photoOverlay: `linear-gradient(105deg, rgba(${ik}, 0.72) 0%, rgba(${ik}, 0.35) 45%, rgba(${ik}, 0.08) 100%)`,
  photoOverlayLight: `linear-gradient(180deg, rgba(${ik}, 0.08) 0%, rgba(${ik}, 0.55) 100%)`,
  heroScrim: `linear-gradient(90deg, rgba(${ik}, 0.82) 0%, rgba(${ik}, 0.4) 55%, rgba(${ik}, 0.08) 100%)`,
  heroGlow: `radial-gradient(60% 80% at 85% 20%, rgba(${pk}, 0.42) 0%, rgba(${pk}, 0) 70%)`,
  forestRadial: `radial-gradient(ellipse 90% 75% at 50% 20%, ${white} 0%, ${pink100} 65%, ${cream} 100%)`,
  venueBanner: `linear-gradient(120deg, #3B0A2A 0%, #5C0A3A 45%, ${gold} 100%)`,
  referBanner: `linear-gradient(120deg, ${pink100} 0%, ${white} 55%, ${accent100} 100%)`,
  accentGlow: `radial-gradient(60% 80% at 15% 80%, rgba(${ac}, 0.28) 0%, rgba(${ac}, 0) 70%)`,
} as const;

export const luxuryColors = {
  ivory,
  cream,
  tan,
  sand: brandColors.sand,
  taupe: brandColors.taupe,
  gold,
  brown,
  chocolate,
  textOnDark: white,
  textMutedOnDark: 'rgba(255, 255, 255, 0.72)',
  glass: 'rgba(255, 255, 255, 0.9)',
  glassBorder: 'rgba(255, 255, 255, 0.35)',
} as const;
