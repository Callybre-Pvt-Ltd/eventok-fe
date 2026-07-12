import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, media, spacing } from '@/theme';

export const Layout = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  background: ${({ $palette }) => $palette.background};
  font-family: ${fontFamily.body};
  overflow-x: hidden;
`;

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;
  padding: ${spacing.xl};
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  ${media.belowMd} {
    padding: ${spacing.md};
  }
`;

export const TopBar = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.xl};
  border-bottom: 1px solid ${({ $palette }) => $palette.border};
  background: ${({ $palette }) => $palette.glass};
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;

  ${media.belowMd} {
    padding: ${spacing.md};
  }
`;

export const MenuBtn = styled.button<{ $palette: ThemePalette }>`
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: 8px;
  background: ${({ $palette }) => $palette.surface};
  color: ${({ $palette }) => $palette.text};
  cursor: pointer;
  flex-shrink: 0;

  ${media.belowLg} {
    display: inline-flex;
  }
`;

export const TopBarTitle = styled.h2<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.02em;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
