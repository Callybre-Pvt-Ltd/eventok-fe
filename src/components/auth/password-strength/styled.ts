import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontSizes, radii, spacing } from '@/theme';

export const Wrap = styled.div`
  margin-top: ${spacing.xs};
`;

export const Bar = styled.div<{ $palette: ThemePalette }>`
  height: 4px;
  border-radius: ${radii.full};
  background: ${({ $palette }) => $palette.border};
  overflow: hidden;
`;

export const BarFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${({ $color }) => $color};
  border-radius: ${radii.full};
  transition: width 0.35s ease, background 0.35s ease;
`;

export const Label = styled.span<{ $palette: ThemePalette; $color: string }>`
  display: block;
  margin-top: 4px;
  font-size: ${fontSizes.xs};
  color: ${({ $color }) => $color};
  font-weight: 500;
`;
