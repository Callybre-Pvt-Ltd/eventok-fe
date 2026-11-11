import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';
import { brandColors } from '@/theme/brand';

const inkNav = css`
  background: #0f172a;
  color: ${brandColors.white};
`;

export const Sidebar = styled.aside<{
  $palette: ThemePalette;
  $collapsed: boolean;
  $mobileOpen: boolean;
}>`
  width: ${({ $collapsed }) => ($collapsed ? '72px' : '252px')};
  height: 100vh;
  height: 100dvh;
  ${inkNav}
  border-right: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  font-family: ${fontFamily.body};
  position: sticky;
  top: 0;
  align-self: flex-start;
  flex-shrink: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);

  ${media.belowLg} {
    position: fixed;
    left: ${({ $mobileOpen }) => ($mobileOpen ? '0' : '-320px')};
    width: min(288px, 88vw);
    height: 100dvh;
    max-height: 100dvh;
    overflow-y: auto;
    z-index: 200;
    box-shadow: ${({ $mobileOpen }) => ($mobileOpen ? shadows.xl : 'none')};
    transition: left 0.3s ease;
  }
`;

export const SidebarHeader = styled.div<{ $palette: ThemePalette }>`
  position: relative;
  z-index: 1;
  padding: 1.35rem 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  gap: 0.5rem;
`;

export const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
`;

export const SidebarEyebrow = styled.span<{ $collapsed: boolean }>`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ea580c;
  white-space: nowrap;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  height: ${({ $collapsed }) => ($collapsed ? 0 : 'auto')};
  overflow: hidden;
  transition: opacity 0.2s;

  ${media.belowLg} {
    opacity: 1;
    height: auto;
  }
`;

export const SidebarLogo = styled(Link)<{ $palette: ThemePalette }>`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: ${brandColors.white};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: -0.03em;
  line-height: 1.1;

  span {
    color: #ea580c;
  }
`;

export const CollapseBtn = styled.button<{ $palette: ThemePalette }>`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${radii.sm};
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    color: ${brandColors.white};
    border-color: #ea580c;
    background: rgba(234, 88, 12, 0.15);
  }

  ${media.belowLg} {
    display: none;
  }
`;

export const NavList = styled.nav`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 0.85rem 0.55rem;
  gap: 4px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const NavItem = styled(Link)<{
  $palette: ThemePalette;
  $active?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.8rem;
  border-radius: ${radii.md};
  text-decoration: none;
  color: ${({ $active }) =>
    $active ? '#ffffff' : 'rgba(255, 255, 255, 0.72)'};
  background: ${({ $active }) => ($active ? '#ea580c' : 'transparent')};
  font-size: ${fontSizes.sm};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  transition: background 0.18s ease, color 0.18s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? '#ea580c' : 'rgba(255, 255, 255, 0.08)'};
    color: #ffffff;
  }
`;

export const NavLabel = styled.span<{ $collapsed: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  width: ${({ $collapsed }) => ($collapsed ? 0 : 'auto')};
  transition: opacity 0.2s;

  ${media.belowLg} {
    opacity: 1;
    width: auto;
  }
`;

export const SidebarFooter = styled.div<{ $palette: ThemePalette }>`
  position: relative;
  z-index: 1;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
`;

export const BackToSiteLink = styled(Link)<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.65rem 0.75rem;
  border: 1px solid rgba(234, 88, 12, 0.35);
  border-radius: ${radii.md};
  background: rgba(234, 88, 12, 0.12);
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(234, 88, 12, 0.22);
    border-color: #ea580c;
  }
`;

export const LogoutBtn = styled.button<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${radii.md};
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.72);
  font-size: ${fontSizes.sm};
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(234, 88, 12, 0.15);
    border-color: rgba(234, 88, 12, 0.4);
    color: ${brandColors.white};
  }
`;

export const Overlay = styled.div<{
  $palette: ThemePalette;
  $visible: boolean;
}>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  background: ${({ $palette }) => $palette.overlay};
  z-index: 199;
  backdrop-filter: blur(4px);

  ${media.lg} {
    display: none;
  }
`;
