import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, radii } from '@/theme';

export const MenuRoot = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const MenuButton = styled.button<{
  $tone: 'dark' | 'light';
  $compact?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $compact }) =>
    $compact ? '0' : '0.2rem 0.55rem 0.2rem 0.2rem'};
  border: none;
  border-radius: ${radii.full};
  background: transparent;
  color: ${({ $tone }) =>
    $tone === 'dark' ? brandColors.white : brandColors.chocolate};
  cursor: pointer;
  font: inherit;
`;

export const AvatarImage = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${radii.full};
  flex-shrink: 0;
  object-fit: cover;
  display: block;
`;

export const AvatarCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  flex-shrink: 0;
  font-family: ${fontFamily.body};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  user-select: none;
`;

export const AvatarMeta = styled.span`
  display: none;
`;

export const AvatarName = styled.span``;
export const AvatarRole = styled.span``;

export const MenuPanel = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 80;
  min-width: 13.5rem;
  padding: 0.4rem;
  border-radius: 0.9rem;
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  box-shadow: 0 16px 40px rgba(10, 10, 10, 0.18);
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  font-family: ${fontFamily.body};
`;

export const MenuEmail = styled.p`
  margin: 0;
  padding: 0.55rem 0.75rem 0.15rem;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  word-break: break-all;
  color: ${brandColors.chocolate};
`;

export const MenuRole = styled.p`
  margin: 0 0 0.35rem;
  padding: 0 0.75rem 0.45rem;
  font-size: 0.7rem;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${brandColors.pink600};
`;

export const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  padding: 0.65rem 0.75rem;
  border-radius: 0.65rem;
  color: ${brandColors.chocolate};
  font-size: ${fontSizes.sm};
  font-weight: 650;
  text-decoration: none;

  &:hover {
    background: ${brandColors.pink50};
    color: ${brandColors.pink600};
  }
`;

export const MenuItemButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: none;
  border-radius: 0.65rem;
  background: transparent;
  color: ${brandColors.chocolate};
  font: inherit;
  font-size: ${fontSizes.sm};
  font-weight: 650;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${brandColors.pink50};
    color: ${brandColors.pink600};
  }
`;

export const MenuDivider = styled.hr`
  margin: 0.25rem 0.35rem;
  border: none;
  border-top: 1px solid rgba(${brandRgb.chocolate}, 0.08);
`;
