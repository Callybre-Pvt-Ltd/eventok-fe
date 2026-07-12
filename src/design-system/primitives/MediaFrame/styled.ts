import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ColorTokens } from '../../tokens/colors';
import { aspectRatios, type AspectRatio } from '../../tokens/photography';
import { radii, shadows } from '../../tokens/spacing';
import { fontFamilies } from '../../tokens/typography';
import { brandColors } from '@/theme/brand';

export const Frame = styled(motion.figure)<{
  $ratio: AspectRatio;
  $colors: ColorTokens;
}>`
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: ${radii['2xl']};
  aspect-ratio: ${({ $ratio }) => aspectRatios[$ratio]};
  box-shadow: ${shadows.photo};
  background: ${({ $colors }) => $colors.neutral[200]};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  ${Frame}:hover & {
    transform: scale(1.05);
  }
`;

export const Overlay = styled.div<{ $colors: ColorTokens }>`
  position: absolute;
  inset: 0;
  background: ${({ $colors }) => $colors.photoOverlay};
  pointer-events: none;
`;

export const Caption = styled.figcaption`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  font-family: ${fontFamilies.body};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${brandColors.sage};
  z-index: 1;
`;
