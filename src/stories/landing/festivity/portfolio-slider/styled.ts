import styled from 'styled-components';
import { luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const PortfolioSliderFrame = styled.div`
  width: 100%;
`;

export const PortfolioSliderRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;

  ${media.belowMd} {
    gap: 0.75rem;
  }
`;

export const PortfolioTrack = styled.div`
  overflow: hidden;
`;

export const PortfolioGrid = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count}, 1fr);
  gap: 1.5rem;

  ${media.belowMd} {
    grid-template-columns: 1fr;
  }
`;

export const PortfolioCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PortfolioCardImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  object-position: center;
  border-radius: 2px;
`;

export const PortfolioCardTitle = styled.h3`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  color: ${luxuryColors.chocolate};
`;
