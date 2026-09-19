import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, media, spacing } from '@/theme';
import { brandColors, brandGradients, brandRgb } from '@/theme/brand';

export const Layout = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  background:
    radial-gradient(
      70% 50% at 100% 0%,
      rgba(${brandRgb.pink}, 0.12) 0%,
      transparent 55%
    ),
    linear-gradient(180deg, ${brandColors.pink50} 0%, ${brandColors.ivory} 42%, ${brandColors.white} 100%);
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
  border-bottom: 1px solid rgba(${brandRgb.pink}, 0.12);
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 0 rgba(${brandRgb.pink}, 0.06);

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
  border: 1px solid rgba(${brandRgb.pink}, 0.2);
  border-radius: 10px;
  background: ${brandColors.pink100};
  color: ${brandColors.pink600};
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
  color: ${brandColors.pink500};
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
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${brandColors.pink600};
  background: ${brandGradients.celebration};
  border: 1px solid rgba(${brandRgb.pink}, 0.22);
  flex-shrink: 0;

  ${media.belowSm} {
    display: none;
  }
`;
