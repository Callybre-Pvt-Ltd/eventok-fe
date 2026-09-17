import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, radii, shadows } from '@/theme';

export const Card = styled.article<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width ?? '100%'};
  overflow: hidden;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  box-shadow: ${shadows.sm};
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: ${shadows.md};
    transform: translateY(-2px);
  }
`;

export const Media = styled(Link)`
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Ribbon = styled.span`
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  padding: 0.25rem 0.625rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: 0.6875rem;
  font-weight: 800;
`;

export const NewChip = styled.span`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  padding: 0.25rem 0.625rem;
  border-radius: ${radii.full};
  background: ${brandColors.ink900};
  color: ${brandColors.white};
  font-size: 0.6875rem;
  font-weight: 800;
`;

export const WishButton = styled.button<{ $active: boolean }>`
  position: absolute;
  bottom: 0.625rem;
  right: 0.625rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: ${radii.full};
  background: rgba(${brandRgb.white}, 0.92);
  color: ${({ $active }) =>
    $active ? brandColors.pink500 : brandColors.gray600};
  cursor: pointer;

  &:hover {
    color: ${brandColors.pink500};
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.875rem;
  flex: 1 1 auto;
`;

export const TitleLink = styled(Link)`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.md};
  font-weight: 700;
  line-height: 1.35;
  color: ${brandColors.chocolate};
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: ${brandColors.pink500};
  }
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

export const Price = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xl};
  font-weight: 800;
  color: ${brandColors.pink500};
`;

export const Strike = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.gray400};
  text-decoration: line-through;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const SaveText = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${brandColors.gray600};
`;

export const OffChip = styled.span`
  padding: 0.1875rem 0.5rem;
  border-radius: ${radii.full};
  background: ${brandColors.success50};
  color: ${brandColors.success500};
  font-size: ${fontSizes.xs};
  font-weight: 800;
`;

export const BookButton = styled.button`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  width: 100%;
  padding: 0.6875rem 1rem;
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${brandColors.pink600};
  }
`;
