import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { CART_STORAGE_KEY, WISHLIST_STORAGE_KEY } from '@/constants/catalog';
import type { CartLine } from '@/types/catalog';
import { readStorage, writeStorage } from '@/utils/storefront/storage';

interface BasketContextValue {
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  addToCart: (serviceSlug: string, eventDate?: string) => void;
  removeFromCart: (serviceSlug: string) => void;
  setQuantity: (serviceSlug: string, quantity: number) => void;
  setEventDate: (serviceSlug: string, eventDate: string) => void;
  clearCart: () => void;
  toggleWishlist: (serviceSlug: string) => void;
  isWishlisted: (serviceSlug: string) => boolean;
}

const BasketContext = createContext<BasketContextValue | null>(null);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() =>
    readStorage<CartLine[]>(CART_STORAGE_KEY, []),
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>(WISHLIST_STORAGE_KEY, []),
  );

  useEffect(() => {
    writeStorage(CART_STORAGE_KEY, cart);
  }, [cart]);

  useEffect(() => {
    writeStorage(WISHLIST_STORAGE_KEY, wishlist);
  }, [wishlist]);

  const addToCart = useCallback((serviceSlug: string, eventDate?: string) => {
    setCart(prev => {
      const existing = prev.find(line => line.serviceSlug === serviceSlug);
      if (!existing) return [...prev, { serviceSlug, quantity: 1, eventDate }];
      return prev.map(line =>
        line.serviceSlug === serviceSlug
          ? {
              ...line,
              quantity: line.quantity + 1,
              eventDate: eventDate ?? line.eventDate,
            }
          : line,
      );
    });
  }, []);

  const removeFromCart = useCallback((serviceSlug: string) => {
    setCart(prev => prev.filter(line => line.serviceSlug !== serviceSlug));
  }, []);

  const setQuantity = useCallback((serviceSlug: string, quantity: number) => {
    setCart(prev =>
      quantity <= 0
        ? prev.filter(line => line.serviceSlug !== serviceSlug)
        : prev.map(line =>
            line.serviceSlug === serviceSlug ? { ...line, quantity } : line,
          ),
    );
  }, []);

  const setEventDate = useCallback((serviceSlug: string, eventDate: string) => {
    setCart(prev =>
      prev.map(line =>
        line.serviceSlug === serviceSlug ? { ...line, eventDate } : line,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((serviceSlug: string) => {
    setWishlist(prev =>
      prev.includes(serviceSlug)
        ? prev.filter(slug => slug !== serviceSlug)
        : [...prev, serviceSlug],
    );
  }, []);

  const value = useMemo<BasketContextValue>(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
      addToCart,
      removeFromCart,
      setQuantity,
      setEventDate,
      clearCart,
      toggleWishlist,
      isWishlisted: (serviceSlug: string) => wishlist.includes(serviceSlug),
    }),
    [
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      setQuantity,
      setEventDate,
      clearCart,
      toggleWishlist,
    ],
  );

  return createElement(BasketContext.Provider, { value }, children);
}

export function useBasket(): BasketContextValue {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error('useBasket must be used within BasketProvider');
  return ctx;
}
