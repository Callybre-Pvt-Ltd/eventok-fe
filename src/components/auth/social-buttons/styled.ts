import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontSizes, radii, spacing } from '@/theme';

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
`;

export const SocialBtn = styled.button<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.75rem 1rem;
  border-radius: ${radii.lg};
  border: 1px solid ${({ $palette }) => $palette.border};
  background: ${({ $palette }) => $palette.surface};
  color: ${({ $palette }) => $palette.text};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: ${({ $palette }) => $palette.primary};
    box-shadow: 0 4px 16px ${({ $palette }) => $palette.shadow};
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

export const DividerLine = styled.div<{ $palette: ThemePalette }>`
  flex: 1;
  height: 1px;
  background: ${({ $palette }) => $palette.border};
`;

export const DividerText = styled.span<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.xs};
  color: ${({ $palette }) => $palette.textMuted};
  white-space: nowrap;
`;
