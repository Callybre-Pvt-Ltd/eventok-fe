import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

const sweep = keyframes`
  0% { transform: translateX(-130%) skewX(-16deg); opacity: 0; }
  25% { opacity: 0.4; }
  100% { transform: translateX(160%) skewX(-16deg); opacity: 0; }
`;

export const Card = styled.article<{ $index: number }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  box-shadow: 0 18px 44px rgba(${brandRgb.black}, 0.18);
  z-index: ${({ $index }) => $index};
  cursor: default;
  transform-origin: center bottom;
  will-change: transform, opacity;

  ${media.md} {
    border-radius: 24px;
    box-shadow: 0 40px 100px rgba(${brandRgb.black}, 0.4);
    transform-origin: center top;
    cursor: pointer;
    will-change: transform, opacity, filter;

    &:hover [data-portfolio-image] {
      transform: scale(1.12);
    }

    &:hover [data-portfolio-cta] {
      transform: scale(1.06);
      background: ${brandColors.gold};
      color: ${brandColors.chocolate};
      border-color: ${brandColors.gold};
    }
  }
`;

export const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.06);
  transform-origin: center center;
  will-change: transform;
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const GlassOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(${brandRgb.black}, 0.04) 35%,
    rgba(${brandRgb.black}, 0.35) 72%,
    rgba(${brandRgb.black}, 0.72) 100%
  );
  transition: opacity 0.5s ease;

  ${media.md} {
    background: linear-gradient(
      180deg,
      rgba(${brandRgb.black}, 0.12) 0%,
      rgba(${brandRgb.black}, 0.05) 35%,
      rgba(${brandRgb.black}, 0.45) 68%,
      rgba(${brandRgb.black}, 0.82) 100%
    );
  }
`;

export const SweepLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 38%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.28),
      transparent
    );
  }

  &[data-active='true']::after {
    animation: ${sweep} 1.4s ease forwards;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const CardContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: clamp(1rem, 4vw, 1.35rem) clamp(1rem, 4vw, 1.35rem)
    max(1rem, env(safe-area-inset-bottom, 0px));
  color: ${brandColors.white};

  ${media.md} {
    gap: 0.75rem;
    padding: clamp(1.5rem, 3vw, 2.5rem);
  }
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 1.75rem;
  padding: 0.3rem 0.7rem;
  border-radius: 9999px;
  border: 1px solid rgba(${brandRgb.white}, 0.28);
  background: rgba(${brandRgb.white}, 0.12);
  backdrop-filter: blur(12px);
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${brandColors.white};

  ${media.md} {
    font-size: 0.75rem;
  }
`;

export const LocationChip = styled(Chip)`
  color: rgba(${brandRgb.white}, 0.9);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: none;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.35rem, 5.5vw, 1.75rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: ${brandColors.white};

  ${media.md} {
    font-size: clamp(1.75rem, 3vw, 2.75rem);
  }
`;

export const MetaGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.9rem;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(${brandRgb.white}, 0.78);

  &[data-portfolio-desktop-meta] {
    display: none;
  }

  ${media.md} {
    font-size: 0.8125rem;

    &[data-portfolio-desktop-meta] {
      display: flex;
    }
  }
`;

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

export const Vendor = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
`;

export const VendorAvatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: ${brandColors.gold};
  color: ${brandColors.chocolate};
  font-size: 0.5625rem;
  font-weight: 800;
`;

export const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  color: ${brandColors.gold};
  font-weight: 700;
`;

export const StatValue = styled.span`
  font-family: ${fontFamily.display};
  color: ${brandColors.gold};
  font-weight: 700;
`;

export const FloatingButton = styled(Link)`
  position: absolute;
  top: max(0.85rem, env(safe-area-inset-top, 0px));
  right: max(0.85rem, env(safe-area-inset-right, 0px));
  z-index: 3;
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(${brandRgb.white}, 0.35);
  background: rgba(${brandRgb.white}, 0.14);
  backdrop-filter: blur(12px);
  color: ${brandColors.white};
  text-decoration: none;
  transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 3px;
  }

  ${media.md} {
    display: inline-flex;
    top: clamp(1.5rem, 3vw, 2.5rem);
    right: clamp(1.5rem, 3vw, 2.5rem);
    width: 3.25rem;
    height: 3.25rem;
  }
`;

export const EssentialMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.85rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(${brandRgb.white}, 0.85);

  ${media.md} {
    display: none;
  }
`;

export const ActiveDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  opacity: 0;
  transform: translateY(14px);
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;

  ${Card}[data-active='true'] & {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  ${media.md} {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const CardCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  align-self: stretch;
  min-height: 44px;
  padding: 0.7rem 1.1rem;
  border-radius: 9999px;
  background: linear-gradient(120deg, ${brandColors.gold}, #dfc15a);
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.display};
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  touch-action: manipulation;

  &:focus-visible {
    outline: 2px solid ${brandColors.white};
    outline-offset: 2px;
  }
`;
