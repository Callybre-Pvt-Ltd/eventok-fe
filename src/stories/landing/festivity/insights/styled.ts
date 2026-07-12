import styled from 'styled-components';
import { luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const InsightRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: start;

  ${media.lg} {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 3.5rem;
  }
`;

export const InsightTextCol = styled.div`
  max-width: 420px;

  ${media.belowLg} {
    max-width: none;
    margin: 0 auto;
    text-align: center;
  }
`;

export const InsightsLead = styled.p`
  margin: 0 0 2rem;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.85;
  color: ${luxuryColors.textMutedOnDark};
`;

export const InsightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  ${media.belowMd} {
    grid-template-columns: 1fr;
  }
`;

export const InsightCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const InsightImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: 2px;
`;

export const InsightTitle = styled.h3`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  color: ${luxuryColors.textOnDark};
`;

export const InsightDate = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: ${luxuryColors.textMutedOnDark};
`;
