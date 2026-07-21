import { useRef, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { gsap } from '@/hooks/gsap/setup';
import { CtaWrap, MagneticLink, MagneticWrap, Ripple } from './styled';

interface GalleryCtaProps {
  label: string;
}

export function GalleryCta({ label }: GalleryCtaProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.45,
      ease: 'power3.out',
    });
  };

  const onLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'power3.out' });
  };

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const ripple = rippleRef.current;
    if (!ripple) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    gsap.fromTo(
      ripple,
      { width: size, height: size, x, y, scale: 0, opacity: 0.55 },
      { scale: 1.4, opacity: 0, duration: 0.65, ease: 'power2.out' },
    );
  };

  return (
    <CtaWrap>
      <MagneticWrap ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave}>
        <MagneticLink to={ROUTES.SERVICES} onClick={onClick}>
          <Ripple ref={rippleRef} aria-hidden />
          {label}
          <ArrowUpRight size={18} aria-hidden />
        </MagneticLink>
      </MagneticWrap>
    </CtaWrap>
  );
}
