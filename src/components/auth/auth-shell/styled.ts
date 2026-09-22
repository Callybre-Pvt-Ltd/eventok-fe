import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, shadows, spacing } from '@/theme';
import { brandColors, brandRgb } from '@/theme/brand';

export const Shell = styled.div<{ $palette: ThemePalette }>`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl};
  background: ${brandColors.pink100};

  ${media.belowMd} {
    padding: ${spacing.sm};
    align-items: flex-start;
  }

  ${media.belowSm} {
    padding: ${spacing.xs};
  }
`;

export const BgLayer = styled.div<{ $palette: ThemePalette }>`
  position: fixed;
  inset: 0;
  background: linear-gradient(
    180deg,
    ${brandColors.pink100} 0%,
    ${brandColors.white} 55%,
    ${brandColors.accent100} 100%
  );
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
  background: ${({ $secondary }) =>
    $secondary ? brandColors.accent500 : brandColors.pink500};
  opacity: ${({ $secondary }) => ($secondary ? 0.1 : 0.12)};
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
  grid-template-columns: 1fr 1.15fr;
  gap: 0;
  max-width: 960px;
  width: 100%;
  align-items: stretch;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: ${shadows.lg};
  background: ${brandColors.white};

  ${media.belowLg} {
    grid-template-columns: 1fr;
    max-width: 440px;
  }
`;

export const BenefitsPanel = styled.div`
  padding: clamp(1.75rem, 4vw, 2.75rem);
  background: ${brandColors.pink50};
  color: ${brandColors.chocolate};

  ${media.belowLg} {
    display: none;
  }

  h2 {
    font-family: ${fontFamily.display};
    font-size: clamp(1.5rem, 3vw, 1.85rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 ${spacing.md};
    color: ${brandColors.chocolate};
  }

  > p {
    font-size: ${fontSizes.md};
    line-height: 1.65;
    color: ${brandColors.gray600};
    margin: 0 0 ${spacing.xl};
    max-width: 360px;
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
  align-items: flex-start;
  gap: ${spacing.sm};
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.chocolate};

  svg {
    color: ${brandColors.pink500};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

export const SocialProof = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.md};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.pink600};
`;

export const Quote = styled.blockquote<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.emphasis};
  font-style: italic;
  font-size: ${fontSizes.md};
  color: ${brandColors.gray600};
  line-height: 1.5;
`;

export const QuoteAuthor = styled.p<{ $palette: ThemePalette }>`
  margin: ${spacing.sm} 0 0;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.chocolate};
`;

export const CardWrap = styled.div`
  padding: clamp(1.75rem, 4vw, 2.5rem);
  background: ${brandColors.white};

  ${media.belowMd} {
    padding: 1.15rem 1rem 1.5rem;
  }
`;

export const GlassCard = styled.div<{ $palette: ThemePalette }>`
  background: transparent;
  border: none;
  border-radius: ${radii.xl};
  padding: 0;
  box-shadow: none;
`;

export const VendorCta = styled.div`
  margin-top: 1.25rem;
  padding: 1rem 1.1rem;
  border-radius: 1rem;
  background: ${brandColors.info50};
  border: 1px solid rgba(${brandRgb.ink}, 0.06);

  h3 {
    margin: 0 0 0.35rem;
    font-family: ${fontFamily.body};
    font-size: 0.9375rem;
    font-weight: 700;
    color: ${brandColors.chocolate};
  }

  p {
    margin: 0 0 0.75rem;
    font-size: 0.8125rem;
    line-height: 1.45;
    color: ${brandColors.gray600};
  }
`;
