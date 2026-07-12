import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, radii, spacing } from '@/theme';

export const EmptyWrap = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xxxl};
  text-align: center;
`;

export const EmptyIcon = styled.div<{ $palette: ThemePalette }>`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: ${radii.xl};
  background: ${({ $palette }) => $palette.primaryLight};
  color: ${({ $palette }) => $palette.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.lg};
`;

export const EmptyTitle = styled.h3<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.sm};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
`;

export const EmptyDesc = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textMuted};
  max-width: 320px;
  line-height: 1.6;
`;
