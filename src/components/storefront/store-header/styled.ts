import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
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
  background: ${brandColors.ink900};

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
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${radii.md};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-family: ${fontFamily.display};
  font-weight: 800;
  font-size: ${fontSizes.sm};
`;

export const BrandWord = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  letter-spacing: 0.04em;
  color: ${brandColors.white};
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
  border: 1px solid rgba(${brandRgb.white}, 0.18);
  background: transparent;
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  ${media.lg} {
    display: inline-flex;
  }

  &:hover {
    border-color: ${brandColors.pink500};
  }
`;

export const SearchForm = styled.form`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.25rem 0.25rem 1rem;
  background: ${brandColors.white};
  border-radius: ${radii.full};
`;

export const SearchIcon = styled.span`
  display: inline-flex;
  color: ${brandColors.gray400};
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
  color: ${brandColors.chocolate};

  &::placeholder {
    color: ${brandColors.gray400};
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
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  cursor: pointer;

  &:hover {
    background: ${brandColors.pink600};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 auto;
`;

export const VendorLink = styled(Link)`
  display: none;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.white};
  text-decoration: none;
  white-space: nowrap;

  ${media.xl} {
    display: inline;
  }

  &:hover {
    color: ${brandColors.pink400};
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
  color: ${brandColors.white};
  text-decoration: none;

  &:hover {
    background: rgba(${brandRgb.white}, 0.1);
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  min-width: 1.1rem;
  height: 1.1rem;
  padding: 0 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: 0.625rem;
  font-weight: 800;
`;

export const LoginButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1.125rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: ${brandColors.pink600};
  }
`;

export const LoginLabel = styled.span`
  display: none;

  ${media.md} {
    display: inline;
  }
`;
