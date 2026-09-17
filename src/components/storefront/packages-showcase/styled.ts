import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  box-shadow: ${shadows.sm};

  &:hover {
    box-shadow: ${shadows.md};
  }
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;

export const Body = styled.div`
  display: grid;
  gap: 0.5rem;
  padding: 0.875rem;
  flex: 1 1 auto;
`;

export const Name = styled.h3`
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const Description = styled.p`
  font-size: ${fontSizes.xs};
  font-weight: 500;
  color: ${brandColors.gray600};
`;

export const Foot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
`;

export const PriceLabel = styled.span`
  display: block;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray400};
`;

export const Price = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: ${brandColors.pink500};
`;

export const GoButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  text-decoration: none;

  &:hover {
    background: ${brandColors.pink600};
  }
`;

export const ViewAllRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.75rem;
`;
