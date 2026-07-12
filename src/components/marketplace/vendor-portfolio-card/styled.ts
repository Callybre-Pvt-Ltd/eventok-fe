import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ThemePalette } from '@/theme';
import { brandColors, brandRgb } from '@/theme/brand';

export const Card = styled(motion.article)<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  background: ${({ $palette }) => $palette.surface};
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ $palette }) => $palette.border};
  box-shadow: 0 4px 24px ${({ $palette }) => $palette.shadow};
  transition: box-shadow 0.4s ease, transform 0.4s ease;

  &:hover {
    box-shadow: 0 20px 56px rgba(124, 58, 237, 0.18);
    transform: translateY(-6px);
  }
`;

export const ImageStage = styled.div<{ $palette: ThemePalette }>`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: ${({ $palette }) => $palette.primaryLight};
`;

export const SlideImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const VerifiedPill = styled.div<{ $palette: ThemePalette }>`
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  background: rgba(${brandRgb.sage}, 0.92);
  color: ${({ $palette }) => $palette.primary};
  backdrop-filter: blur(8px);
  z-index: 3;
`;

export const FavBtn = styled.button<{
  $palette: ThemePalette;
  $active: boolean;
}>`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4;
  background: rgba(${brandRgb.sage}, 0.92);
  color: ${({ $active }) =>
    $active ? brandColors.forest : brandColors.charcoal};
  backdrop-filter: blur(8px);
`;

export const NavBtn = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === 'left' ? 'left: 8px' : 'right: 8px')};
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(${brandRgb.sage}, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.25s;

  ${ImageStage}:hover & {
    opacity: 1;
  }
`;

export const CarouselDots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 3;
`;

export const Dot = styled.button<{ $active: boolean; $palette: ThemePalette }>`
  width: ${({ $active }) => ($active ? '18px' : '6px')};
  height: 6px;
  border-radius: 999px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${({ $active, $palette }) =>
    $active ? $palette.primary : `rgba(${brandRgb.sage}, 0.6)`};
  transition: width 0.25s ease, background 0.25s;
`;

export const PortfolioCount = styled.span<{ $palette: ThemePalette }>`
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(${brandRgb.charcoal}, 0.55);
  color: ${brandColors.sage};
  z-index: 2;
`;

export const HoverLayer = styled.div<{ $palette: ThemePalette }>`
  position: absolute;
  inset: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  background: linear-gradient(
    180deg,
    transparent 20%,
    rgba(${brandRgb.charcoal}, 0.85) 100%
  );
  color: ${brandColors.sage};
  z-index: 2;
  pointer-events: none;
  font-size: 0.8125rem;
  line-height: 1.5;
`;

export const PreviewText = styled.div<{ $palette: ThemePalette }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.9;
`;

export const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

export const CategoryTag = styled.span<{ $palette: ThemePalette }>`
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ $palette }) => $palette.primaryLight};
  color: ${({ $palette }) => $palette.primary};
`;

export const Body = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const AvatarRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const Avatar = styled.div<{ $palette: ThemePalette }>`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  color: ${brandColors.sage};
  background: ${({ $palette }) => $palette.gradientPrimary};
`;

export const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Name = styled.h3<{ $palette: ThemePalette }>`
  margin: 0 0 6px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MetaGrid = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  font-size: 0.75rem;
  color: ${({ $palette }) => $palette.textMuted};
`;

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const ActionBtn = styled.button`
  display: contents;
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
`;
