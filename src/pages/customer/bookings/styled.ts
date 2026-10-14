import styled from 'styled-components';
import { brandColors, fontSizes, fontWeight, radii } from '@/theme';
import type { BookingTone } from '@/utils/booking-status';

export * from '@/components/ui/portal-primitives/styled';

const TONE_COLORS: Record<BookingTone, { fg: string; bg: string }> = {
  pending: { fg: brandColors.warning500, bg: brandColors.gray100 },
  positive: { fg: brandColors.success500, bg: brandColors.success50 },
  active: { fg: brandColors.info500, bg: brandColors.info50 },
  negative: { fg: brandColors.danger500, bg: brandColors.gray100 },
};

export const BookingHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const StatusBadge = styled.span<{ $tone: BookingTone }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.7rem;
  border-radius: ${radii.full};
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: ${({ $tone }) => TONE_COLORS[$tone].fg};
  background: ${({ $tone }) => TONE_COLORS[$tone].bg};
  white-space: nowrap;
`;

export const StatusNote = styled.p`
  margin: 0.4rem 0 0;
  font-size: ${fontSizes.sm};
  line-height: 1.5;
  color: ${brandColors.gray600};
`;

export const VendorCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.75rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid ${brandColors.gray200};
  border-radius: ${radii.md};
  background: ${brandColors.cream};
`;

export const VendorLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${brandColors.gray600};
`;

export const VendorName = styled.span`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeight.medium};
  color: ${brandColors.chocolate};
`;

export const VendorPhone = styled.a`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeight.medium};
  color: ${brandColors.pink500};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PayRow = styled.div`
  margin-top: 0.75rem;
`;
