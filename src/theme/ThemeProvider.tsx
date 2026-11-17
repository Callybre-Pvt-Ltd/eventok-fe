import { useEffect, type ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightPalette } from './palette';
import { ThemeContext, type ThemeMode } from './ThemeContext';

const STORAGE_KEY = 'eventok_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mode: ThemeMode = 'light';
  const palette = lightPalette;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'light');
    } catch {
      // storage unavailable
    }
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.style.colorScheme = 'light';
  }, []);

  const toggleTheme = () => {};
  const setMode = (_m: ThemeMode) => {};

  return (
    <ThemeContext.Provider value={{ mode, palette, toggleTheme, setMode }}>
      <StyledThemeProvider theme={palette}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
