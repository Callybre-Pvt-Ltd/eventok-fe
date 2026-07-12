import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/hooks/gsap/setup';

const SCROLL_PER_CARD_DESKTOP = 520;
const SETTLE_DESKTOP = 220;

/** ~45% less scroll than desktop; snappy mobile storytelling */
const SCROLL_PER_CARD_MOBILE = 180;
const SETTLE_MOBILE = 70;

/** Next card peeks ~12–15% from bottom */
const MOBILE_PEEK_Y = 86;

export interface AnimationControllerResult {
  sectionRef: React.RefObject<HTMLElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  progress: number;
  scrollToIndex: (index: number) => void;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function wireCounter(
  tl: gsap.core.Timeline,
  card: HTMLElement,
  stepStart: number,
) {
  const counters = card.querySelectorAll<HTMLElement>('[data-portfolio-count]');
  counters.forEach(counter => {
    const target = Number(counter.dataset.portfolioCount ?? 0);
    const proxy = { value: 0 };
    let lastWritten = -1;

    tl.to(
      proxy,
      {
        value: target,
        duration: 1,
        ease: 'power1.out',
        onUpdate: () => {
          const next = Math.round(proxy.value);
          if (next !== lastWritten) {
            lastWritten = next;
            counter.textContent = next.toLocaleString();
          }
        },
      },
      stepStart,
    );
  });
}

function createDesktopTimeline(
  cards: HTMLElement[],
  track: HTMLElement,
  cardCount: number,
  onProgress: (progress: number, activeIndex: number) => void,
) {
  gsap.set(cards, {
    force3D: true,
    willChange: 'transform, opacity, filter',
  });

  cards.forEach((card, i) => {
    const image = card.querySelector<HTMLElement>('[data-portfolio-image]');
    const content = card.querySelector<HTMLElement>('[data-portfolio-content]');
    const overlay = card.querySelector<HTMLElement>('[data-portfolio-overlay]');

    if (i === 0) {
      gsap.set(card, {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
      });
      if (image) gsap.set(image, { scale: 1.1 });
      if (content) gsap.set(content, { opacity: 1, y: 0 });
      if (overlay) gsap.set(overlay, { opacity: 1 });
    } else {
      gsap.set(card, {
        yPercent: 105,
        scale: 0.9,
        opacity: 1,
        filter: 'blur(0px)',
      });
      if (image) gsap.set(image, { scale: 1.04 });
      if (content) gsap.set(content, { opacity: 0, y: 18 });
      if (overlay) gsap.set(overlay, { opacity: 0.7 });
    }
  });

  const endDistance =
    (cards.length - 1) * SCROLL_PER_CARD_DESKTOP + SETTLE_DESKTOP;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: track,
      start: 'top top',
      end: `+=${endDistance}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      snap: {
        snapTo: gsap.utils.snap(1 / Math.max(cards.length - 1, 1)),
        duration: { min: 0.1, max: 0.4 },
        delay: 0.04,
        ease: 'power1.inOut',
      },
      onUpdate: self => {
        onProgress(self.progress, Math.round(self.progress * (cardCount - 1)));
      },
    },
  });

  cards.slice(1).forEach((card, i) => {
    const prev = cards[i];
    const stepStart = i;
    const prevImage = prev.querySelector<HTMLElement>('[data-portfolio-image]');
    const prevContent = prev.querySelector<HTMLElement>(
      '[data-portfolio-content]',
    );
    const nextImage = card.querySelector<HTMLElement>('[data-portfolio-image]');
    const nextContent = card.querySelector<HTMLElement>(
      '[data-portfolio-content]',
    );

    tl.to(
      card,
      {
        yPercent: 0,
        scale: 1,
        force3D: true,
        ease: 'power2.inOut',
        duration: 1,
      },
      stepStart,
    )
      .to(
        prev,
        {
          scale: 0.88,
          opacity: 0.42,
          y: 18,
          filter: 'blur(5px)',
          force3D: true,
          ease: 'power2.inOut',
          duration: 1,
        },
        stepStart,
      )
      .to(
        nextImage,
        { scale: 1.14, ease: 'power1.inOut', duration: 1 },
        stepStart,
      )
      .to(
        nextContent,
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.7 },
        stepStart + 0.25,
      )
      .to(
        prevImage,
        { scale: 1.02, ease: 'power1.inOut', duration: 1 },
        stepStart,
      )
      .to(
        prevContent,
        { opacity: 0.35, y: -8, ease: 'power1.inOut', duration: 0.7 },
        stepStart,
      );

    wireCounter(tl, prev, stepStart);
  });

  wireCounter(tl, cards[cards.length - 1], Math.max(cards.length - 2, 0));

  return () => {
    gsap.set(cards, { clearProps: 'all' });
  };
}

/**
 * Mobile-only stack: image-first, peek next card, lighter motion, less scroll.
 */
function createMobileTimeline(
  cards: HTMLElement[],
  track: HTMLElement,
  cardCount: number,
  onProgress: (progress: number, activeIndex: number) => void,
) {
  gsap.set(cards, {
    force3D: true,
    willChange: 'transform, opacity',
  });

  cards.forEach((card, i) => {
    const image = card.querySelector<HTMLElement>('[data-portfolio-image]');

    if (i === 0) {
      gsap.set(card, { yPercent: 0, scale: 1, opacity: 1 });
      if (image) gsap.set(image, { scale: 1.06 });
    } else {
      /* Peek: ~14% of next card visible beneath active */
      gsap.set(card, {
        yPercent: MOBILE_PEEK_Y,
        scale: 0.985,
        opacity: 1,
      });
      if (image) gsap.set(image, { scale: 1.03 });
    }
  });

  const endDistance =
    (cards.length - 1) * SCROLL_PER_CARD_MOBILE + SETTLE_MOBILE;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: track,
      start: 'top top',
      end: `+=${endDistance}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.45,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      snap: {
        snapTo: gsap.utils.snap(1 / Math.max(cards.length - 1, 1)),
        duration: { min: 0.08, max: 0.22 },
        delay: 0.02,
        ease: 'power1.inOut',
      },
      onUpdate: self => {
        onProgress(self.progress, Math.round(self.progress * (cardCount - 1)));
      },
    },
  });

  cards.slice(1).forEach((card, i) => {
    const prev = cards[i];
    const stepStart = i;
    const prevImage = prev.querySelector<HTMLElement>('[data-portfolio-image]');
    const nextImage = card.querySelector<HTMLElement>('[data-portfolio-image]');
    const nextPeek = cards[i + 2];

    tl.to(
      card,
      {
        yPercent: 0,
        scale: 1,
        force3D: true,
        ease: 'power2.out',
        duration: 1,
      },
      stepStart,
    ).to(
      prev,
      {
        scale: 0.97,
        opacity: 0.7,
        y: 6,
        force3D: true,
        ease: 'power2.out',
        duration: 1,
      },
      stepStart,
    );

    if (nextImage) {
      tl.to(
        nextImage,
        { scale: 1.06, ease: 'power1.out', duration: 1 },
        stepStart,
      );
    }
    if (prevImage) {
      tl.to(
        prevImage,
        { scale: 1.02, ease: 'power1.out', duration: 1 },
        stepStart,
      );
    }

    /* Keep following card peeking */
    if (nextPeek) {
      tl.fromTo(
        nextPeek,
        { yPercent: 100 },
        {
          yPercent: MOBILE_PEEK_Y,
          duration: 1,
          ease: 'power2.out',
        },
        stepStart,
      );
    }

    wireCounter(tl, prev, stepStart);
  });

  wireCounter(tl, cards[cards.length - 1], Math.max(cards.length - 2, 0));

  return () => {
    gsap.set(cards, { clearProps: 'all' });
  };
}

