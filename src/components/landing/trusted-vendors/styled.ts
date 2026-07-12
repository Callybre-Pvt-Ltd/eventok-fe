import styled, { keyframes } from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, spacing } from '@/theme';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export const Section = styled.section<{ $palette: ThemePalette }>`
  padding: ${spacing.xl} 0;
  background: ${({ $palette }) => $palette.surface};
  border-top: 1px solid ${({ $palette }) => $palette.border};
  border-bottom: 1px solid ${({ $palette }) => $palette.border};
  overflow: hidden;
`;

export const Title = styled.p<{ $palette: ThemePalette }>`
  text-align: center;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ $palette }) => $palette.textMuted};
  margin: 0 0 ${spacing.lg};
`;

export const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 30s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

export const LogoStrip = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xxxl};
  padding: 0 ${spacing.xl};
`;

export const BrandName = styled.span<{ $palette: ThemePalette }>`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 700;
  color: ${({ $palette }) => $palette.textMuted};
  white-space: nowrap;
  opacity: 0.6;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
    color: ${({ $palette }) => $palette.text};
  }
`;
