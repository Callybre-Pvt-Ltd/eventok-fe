import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Section = styled.section<{ $palette: ThemePalette }>`
  width: 100%;
  padding: 1rem clamp(1rem, 3.5vw, 2.5rem) 2.5rem;
  background: var(--color-bg);
  transition: background 0.25s ease;

  ${media.md} {
    padding: 1.5rem clamp(1.25rem, 3.5vw, 2.5rem) 3rem;
  }

  ${media.lg} {
    padding: 1.5rem clamp(1.5rem, 4vw, 3rem) 3.5rem;
  }
`;

export const Inner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 680px;
  margin: 0 auto;

  ${media.belowMd} {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

export const StatCard = styled.div<{
  $palette: ThemePalette;
  $variant?: 'primary' | 'secondary';
}>`
  text-align: center;
  padding: 1.5rem 2rem;
  border-radius: ${radii.lg};
  border: 1px solid
    ${({ $variant }) => ($variant === 'primary' ? 'transparent' : '#fed7aa')};
  background: ${({ $variant }) =>
    $variant === 'primary' ? 'var(--color-primary)' : '#ffedd5'};
  color: ${({ $variant }) => ($variant === 'primary' ? '#ffffff' : '#9a3412')};
  box-shadow: 0 4px 16px var(--color-shadow);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  [data-theme='dark'] & {
    background: ${({ $variant }) =>
      $variant === 'primary' ? 'var(--color-primary)' : 'var(--color-surface)'};
    border-color: ${({ $variant }) =>
      $variant === 'primary' ? 'transparent' : 'var(--color-border)'};
    color: ${({ $variant }) =>
      $variant === 'primary' ? '#ffffff' : 'var(--color-peach)'};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px var(--color-shadow-strong);
  }
`;

export const StatValue = styled.p<{
  $palette: ThemePalette;
  $variant?: 'primary' | 'secondary';
}>`
  margin: 0 0 0.35rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 3.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  color: ${({ $variant }) => ($variant === 'primary' ? '#ffffff' : '#ea580c')};

  [data-theme='dark'] & {
    color: ${({ $variant }) =>
      $variant === 'primary' ? '#ffffff' : '#f97316'};
  }
`;

export const StatLabel = styled.p<{
  $palette: ThemePalette;
  $variant?: 'primary' | 'secondary';
}>`
  margin: 0;
  font-size: ${fontSizes.xs};
  color: ${({ $variant }) =>
    $variant === 'primary' ? 'rgba(255, 255, 255, 0.9)' : '#9a3412'};
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  [data-theme='dark'] & {
    color: ${({ $variant }) =>
      $variant === 'primary'
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(255, 255, 255, 0.8)'};
  }
`;
