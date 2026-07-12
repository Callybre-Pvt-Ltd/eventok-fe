import styled from 'styled-components';
import { luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const PartnersSection = styled.section`
  padding: clamp(2rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem);
  background: ${luxuryColors.tan};
`;

export const PartnersRow = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(1.5rem, 4vw, 3rem);
`;

export const PartnerLogo = styled.span`
  font-family: ${fontFamily.display};
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 600;
  color: ${luxuryColors.chocolate};
  opacity: 0.45;
  letter-spacing: 0.02em;
  white-space: nowrap;

  ${media.belowMd} {
    font-size: 1rem;
  }
`;
