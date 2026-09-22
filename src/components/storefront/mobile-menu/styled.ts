import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(${brandRgb.ink}, 0.5);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity 0.25s ease, visibility 0.25s ease;

  ${media.lg} {
    display: none;
  }
`;

export const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  width: min(20rem, 86vw);
  display: flex;
  flex-direction: column;
  background: ${brandColors.white};
  box-shadow: ${shadows.xl};
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  overflow-y: auto;
  overscroll-behavior: contain;

  ${media.lg} {
    display: none;
  }
`;

export const DrawerHead = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  background: ${brandColors.ink900};
  color: ${brandColors.white};
`;

export const DrawerTitle = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  font-weight: 800;
  letter-spacing: 0.04em;
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: ${radii.full};
  background: rgba(${brandRgb.white}, 0.12);
  color: ${brandColors.white};
  cursor: pointer;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid ${brandColors.tan};

  &:last-child {
    border-bottom: none;
  }
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 0.75rem;
  border-radius: ${radii.md};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.chocolate};
  text-decoration: none;

  &:hover {
    background: ${brandColors.pink50};
    color: ${brandColors.pink500};
  }
`;

export const MenuCount = styled.span`
  margin-left: auto;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${brandColors.gray400};
`;

export const SubLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.55rem 0.75rem 0.55rem 1.5rem;
  border-radius: ${radii.md};
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.gray600};
  text-decoration: none;

  &:hover {
    background: ${brandColors.pink50};
    color: ${brandColors.pink500};
  }
`;
