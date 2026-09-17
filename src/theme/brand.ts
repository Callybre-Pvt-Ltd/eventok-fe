/** EventOK marketplace palette — orange primary, ink black, warm off-white */
export const brandColors = {
  white: '#FFFFFF',
  ivory: '#FAFAF8',
  cream: '#F5F2EE',
  tan: '#E8E4DF',
  sand: '#D6D0C8',
  taupe: '#8A847C',
  gold: '#F05A1A',
  brown: '#E04A0A',
  chocolate: '#0A0A0A',
  offWhite: '#FAFAF8',
  gray100: '#F0EDE8',
  gray200: '#E8E4DF',
  gray400: '#8A847C',
  gray600: '#5C574F',
  black: '#0A0A0A',
  charcoal: '#141414',
  /** Orange scale (kept pink* keys for legacy imports) */
  pink500: '#F05A1A',
  pink600: '#E04A0A',
  pink400: '#FF7A3D',
  pink100: '#FFF0E8',
  pink50: '#FFF8F3',
  /** Accent orange */
  accent500: '#F05A1A',
  accent600: '#E04A0A',
  accent100: '#FFF0E8',
  /** Ink / dark surfaces */
  ink900: '#0A0A0A',
  ink800: '#141414',
  heroBg: '#0A0A0A',
  /** Semantic */
  success500: '#16A34A',
  success50: '#F0FDF4',
  warning500: '#F59E0B',
  danger500: '#DC2626',
  info500: '#3B82F6',
  info50: '#EFF6FF',
  /** Legacy aliases used across components */
  sage: '#FFFFFF',
  green: '#FFF0E8',
  forest: '#0A0A0A',
} as const;

export const brandRgb = {
  white: '255, 255, 255',
  ivory: '250, 250, 248',
  brown: '224, 74, 10',
  chocolate: '10, 10, 10',
  black: '10, 10, 10',
  charcoal: '20, 20, 20',
  pink: '240, 90, 26',
  accent: '240, 90, 26',
  ink: '10, 10, 10',
  sage: '255, 255, 255',
  green: '255, 240, 232',
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
  ink900,
  heroBg,
} = brandColors;
const { pink: pk, ink: ik } = brandRgb;

export const brandScale = {
  50: pink100,
  100: cream,
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
  hero: `linear-gradient(135deg, ${heroBg} 0%, ${ink900} 55%, #1A120E 100%)`,
  dusk: ink900,
  dawn: pink100,
  warm: `linear-gradient(180deg, ${brandColors.accent100} 0%, ${white} 100%)`,
  celebration: `linear-gradient(135deg, ${pink100} 0%, ${white} 100%)`,
  card: `linear-gradient(180deg, rgba(${ik}, 0) 0%, rgba(${ik}, 0.7) 100%)`,
  cardDark: `linear-gradient(180deg, rgba(${ik}, 0) 0%, rgba(${ik}, 0.85) 100%)`,
  photoOverlay: `linear-gradient(105deg, rgba(${ik}, 0.72) 0%, rgba(${ik}, 0.35) 45%, rgba(${ik}, 0.08) 100%)`,
  photoOverlayLight: `linear-gradient(180deg, rgba(${ik}, 0.08) 0%, rgba(${ik}, 0.55) 100%)`,
  heroScrim: `linear-gradient(90deg, rgba(${ik}, 0.82) 0%, rgba(${ik}, 0.4) 55%, rgba(${ik}, 0.08) 100%)`,
  heroGlow: `radial-gradient(60% 80% at 85% 20%, rgba(${pk}, 0.42) 0%, rgba(${pk}, 0) 70%)`,
  forestRadial: `radial-gradient(ellipse 90% 75% at 50% 20%, ${white} 0%, ${pink100} 65%, ${cream} 100%)`,
  venueBanner: `linear-gradient(120deg, #0A0A0A 0%, #1A120E 45%, #F05A1A 100%)`,
  referBanner: `linear-gradient(120deg, ${pink100} 0%, ${white} 55%, ${brandColors.accent100} 100%)`,
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
