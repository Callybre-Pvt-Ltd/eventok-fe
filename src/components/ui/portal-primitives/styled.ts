import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';
import { brandColors } from '@/theme/brand';

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

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
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
  border-bottom: 1px solid var(--color-border);
`;

export const Card = styled.div<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.surface};
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  [data-theme='dark'] & {
    border-color: var(--color-border);
  }

  ${media.belowMd} {
    padding: 1rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--color-primary);
  }

  &:hover {
    border-color: var(--color-primary);
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
  color: var(--color-primary);
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
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: border-color 0.2s ease;

  [data-theme='dark'] & {
    border-color: var(--color-border);
  }

  &:hover {
    border-color: var(--color-primary);
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
  background: var(--color-primary-light);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
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
  background: var(--color-bg-alt);
  border-radius: ${radii.lg};
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
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
    $own ? 'var(--color-primary)' : $palette.surface};
  color: ${({ $own, $palette }) => ($own ? '#ffffff' : $palette.text)};
  font-size: ${fontSizes.sm};
  border: 1px solid
    ${({ $own, $palette }) => ($own ? 'var(--color-primary)' : $palette.border)};
  box-shadow: ${shadows.sm};
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

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
`;

export const PendingWrap = styled.div`
  text-align: center;
  padding: 4rem 1.5rem;
`;

export const PendingIcon = styled.div<{ $palette: ThemePalette }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-primary-light);
  color: var(--color-primary);
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
  border: 1px solid var(--color-border);
`;
