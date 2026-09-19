import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandGradients, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const HeroWrap = styled.section`
  padding: 1rem;

  ${media.lg} {
    padding: 1.5rem 2.5rem;
  }
`;

export const Panel = styled.div`
  position: relative;
  max-width: 1360px;
  margin: 0 auto;
  min-height: 24rem;
  overflow: hidden;
  border-radius: ${radii.xxl};
  background: ${brandColors.heroBg};
  display: grid;
  align-items: center;

  ${media.lg} {
    min-height: 30rem;
  }
`;

export const Slide = styled.div<{ $active: boolean }>`
  grid-area: 1 / 1;
  position: relative;
  width: 100%;
  height: 100%;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  transition: opacity 0.6s ease;
  display: grid;
  align-items: center;
`;

export const SlideImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center right;
`;

export const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: ${brandGradients.heroScrim};
`;

export const Glow = styled.div`
  position: absolute;
  inset: 0;
  background: ${brandGradients.heroGlow};
`;

export const Content = styled.div`
  position: relative;
  padding: 2.5rem 1.5rem;
  max-width: 44rem;

  ${media.lg} {
    padding: 3.5rem;
  }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${brandColors.pink400};

  &::before {
    content: '';
    width: 1.75rem;
    height: 2px;
    border-radius: ${radii.full};
    background: currentColor;
  }
`;

export const Title = styled.h1`
  margin-top: 0.875rem;
  font-family: ${fontFamily.display};
  font-size: clamp(1.875rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: ${brandColors.white};
`;

export const Accent = styled.em`
  font-family: ${fontFamily.emphasis};
  font-style: italic;
  font-weight: 600;
  color: ${brandColors.pink400};
`;

export const Subtitle = styled.p`
  margin-top: 1rem;
  max-width: 32rem;
  font-size: ${fontSizes.md};
  font-weight: 500;
  color: rgba(${brandRgb.white}, 0.78);
`;

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
`;

export const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: ${brandColors.pink600};
  }
`;

export const GhostCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: ${radii.full};
  border: 1px solid rgba(${brandRgb.white}, 0.35);
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: rgba(${brandRgb.white}, 0.12);
  }
`;

export const Dots = styled.div`
  position: absolute;
  left: 1.5rem;
  bottom: 1.25rem;
  display: flex;
  gap: 0.5rem;

  ${media.lg} {
    left: 3.5rem;
  }
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '1.75rem' : '0.5rem')};
  height: 0.5rem;
  border: none;
  border-radius: ${radii.full};
  background: ${({ $active }) =>
    $active ? brandColors.pink500 : `rgba(${brandRgb.white}, 0.4)`};
  cursor: pointer;
  transition: width 0.3s ease, background 0.3s ease;
`;

export const Arrows = styled.div`
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: none;
  gap: 0.5rem;

  ${media.md} {
    display: flex;
  }
`;

export const Arrow = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${radii.full};
  border: 1px solid rgba(${brandRgb.white}, 0.35);
  background: rgba(${brandRgb.ink}, 0.35);
  color: ${brandColors.white};
  cursor: pointer;

  &:hover {
    background: ${brandColors.pink500};
    border-color: ${brandColors.pink500};
  }
`;
