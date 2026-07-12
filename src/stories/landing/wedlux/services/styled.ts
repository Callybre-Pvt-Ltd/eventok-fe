import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

const softPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 162, 39, 0.35); }
  50% { box-shadow: 0 0 0 6px rgba(201, 162, 39, 0); }
`;

const sweep = keyframes`
  0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
  30% { opacity: 0.45; }
  100% { transform: translateX(160%) skewX(-18deg); opacity: 0; }
`;

export const ExperiencesRoot = styled.section`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  color: ${brandColors.black};
  background: radial-gradient(
      ellipse 70% 50% at 10% 0%,
      rgba(255, 255, 255, 0.9),
      transparent 55%
    ),
    radial-gradient(
      ellipse 60% 45% at 90% 20%,
      rgba(${brandRgb.ivory}, 0.8),
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
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
`;

export const ExperiencesShell = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(3.5rem, 8vw, 6.5rem) clamp(1rem, 4vw, 2.5rem);
`;

export const HeaderBlock = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(1.5rem, 4vw, 3rem);
  margin-bottom: clamp(2rem, 4vw, 3rem);

  ${media.belowLg} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderCopy = styled.div`
  max-width: 40rem;
`;

export const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 0.85rem;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${brandColors.gold};
`;

export const Title = styled.h2`
  margin: 0 0 1rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: ${brandColors.black};
  white-space: pre-line;
`;

export const Lead = styled.p`
  margin: 0;
  max-width: 34rem;
  font-family: ${fontFamily.body};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.8;
  color: ${brandColors.taupe};
`;

export const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  font-family: ${fontFamily.display};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${brandColors.brown};
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.25s ease, border-color 0.25s ease, gap 0.25s ease;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${brandColors.black};
    border-color: ${brandColors.black};
    gap: 0.65rem;

    svg {
      transform: translateX(3px);
    }
  }
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-bottom: clamp(2rem, 4vw, 2.75rem);
`;

export const FilterChip = styled.button<{ $active?: boolean }>`
  appearance: none;
  border: 1px solid
    ${({ $active }) =>
      $active ? brandColors.chocolate : `rgba(${brandRgb.chocolate}, 0.12)`};
  background: ${({ $active }) =>
    $active ? brandColors.chocolate : 'rgba(255, 255, 255, 0.65)'};
  color: ${({ $active }) => ($active ? brandColors.white : brandColors.brown)};
  border-radius: 9999px;
  padding: 0.55rem 1.05rem;
  min-height: 44px;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease,
    border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(${brandRgb.chocolate}, 0.28);
    box-shadow: 0 8px 20px rgba(${brandRgb.black}, 0.06);
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const EditorialGrid = styled.div<{ $solo?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $solo }) => ($solo ? '1fr' : '1.45fr 1fr')};
  grid-template-rows: auto auto;
  gap: clamp(1rem, 2vw, 1.35rem);

  ${media.belowLg} {
    display: none;
  }
`;

export const FeaturedSlot = styled.div<{ $solo?: boolean }>`
  grid-column: 1;
  grid-row: ${({ $solo }) => ($solo ? '1' : '1 / span 2')};
  min-height: ${({ $solo }) => ($solo ? '28rem' : '36rem')};
`;

export const SideStack = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 1.35rem);
`;

export const PanoramaSlot = styled.div`
  margin-top: clamp(1rem, 2vw, 1.35rem);

  ${media.belowLg} {
    display: none;
  }
`;

export const CompactRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.35rem);
  margin-top: clamp(1rem, 2vw, 1.35rem);

  ${media.belowLg} {
    display: none;
  }
`;

export const MobileRail = styled.div`
  display: none;

  ${media.belowLg} {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    margin-inline: clamp(-1rem, -4vw, -2.5rem);
    padding-inline: clamp(1rem, 4vw, 2.5rem);
    padding-bottom: 0.75rem;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    & > * {
      flex: 0 0 min(86vw, 22rem);
      scroll-snap-align: start;
    }
  }
`;

