import {
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightPalette, darkPalette } from './palette';
import { ThemeContext, type ThemeMode } from './ThemeContext';

const STORAGE_KEY = 'eventok_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return 'light';
  });

  const palette = mode === 'dark' ? darkPalette : lightPalette;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // storage unavailable
    }
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const toggleTheme = () =>
    setModeState(prev => (prev === 'light' ? 'dark' : 'light'));

  const setMode = (m: ThemeMode) => setModeState(m);

  return (
    <ThemeContext.Provider value={{ mode, palette, toggleTheme, setMode }}>
      <StyledThemeProvider theme={palette}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
