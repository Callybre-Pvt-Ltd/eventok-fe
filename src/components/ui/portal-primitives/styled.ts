import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';
import { brandColors, brandRgb } from '@/theme/brand';

export const PageTitle = styled.h1<{ $palette: ThemePalette }>`
  margin: 0 0 0.35rem;
  font-family: ${fontFamily.display};
  font-size: clamp(1.55rem, 4vw, ${fontSizes.h3});
  font-weight: 800;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.03em;
`;

export const PageEyebrow = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${brandColors.gray600};
`;

export const PageLead = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.md};
  color: ${({ $palette }) => $palette.textSecondary};
  max-width: 42rem;
  line-height: 1.55;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.65rem;
  padding-bottom: 1.15rem;
  border-bottom: 1px solid rgba(${brandRgb.pink}, 0.12);
`;

export const Card = styled.div<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.surface};
  border-radius: 1rem;
  border: 1px solid ${brandColors.tan};
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(${brandRgb.ink}, 0.04);

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
  position: relative;
  overflow: hidden;
  background: ${({ $palette }) => $palette.surface};
  border-radius: 1rem;
  border: 1px solid rgba(${brandRgb.pink}, 0.12);
  padding: 1.25rem 1.5rem;
  box-shadow: 0 8px 22px rgba(${brandRgb.ink}, 0.04);
  transition: box-shadow 0.25s ease, transform 0.25s ease,
    border-color 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${brandColors.pink500},
      ${brandColors.accent500}
    );
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(${brandRgb.pink}, 0.12);
    border-color: rgba(${brandRgb.pink}, 0.28);
    transform: translateY(-2px);
  }
`;

export const StatLabel = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 0.5rem;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textMuted};
  font-weight: 600;
  letter-spacing: 0.02em;
`;

export const StatValue = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.25rem, 3vw, ${fontSizes.xxl});
  font-weight: 800;
  color: ${brandColors.pink500};
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
  border-radius: 0.9rem;
  border: 1px solid ${brandColors.tan};
  box-shadow: 0 4px 14px rgba(${brandRgb.ink}, 0.03);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(${brandRgb.pink}, 0.35);
    box-shadow: 0 8px 20px rgba(${brandRgb.pink}, 0.08);
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
  background: ${brandColors.accent100};
  color: ${brandColors.accent600};
  border: 1px solid rgba(${brandRgb.accent}, 0.35);
  padding: 0.85rem 1.1rem;
  border-radius: ${radii.md};
  margin-bottom: 1.5rem;
  font-size: ${fontSizes.sm};
  font-weight: 600;
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
  background: ${brandColors.pink50};
  border-radius: ${radii.lg};
  margin-bottom: 1rem;
  border: 1px solid rgba(${brandRgb.pink}, 0.12);
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
    $own ? brandColors.pink500 : $palette.surface};
  color: ${({ $own, $palette }) => ($own ? brandColors.white : $palette.text)};
  font-size: ${fontSizes.sm};
  border: 1px solid
    ${({ $own, $palette }) => ($own ? brandColors.pink600 : $palette.border)};
  box-shadow: ${({ $own }) =>
    $own ? `0 6px 16px rgba(${brandRgb.pink}, 0.25)` : shadows.sm};
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

export const FormField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
`;

export const FieldLabel = styled.span`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${brandColors.gray600};
`;

export const PendingWrap = styled.div`
  text-align: center;
  padding: 4rem 1.5rem;
`;

export const PendingIcon = styled.div<{ $palette: ThemePalette }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${brandColors.pink100};
  color: ${brandColors.pink500};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 24px rgba(${brandRgb.pink}, 0.18);
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
  border: 1px solid rgba(${brandRgb.pink}, 0.14);
`;
