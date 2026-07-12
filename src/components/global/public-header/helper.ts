import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '@/hooks/gsap/setup';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function usePublicHeader(overlay = false) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shellRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => {
      const threshold = overlay ? Math.max(window.innerHeight * 0.1, 40) : 16;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  useEffect(() => {
    const node = shellRef.current;
    if (!node) return;

    let raf = 0;
    const publishHeight = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const height = Math.round(node.getBoundingClientRect().height);
        document.documentElement.style.setProperty(
          '--public-header-height',
          `${height}px`,
        );
      });
    };

    publishHeight();
    const observer = new ResizeObserver(publishHeight);
    observer.observe(node);
    window.addEventListener('resize', publishHeight);
    window.addEventListener('scroll', publishHeight, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', publishHeight);
      window.removeEventListener('scroll', publishHeight);
    };
  }, [scrolled, overlay]);
  useEffect(() => {
    if (!shellRef.current || prefersReducedMotion()) return;
    const root = shellRef.current;
    const links = root.querySelectorAll('[data-nav-link]');
    const cta = root.querySelector('[data-nav-cta]');

    gsap.fromTo(
      root,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
    );
    gsap.fromTo(
      links,
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.12,
        ease: 'power3.out',
      },
    );
    if (cta) {
      gsap.fromTo(
        cta,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, delay: 0.28, ease: 'power3.out' },
      );
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (menuRef.current && !prefersReducedMotion()) {
      const items = menuRef.current.querySelectorAll('[data-nav-item]');
      gsap.fromTo(
        items,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: 'power3.out',
        },
      );
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);

  return {
    shellRef,
    menuRef,
    menuBtnRef,
    menuId,
    scrolled,
    menuOpen,
    closeMenu,
    toggleMenu,
  };
}
