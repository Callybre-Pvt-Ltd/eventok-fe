import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, radii, spacing } from '@/theme';
import { brandColors, brandRgb } from '@/theme/brand';

export const Section = styled.section<{ $palette: ThemePalette }>`
  padding: ${spacing.section} ${spacing.xl};
  background: ${({ $palette }) => $palette.backgroundAlt};
`;

export const Inner = styled.div<{ $palette: ThemePalette }>`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  padding: ${spacing.xxxl} ${spacing.xl};
  border-radius: ${radii.xxl};
  background: ${({ $palette }) => $palette.gradientPrimary};
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 64px ${({ $palette }) => $palette.shadow};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 30% 50%,
      rgba(${brandRgb.sage}, 0.15) 0%,
      transparent 60%
    );
  }
`;

export const Title = styled.h2`
  margin: 0 0 ${spacing.md};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.h2};
  font-weight: 800;
  color: ${brandColors.sage};
  letter-spacing: -0.03em;
  position: relative;
`;

export const Subtitle = styled.p`
  margin: 0 0 ${spacing.xl};
  font-size: ${fontSizes.lg};
  color: rgba(${brandRgb.sage}, 0.85);
  line-height: 1.6;
  position: relative;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
`;

export const Actions = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: ${spacing.md};
  flex-wrap: wrap;
`;
