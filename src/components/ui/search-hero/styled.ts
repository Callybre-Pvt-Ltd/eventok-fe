import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';
import { brandColors } from '@/theme/brand';

export const SearchBar = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  align-items: stretch;
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: ${radii.full};
  box-shadow: ${shadows.lg};
  overflow: hidden;

  ${media.belowMd} {
    flex-direction: column;
    border-radius: ${radii.xl};
  }
`;

export const SearchField = styled.div<{ $palette: ThemePalette }>`
  flex: 1;
  padding: 1rem 1.25rem;
  border-right: 1px solid ${({ $palette }) => $palette.border};
  min-width: 0;

  &:last-of-type {
    border-right: none;
  }

  ${media.belowMd} {
    border-right: none;
    border-bottom: 1px solid ${({ $palette }) => $palette.border};

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

export const FieldLabel = styled.label<{ $palette: ThemePalette }>`
  display: block;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${({ $palette }) => $palette.text};
  margin-bottom: 0.25rem;
  font-family: ${fontFamily.body};
`;

export const FieldInput = styled.input<{ $palette: ThemePalette }>`
  width: 100%;
  border: none;
  background: transparent;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.text};
  font-family: ${fontFamily.body};
  outline: none;

  &::placeholder {
    color: ${({ $palette }) => $palette.textMuted};
  }
`;

export const SearchBtnWrap = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  padding: 0.5rem;

  ${media.belowMd} {
    padding: 0.75rem;
  }
`;

export const SearchBtn = styled.button<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: ${radii.full};
  background: ${({ $palette }) => $palette.gradientPrimary};
  color: ${brandColors.sage};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  font-family: ${fontFamily.body};
  cursor: pointer;
  white-space: nowrap;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: ${shadows.glow};
  }

  ${media.belowMd} {
    width: 100%;
    padding: 1rem;
  }
`;
