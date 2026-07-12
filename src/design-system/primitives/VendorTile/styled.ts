import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ColorTokens } from '../../tokens/colors';
import { brandColors, brandGradients, brandRgb } from '@/theme/brand';
import { radii, shadows, space } from '../../tokens/spacing';
import { fontFamilies } from '../../tokens/typography';

export const Tile = styled(motion.article)<{
  $colors: ColorTokens;
  $featured?: boolean;
}>`
  display: flex;
  flex-direction: column;
  background: ${({ $colors }) => $colors.bgElevated};
  border-radius: ${radii['2xl']};
  overflow: hidden;
  box-shadow: ${shadows.md};
  border: 1px solid ${({ $colors }) => $colors.borderSubtle};
  ${({ $featured, $colors }) =>
    $featured &&
    `
    grid-column: span 1;
    border-color: ${$colors.brand[200]};
  `}
`;

export const PhotoWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);

  ${Tile}:hover & {
    transform: scale(1.06);
  }
`;

export const PhotoOverlay = styled.div<{ $colors: ColorTokens }>`
  position: absolute;
  inset: 0;
  background: ${({ $colors }) => $colors.photoOverlayLight};
  pointer-events: none;
`;

export const FavBtn = styled.button<{ $active: boolean }>`
  position: absolute;
  top: ${space[3]};
  right: ${space[3]};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(${brandRgb.sage}, 0.92);
  color: ${({ $active }) =>
    $active ? brandColors.forest : brandColors.charcoal};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  z-index: 2;
`;

export const Body = styled.div`
  padding: ${space[5]};
  display: flex;
  flex-direction: column;
  gap: ${space[4]};
`;

export const TopRow = styled.div`
  display: flex;
  gap: ${space[3]};
  align-items: flex-start;
`;

export const Logo = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${radii.lg};
  background: ${brandGradients.primary};
  color: ${brandColors.sage};
  font-family: ${fontFamilies.display};
  font-weight: 700;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${space[3]};
  font-family: ${fontFamilies.body};
  font-size: 0.8125rem;
  color: inherit;
  opacity: 0.75;
`;

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const Actions = styled.div`
  margin-top: auto;
`;
