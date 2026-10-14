import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontSizes, fontWeight, media, radii, shadows } from '@/theme';
import { brandColors } from '@/theme/brand';

export const BellButton = styled.button<{ $palette: ThemePalette }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: ${radii.full};
  background: transparent;
  color: ${({ $palette }) => $palette.text};
  cursor: pointer;
  transition: background 0.18s ease;

  &:hover {
    background: ${brandColors.gray100};
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: 0.15rem;
  right: 0.1rem;
  min-width: 1.05rem;
  height: 1.05rem;
  padding: 0 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: 0.65rem;
  font-weight: ${fontWeight.bold};
  line-height: 1;
`;

export const Panel = styled.div<{ $palette: ThemePalette }>`
  width: 22rem;
  max-width: calc(100vw - 2rem);
  border-radius: ${radii.md};
  border: 1px solid ${brandColors.gray200};
  background: ${({ $palette }) => $palette.surface};
  box-shadow: ${shadows.lg};
  overflow: hidden;

  ${media.belowSm} {
    width: 18rem;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid ${brandColors.gray200};
`;

export const PanelTitle = styled.span<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeight.bold};
  color: ${({ $palette }) => $palette.text};
`;

export const MarkAllButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.medium};
  color: ${brandColors.pink500};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 24rem;
  overflow-y: auto;
`;

export const Item = styled.li<{ $unread: boolean; $clickable: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid ${brandColors.gray100};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  background: ${({ $unread }) =>
    $unread ? brandColors.pink50 : 'transparent'};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${brandColors.gray100};
  }
`;

export const Dot = styled.span<{ $unread: boolean }>`
  flex-shrink: 0;
  width: 0.45rem;
  height: 0.45rem;
  margin-top: 0.45rem;
  border-radius: ${radii.full};
  background: ${({ $unread }) =>
    $unread ? brandColors.pink500 : 'transparent'};
`;

export const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
`;

export const ItemTitle = styled.span<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeight.medium};
  color: ${({ $palette }) => $palette.text};
`;

export const ItemText = styled.span`
  font-size: ${fontSizes.xs};
  line-height: 1.5;
  color: ${brandColors.gray600};
  overflow-wrap: anywhere;
`;

export const ItemTime = styled.span`
  font-size: ${fontSizes.xs};
  color: ${brandColors.gray400};
`;

export const EmptyRow = styled.p`
  margin: 0;
  padding: 2rem 1rem;
  text-align: center;
  font-size: ${fontSizes.sm};
  color: ${brandColors.gray600};
`;
