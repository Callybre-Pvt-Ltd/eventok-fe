import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontSizes, radii } from '@/theme';

export const Frame = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${radii.xl};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.pink50};
  aspect-ratio: 4 / 3;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BadgeRow = styled.div`
  position: absolute;
  left: 0.875rem;
  bottom: 0.875rem;
  display: flex;
  gap: 0.5rem;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3125rem 0.6875rem;
  border-radius: ${radii.full};
  background: rgba(${brandRgb.white}, 0.94);
  color: ${brandColors.chocolate};
  font-size: ${fontSizes.xs};
  font-weight: 700;
`;

export const VerifiedBadge = styled(Badge)`
  color: ${brandColors.success500};
`;

export const RatingBadge = styled(Badge)`
  position: absolute;
  right: 0.875rem;
  bottom: 0.875rem;
  color: ${brandColors.chocolate};
`;

export const Thumbs = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-top: 0.75rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Thumb = styled.button<{ $active: boolean }>`
  width: 5rem;
  height: 4rem;
  flex: 0 0 auto;
  padding: 0;
  overflow: hidden;
  border-radius: ${radii.md};
  border: 2px solid
    ${({ $active }) => ($active ? brandColors.pink500 : brandColors.tan)};
  background: transparent;
  cursor: pointer;
`;

export const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3125rem 0.75rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink100};
  color: ${brandColors.pink500};
  font-size: ${fontSizes.xs};
  font-weight: 700;
`;
