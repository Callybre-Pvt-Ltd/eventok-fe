import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, radii, spacing } from '@/theme';

export const ErrorWrap = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xxxl};
  text-align: center;
  gap: ${spacing.md};
`;

export const ErrorIcon = styled.div<{ $palette: ThemePalette }>`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: ${radii.xl};
  background: ${({ $palette }) => $palette.error}15;
  color: ${({ $palette }) => $palette.error};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorTitle = styled.h3<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
`;
