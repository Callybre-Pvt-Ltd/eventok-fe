import styled from 'styled-components';
import { brandColors } from '@/theme/brand';

export const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  background: ${brandColors.white};
`;

export const Main = styled.main`
  flex: 1 1 auto;
`;
