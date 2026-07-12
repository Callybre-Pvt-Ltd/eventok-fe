import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, spacing } from '@/theme';
import { brandColors } from '@/theme/brand';
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '../shared/styled';

export { Section, SectionHeader, SectionInner, SectionSubtitle, SectionTitle };

export const Masonry = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: ${spacing.md};

  ${media.belowLg} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.belowMd} {
    grid-template-columns: 1fr;
    grid-auto-rows: 240px;
  }
`;

export const MasonryItem = styled.div<{
  $palette: ThemePalette;
  $url: string;
  $size: 'normal' | 'tall' | 'wide';
}>`
  position: relative;
  border-radius: ${radii.xl};
  overflow: hidden;
  background: url(${({ $url }) => $url}) center/cover;
  grid-row: ${({ $size }) => ($size === 'tall' ? 'span 2' : 'span 1')};
  grid-column: ${({ $size }) => ($size === 'wide' ? 'span 2' : 'span 1')};
  cursor: pointer;
  transition: transform 0.35s ease;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 40%,
      ${({ $palette }) => $palette.gradientCard}
    );
  }

  &:hover {
    transform: scale(1.02);
  }

  ${media.belowMd} {
    grid-row: span 1;
    grid-column: span 1;
  }
`;

export const ItemLabel = styled.span`
  position: absolute;
  bottom: ${spacing.md};
  left: ${spacing.md};
  z-index: 1;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 700;
  color: ${brandColors.sage};
`;
