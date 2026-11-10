import styled from 'styled-components';
import { media } from '@/theme';

export const Rail = styled.div`
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 1rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    scroll-snap-align: start;
    flex: 0 0 auto;
  }
`;

export const CardSlot = styled.div`
  width: 19rem;

  ${media.md} {
    width: 21rem;
  }

  ${media.lg} {
    width: 22.5rem;
  }
`;
