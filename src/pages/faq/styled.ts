import styled from 'styled-components';
import { palette, fontSizes, media } from '@/theme';

export const PageWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${palette.background};
`;

export const Main = styled.main`
  flex: 1;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  ${media.belowMd} {
    padding: 32px 16px;
  }
`;

export const PageTitle = styled.h1`
  margin: 0 0 16px;
  font-size: ${fontSizes.h3};
  font-weight: 600;
  color: ${palette.text};
`;

export const PageText = styled.p`
  margin: 0;
  font-size: ${fontSizes.md};
  color: ${palette.textMuted};
  line-height: 1.7;
  max-width: 720px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

export const Card = styled.div`
  background: ${palette.surface};
  border-radius: 16px;
  border: 1px solid ${palette.border};
  overflow: hidden;
  box-shadow: 0 2px 8px ${palette.shadow};
`;

export const CardImage = styled.div<{ $url?: string }>`
  height: 160px;
  background: ${({ $url }) =>
    $url ? `url(${$url}) center/cover` : palette.primaryLight};
`;

export const CardBody = styled.div`
  padding: 16px;
`;

export const CardTitle = styled.h3`
  margin: 0 0 4px;
  font-size: ${fontSizes.md};
  font-weight: 600;
  color: ${palette.text};
`;

export const CardMeta = styled.p`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: ${palette.textMuted};
`;

export const SearchBar = styled.div`
  max-width: 400px;
  margin-bottom: 24px;
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 24px;
`;

export const GalleryItem = styled.div<{ $url: string }>`
  aspect-ratio: 1;
  border-radius: 12px;
  background: url(${({ $url }) => $url}) center/cover;
`;

export const DetailHero = styled.div<{ $url?: string }>`
  height: 300px;
  border-radius: 16px;
  background: ${({ $url }) =>
    $url ? `url(${$url}) center/cover` : palette.primaryLight};
  margin-bottom: 24px;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
`;

export const Tag = styled.span`
  background: ${palette.primaryLight};
  color: ${palette.primary};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: ${fontSizes.xs};
  font-weight: 500;
`;

export const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 24px;
`;
