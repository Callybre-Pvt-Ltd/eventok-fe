import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ThemePalette } from '@/theme';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, spacing } from '@/theme';
import { sectionSpacing } from '@/design-system/tokens/spacing';

export const PageWrap = styled.div<{ $palette: ThemePalette }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ $palette }) => $palette.background};
  overflow-x: hidden;
`;

export const Hero = styled.section`
  position: relative;
  height: clamp(420px, 60vh, 640px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  isolation: isolate;
`;

export const HeroMedia = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center 40%;
`;

export const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(${brandRgb.chocolate}, 0.15) 0%,
    rgba(${brandRgb.chocolate}, 0.72) 100%
  );
  z-index: 1;
`;

export const HeroContent = styled(motion.div)<{ $palette: ThemePalette }>`
  position: relative;
  z-index: 2;
  padding: clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem);
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  color: ${brandColors.white};
`;

export const HeroTitle = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 600;
  letter-spacing: 0.01em;
  margin: 0 0 ${spacing.md};
  max-width: 720px;
  color: ${brandColors.white};
`;

export const HeroLead = styled.p<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.lg};
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.88);
  max-width: 560px;
  margin: 0;
`;

export const Section = styled.section<{
  $bg?: 'warm' | 'cool';
  $palette: ThemePalette;
}>`
  padding: ${sectionSpacing.default} 0;
  background: ${({ $bg, $palette }) => {
    if ($bg === 'warm') return $palette.backgroundAlt;
    if ($bg === 'cool') return $palette.surface;
    return $palette.background;
  }};

  h2 {
    font-family: ${fontFamily.display};
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 ${spacing.xl};
    color: ${({ $palette }) => $palette.text};
  }
`;

export const SectionInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
`;

export const SplitImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: ${radii.xxl};
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(${brandRgb.charcoal}, 0.12);
  background: ${brandColors.cream};
`;

export const SplitImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  display: block;
`;

export const SplitCopy = styled.div`
  h2 {
    margin-bottom: ${spacing.md};
  }

  p {
    font-size: ${fontSizes.lg};
    line-height: 1.7;
    margin: 0;
    opacity: 0.85;
  }
`;

export const Split = styled.div<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;

  ${({ $reverse }) =>
    $reverse &&
    `
    ${SplitCopy} {
      order: 2;
    }
    ${SplitImageWrap} {
      order: 1;
    }
  `}

  ${media.belowLg} {
    grid-template-columns: 1fr;

    ${SplitCopy}, ${SplitImageWrap} {
      order: unset;
    }
  }
`;

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ValueCard = styled.div<{ $palette: ThemePalette }>`
  padding: ${spacing.xl};
  border-radius: ${radii.xl};
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  box-shadow: 0 8px 32px rgba(${brandRgb.charcoal}, 0.06);

  h3 {
    font-family: ${fontFamily.display};
    font-size: ${fontSizes.lg};
    font-weight: 700;
    margin: 0 0 ${spacing.sm};
    color: ${({ $palette }) => $palette.text};
  }

  p {
    font-size: ${fontSizes.md};
    line-height: 1.65;
    margin: 0;
    color: ${({ $palette }) => $palette.textMuted};
  }
`;

export const Timeline = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  max-width: 640px;
  border-left: 2px solid ${({ $palette }) => $palette.border};
  padding-left: ${spacing.xl};
`;

export const TimelineItem = styled(motion.div)<{ $palette: ThemePalette }>`
  position: relative;
  font-size: ${fontSizes.lg};
  font-weight: 600;
  color: ${({ $palette }) => $palette.text};
  padding: ${spacing.sm} 0;

  &::before {
    content: '';
    position: absolute;
    left: calc(-${spacing.xl} - 5px);
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $palette }) => $palette.primary};
    box-shadow: 0 0 0 4px ${({ $palette }) => $palette.primaryLight};
  }
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TeamPhotoWrap = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${radii.xxl};
  overflow: hidden;
  margin-bottom: ${spacing.md};
  box-shadow: 0 16px 48px rgba(${brandRgb.charcoal}, 0.1);
  background: ${brandColors.cream};
`;

export const TeamPhoto = styled.img`
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  display: block;
`;

export const TeamCard = styled.div<{ $palette: ThemePalette }>`
  text-align: center;

  h4 {
    font-family: ${fontFamily.display};
    font-size: ${fontSizes.lg};
    font-weight: 700;
    margin: 0 0 4px;
    color: ${({ $palette }) => $palette.text};
  }

  span {
    font-size: ${fontSizes.sm};
    color: ${({ $palette }) => $palette.textMuted};
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing.lg};

  ${media.belowLg} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.belowMd} {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div<{ $palette: ThemePalette }>`
  padding: ${spacing.xl};
  border-radius: ${radii.xl};
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  text-align: center;

  strong {
    display: block;
    font-family: ${fontFamily.display};
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 800;
    color: ${({ $palette }) => $palette.primary};
    margin-bottom: ${spacing.xs};
  }

  span {
    font-size: ${fontSizes.sm};
    color: ${({ $palette }) => $palette.textMuted};
  }
`;

export const Partners = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.md};
  justify-content: center;
`;

export const PartnerLogo = styled.div<{ $palette: ThemePalette }>`
  padding: ${spacing.md} ${spacing.xl};
  border-radius: ${radii.lg};
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${({ $palette }) => $palette.textSecondary};
`;

export const CtaBand = styled.section<{ $palette: ThemePalette }>`
  text-align: center;
  padding: clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem);
  background: ${({ $palette }) => $palette.primary};
  color: ${brandColors.sage};

  h2 {
    font-family: ${fontFamily.display};
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    margin: 0 0 ${spacing.xl};
    color: inherit;
  }
`;
