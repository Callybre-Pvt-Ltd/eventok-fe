import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const HeroWrap = styled.section`
  width: 100%;
  padding: 1.25rem clamp(1rem, 3.5vw, 2.5rem);
  margin: 0;
  box-sizing: border-box;
`;

export const Panel = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  min-height: 26rem;
  border-radius: 1.5rem;
  overflow: hidden;
  background: #0A0D18;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  align-items: center;

  [data-theme='light'] & {
    box-shadow: 0 20px 50px rgba(124, 58, 237, 0.18);
    border: 1px solid rgba(124, 58, 237, 0.15);
  }

  ${media.md} {
    min-height: 30rem;
    border-radius: 1.75rem;
  }

  ${media.lg} {
    min-height: 34rem;
  }
`;

export const Slide = styled.div<{ $active: boolean }>`
  grid-area: 1 / 1;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
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
  background: linear-gradient(
    90deg,
    rgba(10, 13, 24, 0.94) 0%,
    rgba(10, 13, 24, 0.65) 50%,
    rgba(10, 13, 24, 0.15) 100%
  );
`;

export const Glow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    65% 85% at 85% 20%,
    rgba(124, 58, 237, 0.35) 0%,
    rgba(99, 102, 241, 0.2) 40%,
    transparent 75%
  );
  opacity: 0.85;
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 2.5rem 1.5rem;
  max-width: 1440px;
  width: 100%;

  ${media.md} {
    padding: 3.5rem 3rem;
  }

  ${media.lg} {
    padding: 4.5rem 4.5rem;
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
  color: var(--color-primary);

  &::before {
    content: '';
    width: 1.75rem;
    height: 2px;
    border-radius: ${radii.full};
    background: currentColor;
  }
`;

export const Title = styled.h1`
  margin-top: 0.5rem;
  max-width: 44rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

export const Accent = styled.span`
  color: var(--color-primary);
  font-family: ${fontFamily.display};
  font-weight: 700;
  background: linear-gradient(135deg, #C4B5FD 0%, #A78BFA 40%, #FDA4AF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Subtitle = styled.p`
  margin-top: 1rem;
  max-width: 34rem;
  font-size: clamp(0.9375rem, 1.5vw, 1.05rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
`;

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  margin-top: 1.75rem;
`;

export const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: ${radii.full};
  background: var(--button-primary-gradient);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 24px var(--button-primary-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px var(--button-primary-shadow);
  }
`;

export const GhostCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: ${radii.full};
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

export const Dots = styled.div`
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '1.75rem' : '0.5rem')};
  height: 0.5rem;
  border: none;
  border-radius: ${radii.full};
  background: ${({ $active }) =>
    $active ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.35)'};
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const Arrows = styled.div`
  position: absolute;
  right: clamp(1rem, 3.5vw, 2.5rem);
  bottom: 1.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 3;
`;

export const Arrow = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${radii.full};
  background: rgba(10, 13, 24, 0.6);
  backdrop-filter: blur(8px);
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: var(--color-primary);
    border-color: var(--color-primary);
  }
`;
