import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Page = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;

  ${media.lg} {
    padding: 2rem 2.5rem 4rem;
  }
`;

export const Title = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: ${brandColors.chocolate};
  margin-bottom: 1.25rem;
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${media.xl} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Empty = styled.div`
  display: grid;
  gap: 1rem;
  justify-items: center;
  padding: 4rem 1rem;
  text-align: center;
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: ${brandColors.gray600};
`;

export const EmptyLink = styled(Link)`
  padding: 0.625rem 1.5rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
`;
