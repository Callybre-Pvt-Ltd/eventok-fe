import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useBasket } from '@/hooks/storefront/use-basket';

const PLACEHOLDER_KEYS = [
  'Birthday decoration',
  'Wedding decoration',
  'Anniversary room decor',
  'Baby shower setup',
  'Haldi decoration',
];

export function useStoreHeader() {
  const navigate = useNavigate();
  const { cartCount, wishlist } = useBasket();
  const [term, setTerm] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = window.setInterval(
      () => setPlaceholderIndex(prev => (prev + 1) % PLACEHOLDER_KEYS.length),
      3200,
    );
    return () => window.clearInterval(id);
  }, []);

  const submit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const query = term.trim();
      navigate(
        query ? `${ROUTES.SHOP}?q=${encodeURIComponent(query)}` : ROUTES.SHOP,
      );
    },
    [navigate, term],
  );

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return {
    term,
    setTerm,
    submit,
    menuOpen,
    openMenu,
    closeMenu,
    cartCount,
    wishlistCount: wishlist.length,
    placeholder: PLACEHOLDER_KEYS[placeholderIndex],
  };
}
