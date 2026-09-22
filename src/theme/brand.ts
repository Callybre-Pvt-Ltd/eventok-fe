/** EventOK brand palette — taken from the logo: magenta → violet → indigo on near-black ink */
export const brandColors = {
  white: '#FFFFFF',
  ivory: '#FAF7FC',
  cream: '#FCFAFD',
  tan: '#EBE4F2',
  sand: '#DFD6EA',
  taupe: '#9B8FB0',
  /** Primary magenta (legacy gold/brown keys map to brand) */
  gold: '#EC2E8E',
  brown: '#B81E86',
  chocolate: '#1B0B33',
  offWhite: '#FAF7FC',
  gray100: '#F4EFF8',
  gray200: '#EBE4F2',
  gray400: '#9B8FB0',
  gray600: '#6B5B85',
  black: '#12071F',
  charcoal: '#1F0E38',
  /** Brand pink / magenta */
  pink500: '#EC2E8E',
  pink600: '#B81E86',
  pink400: '#F0559F',
  pink100: '#FBEFF7',
  pink50: '#FDF7FB',
  /** Accent violet (second half of the logo ramp) */
  accent500: '#7B2FF7',
  accent600: '#6425D0',
  accent100: '#EFE7FE',
  /** Ink / near-dark */
  ink900: '#12071F',
  ink800: '#1F0E38',
  heroBg: '#1B0B33',
  /** Semantic */
  success500: '#16A34A',
  success50: '#F0FDF4',
  warning500: '#F59E0B',
  danger500: '#DC2626',
  info500: '#6D28D9',
  info50: '#F1EBFE',
  /** Legacy aliases */
  sage: '#FFFFFF',
  green: '#FBEFF7',
  forest: '#12071F',
} as const;

export const brandRgb = {
  white: '255, 255, 255',
  ivory: '250, 247, 252',
  brown: '184, 30, 134',
  chocolate: '27, 11, 51',
  black: '18, 7, 31',
  charcoal: '31, 14, 56',
  pink: '236, 46, 142',
  accent: '123, 47, 247',
  ink: '18, 7, 31',
  sage: '255, 255, 255',
  green: '251, 239, 247',
  forest: '18, 7, 31',
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
  primary: `linear-gradient(135deg, ${gold} 0%, #A32BC4 52%, ${brandColors.accent500} 100%)`,
  hero: `linear-gradient(135deg, ${heroBg} 0%, ${ink900} 55%, #2A0E4A 100%)`,
  dusk: ink900,
  dawn: pink100,
  warm: `linear-gradient(180deg, #F4EAFD 0%, ${white} 100%)`,
  celebration: `linear-gradient(135deg, ${pink100} 0%, ${white} 100%)`,
  card: `linear-gradient(180deg, rgba(${ik}, 0) 0%, rgba(${ik}, 0.7) 100%)`,
  cardDark: `linear-gradient(180deg, rgba(${ik}, 0) 0%, rgba(${ik}, 0.85) 100%)`,
  photoOverlay: `linear-gradient(105deg, rgba(${ik}, 0.72) 0%, rgba(${ik}, 0.35) 45%, rgba(${ik}, 0.08) 100%)`,
  photoOverlayLight: `linear-gradient(180deg, rgba(${ik}, 0.08) 0%, rgba(${ik}, 0.55) 100%)`,
  heroScrim: `linear-gradient(90deg, rgba(${ik}, 0.82) 0%, rgba(${ik}, 0.4) 55%, rgba(${ik}, 0.08) 100%)`,
  heroGlow: `radial-gradient(60% 80% at 85% 20%, rgba(${pk}, 0.42) 0%, rgba(${pk}, 0) 70%)`,
  forestRadial: `radial-gradient(ellipse 90% 75% at 50% 20%, ${white} 0%, ${pink100} 65%, ${cream} 100%)`,
  venueBanner: `linear-gradient(120deg, #2A0E4A 0%, #6D28D9 45%, ${gold} 100%)`,
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
