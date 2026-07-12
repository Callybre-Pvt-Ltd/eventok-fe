export * from '@/components/ui/portal-primitives/styled';
import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { spacing } from '@/theme';

export const PendingPage = styled.div<{ $palette: ThemePalette }>`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: ${({ $palette }) => $palette.background};
  overflow-x: hidden;
`;

export const PendingContent = styled.div`
  flex: 1;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, ${spacing.xl});
  box-sizing: border-box;
`;
