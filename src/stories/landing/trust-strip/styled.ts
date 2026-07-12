import styled from 'styled-components';
import type { ColorTokens } from '@/design-system';
import { space } from '@/design-system';
import { media } from '@/design-system';

export const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${space[10]};

  ${media.md} {
    gap: ${space[16]};
  }
`;

export const StatItem = styled.div<{ $colors: ColorTokens }>`
  text-align: center;
`;

export const StatValue = styled.div<{ $colors: ColorTokens }>`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ $colors }) => $colors.brand[600]};
  line-height: 1.1;
`;

export const StatLabel = styled.div<{ $colors: ColorTokens }>`
  margin-top: ${space[2]};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $colors }) => $colors.textSecondary};
`;