export const Card = styled.article<{
  $variant: 'featured' | 'medium' | 'panorama' | 'compact';
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: ${({ $variant }) =>
    $variant === 'featured'
      ? '36rem'
      : $variant === 'panorama'
      ? '18rem'
      : $variant === 'medium'
      ? '17rem'
      : '19rem'};
  border-radius: 22px;
  overflow: hidden;
  background: ${brandColors.tan};
  box-shadow: 0 18px 48px rgba(${brandRgb.black}, 0.08);
  isolation: isolate;
  cursor: pointer;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s ease;

  ${media.belowLg} {
    min-height: ${({ $variant }) =>
      $variant === 'featured' ? '28rem' : '22rem'};
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 70px rgba(${brandRgb.black}, 0.14);
  }

  &:hover img {
    transform: scale(1.06);
    filter: brightness(1.05);
  }

  &:hover [data-exp-sweep]::after {
    animation: ${sweep} 1.1s ease forwards;
  }

  &:hover [data-exp-cta] {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover [data-exp-meta] {
    opacity: 1;
    transform: translateY(0);
  }

  &:focus-within [data-exp-cta],
  &:focus-within [data-exp-meta] {
    opacity: 1;
    transform: translateY(0);
  }

  &:focus-within {
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
      filter: none;
    }

    &:hover [data-exp-sweep]::after {
      animation: none;
    }

    &:hover [data-exp-cta],
    &:hover [data-exp-meta] {
      opacity: 1;
      transform: none;
    }
  }
`;

export const Media = styled.div`
  position: absolute;
  inset: -4%;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      180deg,
      rgba(${brandRgb.black}, 0.08) 0%,
      rgba(${brandRgb.black}, 0.18) 40%,
      rgba(${brandRgb.black}, 0.72) 100%
    );
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: radial-gradient(
      ellipse at center,
      transparent 45%,
      rgba(${brandRgb.black}, 0.28) 100%
    );
  }
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
  will-change: transform;
`;

export const SweepLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;

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

export const CardBody = styled.div<{ $featured?: boolean }>`
  position: relative;
  z-index: 3;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ $featured }) => ($featured ? '0.75rem' : '0.45rem')};
  padding: ${({ $featured }) =>
    $featured ? 'clamp(1.5rem, 3vw, 2.25rem)' : '1.15rem 1.25rem 1.35rem'};
  color: ${brandColors.white};
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.7rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(12px);
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const Verified = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.65rem;
  border-radius: 9999px;
  background: rgba(${brandRgb.chocolate}, 0.45);
  backdrop-filter: blur(10px);
  font-size: 0.6875rem;
  font-weight: 600;
  animation: ${softPulse} 2.8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Location = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
`;

export const CardTitle = styled.h3<{ $featured?: boolean }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: ${({ $featured }) =>
    $featured ? 'clamp(1.75rem, 3vw, 2.6rem)' : 'clamp(1.15rem, 2vw, 1.4rem)'};
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
`;

export const Story = styled.p`
  margin: 0;
  max-width: 34rem;
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.82);
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.1rem;
  opacity: 0.92;
  transform: translateY(6px);
  transition: opacity 0.35s ease, transform 0.35s ease;
`;

export const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 600;

  svg {
    color: ${brandColors.gold};
  }
`;

export const MetaItem = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
`;

export const Partner = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const PartnerAvatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: ${brandColors.gold};
  color: ${brandColors.chocolate};
  font-size: 0.625rem;
  font-weight: 800;
`;

export const GalleryRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const GalleryThumb = styled.img`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.35);
`;

export const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 0.35rem;
  opacity: 1;
  transform: none;
  transition: opacity 0.4s ease, transform 0.4s ease;

  @media (hover: hover) and (pointer: fine) {
    opacity: 0;
    transform: translateY(12px);
  }
`;

export const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.7rem 1.15rem;
  border-radius: 9999px;
  background: linear-gradient(120deg, ${brandColors.gold}, #dfc15a);
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.display};
  font-size: 0.8125rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  svg {
    transition: transform 0.25s ease;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(${brandRgb.black}, 0.2);

    svg {
      transform: translateX(2px);
    }
  }
`;

export const GhostCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.7rem 1.05rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.1);
  color: ${brandColors.white};
  font-family: ${fontFamily.display};
  font-size: 0.8125rem;
  font-weight: 700;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: background 0.25s ease, border-color 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.65);
  }
`;

export const FootNote = styled.p`
  margin: clamp(2rem, 4vw, 2.75rem) 0 0;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${brandColors.taupe};

  svg {
    color: ${brandColors.gold};
    flex-shrink: 0;
  }
`;
