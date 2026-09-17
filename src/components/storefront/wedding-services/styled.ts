import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors } from '@/theme/brand';
import { fontSizes, media, radii, shadows } from '@/theme';

export const Layout = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;

export const Left = styled.div``;

export const ChooseLabel = styled.p`
  margin: 1.25rem 0 0.75rem;
  text-align: right;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray400};
`;

export const TileGrid = styled.div`
  display: grid;
  gap: 0.875rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${media.sm} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Tile = styled(Link)`
  display: grid;
  gap: 0.5rem;
  justify-items: center;
  text-align: center;
  padding: 0.75rem 0.5rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  text-decoration: none;

  &:hover {
    border-color: ${brandColors.pink500};
    box-shadow: ${shadows.md};
  }
`;

export const Thumb = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: ${radii.full};
  object-fit: cover;
`;

export const TileLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

export const Collage = styled.div`
  display: grid;
  gap: 0.875rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

export const CollageImage = styled.img<{ $tall?: boolean }>`
  width: 100%;
  height: ${({ $tall }) => ($tall ? '18rem' : '12rem')};
  object-fit: cover;
  border-radius: ${radii.lg};
`;
