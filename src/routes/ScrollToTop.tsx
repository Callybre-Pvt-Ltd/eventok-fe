import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '@/utils/scroll';

export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    scrollToTop();
  }, [pathname, search, hash]);

  return null;
}
