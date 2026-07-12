import styled, { keyframes } from 'styled-components';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

const hoverFine = `@media (hover: hover) and (pointer: fine)`;
const reduceMotion = `@media (prefers-reduced-motion: reduce)`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 8px 28px rgba(201, 162, 39, 0.28); }
  50% { box-shadow: 0 12px 36px rgba(201, 162, 39, 0.45); }
`;

export const NavRoot = styled.header<{
  $scrolled?: boolean;
  $overlay?: boolean;
}>`
  position: ${({ $overlay }) => ($overlay ? 'fixed' : 'sticky')};
  top: 0;
  left: 0;
  right: 0;
  z-index: 120;
  width: 100%;
  padding: ${({ $scrolled }) => ($scrolled ? '0.4rem' : '1rem')}
    max(1rem, env(safe-area-inset-right, 0px))
    ${({ $scrolled }) => ($scrolled ? '0.4rem' : '1rem')}
    max(1rem, env(safe-area-inset-left, 0px));
  padding-top: max(
    ${({ $scrolled }) => ($scrolled ? '0.4rem' : '1rem')},
    env(safe-area-inset-top, 0px)
  );
  transition: padding 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease,
    border-color 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(255, 252, 250, 0.92)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? 'blur(20px) saturate(1.15)' : 'blur(0px)'};
  border-bottom: 1px solid
    ${({ $scrolled }) =>
      $scrolled ? `rgba(${brandRgb.chocolate}, 0.08)` : 'transparent'};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 10px 40px rgba(28, 25, 23, 0.06)' : 'none'};

  /* Instant size change on mobile so sticky filters stay flush under the nav */
  ${media.belowLg} {
    padding-top: max(0.5rem, env(safe-area-inset-top, 0px));
    padding-bottom: 0.5rem;
    padding-left: max(1rem, env(safe-area-inset-left, 0px));
    padding-right: max(1rem, env(safe-area-inset-right, 0px));
    transition: background 0.25s ease, border-color 0.25s ease,
      box-shadow 0.25s ease, backdrop-filter 0.25s ease;
  }
`;

export const NavInner = styled.div<{ $scrolled?: boolean }>`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  min-height: ${({ $scrolled }) => ($scrolled ? '3.25rem' : '4rem')};
  transition: min-height 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  ${media.belowLg} {
    min-height: 3.25rem;
    transition: none;
  }
`;

export const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.display};
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  z-index: 2;
`;

export const BrandMark = styled.span<{ $scrolled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $scrolled }) => ($scrolled ? '2.1rem' : '2.5rem')};
  height: ${({ $scrolled }) => ($scrolled ? '2.1rem' : '2.5rem')};
  border-radius: 0.75rem;
  background: linear-gradient(
    145deg,
    #e8c547 0%,
    ${brandColors.gold} 55%,
    #a8841a 100%
  );
  color: ${brandColors.chocolate};
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), width 0.4s ease,
    height 0.4s ease;

  ${hoverFine} {
    ${Brand}:hover & {
      transform: rotate(-8deg) scale(1.06);
    }
  }

  ${reduceMotion} {
    transition: none;
  }
`;

export const CenterNav = styled.nav`
  display: none;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;

  ${media.lg} {
    display: flex;
  }
`;

export const NavItem = styled(RouterNavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: ${brandColors.brown};
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: color 0.3s ease, transform 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0.55rem;
    width: 0;
    height: 1.5px;
    border-radius: 9999px;
    background: ${brandColors.gold};
    transform: translateX(-50%);
    transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  ${hoverFine} {
    &:hover {
      color: ${brandColors.gold};
      transform: translateY(-2px);
    }

    &:hover::after {
      width: 1.25rem;
    }
  }

  &.active {
    color: ${brandColors.gold};
    font-weight: 600;
  }

  &.active::after {
    width: 1.25rem;
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 3px;
    border-radius: 0.5rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  z-index: 2;
`;

export const ConsultCta = styled(Link)`
  display: none;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 48px;
  padding: 0 1.25rem;
  border-radius: 9999px;
  text-decoration: none;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  background: linear-gradient(
    135deg,
    #efd36a 0%,
    ${brandColors.gold} 48%,
    #b8921f 100%
  );
  box-shadow: 0 8px 28px rgba(201, 162, 39, 0.28);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease;

  svg {
    transition: transform 0.35s ease;
  }

  ${media.lg} {
    display: inline-flex;
  }

  ${hoverFine} {
    &:hover {
      transform: translateY(-2px) scale(1.03);
      animation: ${glowPulse} 1.6s ease-in-out infinite;
    }

    &:hover svg {
      transform: translateX(3px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.chocolate};
    outline-offset: 3px;
  }

  ${reduceMotion} {
    animation: none;
  }
`;

export const MenuToggle = styled.button<{ $open?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  min-width: 48px;
  min-height: 48px;
  border: none;
  border-radius: 50%;
  background: ${({ $open }) =>
    $open ? brandColors.chocolate : 'rgba(42, 37, 34, 0.05)'};
  color: ${({ $open }) => ($open ? brandColors.white : brandColors.chocolate)};
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;

  ${media.lg} {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const MobileOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 130;
  background: rgba(${brandRgb.chocolate}, 0.55);
  backdrop-filter: blur(16px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity 0.35s ease, visibility 0.35s ease;

  ${media.lg} {
    display: none;
  }
`;

export const MobilePanel = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 131;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    165deg,
    rgba(42, 37, 34, 0.96) 0%,
    rgba(42, 37, 34, 0.99) 100%
  );
  color: ${brandColors.white};
  padding: max(1rem, env(safe-area-inset-top, 0px))
    max(1.25rem, env(safe-area-inset-right, 0px))
    max(1rem, env(safe-area-inset-bottom, 0px))
    max(1.25rem, env(safe-area-inset-left, 0px));
  transform: translateY(${({ $open }) => ($open ? '0' : '6%')});
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease,
    visibility 0.35s ease;

  ${media.lg} {
    display: none;
  }
`;

export const MobileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4rem;
  padding-bottom: 0.5rem;

  ${Brand} {
    color: ${brandColors.white};
  }
`;

export const MobileClose = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  min-width: 48px;
  min-height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: ${brandColors.white};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const MobileLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  padding: 1.75rem 0 1rem;
  overflow-y: auto;
`;

export const MobileLink = styled(Link)`
  display: flex;
  align-items: center;
  min-height: 64px;
  padding: 0.85rem 0.15rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.94);
  font-family: ${fontFamily.display};
  font-size: clamp(1.75rem, 7.5vw, 2.35rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: color 0.25s ease;

  &:hover,
  &:focus-visible {
    color: ${brandColors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 4px;
    border-radius: 0.35rem;
  }
`;

export const MobileFoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding-top: 0.75rem;
`;

export const MobileCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  min-height: 56px;
  border-radius: 9999px;
  text-decoration: none;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 1rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    #efd36a 0%,
    ${brandColors.gold} 48%,
    #b8921f 100%
  );
  box-shadow: 0 12px 32px rgba(201, 162, 39, 0.32);

  &:focus-visible {
    outline: 2px solid ${brandColors.white};
    outline-offset: 3px;
  }
`;
