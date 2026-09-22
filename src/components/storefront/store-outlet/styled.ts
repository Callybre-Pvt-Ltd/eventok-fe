import styled from 'styled-components';
import { media } from '@/theme';

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;

  ${media.lg} {
    padding: 2rem 2.5rem 4rem;
  }
`;
