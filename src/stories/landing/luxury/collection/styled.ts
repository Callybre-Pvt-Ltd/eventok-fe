import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const CollectionSection = styled.section`
  margin: clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 4vw, 2.5rem);
  padding: clamp(2.5rem, 5vw, 4rem);
  border-radius: 2rem;
  background: ${luxuryColors.tan};
`;

export const CollectionGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 4vw, 3rem);
  align-items: start;

  ${media.lg} {
    grid-template-columns: 0.9fr 1.1fr;
    align-items: center;
  }
`;

export const CollectionIntro = styled.div`
  max-width: 360px;
`;

export const CollectionTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  color: ${luxuryColors.chocolate};
`;

export const CollectionLead = styled.p`
  margin: 0 0 1.75rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: ${luxuryColors.brown};
  opacity: 0.8;
`;

export const CollectionCta = styled(Link)`
  display: inline-flex;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  background: ${luxuryColors.chocolate};
  color: ${luxuryColors.textOnDark};
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background: ${luxuryColors.brown};
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ProductCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`;

export const ProductImage = styled.div`
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  margin-bottom: 0.875rem;
  background: ${luxuryColors.cream};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.04);
  }
`;

export const ProductBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: ${luxuryColors.chocolate};
`;

export const ProductName = styled.h3`
  margin: 0 0 0.25rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${luxuryColors.chocolate};
`;

export const ProductMeta = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${luxuryColors.brown};
  opacity: 0.7;
`;

export const SkeletonCard = styled.div`
  border-radius: 1.25rem;
  aspect-ratio: 4 / 5;
  background: ${luxuryColors.cream};
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;
