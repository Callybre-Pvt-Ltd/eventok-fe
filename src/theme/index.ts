export { brandColors, brandGradients, brandRgb, brandScale } from './brand';
export { lightPalette, darkPalette, type ThemePalette } from './palette';
export { fontFamily } from './fontFamily';
export { fontWeight } from './fontWeight';
export { fontSizes } from './fontSizes';
export { breakpoints, media } from './breakpoints';
export { spacing, radii, shadows } from './spacing';
export { ThemeProvider } from './ThemeProvider';
export { useTheme } from './useTheme';
export { ThemeContext, type ThemeMode, type ThemeContextValue } from './ThemeContext';

// Legacy compat - components using palette directly should migrate to useTheme()
export { lightPalette as palette } from './palette';
