import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const Tile = styled(Link)`
  display: grid;
  gap: 0.5rem;
  justify-items: center;
  text-align: center;
  padding: 1.25rem 0.875rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${brandColors.pink500};
    box-shadow: ${shadows.md};
    transform: translateY(-2px);
  }
`;

export const IconCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink100};
  color: ${brandColors.pink500};
`;

export const TileName = styled.span`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const TileMeta = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray400};
`;
