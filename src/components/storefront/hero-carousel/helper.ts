import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { catalogService } from '@/services';
import type { HeroSlide } from '@/types/catalog';

const ROTATE_MS = 6000;

export function useHeroCarousel() {
  const { data } = useQuery({
    queryKey: ['storefront', 'hero'],
    queryFn: async () => (await catalogService.getHeroSlides()).data ?? [],
  });
  const slides: HeroSlide[] = data ?? [];
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex(prev => (slides.length ? (prev + 1) % slides.length : 0));
  }, [slides.length]);

  const prev = useCallback(() => {
    setIndex(current =>
      slides.length ? (current - 1 + slides.length) % slides.length : 0,
    );
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(next, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [next, slides.length]);

  return { slides, index, setIndex, next, prev };
}