export const useAnimationController = (cardCount: number) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      if (cardCount < 2 || !trackRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-portfolio-card]',
        trackRef.current,
      );
      if (cards.length < 2) return;

      const mm = gsap.matchMedia();

      const onProgress = (nextProgress: number, step: number) => {
        setProgress(nextProgress);
        setActiveIndex(prev => (prev === step ? prev : step));
      };

      if (prefersReducedMotion()) {
        mm.add('all', () => {
          gsap.set(cards, { clearProps: 'all', position: 'relative' });
          setActiveIndex(0);
          setProgress(0);
        });
        return () => mm.revert();
      }

      mm.add('(min-width: 768px)', () =>
        createDesktopTimeline(cards, trackRef.current!, cardCount, onProgress),
      );

      mm.add('(max-width: 767px)', () =>
        createMobileTimeline(cards, trackRef.current!, cardCount, onProgress),
      );

      const refreshCall = gsap
        .delayedCall(0.15, () => ScrollTrigger.refresh())
        .pause();
      const onResize = () => refreshCall.restart(true);
      window.addEventListener('resize', onResize);

      const images = Array.from(
        trackRef.current.querySelectorAll('img'),
      ) as HTMLImageElement[];
      let pending = 0;
      images.forEach(img => {
        if (!img.complete) {
          pending += 1;
          img.addEventListener(
            'load',
            () => {
              pending -= 1;
              if (pending === 0) ScrollTrigger.refresh();
            },
            { once: true },
          );
        }
      });

      return () => {
        window.removeEventListener('resize', onResize);
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [cardCount] },
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const trigger = ScrollTrigger.getAll().find(
        st => st.trigger === trackRef.current,
      );
      if (!trigger || cardCount < 2) return;
      const clamped = Math.max(0, Math.min(index, cardCount - 1));
      const target =
        trigger.start +
        (trigger.end - trigger.start) * (clamped / (cardCount - 1));
      window.scrollTo({ top: target, behavior: 'smooth' });
    },
    [cardCount],
  );

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || prefersReducedMotion()) return;
    if (!window.matchMedia('(min-width: 768px) and (pointer: fine)').matches) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const stage = root.querySelector<HTMLElement>('[data-portfolio-stage]');
      const glows = root.querySelectorAll<HTMLElement>('[data-portfolio-glow]');
      if (stage) {
        stage.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0)`;
      }
      glows.forEach((glow, i) => {
        const depth = 10 + i * 6;
        glow.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
    };

    const onLeave = () => {
      const stage = root.querySelector<HTMLElement>('[data-portfolio-stage]');
      const glows = root.querySelectorAll<HTMLElement>('[data-portfolio-glow]');
      if (stage) stage.style.transform = '';
      glows.forEach(glow => {
        glow.style.transform = '';
      });
    };

    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);
    return () => {
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return {
    sectionRef,
    trackRef,
    activeIndex,
    progress,
    scrollToIndex,
  };
};
