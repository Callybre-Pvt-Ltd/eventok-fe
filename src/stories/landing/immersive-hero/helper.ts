import { useEffect, useRef } from 'react';
import { useDesignTokens } from '@/design-system';

export function useImmersiveHero() {
  const { colors } = useDesignTokens();
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY * 0.25;
      el.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { colors, parallaxRef };
}
