import styled from 'styled-components';
import { luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const CategorySection = styled.section`
  padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2.5rem);
  background: ${luxuryColors.ivory};
`;

export const CategoryGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 4vw, 3rem);
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1.1fr 0.9fr;
  }
`;

export const VideoWrap = styled.div`
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  min-height: 260px;
  background: ${luxuryColors.chocolate};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
  }
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: ${luxuryColors.chocolate};
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(61, 43, 31, 0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
  }
`;

export const CategoryCopy = styled.div``;

export const CategoryTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  color: ${luxuryColors.chocolate};
`;

export const CategoryLead = styled.p`
  margin: 0 0 2rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: ${luxuryColors.brown};
  opacity: 0.8;
  max-width: 420px;
`;

export const TypeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const TypeCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 7.5rem;
  padding: 1rem 0.75rem 0.875rem;
  border: 1px solid ${luxuryColors.tan};
  border-radius: 999px;
  background: ${luxuryColors.cream};
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${luxuryColors.brown};
    transform: translateY(-2px);
  }
`;

export const TypeImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const TypeLabel = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${luxuryColors.chocolate};
`;

export const TypeArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: ${luxuryColors.chocolate};
  color: ${luxuryColors.textOnDark};
`;
