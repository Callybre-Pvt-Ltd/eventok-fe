import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, spacing } from '@/theme';

export const Section = styled.section<{ $palette: ThemePalette }>`
  padding: ${spacing.section} ${spacing.xl};
  background: ${({ $palette }) => $palette.background};

  ${media.belowMd} {
    padding: ${spacing.xxl} ${spacing.md};
  }
`;

export const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing.xl};

  ${media.belowLg} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.belowMd} {
    grid-template-columns: 1fr;
    gap: ${spacing.lg};
  }
`;

export const StatCard = styled.div<{ $palette: ThemePalette }>`
  text-align: center;
  padding: ${spacing.xl};
  border-radius: ${radii.xl};
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
`;

export const StatValue = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.sm};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.h2};
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.03em;
`;

export const StatLabel = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textSecondary};
  font-weight: 500;
`;
