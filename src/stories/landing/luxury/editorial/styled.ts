import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const EditorialSection = styled.section`
  padding: clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 4vw, 2.5rem)
    clamp(3rem, 6vw, 5rem);
  background: ${luxuryColors.taupe};
`;

export const EditorialGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 3vw, 2rem);
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1.1fr 1fr 0.75fr;
    gap: clamp(1.5rem, 3vw, 2.5rem);
  }
`;

export const MainImageWrap = styled.div`
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  min-height: 320px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RatingBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 999px;
  background: ${luxuryColors.glass};
  backdrop-filter: blur(8px);
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${luxuryColors.chocolate};
`;

export const EditorialCopy = styled.div`
  padding: 0 clamp(0rem, 2vw, 1rem);
`;

export const EditorialTitle = styled.h2`
  margin: 0 0 1.25rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 500;
  line-height: 1.1;
  color: ${luxuryColors.textOnDark};
`;

export const EditorialLead = styled.p`
  margin: 0 0 1.75rem;
  font-size: 0.9375rem;
  line-height: 1.75;
  color: ${luxuryColors.textMutedOnDark};
`;

export const EditorialCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  background: transparent;
  color: ${luxuryColors.textOnDark};
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.85);
  }
`;

export const DetailImageWrap = styled.div`
  border-radius: 1.25rem;
  overflow: hidden;
  aspect-ratio: 1;
  min-height: 200px;

  ${media.belowLg} {
    max-width: 280px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
