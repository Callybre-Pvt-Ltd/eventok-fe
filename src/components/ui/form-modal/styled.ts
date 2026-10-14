import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes } from '@/theme';
import { brandColors, brandRgb } from '@/theme/brand';

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin: -4px 0 1.1rem;
`;

export const IconBadge = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: ${brandColors.pink100};
  color: ${brandColors.pink500};
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding-top: 0.1rem;
`;

export const Title = styled.h2<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.01em;
`;

export const Subtitle = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textMuted};
  line-height: 1.5;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${brandColors.tan};
  margin: 0 -28px 1.25rem;
`;

export const Body = styled.div<{ $maxHeight?: number }>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  ${({ $maxHeight }) =>
    $maxHeight
      ? `max-height: ${$maxHeight}px; overflow-y: auto; padding-right: 4px;`
      : ''}
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.gray600};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin: 1.5rem -28px -4px;
  padding: 1.1rem 28px 0;
  border-top: 1px solid ${brandColors.tan};
`;

export const FieldRow = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns ?? 1}, 1fr);
  gap: 0.85rem;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const FieldLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${brandColors.gray600};
`;

export const PreviewCard = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.9rem 1.1rem;
  border-radius: 14px;
  background: ${brandColors.pink50};
  border: 1px solid rgba(${brandRgb.pink}, 0.18);
`;

export const PreviewRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${fontSizes.sm};
`;

export const PreviewLabel = styled.span<{ $palette: ThemePalette }>`
  color: ${({ $palette }) => $palette.textSecondary};
`;

export const PreviewValue = styled.span<{ $strong?: boolean }>`
  font-weight: ${({ $strong }) => ($strong ? 800 : 600)};
  font-size: ${({ $strong }) => ($strong ? fontSizes.md : fontSizes.sm)};
  color: ${({ $strong }) => ($strong ? brandColors.pink500 : 'inherit')};
`;

export const SelectableList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 0.25rem;
`;

export const SelectableRow = styled.label<{
  $palette: ThemePalette;
  $checked: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: 12px;
  border: 1px solid
    ${({ $checked }) => ($checked ? brandColors.pink500 : brandColors.tan)};
  background: ${({ $checked }) =>
    $checked ? brandColors.pink50 : 'transparent'};
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${brandColors.pink500};
  }
`;

export const SelectableName = styled.span<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${({ $palette }) => $palette.text};
`;

export const SelectablePrice = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.gray600};
`;
