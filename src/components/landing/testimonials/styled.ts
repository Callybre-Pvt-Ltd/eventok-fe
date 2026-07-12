import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, radii, shadows } from '@/theme';
import { brandColors } from '@/theme/brand';
import {
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '../shared/styled';

export {
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
};

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
`;

export const TestimonialCard = styled.div<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.surface};
  border-radius: ${radii.xl};
  border: 1px solid ${({ $palette }) => $palette.border};
  padding: 1.5rem;
  box-shadow: ${shadows.sm};
  transition: box-shadow 0.35s ease;

  &:hover {
    box-shadow: ${shadows.lg};
  }
`;

export const Quote = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 1rem;
  font-size: ${fontSizes.md};
  color: ${({ $palette }) => $palette.text};
  line-height: 1.7;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Avatar = styled.div<{ $palette: ThemePalette }>`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: ${({ $palette }) => $palette.gradientPrimary};
  color: ${brandColors.sage};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${fontSizes.sm};
  font-family: ${fontFamily.display};
`;

export const AuthorInfo = styled.div``;

export const AuthorName = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${({ $palette }) => $palette.text};
`;

export const AuthorEvent = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.xs};
  color: ${({ $palette }) => $palette.textMuted};
`;

export const Stars = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  gap: 2px;
  color: ${({ $palette }) => $palette.warning};
  margin-bottom: 0.75rem;
`;
