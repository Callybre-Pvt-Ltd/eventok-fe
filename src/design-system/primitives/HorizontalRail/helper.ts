import { useCallback, useRef, useState } from 'react';
import { useDesignTokens } from '../../hooks/useDesignTokens';

export function useHorizontalRail() {
  const { colors } = useDesignTokens();
  const trackRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 8);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  return { colors, trackRef, showLeft, showRight, scroll };
}
