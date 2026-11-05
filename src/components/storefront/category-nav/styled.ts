import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontSizes, media, radii } from '@/theme';

export const NavBar = styled.nav`
  position: relative;
  width: 100%;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  overflow: visible;
  transition: background 0.25s ease, border-color 0.25s ease;
  z-index: 10;

  [data-theme='light'] & {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(124, 58, 237, 0.08);
  }

  [data-theme='dark'] & {
    background: rgba(10, 13, 24, 0.95);
    border-color: rgba(255, 255, 255, 0.08);
  }
`;

export const NavScroller = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1.25rem;
  padding: 0 clamp(1rem, 3.5vw, 2.5rem);
  max-width: 1440px;
  margin: 0 auto;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.lg} {
    gap: 2rem;
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
    $active ? 'var(--color-primary)' : 'var(--color-text)'};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? 'var(--color-primary)' : 'transparent')};
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: var(--color-primary);
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
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 12px 32px var(--color-shadow-strong);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.18s ease, transform 0.18s ease;
  display: grid;
  gap: 0.125rem;

  [data-theme='light'] & {
    background: #FFFFFF;
    border-color: rgba(124, 58, 237, 0.12);
    box-shadow: 0 16px 40px rgba(99, 102, 241, 0.12);
  }

  [data-theme='dark'] & {
    background: #141A32;
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  }
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
  color: var(--color-text);
  text-decoration: none;

  &:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }
`;

export const FlyoutCount = styled.span`
  font-size: ${fontSizes.xs};
  color: var(--color-text-muted);
`;
