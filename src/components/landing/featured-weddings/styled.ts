import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, radii, spacing } from '@/theme';
import { brandGradients } from '@/theme/brand';
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '../shared/styled';

export { Section, SectionHeader, SectionInner, SectionSubtitle, SectionTitle };

export const ScrollTrack = styled.div`
  display: flex;
  gap: ${spacing.lg};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: ${spacing.md};
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const WeddingCard = styled.article<{ $palette: ThemePalette }>`
  flex: 0 0 320px;
  scroll-snap-align: start;
  border-radius: ${radii.xl};
  overflow: hidden;
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  transition: transform 0.35s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const CardImage = styled.div<{ $url?: string }>`
  height: 220px;
  background: ${({ $url }) =>
    $url ? `url(${$url}) center/cover` : brandGradients.warm};
`;

export const CardBody = styled.div`
  padding: ${spacing.lg};
`;

export const CardTitle = styled.h3<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.xs};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
`;

export const CardMeta = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textMuted};
`;
