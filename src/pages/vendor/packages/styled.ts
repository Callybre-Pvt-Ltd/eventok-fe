import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontSizes, fontWeight, media } from '@/theme';
import { brandColors, brandRgb } from '@/theme/brand';

export * from '@/components/ui/portal-primitives/styled';

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

export const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;

  ${media.belowSm} {
    grid-template-columns: 1fr;
  }
`;

export const PackageCard = styled.div<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${brandColors.tan};
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 8px 22px rgba(${brandRgb.ink}, 0.04);
`;

export const PackageName = styled.h3<{ $palette: ThemePalette }>`
  margin: 0 0 0.5rem;
  color: ${({ $palette }) => $palette.text};
  font-size: ${fontSizes.lg};
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${fontSizes.sm};
  padding: 0.3rem 0;
`;

export const PriceLabel = styled.span<{ $palette: ThemePalette }>`
  color: ${({ $palette }) => $palette.textMuted};
`;

export const PriceValue = styled.span<{ $emphasis?: boolean }>`
  font-weight: ${({ $emphasis }) => ($emphasis ? 800 : 600)};
  color: ${({ $emphasis }) => ($emphasis ? brandColors.pink500 : 'inherit')};
`;

export const SavingsBadge = styled.span`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: ${brandColors.accent100};
  color: ${brandColors.accent600};
  font-size: ${fontSizes.xs};
  font-weight: 700;
`;

export const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 220px;
  overflow-y: auto;
  margin: 0.5rem 0 1rem;
`;

export const VisibilityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${brandColors.gray200};
`;

export const VisibilityLabel = styled.span<{ $live: boolean }>`
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $live }) =>
    $live ? brandColors.success500 : brandColors.gray600};
`;
