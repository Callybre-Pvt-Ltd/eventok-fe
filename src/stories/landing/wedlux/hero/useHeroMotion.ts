import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/hooks/gsap/setup';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useHeroMotion() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const reduce = prefersReducedMotion();
      const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]', root);
      const lead = root.querySelector<HTMLElement>('[data-hero-lead]');
      const cta = root.querySelector<HTMLElement>('[data-hero-cta]');
      const media = root.querySelector<HTMLElement>('[data-hero-media]');
      const mediaImg = root.querySelector<HTMLElement>('[data-hero-media-img]');
      const accent = root.querySelector<HTMLElement>('[data-hero-accent]');
      const cards = gsap.utils.toArray<HTMLElement>('[data-hero-card]', root);
      const stats = gsap.utils.toArray<HTMLElement>('[data-hero-stat]', root);
      const decor = gsap.utils.toArray<HTMLElement>('[data-hero-decor]', root);
      const scrollCue = root.querySelector<HTMLElement>('[data-hero-scroll]');
      const glow = root.querySelector<HTMLElement>('[data-hero-glow]');
      const marquee = root.querySelector<HTMLElement>(
        '[data-hero-marquee-track]',
      );

      if (reduce) {
        gsap.set(
          [lines, lead, cta, media, accent, cards, stats, decor, scrollCue]
            .flat()
            .filter(Boolean),
          { clearProps: 'all', opacity: 1 },
        );
        return;
      }

      gsap.set(lines, { yPercent: 110, opacity: 0, rotateX: 12 });
      gsap.set([lead, cta].filter(Boolean), { y: 28, opacity: 0 });
      gsap.set(media, {
        clipPath: 'inset(12% 12% 12% 12% round 20px)',
        opacity: 0,
        scale: 1.06,
      });
      if (mediaImg) gsap.set(mediaImg, { scale: 1.18 });
      if (accent) {
        gsap.set(accent, { y: 48, opacity: 0, rotate: -8, scale: 0.94 });
      }
      gsap.set(cards, { y: 36, opacity: 0, scale: 0.92 });
      gsap.set(stats, { y: 24, opacity: 0 });
      gsap.set(decor, { opacity: 0, scale: 0.8 });
      if (scrollCue) gsap.set(scrollCue, { opacity: 0, y: -8 });

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

      intro
        .to(
          lines,
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.15,
            stagger: 0.14,
            letterSpacing: '0.01em',
          },
          0.15,
        )
        .to(lead, { y: 0, opacity: 1, duration: 0.9 }, '-=0.55')
        .to(cta, { y: 0, opacity: 1, duration: 0.85 }, '-=0.55')
        .to(
          media,
          {
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            opacity: 1,
            scale: 1,
            duration: 1.35,
            ease: 'power3.inOut',
          },
          '-=0.95',
        )
        .to(mediaImg, { scale: 1.08, duration: 6, ease: 'none' }, '-=1.1')
        .to(
          accent,
          { y: 0, opacity: 1, rotate: -4, scale: 1, duration: 1.1 },
          '-=1.0',
        )
        .to(
          cards,
          { y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.12 },
          '-=0.75',
        )
        .to(stats, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, '-=0.45')
        .to(decor, { opacity: 1, scale: 1, duration: 1, stagger: 0.1 }, '-=0.6')
        .to(scrollCue, { opacity: 1, y: 0, duration: 0.7 }, '-=0.35');

      if (media) {
        gsap.to(media, {
          y: -10,
          duration: 5.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -8 : 8,
          duration: 4 + i * 0.6,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      decor.forEach((el, i) => {
        gsap.to(el, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 48 + i * 12,
          repeat: -1,
          ease: 'none',
        });
      });

      if (scrollCue) {
        gsap.to(scrollCue.querySelector('[data-hero-scroll-arrow]'), {
          y: 6,
          duration: 1.1,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }

      stats.forEach(stat => {
        const valueEl = stat.querySelector<HTMLElement>('[data-hero-count]');
        if (!valueEl) return;
        const target = Number(valueEl.dataset.heroCount ?? 0);
        const suffix = valueEl.dataset.heroSuffix ?? '';
        const proxy = { value: 0 };

        ScrollTrigger.create({
          trigger: stat,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(proxy, {
              value: target,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                valueEl.textContent = `${Math.round(
                  proxy.value,
                ).toLocaleString()}${suffix}`;
              },
            });
          },
        });
      });

      if (marquee) {
        const distance = marquee.scrollWidth / 2;
        const marqueeTween = gsap.to(marquee, {
          x: -distance,
          duration: 28,
          ease: 'none',
          repeat: -1,
        });

        const trustBar = root.querySelector<HTMLElement>('[data-hero-trust]');
        const pause = () => marqueeTween.pause();
        const play = () => marqueeTween.play();
        trustBar?.addEventListener('pointerenter', pause);
        trustBar?.addEventListener('pointerleave', play);

        // store cleanup via return below
        (
          root as HTMLElement & { __marqueeCleanup?: () => void }
        ).__marqueeCleanup = () => {
          trustBar?.removeEventListener('pointerenter', pause);
          trustBar?.removeEventListener('pointerleave', play);
        };
      }

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
          const p = self.progress;
          gsap.set(root, {
            '--hero-exit': String(p),
          });
          if (media) gsap.set(media, { scale: 1 + p * 0.06, y: p * -40 });
          if (accent) gsap.set(accent, { y: p * 60, opacity: 1 - p * 0.85 });
        },
      });

      const pointer = { x: 0, y: 0 };
      const onMove = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

        if (glow) {
          gsap.to(glow, {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            duration: 0.9,
            ease: 'power2.out',
          });
        }
        if (media) {
          gsap.to(media, {
            rotateY: pointer.x * 3,
            rotateX: -pointer.y * 2.2,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
        cards.forEach((card, i) => {
          const depth = 6 + i * 4;
          gsap.to(card, {
            x: pointer.x * depth,
            y: pointer.y * (depth * 0.6),
            duration: 0.9 + i * 0.05,
            ease: 'power2.out',
          });
        });
        decor.forEach((el, i) => {
          gsap.to(el, {
            x: pointer.x * (10 + i * 6),
            y: pointer.y * (8 + i * 4),
            duration: 1.1,
            ease: 'power2.out',
          });
        });
      };

      root.addEventListener('pointermove', onMove);

      return () => {
        root.removeEventListener('pointermove', onMove);
        (
          root as HTMLElement & { __marqueeCleanup?: () => void }
        ).__marqueeCleanup?.();
      };
    },
    { scope },
  );

  return scope;
}
