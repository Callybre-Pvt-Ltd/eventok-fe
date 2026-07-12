/** Light warm marketplace palette — soft ivory, stone, gold (no green) */
export const brandColors = {
  white: '#FFFFFF',
  ivory: '#FFFCFA',
  cream: '#F7F3EE',
  tan: '#EDE6DC',
  sand: '#E0D6C8',
  taupe: '#8A8178',
  gold: '#C9A227',
  brown: '#5C534C',
  chocolate: '#2A2522',
  offWhite: '#FAFAFA',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray400: '#A8A29E',
  gray600: '#57534E',
  black: '#1C1917',
  charcoal: '#3A3532',
  /** Legacy aliases used across components */
  sage: '#FFFCFA',
  green: '#EDE6DC',
  forest: '#2A2522',
} as const;

export const brandRgb = {
  white: '255, 255, 255',
  ivory: '255, 252, 250',
  brown: '92, 83, 76',
  chocolate: '42, 37, 34',
  black: '28, 25, 23',
  charcoal: '58, 53, 50',
  sage: '255, 252, 250',
  green: '237, 230, 220',
  forest: '42, 37, 34',
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
  gray600,
  black,
} = brandColors;
const { chocolate: ch } = brandRgb;

export const brandScale = {
  50: ivory,
  100: cream,
  200: tan,
  300: gray400,
  400: gray400,
  500: gray600,
  600: brown,
  700: chocolate,
  800: chocolate,
  900: black,
} as const;

export const brandGradients = {
  primary: cream,
  hero: ivory,
  dusk: chocolate,
  dawn: cream,
  warm: `linear-gradient(180deg, ${ivory} 0%, ${cream} 100%)`,
  celebration: cream,
  card: `linear-gradient(180deg, rgba(${ch}, 0) 0%, rgba(${ch}, 0.55) 100%)`,
  cardDark: `linear-gradient(180deg, rgba(${ch}, 0) 0%, rgba(${ch}, 0.75) 100%)`,
  photoOverlay: `linear-gradient(105deg, rgba(${ch}, 0.55) 0%, rgba(${ch}, 0.25) 45%, rgba(${ch}, 0.08) 100%)`,
  photoOverlayLight: `linear-gradient(180deg, rgba(${ch}, 0.08) 0%, rgba(${ch}, 0.4) 100%)`,
  heroScrim: `linear-gradient(90deg, rgba(${ch}, 0.35) 0%, rgba(${ch}, 0.12) 55%, rgba(${ch}, 0.02) 100%)`,
  forestRadial: `radial-gradient(ellipse 90% 75% at 50% 20%, ${white} 0%, ${cream} 65%, ${tan} 100%)`,
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
  glass: 'rgba(255, 255, 255, 0.88)',
  glassBorder: 'rgba(255, 255, 255, 0.35)',
} as const;
