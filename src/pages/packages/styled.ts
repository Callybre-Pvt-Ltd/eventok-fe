import styled from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const Page = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  padding: 1.5rem 1rem 1rem;

  ${media.lg} {
    padding: 2rem 2.5rem 1rem;
  }
`;

export const Title = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: ${brandColors.chocolate};
`;
