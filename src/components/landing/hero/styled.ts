import styled, { keyframes } from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, spacing } from '@/theme';
import { brandRgb } from '@/theme/brand';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-16px) rotate(3deg); }
`;

const floatAlt = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(-2deg); }
`;

export const HeroSection = styled.section<{ $palette: ThemePalette }>`
  position: relative;
  overflow: hidden;
  background: ${({ $palette }) => $palette.gradientHero};
  padding: ${spacing.xxxl} ${spacing.xl} ${spacing.section};
  min-height: 85vh;
  display: flex;
  align-items: center;

  ${media.belowMd} {
    padding: ${spacing.xxl} ${spacing.md} ${spacing.xxxl};
    min-height: auto;
  }
`;

export const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.xxl};
  align-items: center;

  ${media.belowLg} {
    grid-template-columns: 1fr;
    gap: ${spacing.xl};
  }
`;

export const HeroContent = styled.div`
  max-width: 600px;
`;

export const HeroBadge = styled.span<{ $palette: ThemePalette }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ $palette }) => $palette.surface};
  color: ${({ $palette }) => $palette.primary};
  font-size: ${fontSizes.xs};
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: ${radii.full};
  margin-bottom: ${spacing.lg};
  border: 1px solid ${({ $palette }) => $palette.border};
  box-shadow: 0 2px 12px ${({ $palette }) => $palette.shadow};
`;

export const HeroTitle = styled.h1<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.lg};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.display};
  font-weight: 800;
  color: ${({ $palette }) => $palette.text};
  line-height: 1.05;
  letter-spacing: -0.04em;
`;

export const HeroSubtitle = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.xl};
  font-size: ${fontSizes.lg};
  color: ${({ $palette }) => $palette.textSecondary};
  line-height: 1.7;
  max-width: 520px;
`;

export const HeroActions = styled.div`
  display: flex;
  gap: ${spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${spacing.xxl};
`;

export const HeroVisual = styled.div`
  position: relative;
  height: 420px;

  ${media.belowLg} {
    height: 300px;
  }
`;

export const ParallaxLayer = styled.div`
  position: absolute;
  inset: 0;
  transition: transform 0.15s ease-out;
`;

export const FloatCard = styled.div<{
  $palette: ThemePalette;
  $top: string;
  $left: string;
  $delay?: number;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: 140px;
  height: 100px;
  border-radius: ${radii.lg};
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  box-shadow: 0 12px 40px ${({ $palette }) => $palette.shadowStrong};
  animation: ${float} ${({ $delay }) => 4 + ($delay ?? 0)}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay ?? 0}s;
`;

export const FloatOrb = styled.div<{
  $palette: ThemePalette;
  $size: string;
  $top: string;
  $right: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  right: ${({ $right }) => $right};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background: ${({ $palette }) => $palette.gradientPrimary};
  opacity: 0.15;
  filter: blur(40px);
  animation: ${floatAlt} 6s ease-in-out infinite;
`;

export const HeroImage = styled.div<{ $url: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 360px;
  border-radius: ${radii.xxl};
  background: url(${({ $url }) => $url}) center/cover;
  box-shadow: 0 24px 64px rgba(${brandRgb.charcoal}, 0.2);
  border: 4px solid rgba(${brandRgb.sage}, 0.8);
`;

export const SearchWrap = styled.div`
  max-width: 800px;
`;
