/**
 * EventOK brand palette — vibrant celebratory orange & clean modern neutrals.
 * Solid colors only — zero gradients anywhere.
 * Matches exact UI reference:
 * - Primary Action: Vibrant EventOK Orange (#EA580C / #F97316)
 * - Canvas: Pure White (#FFFFFF) & Crisp Light Grey (#F8FAFC)
 * - Text: High contrast Slate/Charcoal (#0F172A) & Muted (#64748B)
 * - Borders: Crisp Slate (#E2E8F0)
 */
export const brandColors = {
  white: '#FFFFFF',
  ivory: '#FAF7F2',
  cream: '#F3ECE2',
  tan: '#E8E1D5',
  sand: '#D5CBBB',
  taupe: '#8C827A',
  gold: '#F59E0B',
  brown: '#C2410C',
  chocolate: '#1C1917',
  offWhite: '#FAF7F2',
  gray100: '#F5EFE6',
  gray200: '#E8E1D5',
  gray400: '#8C827A',
  gray600: '#57534E',
  black: '#090D16',
  charcoal: '#1C1917',
  /** Vibrant Celebration Orange Spectrum (Primary Brand) */
  orange50: '#FFF7ED',
  orange100: '#FFEDD5',
  orange200: '#FED7AA',
  orange300: '#FDBA74',
  orange400: '#FB923C',
  orange500: '#F97316',
  orange600: '#EA580C',
  orange700: '#C2410C',
  orange800: '#9A3412',
  orange900: '#7C2D12',
  midnight: '#090D16',
  /** Teal / Cyan Accents */
  teal50: '#F0FDFA',
  teal100: '#CCFBF1',
  teal500: '#14B8A6',
  teal700: '#0F766E',
  teal800: '#115E59',
  teal900: '#0369A1',
  /** Warm Amber / Gold for ratings */
  amber50: '#FFFBEB',
  amber100: '#FEF3C7',
  amber500: '#F59E0B',
  amber600: '#D97706',
  amber700: '#B45309',
  /** Brand Aliases for legacy tokens — map cleanly to Vibrant Orange */
  pink500: '#EA580C',
  pink600: '#C2410C',
  pink400: '#FB923C',
  pink100: '#FFEDD5',
  pink50: '#FFF7ED',
  /** Accent aliases */
  accent500: '#EA580C',
  accent600: '#C2410C',
  accent100: '#FFEDD5',
  /** Ink / Dark Background */
  ink900: '#0F172A',
  ink800: '#1E293B',
  heroBg: '#0F172A',
  /** Semantic */
  success500: '#16A34A',
  success50: '#F0FDF4',
  warning500: '#F59E0B',
  danger500: '#EF4444',
  info500: '#0284C7',
  info50: '#F0F9FF',
  /** Legacy aliases */
  sage: '#FFFFFF',
  green: '#F0FDF4',
  forest: '#0F172A',
} as const;

export const brandRgb = {
  white: '255, 255, 255',
  ivory: '255, 255, 255',
  brown: '194, 65, 12',
  chocolate: '15, 23, 42',
  black: '2, 6, 23',
  charcoal: '15, 23, 42',
  pink: '234, 88, 12',
  accent: '234, 88, 12',
  ink: '15, 23, 42',
  sage: '255, 255, 255',
  green: '240, 253, 244',
  forest: '15, 23, 42',
  lavender: '226, 232, 240',
  periwinkle: '2, 132, 199',
  peach: '254, 215, 170',
} as const;

const {
  white,
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
} = brandColors;

export const brandScale = {
  50: pink50,
  100: pink100,
  200: tan,
  300: gray400,
  400: brandColors.pink400,
  500: brandColors.pink500,
  600: brandColors.pink600,
  700: chocolate,
  800: ink900,
  900: black,
} as const;

/**
 * SOLID COLORS ONLY — All gradients strictly removed per design rules.
 */
export const brandGradients = {
  primary: '#EA580C',
  hero: '#0F172A',
  dusk: '#0F172A',
  dawn: '#FFFFFF',
  warm: '#FFFFFF',
  celebration: '#FFFFFF',
  card: 'transparent',
  cardDark: 'transparent',
  photoOverlay: 'rgba(15, 23, 42, 0.45)',
  photoOverlayLight: 'rgba(15, 23, 42, 0.25)',
  heroScrim: 'rgba(15, 23, 42, 0.55)',
  heroGlow: 'transparent',
  forestRadial: '#FFFFFF',
  venueBanner: '#EA580C',
  referBanner: '#FFF7ED',
  accentGlow: 'transparent',
  softAmbientOrbs: 'transparent',
} as const;

export const luxuryColors = {
  ivory: brandColors.ivory,
  cream,
  tan,
  sand: brandColors.sand,
  taupe: brandColors.taupe,
  gold,
  brown,
  chocolate,
  textOnDark: white,
  textMutedOnDark: 'rgba(255, 255, 255, 0.75)',
  glass: '#FFFFFF',
  glassBorder: brandColors.tan,
} as const;
