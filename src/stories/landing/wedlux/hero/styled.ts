import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

const grain = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-1.5%, 1%); }
`;

const ambientDrift = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(2%, -1.5%) scale(1.04); }
`;

export const HeroRoot = styled.section`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  color: ${brandColors.black};
  background: radial-gradient(
      ellipse 70% 55% at 18% 20%,
      rgba(255, 255, 255, 0.95) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 60% 50% at 82% 30%,
      rgba(${brandRgb.ivory}, 0.9) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 80% 60% at 50% 100%,
      rgba(${brandRgb.green}, 0.55) 0%,
      transparent 55%
    ),
    linear-gradient(
      180deg,
      ${brandColors.ivory} 0%,
      ${brandColors.cream} 55%,
      ${brandColors.tan} 100%
    );
  --hero-exit: 0;

  &::before {
    content: '';
    position: absolute;
    inset: -20%;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(
        circle at 30% 40%,
        rgba(201, 162, 39, 0.07),
        transparent 42%
      ),
      radial-gradient(
        circle at 70% 60%,
        rgba(42, 37, 34, 0.04),
        transparent 45%
      );
    animation: ${ambientDrift} 18s ease-in-out infinite;
    opacity: calc(1 - var(--hero-exit) * 0.6);

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    animation: ${grain} 4s steps(2) infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const HeroGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: min(42vw, 520px);
  height: min(42vw, 520px);
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(201, 162, 39, 0.14) 0%,
    rgba(201, 162, 39, 0.04) 40%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  will-change: transform;

  ${media.belowMd} {
    display: none;
  }
`;

export const HeroGridLines = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;

  span {
    width: 1px;
    height: 100%;
    background: rgba(${brandRgb.chocolate}, 0.05);
  }

  ${media.belowMd} {
    display: none;
  }
`;

export const HeroShell = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(5.25rem, 12vw, 7.5rem)
    max(1rem, env(safe-area-inset-right, 0px)) clamp(2rem, 5vw, 3.5rem)
    max(1rem, env(safe-area-inset-left, 0px));
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1.05fr 0.95fr;
    gap: clamp(2rem, 5vw, 4.5rem);
  }
`;

export const HeroCopy = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  perspective: 800px;
`;

export const DecorOrbit = styled.span`
  position: absolute;
  top: -1.25rem;
  right: clamp(0rem, 8vw, 4rem);
  z-index: 0;
  color: rgba(${brandRgb.chocolate}, 0.12);
  pointer-events: none;
  will-change: transform;

  ${media.belowMd} {
    display: none;
  }
`;

export const DecorRing = styled.span`
  position: absolute;
  bottom: 12%;
  left: 0.5rem;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.12);
  pointer-events: none;
  will-change: transform;

  ${media.belowMd} {
    display: none;
  }
