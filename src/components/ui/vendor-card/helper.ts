import { useCallback, useState } from 'react';

export function useVendorCard() {
  const [favorited, setFavorited] = useState(false);

  const toggleFavorite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorited(prev => !prev);
  }, []);

  return { favorited, toggleFavorite };
}
