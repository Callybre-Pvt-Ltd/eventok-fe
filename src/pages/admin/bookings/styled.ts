import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily } from '@/theme';
import type { ThemePalette } from '@/theme';

export * from '@/components/ui/portal-primitives/styled';

export const BookingCard = styled.div<{ $palette: ThemePalette }>`
  padding: 1.25rem 1.5rem;
  background: ${({ $palette }) => $palette.surface};
  border-radius: 1rem;
  border: 1px solid ${brandColors.tan};
  box-shadow: 0 4px 14px rgba(${brandRgb.ink}, 0.03);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(${brandRgb.pink}, 0.35);
    box-shadow: 0 8px 24px rgba(${brandRgb.pink}, 0.08);
  }
`;

export const BookingCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(${brandRgb.pink}, 0.1);
`;

export const ServiceTitle = styled.h3<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  background: ${brandColors.pink100};
  color: ${brandColors.pink500};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

export const DetailSection = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SectionLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${brandColors.gray600};
`;

export const PrimaryText = styled.span<{ $palette: ThemePalette }>`
  font-size: 0.925rem;
  font-weight: 600;
  color: ${({ $palette }) => $palette.text};
  overflow-wrap: anywhere;
`;

export const SecondaryText = styled.span<{ $palette: ThemePalette }>`
  font-size: 0.825rem;
  color: ${({ $palette }) => $palette.textMuted};
  overflow-wrap: anywhere;
`;

export const NotesBox = styled.div<{ $palette: ThemePalette }>`
  margin-top: 0.25rem;
  padding: 0.65rem 0.85rem;
  background: ${brandColors.pink50};
  border-radius: 0.5rem;
  font-size: 0.825rem;
  color: ${({ $palette }) => $palette.textSecondary};
  white-space: pre-wrap;
  word-break: break-word;
`;

