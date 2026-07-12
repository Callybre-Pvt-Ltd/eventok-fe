import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, shadows, spacing } from '@/theme';

export const Shell = styled.div<{ $palette: ThemePalette }>`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl};
`;

export const BgLayer = styled.div<{ $palette: ThemePalette }>`
  position: fixed;
  inset: 0;
  background: ${({ $palette }) => $palette.gradientHero};
  z-index: 0;
`;

export const Blob = styled.div<{
  $palette: ThemePalette;
  $secondary?: boolean;
}>`
  position: fixed;
  width: ${({ $secondary }) => ($secondary ? '280px' : '420px')};
  height: ${({ $secondary }) => ($secondary ? '280px' : '420px')};
  border-radius: 50%;
  background: ${({ $palette, $secondary }) =>
    $secondary ? $palette.accentPink : $palette.gradientPrimary};
  opacity: ${({ $secondary }) => ($secondary ? 0.15 : 0.12)};
  filter: blur(80px);
  z-index: 0;
  top: ${({ $secondary }) => ($secondary ? '60%' : '10%')};
  left: ${({ $secondary }) => ($secondary ? '5%' : 'auto')};
  right: ${({ $secondary }) => ($secondary ? 'auto' : '10%')};
  pointer-events: none;
`;

export const Grid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  max-width: 1100px;
  width: 100%;
  align-items: center;

  ${media.belowLg} {
    grid-template-columns: 1fr;
    max-width: 440px;
  }
`;

export const BenefitsPanel = styled.div`
  ${media.belowLg} {
    display: none;
  }

  h2 {
    font-family: ${fontFamily.display};
    font-size: ${fontSizes.h2};
    font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0 0 ${spacing.md};
  }

  > p {
    font-size: ${fontSizes.lg};
    line-height: 1.65;
    opacity: 0.8;
    margin: 0 0 ${spacing.xl};
    max-width: 400px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 ${spacing.xl};
    display: flex;
    flex-direction: column;
    gap: ${spacing.md};
  }
`;

export const BenefitItem = styled.li<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${fontSizes.md};
  font-weight: 500;
  color: ${({ $palette }) => $palette.text};

  svg {
    color: ${({ $palette }) => $palette.primary};
    flex-shrink: 0;
  }
`;

export const SocialProof = styled.p<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${({ $palette }) => $palette.primary};
  margin: 0 0 ${spacing.md};
`;

export const Quote = styled.blockquote<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.lg};
  font-style: italic;
  line-height: 1.6;
  color: ${({ $palette }) => $palette.textSecondary};
  max-width: 380px;
`;

export const QuoteAuthor = styled.cite<{ $palette: ThemePalette }>`
  display: block;
  margin-top: ${spacing.sm};
  font-size: ${fontSizes.sm};
  font-style: normal;
  font-weight: 600;
  color: ${({ $palette }) => $palette.textMuted};
`;

export const CardWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const GlassCard = styled.div<{ $palette: ThemePalette }>`
  width: 100%;
  max-width: 420px;
  padding: clamp(1.75rem, 4vw, 2.5rem);
  border-radius: ${radii.xxl};
  background: ${({ $palette }) => $palette.glass};
  backdrop-filter: blur(24px) saturate(1.5);
  border: 1px solid ${({ $palette }) => $palette.border};
  box-shadow: ${shadows.xl};
`;
