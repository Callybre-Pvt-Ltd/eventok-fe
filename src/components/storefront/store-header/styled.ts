import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const HeaderRoot = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
`;

export const TopAnnouncementBar = styled.div`
  display: none;
`;

export const MainBar = styled.div`
  position: relative;
  z-index: 20;
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
    background: var(--color-bg);
    border-color: var(--color-border);
    box-shadow: inset 0 1px 2px rgba(60, 42, 25, 0.04);
  }

  [data-theme='dark'] & {
    background: var(--color-surface);
    border-color: var(--color-border);
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
  background: var(--color-primary);
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--color-primary-hover);
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
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 2px 6px var(--button-primary-shadow);
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }
`;

export const LoginLabel = styled.span`
  display: none;

  ${media.md} {
    display: inline;
  }
`;
