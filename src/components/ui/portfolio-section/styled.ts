import styled, { keyframes } from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { media } from '@/theme';

const drift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.35; }
  50% { transform: translate3d(8px, -12px, 0); opacity: 0.55; }
`;

export const SectionRoot = styled.section`
  position: relative;
  width: 100%;
  overflow: clip;
  color: ${brandColors.black};
  background: radial-gradient(
      ellipse 80% 50% at 20% 0%,
      rgba(255, 255, 255, 0.9),
      transparent 55%
    ),
    radial-gradient(
      ellipse 60% 45% at 100% 40%,
      rgba(${brandRgb.ivory}, 0.85),
      transparent 50%
    ),
    linear-gradient(
      180deg,
      ${brandColors.cream} 0%,
      ${brandColors.ivory} 45%,
      ${brandColors.tan} 100%
    );

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.04;
    z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
`;

export const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  ${media.belowMd} {
    display: none;
  }
`;

export const Glow = styled.span<{ $x: string; $y: string; $size: string }>`
  position: absolute;
  left: ${({ $x }) => $x};
  top: ${({ $y }) => $y};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(201, 162, 39, 0.16) 0%,
    transparent 70%
  );
  animation: ${drift} 12s ease-in-out infinite;
  will-change: transform;
  transition: transform 0.4s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  ${media.md} {
    animation-duration: 16s;
  }
`;

export const Track = styled.div`
  position: relative;
  z-index: 1;
`;

/**
 * Mobile: compact sticky header + image-dominant stage (~75–80% viewport).
 * Desktop: split editorial columns — intentionally different layout.
 */
export const PinnedViewport = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100svh;
  min-height: 100svh;
  max-height: 100svh;
  padding: max(0.55rem, env(safe-area-inset-top, 0px))
    max(0.85rem, env(safe-area-inset-right, 0px))
    max(0.55rem, env(safe-area-inset-bottom, 0px))
    max(0.85rem, env(safe-area-inset-left, 0px));
  gap: 0.55rem;
  overflow: hidden;

  ${media.md} {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: center;
    gap: clamp(1.5rem, 3.5vw, 3.5rem);
    height: 100vh;
    min-height: 100vh;
    max-height: none;
    padding: 0 clamp(1.5rem, 5vw, 5rem);
    max-width: 1440px;
    margin-inline: auto;
    width: 100%;
  }

  ${media.xl} {
    gap: clamp(2rem, 4vw, 4.5rem);
  }

  @media (max-width: 767px) and (orientation: landscape) {
    height: 100svh;
    padding-block: max(0.35rem, env(safe-area-inset-top, 0px))
      max(0.35rem, env(safe-area-inset-bottom, 0px));
    gap: 0.35rem;
  }
`;

export const StageWrap = styled.div`
  position: relative;
  /* Image priority: ~75–80% of viewport after compact header */
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  height: min(78svh, calc(100svh - 7.5rem));
  border-radius: clamp(1rem, 3vw, 1.35rem);
  overflow: hidden;
  isolation: isolate;
  background: ${brandColors.tan};
  box-shadow: 0 16px 40px rgba(${brandRgb.black}, 0.1);

  ${media.md} {
    flex: none;
    height: min(72vh, 640px);
    border-radius: 24px;
    box-shadow: 0 32px 80px rgba(${brandRgb.black}, 0.14);
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  ${media.xl} {
    height: min(74vh, 700px);
  }

  @media (max-width: 767px) and (orientation: landscape) {
    height: min(72svh, calc(100svh - 5.5rem));
  }
`;
