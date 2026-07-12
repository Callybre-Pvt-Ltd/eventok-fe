import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/hooks/gsap/setup';
import {
  memories,
  memoryCategories,
  type Memory,
  type MemoryCategory,
} from './memories';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useWedluxMoments() {
  const scope = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<MemoryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return memories;
    return memories.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const featured = filtered.slice(0, 5);
  const editorial = filtered.slice(0, 8);
  const strip = filtered.slice(0, 10);

  const openLightbox = useCallback(
    (memory: Memory) => {
      const index = filtered.findIndex(item => item.id === memory.id);
      setLightboxIndex(index >= 0 ? index : 0);
    },
    [filtered],
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex(prev => {
      if (prev === null || filtered.length === 0) return prev;
      return (prev + 1) % filtered.length;
    });
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex(prev => {
      if (prev === null || filtered.length === 0) return prev;
      return (prev - 1 + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const cards = gsap.utils.toArray<HTMLElement>('[data-memory-card]', root);
      const header = gsap.utils.toArray<HTMLElement>(
        '[data-memory-header]',
        root,
      );

      if (prefersReducedMotion()) {
        gsap.set([...header, ...cards], { clearProps: 'all', opacity: 1 });
        return;
      }

      gsap.fromTo(
        header,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      );

      cards.forEach((card, index) => {
        const reveal = card.dataset.reveal ?? 'fade';
        const from: gsap.TweenVars = {
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          delay: (index % 4) * 0.05,
          onComplete: () =>
            gsap.set(card, { clearProps: 'clipPath,transform' }),
        };

        if (reveal === 'clip') {
          gsap.fromTo(
            card,
            {
              opacity: 1,
              clipPath: 'inset(12% 12% 12% 12% round 18px)',
              scale: 0.96,
            },
            {
              ...from,
              clipPath: 'inset(0% 0% 0% 0% round 18px)',
              scale: 1,
              opacity: 1,
            },
          );
        } else if (reveal === 'scale') {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.92, y: 24 },
            { ...from, scale: 1, y: 0, opacity: 1 },
          );
        } else if (reveal === 'slide') {
          const fromLeft = index % 2 === 0;
          gsap.fromTo(
            card,
            { opacity: 0, x: fromLeft ? -36 : 36, y: 16 },
            { ...from, x: 0, y: 0, opacity: 1 },
          );
        } else {
          gsap.fromTo(
            card,
            { opacity: 0, y: 32 },
            { ...from, y: 0, opacity: 1 },
          );
        }
      });
    },
    { scope, dependencies: [activeCategory, filtered.length] },
  );

  return {
    scope,
    categories: memoryCategories,
    activeCategory,
    setActiveCategory,
    featured,
    editorial,
    strip,
    filtered,
    lightboxIndex,
    openLightbox,
    closeLightbox,
    goNext,
    goPrev,
    setLightboxIndex,
  };
}
