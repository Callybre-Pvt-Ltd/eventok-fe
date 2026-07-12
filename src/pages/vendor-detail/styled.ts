import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { media } from '@/theme';
import { brandColors, brandGradients, brandRgb } from '@/theme/brand';

export const PageWrap = styled.div<{ $palette: ThemePalette }>`
  min-height: 100vh;
  background: ${({ $palette }) => $palette.background};
`;

export const Main = styled.main``;

export const Masonry = styled.div`
  columns: 2;
  column-gap: 8px;
  padding: 8px;

  ${media.lg} {
    columns: 4;
  }
`;

export const MasonryItem = styled.div<{
  $palette: ThemePalette;
  $tall?: boolean;
}>`
  break-inside: avoid;
  margin-bottom: 8px;
  border-radius: 16px;
  overflow: hidden;

  img {
    width: 100%;
    display: block;
    aspect-ratio: ${({ $tall }) => ($tall ? '3/4' : '4/3')};
    object-fit: cover;
  }
`;

export const Layout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem clamp(1rem, 4vw, 2rem) 4rem;
  display: grid;
  gap: 2rem;

  ${media.lg} {
    grid-template-columns: 1fr 340px;
    align-items: start;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Section = styled.section``;

export const SectionTitle = styled.h2<{ $palette: ThemePalette }>`
  margin: 0 0 1.25rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.375rem, 3vw, 1.75rem);
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
`;

export const Description = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 1rem;
  line-height: 1.7;
  color: ${({ $palette }) => $palette.textSecondary};
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span<{ $palette: ThemePalette }>`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.8125rem;
  background: ${({ $palette }) => $palette.primaryLight};
  color: ${({ $palette }) => $palette.primary};
`;

export const Sidebar = styled.aside`
  ${media.lg} {
    position: sticky;
    top: 100px;
  }
`;

export const SidebarCard = styled.div<{ $palette: ThemePalette }>`
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid ${({ $palette }) => $palette.border};
  background: ${({ $palette }) => $palette.surface};
  box-shadow: 0 12px 40px ${({ $palette }) => $palette.shadow};
`;

export const SidebarName = styled.h1<{ $palette: ThemePalette }>`
  margin: 0 0 1rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
`;

export const SidebarMeta = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: ${({ $palette }) => $palette.textSecondary};
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CtaStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  border-left: 2px solid ${brandColors.green};
  padding-left: 1.5rem;
`;

export const TimelineItem = styled.div<{ $palette: ThemePalette }>`
  position: relative;
  padding-bottom: 1.75rem;

  strong {
    font-size: 0.75rem;
    color: ${({ $palette }) => $palette.primary};
    letter-spacing: 0.06em;
  }

  h4 {
    margin: 4px 0;
    font-size: 1rem;
    color: ${({ $palette }) => $palette.text};
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    color: ${({ $palette }) => $palette.textMuted};
    line-height: 1.5;
  }
`;

export const TimelineDot = styled.div<{ $palette: ThemePalette }>`
  position: absolute;
  left: -1.65rem;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $palette }) => $palette.primary};
  border: 2px solid ${({ $palette }) => $palette.surface};
`;

export const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ServiceItem = styled.li<{ $palette: ThemePalette }>`
  padding: 12px 16px;
  border-radius: 12px;
  background: ${({ $palette }) => $palette.background};
  border: 1px solid ${({ $palette }) => $palette.border};
  font-size: 0.9375rem;
  color: ${({ $palette }) => $palette.text};
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

export const VideoCard = styled.div<{ $palette: ThemePalette }>`
  position: relative;
  border-radius: 16px;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 16/10;
    object-fit: cover;
    display: block;
  }

  span {
    display: block;
    padding: 10px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: ${({ $palette }) => $palette.text};
  }
`;

export const PlayBtn = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(${brandRgb.charcoal}, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${brandColors.sage};
`;

export const BeforeAfter = styled.div`
  display: grid;
  gap: 1rem;

  & > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;

export const BaImage = styled.div<{ $palette: ThemePalette }>`
  position: relative;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    display: block;
  }
`;

export const BaLabel = styled.span`
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(${brandRgb.charcoal}, 0.6);
  color: ${brandColors.sage};
`;

export const ReviewCard = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 16px;
  border: 1px solid ${({ $palette }) => $palette.border};
  margin-bottom: 1rem;
`;

export const ReviewAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${brandGradients.primary};
  color: ${brandColors.sage};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
`;

export const ReviewBody = styled.div`
  p {
    margin: 8px 0;
    line-height: 1.6;
    font-style: italic;
  }

  cite {
    font-size: 0.8125rem;
    font-style: normal;
    opacity: 0.7;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  max-width: 360px;
`;

export const CalDay = styled.div<{
  $palette: ThemePalette;
  $available?: boolean;
}>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  border-radius: 8px;
  background: ${({ $available, $palette }) =>
    $available ? $palette.primaryLight : $palette.background};
  color: ${({ $available, $palette }) =>
    $available ? $palette.primary : $palette.textMuted};
  border: 1px solid ${({ $palette }) => $palette.border};
`;

export const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FaqItem = styled.details<{ $palette: ThemePalette }>`
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: 12px;
  padding: 0 1rem;
  background: ${({ $palette }) => $palette.surface};

  summary {
    list-style: none;
    cursor: pointer;
    padding: 1rem 0;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ $palette }) => $palette.text};
  }
`;

export const FaqAnswer = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 1rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${({ $palette }) => $palette.textSecondary};
`;

export const RelatedRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
`;
