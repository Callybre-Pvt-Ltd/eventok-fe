import { useCallback, useEffect, useState } from 'react';
import type { PublicVendor } from '@/types';
import { useTheme } from '@/theme';

const FALLBACK =
  'https://images.unsplash.com/photo-1519167758481-83f29da8c2c3?w=900&q=85';

export function useVendorPortfolioCard(vendor: PublicVendor) {
  const { palette } = useTheme();
  const images =
    vendor.portfolio.length > 0 ? vendor.portfolio.map(p => p.url) : [FALLBACK];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setHovered] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const next = useCallback(
    () => setActiveIndex(i => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setActiveIndex(i => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const goTo = (i: number) => setActiveIndex(i);

  useEffect(() => {
    if (!isHovered || images.length < 2) return;
    const timer = setInterval(next, 3200);
    return () => clearInterval(timer);
  }, [isHovered, images.length, next]);

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFav(v => !v);
  };

  const handleQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return {
    palette,
    images,
    activeIndex,
    isHovered,
    isFav,
    setHovered,
    next,
    prev,
    goTo,
    toggleFav,
    handleQuote,
  };
}
