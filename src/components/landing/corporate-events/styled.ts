import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, spacing } from '@/theme';
import { brandRgb } from '@/theme/brand';
import { Section, SectionInner } from '../shared/styled';

export { Section, SectionInner };

export const Split = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.xxl};
  align-items: center;

  ${media.belowLg} {
    grid-template-columns: 1fr;
  }
`;

export const Content = styled.div``;

export const Eyebrow = styled.span<{ $palette: ThemePalette }>`
  display: inline-block;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ $palette }) => $palette.accentBlue};
  margin-bottom: ${spacing.md};
`;

export const Title = styled.h2<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.md};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.h2};
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.03em;
  line-height: 1.15;
`;

export const Subtitle = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.xl};
  font-size: ${fontSizes.lg};
  color: ${({ $palette }) => $palette.textSecondary};
  line-height: 1.7;
`;

export const FeatureList = styled.ul<{ $palette: ThemePalette }>`
  list-style: none;
  padding: 0;
  margin: 0 0 ${spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const FeatureItem = styled.li<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  font-size: ${fontSizes.md};
  color: ${({ $palette }) => $palette.text};
  font-weight: 500;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $palette }) => $palette.gradientPrimary};
    flex-shrink: 0;
  }
`;

export const Visual = styled.div<{ $url: string }>`
  height: 400px;
  border-radius: ${radii.xxl};
  background: url(${({ $url }) => $url}) center/cover;
  box-shadow: 0 24px 64px rgba(${brandRgb.charcoal}, 0.15);

  ${media.belowLg} {
    height: 280px;
  }
`;
