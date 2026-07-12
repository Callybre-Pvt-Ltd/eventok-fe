import styled from 'styled-components';
import { luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const FeaturesSection = styled.section`
  background: ${luxuryColors.ivory};
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2.5rem);
  margin-top: -1px;
`;

export const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1.5rem, 3vw, 2.5rem);

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const FeatureItem = styled.div`
  text-align: center;
`;

export const FeatureIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
  border-radius: 50%;
  background: ${luxuryColors.cream};
  color: ${luxuryColors.brown};
`;

export const FeatureName = styled.h3`
  margin: 0 0 0.5rem;
  font-family: ${fontFamily.display};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${luxuryColors.chocolate};
`;

export const FeatureDesc = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.65;
  color: ${luxuryColors.brown};
  opacity: 0.75;
`;
