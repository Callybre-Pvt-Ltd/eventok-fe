import styled from 'styled-components';

export const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  width: 100%;
  background: var(--color-bg);
  color: var(--color-text);
  overflow-x: clip;
`;

export const Main = styled.main`
  flex: 1 1 auto;
  width: 100%;
`;
