import styled from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 8rem;

  ${media.lg} {
    padding: 2rem 2.5rem 8rem;
  }
`;

export const Title = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const Subtitle = styled.p`
  margin-top: 0.5rem;
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.gray600};
`;

export const Steps = styled.ol`
  display: flex;
  gap: 0.5rem;
  margin: 1.5rem 0;
  list-style: none;
`;

export const StepItem = styled.li<{ $active: boolean }>`
  flex: 1 1 0;
  display: grid;
  gap: 0.375rem;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${({ $active }) =>
    $active ? brandColors.pink500 : brandColors.gray400};

  &::before {
    content: '';
    height: 4px;
    border-radius: ${radii.full};
    background: ${({ $active }) =>
      $active ? brandColors.pink500 : brandColors.tan};
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  gap: 0.875rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${media.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const CategoryTile = styled.button<{ $active: boolean }>`
  display: grid;
  gap: 0.25rem;
  padding: 1rem 0.75rem;
  text-align: left;
  border-radius: ${radii.lg};
  border: 1.5px solid
    ${({ $active }) => ($active ? brandColors.pink500 : brandColors.tan)};
  background: ${({ $active }) =>
    $active ? brandColors.pink100 : brandColors.white};
  cursor: pointer;

  &:hover {
    border-color: ${brandColors.pink500};
  }
`;

export const TileName = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const TileMeta = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray400};
`;

export const ServiceList = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const ServiceRow = styled.label<{ $active: boolean }>`
  display: grid;
  grid-template-columns: auto 4.5rem 1fr auto;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem;
  border-radius: ${radii.lg};
  border: 1.5px solid
    ${({ $active }) => ($active ? brandColors.pink500 : brandColors.tan)};
  background: ${brandColors.white};
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 1.125rem;
  height: 1.125rem;
  accent-color: ${brandColors.pink500};
`;

export const RowImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: ${radii.md};
`;

export const RowTitle = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const RowPrice = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 800;
  color: ${brandColors.pink500};
`;

export const ReviewCard = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
`;

export const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.gray600};
`;

export const StickyBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 35;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: ${brandColors.white};
  border-top: 1px solid ${brandColors.tan};
  box-shadow: ${shadows.lg};

  ${media.lg} {
    padding: 1rem 2.5rem;
  }
`;

export const TotalBlock = styled.div`
  display: grid;
`;

export const TotalLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${brandColors.gray400};
`;

export const TotalValue = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xl};
  font-weight: 800;
  color: ${brandColors.pink500};
`;

export const BarActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const GhostButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: ${radii.full};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.chocolate};
  cursor: pointer;
`;

export const PrimaryButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Hint = styled.p`
  margin-top: 0.75rem;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray400};
`;
