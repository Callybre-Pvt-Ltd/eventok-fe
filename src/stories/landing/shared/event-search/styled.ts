import styled from 'styled-components';
import type { ColorTokens } from '@/design-system';
import { radii, shadows, space } from '@/design-system';
import { media } from '@/design-system';

export const SearchBar = styled.div<{ $colors: ColorTokens; $large?: boolean }>`
  display: grid;
  gap: ${space[3]};
  background: ${({ $colors }) => $colors.bgElevated};
  border: 1px solid ${({ $colors }) => $colors.border};
  border-radius: ${radii['2xl']};
  padding: ${({ $large }) => ($large ? space[6] : space[4])};
  box-shadow: ${shadows.lg};

  ${media.md} {
    grid-template-columns: repeat(4, 1fr) auto;
    align-items: end;
    gap: ${space[4]};
  }
`;

export const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space[1]};
`;

export const FieldLabel = styled.label<{ $colors: ColorTokens }>`
  display: flex;
  align-items: center;
  gap: ${space[1]};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ $colors }) => $colors.textMuted};
`;

export const FieldInput = styled.input<{
  $colors: ColorTokens;
  $large?: boolean;
}>`
  width: 100%;
  border: 1px solid ${({ $colors }) => $colors.border};
  border-radius: ${radii.lg};
  padding: ${({ $large }) =>
    $large ? `${space[4]} ${space[4]}` : `${space[3]} ${space[3]}`};
  font-size: ${({ $large }) => ($large ? '1rem' : '0.9375rem')};
  font-family: inherit;
  background: ${({ $colors }) => $colors.bg};
  color: ${({ $colors }) => $colors.textPrimary};

  &:focus {
    outline: 2px solid ${({ $colors }) => $colors.brand[400]};
    outline-offset: 1px;
  }
`;

export const SearchBtnWrap = styled.div`
  display: flex;
  align-items: stretch;

  ${media.md} {
    align-items: flex-end;
  }
`;
