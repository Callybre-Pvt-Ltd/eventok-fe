import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import type { ThemePalette } from '@/theme';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, spacing } from '@/theme';
import { sectionSpacing } from '@/design-system/tokens/spacing';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export const Wrap = styled.div``;

export const Hero = styled.section`
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`;

export const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
`;

export const HeroContent = styled.div<{ $palette: ThemePalette }>`
  position: relative;
  z-index: 1;
  padding: clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem);
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(${brandRgb.charcoal}, 0.75) 100%
  );
  color: ${brandColors.sage};

  h1 {
    font-family: ${fontFamily.display};
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0 0 ${spacing.md};
  }

  p {
    font-size: ${fontSizes.lg};
    opacity: 0.9;
    max-width: 520px;
    margin: 0;
    line-height: 1.6;
  }
`;

export const TrustBar = styled.div<{ $palette: ThemePalette }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.lg};
  max-width: 800px;
  margin: -2rem auto ${sectionSpacing.flow};
  padding: ${spacing.xl};
  background: ${({ $palette }) => $palette.surface};
  border-radius: ${radii.xxl};
  box-shadow: 0 20px 60px rgba(${brandRgb.charcoal}, 0.12);
  position: relative;
  z-index: 2;
  width: calc(100% - 2rem);

  ${media.belowMd} {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-family: ${fontFamily.display};
    font-size: ${fontSizes.h3};
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
  }

  span {
    font-size: ${fontSizes.sm};
    opacity: 0.65;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  justify-content: center;
  margin-bottom: ${sectionSpacing.flow};
  padding: 0 ${spacing.xl};
`;

export const FilterBtn = styled.button<{
  $active: boolean;
  $palette: ThemePalette;
}>`
  padding: 0.625rem 1.25rem;
  border-radius: ${radii.full};
  border: 1.5px solid
    ${({ $active, $palette }) => ($active ? $palette.primary : $palette.border)};
  background: ${({ $active, $palette }) =>
    $active ? $palette.primaryLight : 'transparent'};
  color: ${({ $active, $palette }) =>
    $active ? $palette.primary : $palette.textSecondary};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
`;

export const FeaturedSection = styled.section`
  max-width: 1280px;
  margin: 0 auto ${sectionSpacing.default};
  padding: 0 clamp(1rem, 4vw, 2rem);

  h2 {
    font-family: ${fontFamily.display};
    font-size: ${fontSizes.h3};
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 ${spacing.xl};
  }
`;

export const StoryCard = styled.article<{ $palette: ThemePalette }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-radius: ${radii.xxl};
  overflow: hidden;
  background: ${({ $palette }) => $palette.surface};
  box-shadow: 0 16px 48px rgba(${brandRgb.charcoal}, 0.1);

  ${media.belowLg} {
    grid-template-columns: 1fr;
  }
`;

export const StoryPhoto = styled.img`
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
`;

export const StoryBody = styled.div<{ $palette: ThemePalette }>`
  padding: clamp(2rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacing.md};

  p {
    font-size: ${fontSizes.xl};
    line-height: 1.65;
    font-style: italic;
    color: ${({ $palette }) => $palette.text};
    margin: 0;
  }

  cite {
    font-size: ${fontSizes.sm};
    font-weight: 600;
    color: ${({ $palette }) => $palette.textMuted};
    font-style: normal;
  }
`;

export const VideoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.lg};

  ${media.belowMd} {
    grid-template-columns: 1fr;
  }
`;

export const VideoCard = styled.div<{ $palette: ThemePalette }>`
  position: relative;
  border-radius: ${radii.xl};
  overflow: hidden;
  aspect-ratio: 16 / 10;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  span {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: ${spacing.md};
    background: linear-gradient(transparent, rgba(${brandRgb.charcoal}, 0.7));
    color: ${brandColors.sage};
    font-size: ${fontSizes.sm};
    font-weight: 600;
  }
`;

export const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(${brandRgb.sage}, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${brandColors.charcoal};
`;

export const CarouselTrack = styled.div<{ $palette: ThemePalette }>`
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    transparent,
    ${brandColors.charcoal} 8%,
    ${brandColors.charcoal} 92%,
    transparent
  );
`;

export const CarouselInner = styled.div`
  display: flex;
  gap: ${spacing.lg};
  width: max-content;
  animation: ${scroll} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

export const ReviewCard = styled.div<{ $palette: ThemePalette }>`
  flex-shrink: 0;
  width: 320px;
  padding: ${spacing.xl};
  border-radius: ${radii.xl};
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};

  p {
    font-size: ${fontSizes.md};
    line-height: 1.6;
    margin: 0;
    flex: 1;
  }

  cite {
    font-size: ${fontSizes.sm};
    color: ${({ $palette }) => $palette.textMuted};
    font-style: normal;
  }
`;

export const GalleryMasonry = styled.div`
  columns: 3;
  column-gap: ${spacing.md};

  ${media.belowLg} {
    columns: 2;
  }

  ${media.belowMd} {
    columns: 1;
  }
`;

export const GalleryItem = styled(motion.div)<{ $tall?: boolean }>`
  break-inside: avoid;
  margin-bottom: ${spacing.md};
  border-radius: ${radii.lg};
  overflow: hidden;

  img {
    width: 100%;
    display: block;
    object-fit: cover;
    aspect-ratio: ${({ $tall }) => ($tall ? '3 / 4' : '4 / 3')};
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }
`;
