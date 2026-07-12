import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, radii, shadows } from '@/theme';
import { brandColors, brandGradients, brandRgb } from '@/theme/brand';

export const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

export const Card = styled(motion.article)<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: ${radii.xl};
  overflow: hidden;
  box-shadow: ${shadows.sm};
  transition: box-shadow 0.35s ease;
`;

export const ImageWrap = styled.div<{ $url?: string }>`
  position: relative;
  aspect-ratio: 4 / 3;
  background: ${({ $url }) =>
    $url ? `url(${$url}) center/cover` : brandGradients.warm};
`;

export const FavoriteBtn = styled.button<{
  $palette: ThemePalette;
  $active?: boolean;
}>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: none;
  background: rgba(${brandRgb.sage}, 0.9);
  color: ${({ $active, $palette }) =>
    $active ? $palette.accentPink : $palette.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${shadows.sm};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const VerifiedBadge = styled.span<{ $palette: ThemePalette }>`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: ${radii.full};
  background: ${({ $palette }) => $palette.success};
  color: ${brandColors.sage};
  font-size: ${fontSizes.xs};
  font-weight: 600;
`;

export const CardBody = styled.div`
  padding: 1rem 1.25rem 1.25rem;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const Logo = styled.div<{ $palette: ThemePalette; $initial: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${radii.md};
  background: ${({ $palette }) => $palette.primaryLight};
  color: ${({ $palette }) => $palette.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${fontSizes.sm};
  flex-shrink: 0;
`;

export const NameBlock = styled.div`
  flex: 1;
  min-width: 0;
`;

export const VendorName = styled.h3<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Location = styled.p<{ $palette: ThemePalette }>`
  margin: 0.125rem 0 0;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textMuted};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Meta = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ $palette }) => $palette.borderLight};
`;

export const Rating = styled.span<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${({ $palette }) => $palette.text};
`;

export const PortfolioCount = styled.span<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.xs};
  color: ${({ $palette }) => $palette.textMuted};
`;

export const CtaRow = styled.div`
  margin-top: 0.75rem;
`;
