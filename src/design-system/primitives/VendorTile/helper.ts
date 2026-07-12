import { useState } from 'react';
import type { PublicVendor } from '@/types';
import { useDesignTokens } from '../../hooks/useDesignTokens';

export function useVendorTile(vendor: PublicVendor) {
  const { colors } = useDesignTokens();
  const [isFav, setIsFav] = useState(false);
  const image =
    vendor.portfolio[0]?.url ??
    'https://images.unsplash.com/photo-1519167758481-83f29da8c2c3?w=800&q=85';

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFav(v => !v);
  };

  return { colors, image, isFav, toggleFav };
}
