import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';
import { brandColors } from '@/theme/brand';

export const PageTitle = styled.h1<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 4vw, ${fontSizes.h3});
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.02em;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const Card = styled.div<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.surface};
  border-radius: ${radii.lg};
  border: 1px solid ${({ $palette }) => $palette.border};
  padding: 1.5rem;
  box-shadow: ${shadows.sm};

  ${media.belowMd} {
    padding: 1rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  ${media.belowSm} {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.surface};
  border-radius: ${radii.md};
  border: 1px solid ${({ $palette }) => $palette.border};
  padding: 1.25rem 1.5rem;
  box-shadow: ${shadows.sm};
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: ${shadows.md};
  }
`;

export const StatLabel = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 0.5rem;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textMuted};
  font-weight: 500;
`;

export const StatValue = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.25rem, 3vw, ${fontSizes.xxl});
  font-weight: 700;
  color: ${({ $palette }) => $palette.primary};
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ListItem = styled.div<{ $palette: ThemePalette }>`
  padding: 1rem 1.25rem;
  background: ${({ $palette }) => $palette.surface};
  border-radius: ${radii.md};
  border: 1px solid ${({ $palette }) => $palette.border};
  box-shadow: ${shadows.sm};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ $palette }) => $palette.primary}40;
  }
`;

export const ItemTitle = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 0.25rem;
  font-weight: 600;
  color: ${({ $palette }) => $palette.text};
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const ItemMeta = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textMuted};
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const Banner = styled.div<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.warning};
  color: ${brandColors.sage};
  padding: 0.75rem 1rem;
  border-radius: ${radii.md};
  margin-bottom: 1.5rem;
  font-size: ${fontSizes.sm};
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
`;

export const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: clamp(360px, 60vh, 500px);
`;

export const Messages = styled.div<{ $palette: ThemePalette }>`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: ${({ $palette }) => $palette.backgroundAlt};
  border-radius: ${radii.lg};
  margin-bottom: 1rem;
  border: 1px solid ${({ $palette }) => $palette.border};
`;

export const MessageBubble = styled.div<{
  $palette: ThemePalette;
  $own?: boolean;
}>`
  align-self: ${({ $own }) => ($own ? 'flex-end' : 'flex-start')};
  max-width: min(70%, 100%);
  padding: 0.625rem 0.875rem;
  border-radius: ${radii.md};
  background: ${({ $own, $palette }) =>
    $own ? $palette.primary : $palette.surface};
  color: ${({ $own, $palette }) => ($own ? brandColors.sage : $palette.text)};
  font-size: ${fontSizes.sm};
  border: 1px solid
    ${({ $own, $palette }) => ($own ? $palette.primary : $palette.border)};
`;

export const ChatInput = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 480px;
  width: 100%;
`;

export const PendingWrap = styled.div`
  text-align: center;
  padding: 4rem 1.5rem;
`;

export const PendingIcon = styled.div<{ $palette: ThemePalette }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $palette }) => $palette.primaryLight};
  color: ${({ $palette }) => $palette.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;

  ${media.belowSm} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const MediaCard = styled.div<{ $palette: ThemePalette; $url: string }>`
  aspect-ratio: 1;
  border-radius: ${radii.md};
  background: url(${({ $url }) => $url}) center/cover;
  border: 1px solid ${({ $palette }) => $palette.border};
`;
