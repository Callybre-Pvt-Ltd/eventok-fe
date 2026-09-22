import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors } from '@/theme/brand';
import { fontSizes, media, radii, shadows } from '@/theme';

export const NavBar = styled.nav`
  position: relative;
  background: ${brandColors.white};
  border-bottom: 1px solid ${brandColors.tan};
  overflow: visible;

  ${media.belowLg} {
    display: none;
  }
`;

export const NavScroller = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  padding: 0 1rem;
  scroll-padding-left: 1rem;

  ${media.belowSm} {
    gap: 1.1rem;
    padding: 0 0.625rem;
  }
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.lg} {
    padding: 0 2.5rem;
    gap: 2rem;
    overflow-x: visible;
  }
`;

export const NavGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover > div {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

export const NavTrigger = styled(Link)<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.875rem 0;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
  color: ${({ $active }) =>
    $active ? brandColors.pink500 : brandColors.chocolate};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? brandColors.pink500 : 'transparent')};

  &:hover {
    color: ${brandColors.pink500};
  }
`;

export const Flyout = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 30;
  min-width: 16rem;
  padding: 0.75rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  box-shadow: ${shadows.lg};
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.18s ease, transform 0.18s ease;
  display: grid;
  gap: 0.125rem;
`;

export const FlyoutLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.625rem;
  border-radius: ${radii.sm};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.chocolate};
  text-decoration: none;

  &:hover {
    background: ${brandColors.pink100};
    color: ${brandColors.pink500};
  }
`;

export const FlyoutCount = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray400};
`;
