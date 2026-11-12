import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const HeroWrap = styled.section`
  position: relative;
  width: 100%;
  min-height: clamp(36rem, 78vh, 48rem);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  background: var(--color-bg);
  display: flex;
  align-items: center;
`;

export const Slide = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  z-index: ${({ $active }) => ($active ? 1 : 0)};
`;

export const SlideImage = styled.img<{ $position?: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => $position ?? 'center right'};
  transition: opacity 0.5s ease, filter 0.5s ease;

  [data-theme='light'] & {
    filter: brightness(1.02) contrast(1.04) saturate(1.06);
  }

  [data-theme='dark'] & {
    filter: brightness(0.96) contrast(1.06) saturate(1.05);
  }
`;

export const Scrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  transition: background-color 0.3s ease;

  [data-theme='light'] & {
    background: rgba(28, 22, 16, 0.28);
  }

  [data-theme='dark'] & {
    background: rgba(8, 12, 20, 0.42);
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
  padding: clamp(3.25rem, 7.5vh, 5.25rem) clamp(1.25rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ff8a3d;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);

  &::before {
    content: '';
    width: 1.75rem;
    height: 2px;
    border-radius: ${radii.full};
    background: currentColor;
  }
`;

export const Title = styled.h1`
  margin-top: 0.75rem;
  max-width: 48rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2.35rem, 5vw, 3.85rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: #ffffff;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.75), 0 1px 3px rgba(0, 0, 0, 0.9);
`;

export const Accent = styled.span`
  color: #ff8a3d;
  font-family: ${fontFamily.display};
  font-weight: 800;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
`;

export const Subtitle = styled.p`
  margin-top: 1rem;
  max-width: 38rem;
  font-size: clamp(0.95rem, 1.4vw, 1.15rem);
  line-height: 1.6;
  color: #ffffff;
  font-weight: 450;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.75), 0 1px 2px rgba(0, 0, 0, 0.9);
`;

export const SearchWidget = styled.form`
  margin-top: 2rem;
  width: 100%;
  max-width: 52rem;
  border-radius: ${radii.full};
  padding: 0.45rem 0.5rem 0.45rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-sizing: border-box;
  transition: background-color 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease;

  [data-theme='light'] & {
    background: rgba(255, 253, 250, 0.94);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(232, 226, 213, 0.95);
    box-shadow: 0 16px 40px rgba(60, 42, 25, 0.16),
      0 4px 12px rgba(60, 42, 25, 0.08);
    color: #1c1917;
  }

  [data-theme='dark'] & {
    background: rgba(18, 26, 43, 0.9);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    color: #f8fafc;
  }

  ${media.belowMd} {
    border-radius: ${radii.xl};
    flex-direction: column;
    padding: 1rem;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

export const SearchFieldEvent = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  flex-shrink: 0;

  svg {
    color: var(--color-primary);
    flex-shrink: 0;
  }

  select {
    background: transparent;
    border: none;
    font-size: ${fontSizes.sm};
    font-weight: 600;
    outline: none;
    cursor: pointer;

    [data-theme='light'] & {
      color: #1c1917;
      option {
        background: #faf7f2;
        color: #1c1917;
      }
    }

    [data-theme='dark'] & {
      color: #f8fafc;
      option {
        background: #090d16;
        color: #ffffff;
      }
    }
  }

  [data-theme='light'] & {
    color: #1c1917;
  }

  [data-theme='dark'] & {
    color: rgba(255, 255, 255, 0.85);
  }

  ${media.belowMd} {
    width: 100%;
    select {
      width: 100%;
    }
  }
`;

export const SearchDivider = styled.div`
  width: 1px;
  height: 1.75rem;
  flex-shrink: 0;

  [data-theme='light'] & {
    background: rgba(216, 206, 192, 0.9);
  }

  [data-theme='dark'] & {
    background: rgba(255, 255, 255, 0.2);
  }

  ${media.belowMd} {
    display: none;
  }
`;

export const SearchFieldQuery = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex: 1;
  min-width: 0;

  input {
    width: 100%;
    background: transparent;
    border: none;
    font-size: ${fontSizes.sm};
    outline: none;

    [data-theme='light'] & {
      color: #1c1917;
      &::placeholder {
        color: #78716c;
      }
    }

    [data-theme='dark'] & {
      color: #ffffff;
      &::placeholder {
        color: rgba(255, 255, 255, 0.55);
      }
    }
  }

  [data-theme='light'] & {
    svg {
      color: #78716c;
      flex-shrink: 0;
    }
  }

  [data-theme='dark'] & {
    svg {
      color: rgba(255, 255, 255, 0.6);
      flex-shrink: 0;
    }
  }

  ${media.belowMd} {
    width: 100%;
  }
`;

export const SearchSubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.625rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.belowMd} {
    width: 100%;
    padding: 0.875rem;
  }
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
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 14px var(--button-primary-shadow);
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: var(--color-primary-hover);
  }
`;

export const GhostCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: ${radii.full};
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  background: transparent;
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: #ffffff;
  }
`;

export const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  margin-top: 2rem;
  color: #ffffff;
  font-size: ${fontSizes.xs};
  font-weight: 650;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.85);

  ${media.belowMd} {
    gap: 0.75rem;
  }
`;

export const TrustItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  svg {
    color: var(--color-primary);
    flex-shrink: 0;
  }
`;

export const TrustDot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: ${radii.full};
  background: rgba(255, 255, 255, 0.4);

  ${media.belowMd} {
    display: none;
  }
`;

export const Dots = styled.div`
  position: absolute;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '2rem' : '0.5rem')};
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
  right: clamp(1.25rem, 4vw, 3rem);
  bottom: 1.75rem;
  display: flex;
  gap: 0.5rem;
  z-index: 3;
`;

export const Arrow = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${radii.full};
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  [data-theme='light'] & {
    background: rgba(255, 253, 250, 0.9);
    border: 1px solid rgba(232, 226, 213, 0.9);
    color: #1c1917;
    box-shadow: 0 4px 12px rgba(60, 42, 25, 0.12);

    &:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: #ffffff;
    }
  }

  [data-theme='dark'] & {
    background: rgba(14, 20, 32, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(8px);
    color: #ffffff;

    &:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
`;
