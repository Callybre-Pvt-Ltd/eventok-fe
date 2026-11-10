import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Section = styled.section<{ $palette: ThemePalette }>`
  width: 100%;
  padding: 3.5rem clamp(1rem, 3.5vw, 2.5rem);
  background: ${({ $palette }) => $palette.background};
  transition: background 0.25s ease;

  ${media.md} {
    padding: 4rem clamp(1.25rem, 3.5vw, 2.5rem);
  }

  ${media.lg} {
    padding: 4.5rem clamp(1.5rem, 4vw, 3rem);
  }
`;

export const Inner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  ${media.belowLg} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.belowMd} {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

export const StatCard = styled.div<{ $palette: ThemePalette }>`
  text-align: center;
  padding: 1.75rem 1.25rem;
  border-radius: ${radii.xl};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px -6px var(--color-shadow);
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;

  [data-theme='light'] & {
    background: #ffffff;
    border-color: rgba(124, 58, 237, 0.12);
    box-shadow: 0 10px 30px -8px rgba(99, 102, 241, 0.08),
      0 2px 6px rgba(0, 0, 0, 0.02);
  }

  [data-theme='dark'] & {
    background: #141a32;
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  }

  &:hover {
    transform: translateY(-3px);
    border-color: var(--color-primary);
    box-shadow: 0 16px 36px -8px var(--color-shadow-strong);
  }
`;

export const StatValue = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 0.35rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  background: linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  [data-theme='dark'] & {
    background: linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #93c5fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const StatLabel = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.xs};
  color: var(--color-text-secondary);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  [data-theme='dark'] & {
    color: rgba(255, 255, 255, 0.8);
  }
`;
