import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii } from '@/theme';

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
  width: min(22rem, 88vw);
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border-left: 1px solid var(--color-border);
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-bottom: max(1.5rem, env(safe-area-inset-bottom, 16px));

  ${media.lg} {
    display: none;
  }
`;

export const DrawerHead = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.15rem;
  background: ${brandColors.ink900};
  color: ${brandColors.white};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const DrawerTitle = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #ffffff;
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  min-width: 44px;
  min-height: 44px;
  border: none;
  border-radius: ${radii.full};
  background: rgba(${brandRgb.white}, 0.15);
  color: ${brandColors.white};
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: rgba(${brandRgb.white}, 0.25);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.1rem;
  background: var(--color-bg-alt);
  border-bottom: 1px solid var(--color-border);
`;

export const UserAvatar = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  font-weight: 800;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

export const UserName = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserEmail = styled.span`
  font-size: ${fontSizes.xs};
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.5rem;
  border-radius: ${radii.full};
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: var(--color-primary-light);
  color: var(--color-primary);
  margin-top: 0.25rem;
  align-self: flex-start;
  border: 1px solid rgba(234, 88, 12, 0.2);
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.6rem 0.5rem;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

export const SectionEyebrow = styled.div`
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  padding: 0.4rem 0.75rem 0.25rem;
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.85rem;
  min-height: 44px;
  border-radius: ${radii.md};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;

  svg {
    flex-shrink: 0;
    color: var(--color-text-secondary);
    transition: color 0.15s ease;
  }

  &:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);

    svg {
      color: var(--color-primary);
    }
  }

  &:active {
    background: var(--color-primary-light);
  }
`;

export const PortalCardLink = styled(Link)<{ $variant?: 'admin' | 'vendor' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 0.95rem;
  min-height: 48px;
  margin: 0.25rem 0.5rem;
  border-radius: ${radii.lg};
  text-decoration: none;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  background: ${({ $variant }) =>
    $variant === 'admin' ? '#0f172a' : 'var(--color-primary)'};
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.15s ease, opacity 0.15s ease;

  &:hover {
    opacity: 0.95;
    color: #ffffff;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const PortalLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

export const MenuAction = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.75rem 0.85rem;
  min-height: 44px;
  border-radius: ${radii.md};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: var(--color-text);
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease;

  svg {
    flex-shrink: 0;
    color: var(--color-text-secondary);
    transition: color 0.15s ease;
  }

  &:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);

    svg {
      color: var(--color-primary);
    }
  }

  &:active {
    background: var(--color-primary-light);
  }
`;

export const MenuCount = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.5rem;
  border-radius: ${radii.full};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  background: var(--color-primary);
  color: #ffffff;
`;

export const AccordionHeader = styled.button<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 0.85rem;
  min-height: 44px;
  border: none;
  background: transparent;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
  text-align: left;
  border-radius: ${radii.md};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  svg {
    transition: transform 0.2s ease;
    transform: ${({ $expanded }) =>
      $expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    color: var(--color-text-secondary);
  }

  &:hover {
    background: var(--color-bg-alt);
    color: var(--color-primary);

    svg {
      color: var(--color-primary);
    }
  }
`;

export const AccordionBody = styled.div<{ $expanded: boolean }>`
  display: ${({ $expanded }) => ($expanded ? 'flex' : 'none')};
  flex-direction: column;
  padding-left: 0.75rem;
  margin-top: 0.15rem;
  margin-bottom: 0.35rem;
`;

export const SubLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.55rem 0.85rem 0.55rem 1.25rem;
  min-height: 40px;
  border-radius: ${radii.md};
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }
`;

export const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 0.85rem 0.55rem 1.25rem;
  min-height: 40px;
  border-radius: ${radii.md};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.75rem 0.85rem;
  min-height: 44px;
  border-radius: ${radii.md};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: #dc2626;
  text-align: left;
  transition: background 0.15s ease;

  svg {
    color: #dc2626;
  }

  &:hover {
    background: #fef2f2;
  }

  &:active {
    background: #fee2e2;
  }
`;
