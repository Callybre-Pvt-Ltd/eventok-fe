import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/hooks/gsap/setup';
import {
  experienceCategories,
  experiences,
  type Experience,
  type ExperienceCategory,
} from './experiences';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useWedluxServices() {
  const scope = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] =
    useState<ExperienceCategory>('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return experiences;
    return experiences.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const featured =
    filtered.find(item => item.layout === 'featured') ?? filtered[0];
  const medium = filtered.filter(
    item => item.layout === 'medium' && item.id !== featured?.id,
  );
  const panorama = filtered.find(
    item => item.layout === 'panorama' && item.id !== featured?.id,
  );

  const rest = filtered.filter(
    item =>
      item.id !== featured?.id &&
      !medium.some(m => m.id === item.id) &&
      item.id !== panorama?.id,
  );

  const mediumCards = [...medium, ...rest].slice(0, 2);
  const usedIds = new Set(
    [featured, ...mediumCards, panorama]
      .filter(Boolean)
      .map(item => (item as Experience).id),
  );
  const compactCards = filtered
    .filter(item => !usedIds.has(item.id))
    .slice(0, 3);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const cards = gsap.utils.toArray<HTMLElement>('[data-exp-card]', root);
      if (!cards.length) return;

      if (prefersReducedMotion()) {
        gsap.set(cards, { clearProps: 'all', opacity: 1 });
        return;
      }

      cards.forEach((card, index) => {
        const fromLeft = index % 2 === 0;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            x: fromLeft ? -28 : 28,
            scale: 0.97,
            rotate: fromLeft ? -0.6 : 0.6,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            delay: (index % 3) * 0.06,
            onComplete: () => {
              gsap.set(card, { clearProps: 'transform' });
            },
          },
        );
      });
    },
    { scope, dependencies: [activeCategory, filtered.length] },
  );

  useEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const onMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const targets = root.querySelectorAll<HTMLElement>('[data-exp-parallax]');

      targets.forEach((el, i) => {
        const depth = 8 + i * 3;
        el.style.transform = `translate3d(${x * depth}px, ${
          y * depth
        }px, 0) scale(1.02)`;
      });
    };

    const onLeave = () => {
      root.querySelectorAll<HTMLElement>('[data-exp-parallax]').forEach(el => {
        el.style.transform = '';
      });
    };

    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);
    return () => {
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [activeCategory]);

  return {
    scope,
    categories: experienceCategories,
    activeCategory,
    setActiveCategory,
    featured,
    mediumCards,
    panorama,
    compactCards,
    mobileCards: filtered,
  };
}
