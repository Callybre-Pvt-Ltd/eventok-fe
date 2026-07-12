import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { ColorTokens } from '../../tokens/colors';
import { container, radii, space, zIndex } from '../../tokens/spacing';
import { media } from '../../tokens/layout';
import { brandRgb } from '@/theme/brand';

const c = brandRgb.charcoal;

export const Bar = styled.header<{ $colors: ColorTokens; $shrunk: boolean }>`
  position: fixed;
  top: ${space[4]};
  left: 50%;
  transform: translateX(-50%);
  z-index: ${zIndex.nav};
  width: calc(100% - ${space[8]});
  max-width: ${container.wide};
  border-radius: ${radii['2xl']};
  background: ${({ $colors }) => $colors.bgGlass};
  backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid ${({ $colors }) => $colors.borderSubtle};
  transition: padding 0.3s ease, box-shadow 0.3s ease;
  padding-block: ${({ $shrunk }) => ($shrunk ? space[2] : space[3])};
  box-shadow: ${({ $shrunk }) =>
    $shrunk ? `0 8px 32px rgba(${c}, 0.08)` : `0 4px 20px rgba(${c}, 0.04)`};
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: ${space[5]};
  gap: ${space[4]};
`;

export const Logo = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Links = styled.nav`
  display: none;
  gap: ${space[6]};
  ${media.lg} {
    display: flex;
  }
`;

export const NavLink = styled(Link)<{ $active: boolean; $colors: ColorTokens }>`
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  color: ${({ $active, $colors }) =>
    $active ? $colors.brand[600] : $colors.textSecondary};
  transition: color 0.2s;

  &:hover {
    color: ${({ $colors }) => $colors.textPrimary};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${space[2]};
`;

export const MenuBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: inherit;
  border-radius: ${radii.full};

  ${media.lg} {
    &:last-child {
      display: none;
    }
  }
`;

export const Drawer = styled.div<{ $open: boolean; $colors: ColorTokens }>`
  position: fixed;
  inset: 0;
  top: 80px;
  z-index: ${zIndex.overlay};
  background: ${({ $colors }) => $colors.bgElevated};
  padding: ${space[6]};
  display: flex;
  flex-direction: column;
  gap: ${space[4]};
  transform: translateY(${({ $open }) => ($open ? '0' : '-100%')});
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: transform 0.35s ease, opacity 0.35s ease;

  ${media.lg} {
    display: none;
  }
`;

export const DrawerLink = styled(Link)`
  font-size: 1.125rem;
  font-weight: 500;
  text-decoration: none;
  color: inherit;
  padding: ${space[3]} 0;
`;
