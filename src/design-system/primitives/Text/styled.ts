import styled, { css } from 'styled-components';
import type { ColorTokens } from '../../tokens/colors';
import { typeScale, type TypeVariant } from '../../tokens/typography';

export const StyledText = styled.p<{
  $variant: TypeVariant;
  $color: 'primary' | 'secondary' | 'muted' | 'inverse' | 'brand';
  $align: 'left' | 'center' | 'right';
  $colors: ColorTokens;
}>`
  margin: 0;
  text-align: ${({ $align }) => $align};

  ${({ $variant }) => {
    const t = typeScale[$variant];
    return css`
      font-family: ${t.family};
      font-size: ${t.size};
      font-weight: ${t.weight};
      line-height: ${t.lineHeight};
      letter-spacing: ${t.letterSpacing};
      ${'textTransform' in t ? `text-transform: ${t.textTransform};` : ''}
    `;
  }}

  ${({ $color, $colors }) => {
    const map = {
      primary: $colors.textPrimary,
      secondary: $colors.textSecondary,
      muted: $colors.textMuted,
      inverse: $colors.textInverse,
      brand: $colors.brand[600],
    };
    return css`
      color: ${map[$color]};
    `;
  }}
`;
