import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const HeaderRoot = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
`;

export const MainBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  transition: background 0.25s ease, border-color 0.25s ease;

  ${media.belowSm} {
    gap: 0.375rem;
    padding: 0.5rem 0.625rem;
  }

  ${media.lg} {
    gap: 1.25rem;
    padding: 0.75rem 2.5rem;
  }

  [data-theme='light'] & {
    background: rgba(255, 255, 255, 0.94);
    border-color: rgba(124, 58, 237, 0.08);
    backdrop-filter: blur(12px);
  }

  [data-theme='dark'] & {
    background: rgba(10, 13, 24, 0.94);
    border-color: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
  }
`;

export const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex: 0 0 auto;
`;

export const BrandMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
`;

export const BrandWord = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--color-text);
  display: none;

  ${media.md} {
    display: inline;
  }
`;

export const LocationChip = styled.button`
  display: none;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: ${radii.full};
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  color: var(--color-text);
  font-size: ${fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  ${media.lg} {
    display: inline-flex;
  }

  &:hover {
    border-color: var(--color-primary);
  }
`;

export const SearchForm = styled.form`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.25rem 0.25rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.full};

  [data-theme='light'] & {
    background: #FFFFFF;
    border-color: rgba(226, 232, 240, 0.9);
    box-shadow: 0 2px 10px rgba(99, 102, 241, 0.04);
  }

  [data-theme='dark'] & {
    background: #141A32;
    border-color: rgba(255, 255, 255, 0.1);
  }

  ${media.belowSm} {
    gap: 0.25rem;
    padding: 0.2rem 0.2rem 0.2rem 0.7rem;
  }
`;

export const SearchIcon = styled.span`
  display: inline-flex;
  color: var(--color-text-muted);
  flex: 0 0 auto;
`;

export const SearchInput = styled.input`
  flex: 1 1 auto;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: var(--color-text);

  &::placeholder {
    color: var(--color-text-muted);
    font-weight: 500;
  }
`;

export const SearchSubmit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex: 0 0 auto;
  border: none;
  border-radius: ${radii.full};
  background: var(--button-primary-gradient);
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: scale(1.04);
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 auto;

  ${media.belowSm} {
    gap: 0.125rem;
  }
`;

export const VendorLink = styled(Link)`
  display: none;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  white-space: nowrap;

  ${media.xl} {
    display: inline;
  }

  &:hover {
    color: var(--color-primary);
  }
`;

export const VendorButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;

  ${media.xl} {
    display: inline;
  }

  &:hover {
    color: var(--color-primary);
  }
`;

export const MobileOnly = styled.div`
  display: inline-flex;

  ${media.lg} {
    display: none;
  }
`;

export const DesktopOnly = styled.div`
  display: none;

  ${media.lg} {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: ${radii.full};
  background: var(--color-bg-alt);
  color: var(--color-text);
  cursor: pointer;

  &:hover {
    background: var(--color-primary);
    color: #ffffff;
  }
`;

export const IconLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${radii.full};
  color: var(--color-text);
  text-decoration: none;

  ${media.belowSm} {
    width: 2.125rem;
    height: 2.125rem;
  }

  &:hover {
    background: var(--color-bg-alt);
    color: var(--color-primary);
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  min-width: 1.1rem;
  height: 1.1rem;
  padding: 0 0.25rem;

  ${media.belowLg} {
    top: 0.15rem;
    right: 0.1rem;
    min-width: 0.85rem;
    height: 0.85rem;
    padding: 0 0.15rem;
    font-size: 0.5rem;
    line-height: 1;
  }
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: 0.625rem;
  font-weight: 800;
`;

export const LoginButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1.125rem;
  border-radius: ${radii.full};
  background: var(--button-primary-gradient);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 4px 14px var(--button-primary-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px var(--button-primary-shadow);
  }
`;

export const LoginLabel = styled.span`
  display: none;

  ${media.md} {
    display: inline;
  }
`;