`;

export const TitleBlock = styled.h1`
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(2.1rem, 9vw, 5.25rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${brandColors.black};
  overflow-wrap: anywhere;

  ${media.md} {
    letter-spacing: 0.04em;
    line-height: 1.05;
  }
`;

export const TitleLine = styled.span`
  display: block;
  overflow: hidden;
  padding-bottom: 0.06em;
`;

export const TitleLineInner = styled.span`
  display: block;
  will-change: transform, opacity;
`;

export const HeroLead = styled.p`
  position: relative;
  z-index: 1;
  margin: clamp(1.15rem, 2.5vw, 1.75rem) 0 clamp(1.5rem, 3vw, 2rem);
  max-width: 26rem;
  font-family: ${fontFamily.body};
  font-size: clamp(0.95rem, 1.5vw, 1.0625rem);
  font-weight: 500;
  line-height: 1.8;
  color: ${brandColors.taupe};
  will-change: transform, opacity;

  ${media.belowMd} {
    max-width: none;
  }
`;

export const CtaRow = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  will-change: transform, opacity;

  ${media.belowSm} {
    & > div,
    & > a {
      width: 100%;
    }

    a {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const MagneticWrap = styled.div`
  display: inline-flex;
  will-change: transform;
`;

export const MagneticLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  min-height: 48px;
  padding: 0.95rem 1.65rem 0.95rem 1.85rem;
  border-radius: 9999px;
  background: linear-gradient(
    120deg,
    ${brandColors.gold} 0%,
    #e0bc4a 45%,
    ${brandColors.gold} 100%
  );
  background-size: 180% 100%;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.display};
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(${brandRgb.black}, 0.12);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease, background-position 0.6s ease;

  svg {
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    transform: scale(1.04);
    background-position: 100% 0;
    box-shadow: 0 16px 40px rgba(${brandRgb.black}, 0.18);

    svg {
      transform: translateX(3px) translateY(-2px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.chocolate};
    outline-offset: 3px;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.45);
  transform: scale(0);
  opacity: 0;
`;

export const MediaStage = styled.div`
  position: relative;
  min-height: clamp(320px, 52vw, 560px);
  perspective: 1200px;

  ${media.belowLg} {
    min-height: clamp(280px, 70vw, 420px);
    order: -1;
  }
`;

export const MediaGlow = styled.div`
  position: absolute;
  inset: 8% 4%;
  border-radius: 28px;
  background: radial-gradient(
    ellipse at center,
    rgba(201, 162, 39, 0.28) 0%,
    rgba(201, 162, 39, 0.08) 45%,
    transparent 70%
  );
  filter: blur(28px);
  pointer-events: none;
`;

export const HeroMedia = styled.div`
  position: relative;
  z-index: 2;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4 / 4.5;
  background: ${brandColors.tan};
  box-shadow: 0 8px 24px rgba(${brandRgb.black}, 0.06),
    0 32px 80px rgba(${brandRgb.black}, 0.14);
  transform-style: preserve-3d;
  will-change: transform, clip-path;

  ${media.belowLg} {
    aspect-ratio: 16 / 11;
    max-width: 100%;
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 28%;
  will-change: transform;
`;

export const FloatingCard = styled.aside<{ $pos: 'tl' | 'tr' | 'bl' }>`
  position: absolute;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 9.5rem;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  background: rgba(255, 252, 250, 0.72);
  backdrop-filter: blur(16px) saturate(140%);
  box-shadow: 0 16px 40px rgba(${brandRgb.black}, 0.1);
  font-family: ${fontFamily.body};
  will-change: transform;

  ${({ $pos }) =>
    $pos === 'tl' &&
    `
    top: 8%;
    left: 4%;
  `}

  ${({ $pos }) =>
    $pos === 'tr' &&
    `
    top: 18%;
    right: 4%;
  `}

  ${({ $pos }) =>
    $pos === 'bl' &&
    `
    bottom: 14%;
    left: 4%;
  `}

  ${media.belowLg} {
    ${({ $pos }) =>
      $pos === 'tl' &&
      `
      top: 6%;
      left: 4%;
    `}
    ${({ $pos }) =>
      $pos === 'tr' &&
      `
      top: 10%;
      right: 4%;
    `}
    ${({ $pos }) =>
      $pos === 'bl' &&
      `
      bottom: 8%;
      left: 6%;
    `}
  }

  ${media.belowSm} {
    min-width: 7.75rem;
    padding: 0.65rem 0.75rem;

    ${({ $pos }) => $pos === 'tr' && `display: none;`}
  }
`;

export const CardEyebrow = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.gold};
`;

export const CardTitle = styled.span`
  font-family: ${fontFamily.display};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${brandColors.black};
  line-height: 1.25;
`;

export const CardMeta = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${brandColors.taupe};
`;

export const StarRow = styled.span`
  display: inline-flex;
  gap: 0.1rem;
  color: ${brandColors.gold};
  margin-bottom: 0.15rem;
`;

export const AccentMedia = styled.div`
  position: absolute;
  z-index: 3;
  right: 4%;
  bottom: 4%;
  width: min(42%, 210px);
  aspect-ratio: 4 / 5;
  border-radius: 16px;
  overflow: hidden;
  background: ${brandColors.tan};
  box-shadow: 0 20px 48px rgba(${brandRgb.black}, 0.16);
  transform: rotate(-4deg);
  will-change: transform, opacity;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.belowLg} {
    display: none;
  }
`;

export const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 3vw, 2rem);
  margin-top: clamp(2.25rem, 5vw, 3.5rem);
  padding-top: clamp(1.5rem, 3vw, 2rem);
  border-top: 1px solid rgba(${brandRgb.chocolate}, 0.08);

  ${media.belowMd} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem 1rem;
  }
`;

export const StatItem = styled.div`
  will-change: transform, opacity;
`;

export const StatValue = styled.span`
  display: block;
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: ${brandColors.black};
  letter-spacing: -0.02em;
`;

export const StatLabel = styled.span`
  display: block;
  margin-top: 0.25rem;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${brandColors.taupe};
`;

export const ScrollCue = styled.a`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin: clamp(1.75rem, 4vw, 2.5rem) auto 0;
  width: fit-content;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${brandColors.taupe};
  will-change: transform, opacity;

  ${media.belowMd} {
    display: none;
  }
`;

export const ScrollArrow = styled.span`
  display: inline-flex;
  color: ${brandColors.brown};
`;

export const TrustBar = styled.div`
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  background: rgba(255, 252, 250, 0.55);
  backdrop-filter: blur(10px);
  padding: 1.15rem 0;
  overflow: hidden;
`;

export const TrustInner = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.25rem, 3vw, 2rem);
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2.5rem);
`;

export const TrustLabel = styled.span`
  flex-shrink: 0;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${brandColors.taupe};
`;

export const MarqueeViewport = styled.div`
  flex: 1;
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
`;

export const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  gap: clamp(2rem, 5vw, 3.5rem);
  will-change: transform;
`;

export const BrandChip = styled.span`
  flex-shrink: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(0.95rem, 1.5vw, 1.125rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(${brandRgb.chocolate}, 0.45);
  white-space: nowrap;
`;
