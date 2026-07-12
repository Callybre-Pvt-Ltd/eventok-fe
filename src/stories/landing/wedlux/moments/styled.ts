import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

const sweep = keyframes`
  0% { transform: translateX(-130%) skewX(-16deg); opacity: 0; }
  30% { opacity: 0.4; }
  100% { transform: translateX(160%) skewX(-16deg); opacity: 0; }
`;

const rippleOut = keyframes`
  to { transform: scale(2.4); opacity: 0; }
`;

export const MomentsRoot = styled.section`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  color: ${brandColors.black};
  background: radial-gradient(
      ellipse 70% 45% at 10% 0%,
      rgba(255, 255, 255, 0.95),
      transparent 55%
    ),
    radial-gradient(
      ellipse 55% 40% at 95% 20%,
      rgba(${brandRgb.ivory}, 0.9),
      transparent 50%
    ),
    linear-gradient(
      180deg,
      ${brandColors.ivory} 0%,
      ${brandColors.cream} 50%,
      ${brandColors.tan} 100%
    );

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
`;

export const MomentsShell = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 6rem) max(1rem, env(safe-area-inset-right, 0px))
    clamp(3rem, 8vw, 5.5rem) max(1rem, env(safe-area-inset-left, 0px));
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);

  ${media.md} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2rem;
  }

  .moments-cta-desktop {
    display: none;

    ${media.md} {
      display: block;
    }
  }
`;

export const HeaderCopy = styled.div`
  max-width: 36rem;
`;

export const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 0.75rem;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${brandColors.gold};
`;

export const Title = styled.h2`
  margin: 0 0 0.85rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 7vw, 3.5rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: ${brandColors.black};
  white-space: pre-line;
`;

export const Lead = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: clamp(0.9375rem, 2.5vw, 1.05rem);
  font-weight: 500;
  line-height: 1.7;
  color: ${brandColors.taupe};
`;

export const FilterRail = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  margin: 0 calc(-1 * max(1rem, env(safe-area-inset-left, 0px)));
  padding: 0.15rem max(1rem, env(safe-area-inset-left, 0px)) 0.85rem;
  scrollbar-width: none;
  margin-bottom: clamp(1.25rem, 3vw, 2rem);

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.md} {
    margin-inline: 0;
    padding-inline: 0;
    flex-wrap: wrap;
    overflow: visible;
  }
`;

export const FilterChip = styled.button<{ $active?: boolean }>`
  appearance: none;
  flex: 0 0 auto;
  scroll-snap-align: start;
  min-height: 44px;
  padding: 0.55rem 1.05rem;
  border-radius: 9999px;
  border: 1px solid
    ${({ $active }) =>
      $active ? brandColors.chocolate : `rgba(${brandRgb.chocolate}, 0.12)`};
  background: ${({ $active }) =>
    $active ? brandColors.chocolate : 'rgba(255, 255, 255, 0.7)'};
  color: ${({ $active }) => ($active ? brandColors.white : brandColors.brown)};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  touch-action: manipulation;
  backdrop-filter: blur(8px);
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

/** Mobile: full-width snap carousel */
export const MobileRail = styled.div`
  display: flex;
  gap: 0.85rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  margin-inline: calc(-1 * max(1rem, env(safe-area-inset-left, 0px)));
  padding-inline: max(1rem, env(safe-area-inset-left, 0px));
  padding-bottom: 0.5rem;
  scrollbar-width: none;
  margin-bottom: clamp(1.25rem, 3vw, 2rem);

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    flex: 0 0 min(88vw, 22rem);
    scroll-snap-align: center;
  }

  ${media.md} {
    display: none;
  }
`;

/** Desktop editorial bento — hidden on mobile */
export const EditorialGrid = styled.div`
  display: none;

  ${media.md} {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-auto-rows: minmax(10rem, auto);
    gap: clamp(0.85rem, 1.8vw, 1.25rem);
    margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
  }
`;

export const GridSlot = styled.div<{ $layout: string }>`
  display: flex;
  min-height: 14rem;

  & > button {
    flex: 1 1 auto;
  }

  ${({ $layout }) => {
    switch ($layout) {
      case 'hero':
        return 'grid-column: span 8; grid-row: span 2; min-height: 22rem;';
      case 'portrait':
        return 'grid-column: span 4; grid-row: span 2; min-height: 22rem;';
      case 'wide':
        return 'grid-column: span 12; min-height: 16rem;';
      case 'landscape':
        return 'grid-column: span 7; min-height: 14rem;';
      case 'square':
      default:
        return 'grid-column: span 5; min-height: 14rem;';
    }
  }}
`;

export const MobileStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: clamp(1.25rem, 3vw, 2rem);

  ${media.md} {
    display: none;
  }
`;

export const StripSection = styled.div`
  margin-bottom: clamp(1.75rem, 4vw, 2.75rem);
`;

export const StripLabel = styled.p`
  margin: 0 0 0.85rem;
  font-family: ${fontFamily.display};
  font-size: 1rem;
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const StripRail = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  margin-inline: calc(-1 * max(1rem, env(safe-area-inset-left, 0px)));
  padding-inline: max(1rem, env(safe-area-inset-left, 0px));
  padding-bottom: 0.5rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    flex: 0 0 min(70vw, 16rem);
    scroll-snap-align: start;
  }

  ${media.md} {
    margin-inline: 0;
    padding-inline: 0;
    gap: 1rem;

    & > * {
      flex: 0 0 14rem;
    }
  }
`;

