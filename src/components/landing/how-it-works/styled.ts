import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, spacing } from '@/theme';
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '../shared/styled';

export { Section, SectionHeader, SectionInner, SectionSubtitle, SectionTitle };

export const Timeline = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing.lg};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 2rem;
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--line), transparent);
  }

  ${media.belowLg} {
    grid-template-columns: 1fr 1fr;

    &::before {
      display: none;
    }
  }

  ${media.belowMd} {
    grid-template-columns: 1fr;
  }
`;

export const Step = styled.div<{ $palette: ThemePalette }>`
  --line: ${({ $palette }) => $palette.border};
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const StepIcon = styled.div<{ $palette: ThemePalette }>`
  width: 4rem;
  height: 4rem;
  border-radius: ${radii.xl};
  background: ${({ $palette }) => $palette.surface};
  border: 2px solid ${({ $palette }) => $palette.primary}30;
  color: ${({ $palette }) => $palette.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.md};
  box-shadow: 0 8px 24px ${({ $palette }) => $palette.shadow};
`;

export const StepNumber = styled.span<{ $palette: ThemePalette }>`
  display: block;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${({ $palette }) => $palette.primary};
  margin-bottom: ${spacing.xs};
`;

export const StepTitle = styled.h3<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.sm};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
`;

export const StepDesc = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textSecondary};
  line-height: 1.6;
`;
