import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Page = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  padding: 1.25rem 1rem 3rem;

  ${media.lg} {
    padding: 1.75rem 2.5rem 4rem;
  }
`;

export const Layout = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  ${media.lg} {
    grid-template-columns: minmax(0, 1.9fr) minmax(0, 1fr);
    gap: 2.5rem;
  }
`;

export const Title = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3.2vw, 2rem);
  font-weight: 800;
  line-height: 1.25;
  color: ${brandColors.chocolate};
  margin-bottom: 1rem;
`;

export const DescriptionCard = styled.section`
  margin-top: 1.5rem;
  padding: 1.125rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
`;

export const DescriptionTitle = styled.h2`
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: ${brandColors.chocolate};
  margin-bottom: 0.5rem;
`;

export const DescriptionText = styled.p`
  font-size: ${fontSizes.sm};
  font-weight: 500;
  line-height: 1.7;
  color: ${brandColors.gray600};
`;

export const RelatedSection = styled.section`
  margin-top: 2.5rem;
`;

export const RelatedTitle = styled.h2`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xxl};
  font-weight: 800;
  color: ${brandColors.chocolate};
  margin-bottom: 1rem;
`;

export const RelatedRail = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RelatedCard = styled(Link)`
  flex: 0 0 auto;
  width: 11rem;
  display: grid;
  gap: 0.375rem;
  text-decoration: none;
`;

export const RelatedImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: ${radii.lg};
`;

export const RelatedLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${brandColors.chocolate};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RelatedPrice = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${brandColors.pink500};
`;

export const NotFound = styled.div`
  display: grid;
  gap: 1rem;
  justify-items: center;
  padding: 5rem 1rem;
  text-align: center;
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: ${brandColors.gray600};
`;

export const BackLink = styled(Link)`
  padding: 0.625rem 1.5rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
`;

export const Loading = styled.div`
  display: grid;
  gap: 1rem;
  padding: 4rem 1rem;
  justify-items: center;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.gray400};
`;
