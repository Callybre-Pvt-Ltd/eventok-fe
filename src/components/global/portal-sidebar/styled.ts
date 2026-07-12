import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Sidebar = styled.aside<{
  $palette: ThemePalette;
  $collapsed: boolean;
  $mobileOpen: boolean;
}>`
  width: ${({ $collapsed }) => ($collapsed ? '68px' : '240px')};
  min-height: 100vh;
  min-height: 100dvh;
  background: ${({ $palette }) => $palette.surface};
  border-right: 1px solid ${({ $palette }) => $palette.border};
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  font-family: ${fontFamily.body};
  position: sticky;
  top: 0;
  flex-shrink: 0;

  ${media.belowLg} {
    position: fixed;
    left: ${({ $mobileOpen }) => ($mobileOpen ? '0' : '-300px')};
    width: min(280px, 85vw);
    height: 100dvh;
    max-height: 100dvh;
    overflow: hidden;
    z-index: 200;
    box-shadow: ${({ $mobileOpen }) => ($mobileOpen ? shadows.xl : 'none')};
    transition: left 0.3s ease;
  }
`;

export const SidebarHeader = styled.div<{ $palette: ThemePalette }>`
  padding: 1.25rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ $palette }) => $palette.border};
  flex-shrink: 0;
`;

export const SidebarLogo = styled(Link)<{ $palette: ThemePalette }>`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  background: ${({ $palette }) => $palette.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: -0.03em;
`;

export const CollapseBtn = styled.button<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.backgroundAlt};
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: ${radii.sm};
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $palette }) => $palette.textMuted};
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $palette }) => $palette.primary};
    border-color: ${({ $palette }) => $palette.primary}40;
  }

  ${media.belowLg} {
    display: none;
  }
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0.5rem;
  gap: 2px;
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
  padding: 0.625rem 0.75rem;
  border-radius: ${radii.md};
  text-decoration: none;
  color: ${({ $palette, $active }) =>
    $active ? $palette.primary : $palette.textSecondary};
  background: ${({ $palette, $active }) =>
    $active ? $palette.primaryLight : 'transparent'};
  font-size: ${fontSizes.sm};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $palette }) => $palette.primaryLight};
    color: ${({ $palette }) => $palette.primary};
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
  padding: 1rem;
  border-top: 1px solid ${({ $palette }) => $palette.border};
  flex-shrink: 0;
`;

export const LogoutBtn = styled.button<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: none;
  border-radius: ${radii.md};
  background: transparent;
  color: ${({ $palette }) => $palette.textMuted};
  font-size: ${fontSizes.sm};
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $palette }) => $palette.error}10;
    color: ${({ $palette }) => $palette.error};
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
