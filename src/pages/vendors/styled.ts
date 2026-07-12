import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, spacing } from '@/theme';

export const PageWrap = styled.div<{ $palette: ThemePalette }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ $palette }) => $palette.background};
`;

export const Main = styled.main`
  flex: 1;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xxl} ${spacing.xl};

  ${media.belowMd} {
    padding: ${spacing.xl} ${spacing.md};
  }
`;

export const PageTitle = styled.h1<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.xl};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.h2};
  font-weight: 800;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.03em;
`;

export const SearchBar = styled.div`
  margin-bottom: ${spacing.xl};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

export const HeroBand = styled.section<{ $palette: ThemePalette }>`
  padding: clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem);
  background: ${({ $palette }) => $palette.gradientHero};
  border-bottom: 1px solid ${({ $palette }) => $palette.border};
`;

export const HeroCopy = styled.div`
  max-width: 640px;
  margin: 0 auto 2rem;
  text-align: center;
`;

export const HeroTitle = styled.h1<{ $palette: ThemePalette }>`
  margin: 0 0 0.75rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ $palette }) => $palette.text};
`;

export const HeroLead = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: 1.0625rem;
  color: ${({ $palette }) => $palette.textSecondary};
  line-height: 1.6;
`;

export const SearchWrap = styled.div`
  max-width: 560px;
  margin: 0 auto;
`;
