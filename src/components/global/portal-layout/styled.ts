import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, media, spacing } from '@/theme';
import { brandColors } from '@/theme/brand';

export const Layout = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  background: ${brandColors.ivory};
  font-family: ${fontFamily.body};
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
  border-bottom: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
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
  border: 1px solid ${brandColors.tan};
  border-radius: 10px;
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s ease;

  &:hover {
    background: ${brandColors.pink500};
    color: ${brandColors.white};
    border-color: ${brandColors.pink500};
  }

  ${media.belowLg} {
    display: inline-flex;
  }
`;

export const TopBarCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`;

export const TopBarEyebrow = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${brandColors.gray600};
`;

export const TopBarTitle = styled.h2<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.02em;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RolePill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${brandColors.gray600};
  background: ${brandColors.gray100};
  border: 1px solid ${brandColors.tan};
  flex-shrink: 0;

  ${media.belowSm} {
    display: none;
  }
`;

export const TopBarTrailing = styled.div`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;