export const Card = styled.button<{ $tall?: boolean }>`
  appearance: none;
  position: relative;
  display: block;
  width: 100%;
  height: ${({ $tall }) => ($tall ? 'min(72vw, 26rem)' : 'min(58vw, 20rem)')};
  padding: 0;
  border: none;
  border-radius: 20px;
  overflow: hidden;
  background: ${brandColors.tan};
  box-shadow: 0 18px 48px rgba(${brandRgb.black}, 0.1);
  cursor: pointer;
  touch-action: manipulation;
  text-align: left;
  isolation: isolate;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s ease;

  ${media.md} {
    height: 100%;
    min-height: inherit;
    border-radius: 22px;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 28px 70px rgba(${brandRgb.black}, 0.16);
    }

    &:hover img {
      transform: scale(1.06);
    }

    &:hover [data-memory-meta] {
      opacity: 1;
      transform: translateY(0);
    }

    &:hover [data-memory-sweep]::after {
      animation: ${sweep} 1.1s ease forwards;
    }

    &:hover [data-memory-arrow] {
      opacity: 1;
      transform: scale(1);
    }
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
    &:hover img {
      transform: none;
    }
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.03);
  transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
`;

export const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(${brandRgb.black}, 0.05) 20%,
    rgba(${brandRgb.black}, 0.55) 100%
  );
  pointer-events: none;
`;

export const SweepLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 35%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.28),
      transparent
    );
  }
`;

export const CardMeta = styled.div`
  position: absolute;
  left: 0.85rem;
  right: 0.85rem;
  bottom: 0.85rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.75rem 0.85rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  color: ${brandColors.white};
  opacity: 1;
  transform: none;

  ${media.md} {
    opacity: 0.92;
    transform: translateY(6px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
`;

export const MetaTitle = styled.span`
  font-family: ${fontFamily.display};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.25;
`;

export const MetaRow = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.65rem;
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
`;

export const ArrowHint = styled.span`
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.14);
  color: ${brandColors.white};
  backdrop-filter: blur(10px);
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${media.md} {
    opacity: 0;
    transform: scale(0.85);
  }
`;

export const CtaWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
`;

export const MagneticWrap = styled.div`
  display: inline-flex;
`;

export const MagneticLink = styled(Link)`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 48px;
  padding: 0.85rem 1.6rem;
  border-radius: 9999px;
  background: linear-gradient(
    120deg,
    ${brandColors.gold},
    #dfc15a 55%,
    ${brandColors.gold}
  );
  background-size: 180% 100%;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.display};
  font-size: 0.9375rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 14px 36px rgba(${brandRgb.black}, 0.12);
  transition: background-position 0.4s ease, box-shadow 0.3s ease,
    transform 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    background-position: 100% 0;
    box-shadow: 0 18px 44px rgba(201, 162, 39, 0.35);
    transform: translateY(-1px);

    svg {
      transform: translate(2px, -2px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.chocolate};
    outline-offset: 3px;
  }
`;

export const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  pointer-events: none;
  transform: scale(0);
`;

export const RippleActive = styled(Ripple)`
  animation: ${rippleOut} 0.65s ease-out forwards;
`;

/* —— Lightbox —— */
export const LightboxRoot = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background: rgba(12, 10, 9, 0.94);
  color: ${brandColors.white};
  padding: max(0.75rem, env(safe-area-inset-top, 0px))
    max(0.75rem, env(safe-area-inset-right, 0px))
    max(0.75rem, env(safe-area-inset-bottom, 0px))
    max(0.75rem, env(safe-area-inset-left, 0px));
`;

export const LightboxTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-shrink: 0;
  padding: 0.35rem 0.25rem 0.75rem;
`;

export const LightboxInfo = styled.div`
  min-width: 0;
`;

export const LightboxTitle = styled.h3`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.1rem, 4vw, 1.5rem);
  font-weight: 700;
`;

export const LightboxMeta = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.7);
`;

export const LightboxClose = styled.button`
  appearance: none;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: ${brandColors.white};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const LightboxStage = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
`;

export const LightboxImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
  user-select: none;
  -webkit-user-drag: none;
  transform-origin: center center;
`;

export const NavButton = styled.button<{ $side: 'left' | 'right' }>`
  appearance: none;
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === 'left' ? 'left: 0.25rem;' : 'right: 0.25rem;')}
  z-index: 2;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: ${brandColors.white};
  cursor: pointer;
  backdrop-filter: blur(8px);

  ${media.belowMd} {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
  }
`;

export const ThumbStrip = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  flex-shrink: 0;
  padding: 0.75rem 0.15rem 0.25rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Thumb = styled.button<{ $active?: boolean }>`
  appearance: none;
  flex: 0 0 auto;
  width: 3.5rem;
  height: 3.5rem;
  padding: 0;
  border-radius: 10px;
  border: 2px solid
    ${({ $active }) => ($active ? brandColors.gold : 'transparent')};
  overflow: hidden;
  background: ${brandColors.tan};
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.55)};
  transition: opacity 0.25s ease, border-color 0.25s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
  }
`;

export const RelatedLabel = styled.p`
  margin: 0.35rem 0 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
`;
