import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, shadows, spacing } from '@/theme';

export const Section = styled.section<{
  $palette: ThemePalette;
  $alt?: boolean;
}>`
  padding: ${spacing.section} ${spacing.xl};
  background: ${({ $palette, $alt }) =>
    $alt ? $palette.backgroundAlt : $palette.background};

  ${media.belowMd} {
    padding: ${spacing.xxl} ${spacing.md};
  }
`;

export const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto ${spacing.xxl};
`;

export const SectionEyebrow = styled.span<{ $palette: ThemePalette }>`
  display: inline-block;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ $palette }) => $palette.primary};
  margin-bottom: ${spacing.sm};
`;

export const SectionTitle = styled.h2<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.md};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.h2};
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.03em;
  line-height: 1.15;
`;

export const SectionSubtitle = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.lg};
  color: ${({ $palette }) => $palette.textSecondary};
  line-height: 1.6;
`;

export const ViewAllLink = styled.div`
  text-align: center;
  margin-top: ${spacing.xl};
`;

export const GlassCard = styled.div<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: ${radii.xl};
  box-shadow: ${shadows.md};
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.lg};
  }
`;
