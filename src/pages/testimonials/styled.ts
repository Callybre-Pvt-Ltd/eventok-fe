import styled from 'styled-components';
import type { ThemePalette } from '@/theme';

export const PageWrap = styled.div<{ $palette: ThemePalette }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ $palette }) => $palette.background};
`;

export const Main = styled.main`
  flex: 1;
`;
