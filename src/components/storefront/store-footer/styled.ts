import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const FooterRoot = styled.footer`
  width: 100%;
  background: var(--footer-bg);
  color: var(--footer-text);
  border-top: 1px solid var(--color-border);
  padding: 3.5rem 1rem 0;
  transition: background 0.25s ease, color 0.25s ease;

  ${media.lg} {
    padding: 4.5rem clamp(1rem, 3.5vw, 2.5rem) 0;
  }
`;

export const Inner = styled.div`
  max-width: 1440px;
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
  flex-shrink: 0;
  line-height: 0;
`;

export const BrandWord = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: var(--color-text);
`;

export const Tagline = styled.p`
  max-width: 24rem;
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: var(--color-text-secondary);
`;

export const Socials = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SocialButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${radii.full};
  background: var(--color-surface);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--color-primary);
    color: #ffffff;
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }
`;

export const Column = styled.div`
  display: grid;
  gap: 0.75rem;
  align-content: start;
`;

export const ColumnTitle = styled.h3`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
`;

export const ColumnLink = styled(Link)`
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

export const FooterLink = ColumnLink;

export const BottomBar = styled.div`
  margin-top: 3.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: ${fontSizes.xs};
  color: var(--color-text-muted);
`;

export const SubFooter = BottomBar;

export const SubInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: ${fontSizes.xs};
  color: var(--color-text-muted);
`;

export const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;
