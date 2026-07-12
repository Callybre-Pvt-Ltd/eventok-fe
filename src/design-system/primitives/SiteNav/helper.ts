import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useDesignTokens } from '../../hooks/useDesignTokens';

const links = [
  { path: ROUTES.SERVICES, labelKey: 'nav.services' },
  { path: ROUTES.SERVICES, labelKey: 'nav.categories' },
  { path: ROUTES.ABOUT, labelKey: 'nav.about' },
  { path: ROUTES.CONTACT, labelKey: 'nav.contact' },
];

export function useSiteNav() {
  const { colors, mode, toggleTheme } = useDesignTokens();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  return {
    colors,
    mode,
    toggleTheme,
    links,
    isActive,
    mobileOpen,
    toggleMobile: () => setMobileOpen(v => !v),
    closeMobile: () => setMobileOpen(false),
    shrunk,
  };
}
