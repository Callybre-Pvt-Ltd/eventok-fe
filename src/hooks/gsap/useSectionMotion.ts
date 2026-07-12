import { useRef } from 'react';
import { gsap, useGSAP } from './setup';

/**
 * Wedlux scroll motion for one section. Attach the returned ref to the
 * section root, then mark children:
 *  - [data-reveal]                fade-up once it enters the viewport
 *  - [data-reveal-group="name"]   staggered fade-up with same-named siblings
 *  - [data-parallax]              scroll-scrubbed vertical parallax; optional
 *                                 data-parallax-speed="12" (percent travel,
 *                                 negative reverses direction)
 */
export const useSectionMotion = <T extends HTMLElement = HTMLElement>() => {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (reduce) {
        gsap.set(
          root.querySelectorAll(
            '[data-reveal], [data-reveal-group], [data-parallax]',
          ),
          { clearProps: 'all', opacity: 1 },
        );
        return;
      }

      gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach(el => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      const groups = new Set(
        gsap.utils
          .toArray<HTMLElement>('[data-reveal-group]', root)
          .map(el => el.dataset.revealGroup as string),
      );
      groups.forEach(group => {
        const items = gsap.utils.toArray<HTMLElement>(
          `[data-reveal-group="${group}"]`,
          root,
        );
        if (!items.length) return;
        gsap.from(items, {
          y: 48,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: items[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]', root).forEach(el => {
        const speed = Number(el.dataset.parallaxSpeed ?? 12);
        gsap.fromTo(
          el,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );
      });
    },
    { scope },
  );

  return scope;
};
