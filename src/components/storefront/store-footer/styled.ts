import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const FooterRoot = styled.footer`
  background: ${brandColors.ink900};
  color: ${brandColors.white};
  padding: 3rem 1rem 0;

  ${media.lg} {
    padding: 4rem 2.5rem 0;
  }
`;

export const Inner = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: 1.6fr repeat(4, 1fr);
    gap: 2rem;
  }
`;

export const BrandBlock = styled.div`
  display: grid;
  gap: 1rem;
  align-content: start;
`;

export const BrandRow = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

export const BrandMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${radii.md};
  background: ${brandColors.accent500};
  color: ${brandColors.white};
  font-family: ${fontFamily.display};
  font-weight: 800;
  font-size: ${fontSizes.sm};
`;

export const BrandWord = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: ${brandColors.white};
`;

export const Tagline = styled.p`
  max-width: 24rem;
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.gray400};
`;

export const Socials = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SocialButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${radii.full};
  background: rgba(${brandRgb.white}, 0.08);
  color: ${brandColors.white};

  &:hover {
    background: ${brandColors.pink500};
  }
`;

export const Column = styled.div`
  display: grid;
  gap: 0.75rem;
  align-content: start;
`;

export const ColumnTitle = styled.h3`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${brandColors.white};
`;

export const ColumnLink = styled(Link)`
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.gray400};
  text-decoration: none;

  &:hover {
    color: ${brandColors.pink400};
  }
`;

export const BottomBar = styled.div`
  margin-top: 2.5rem;
  padding: 1.25rem 0;
  border-top: 1px solid rgba(${brandRgb.white}, 0.08);
  text-align: center;
  font-size: ${fontSizes.xs};
  font-weight: 500;
  color: ${brandColors.gray600};
`;
