import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCategoryNav } from '@/components/storefront/category-nav/helper';

export function useMobileMenu(open: boolean, onClose: () => void) {
  const { groups } = useCategoryNav();
  const { pathname, search } = useLocation();

  // Navigating from inside the drawer should leave it closed behind you.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

  // The page behind a full-height drawer must not scroll with it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return { groups };
}
