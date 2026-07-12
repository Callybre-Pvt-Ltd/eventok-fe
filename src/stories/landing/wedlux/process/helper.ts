import { useRef } from 'react';
import { gsap, useGSAP } from '@/hooks/gsap/setup';
import { processSteps } from './steps';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useWedluxProcess() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const reduce = prefersReducedMotion();
      const headerBits = gsap.utils.toArray<HTMLElement>(
        '[data-how-header]',
        root,
      );
      const flowNodes = gsap.utils.toArray<HTMLElement>(
        '[data-how-flow-node]',
        root,
      );
      const flowLines = gsap.utils.toArray<SVGPathElement>(
        '[data-how-flow-line]',
        root,
      );
      const steps = gsap.utils.toArray<HTMLElement>('[data-how-step]', root);
      const progress = root.querySelector<SVGPathElement>('[data-how-spine]');

      if (reduce) {
        gsap.set([...headerBits, ...flowNodes, ...steps], {
          clearProps: 'all',
          opacity: 1,
        });
        [...flowLines, progress].filter(Boolean).forEach(line => {
          const el = line as SVGPathElement;
          const len = el.getTotalLength();
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: 0 });
        });
        return;
      }

      gsap.fromTo(
        headerBits,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 78%' },
        },
      );

      const flow = root.querySelector('[data-how-flow]');
      flowNodes.forEach((node, i) => {
        gsap.fromTo(
          node,
          { opacity: 0, y: 16, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            delay: i * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: flow ?? node,
              start: 'top 85%',
            },
          },
        );
      });

      flowLines.forEach(line => {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: flow ?? root,
            start: 'top 80%',
          },
        });
      });

      if (progress) {
        const length = progress.getTotalLength();
        gsap.set(progress, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(progress, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.querySelector('[data-how-journey]'),
            start: 'top 55%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        });
      }

      steps.forEach((step, index) => {
        const fromLeft = index % 2 === 0;
        const visual = step.querySelector<HTMLElement>('[data-how-visual]');
        const copy = step.querySelectorAll<HTMLElement>('[data-how-copy]');
        const bits = step.querySelectorAll<HTMLElement>('[data-how-bit]');

        gsap.fromTo(
          copy,
          { opacity: 0, y: 28, x: fromLeft ? -18 : 18 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.85,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          },
        );

        if (visual) {
          gsap.fromTo(
            visual,
            {
              opacity: 0,
              y: 36,
              scale: 0.96,
              rotate: fromLeft ? 0.8 : -0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 78%',
                toggleActions: 'play none none reverse',
              },
              onComplete: () => gsap.set(visual, { clearProps: 'transform' }),
            },
          );
        }

        bits.forEach((bit, bitIndex) => {
          gsap.fromTo(
            bit,
            { opacity: 0, y: 18, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              delay: 0.12 + bitIndex * 0.07,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 72%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        });

        const path = step.querySelector<SVGPathElement>('[data-how-path]');
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.35,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: step,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        const packet = step.querySelector<HTMLElement>('[data-how-packet]');
        if (packet) {
          gsap.set(packet, { left: '10%', top: '48%', opacity: 0, scale: 0.7 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          });
          tl.to(packet, {
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
          })
            .to(packet, {
              left: '46%',
              top: '28%',
              duration: 0.55,
              ease: 'power2.inOut',
            })
            .to(packet, {
              left: '82%',
              top: '48%',
              duration: 0.6,
              ease: 'power2.inOut',
            });
        }
      });
    },
    { scope, dependencies: [processSteps.length] },
  );

  return { scope, steps: processSteps };
}
