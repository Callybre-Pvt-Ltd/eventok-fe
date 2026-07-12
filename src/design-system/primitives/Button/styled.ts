import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import type { ColorTokens } from '../../tokens/colors';
import { fontFamilies } from '../../tokens/typography';
import { radii, shadows } from '../../tokens/spacing';
import type { ButtonSize, ButtonTone } from './helper';

export const StyledButton = styled(motion.button)<{
  $tone: ButtonTone;
  $size: ButtonSize;
  $fullWidth?: boolean;
  $colors: ColorTokens;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: none;
  cursor: pointer;
  font-family: ${fontFamilies.body};
  font-weight: 600;
  border-radius: ${radii.full};
  transition: box-shadow 0.3s ease;

  padding: ${({ $size }) =>
    $size === 'sm'
      ? '0.5rem 1.25rem'
      : $size === 'lg'
      ? '1rem 2.5rem'
      : '0.8125rem 1.875rem'};
  font-size: ${({ $size }) =>
    $size === 'sm' ? '0.875rem' : $size === 'lg' ? '1.0625rem' : '0.9375rem'};

  ${({ $tone, $colors }) => {
    switch ($tone) {
      case 'celebration':
        return css`
          background: ${$colors.gradientCelebration};
          color: ${$colors.textInverse};
          box-shadow: ${shadows.md};
          &:hover:not(:disabled) {
            box-shadow: ${shadows.glow};
          }
        `;
      case 'soft':
        return css`
          background: ${$colors.brand[100]};
          color: ${$colors.brand[700]};
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${$colors.textPrimary};
          border: 1.5px solid ${$colors.border};
        `;
      case 'inverse':
        return css`
          background: ${$colors.neutral[0]};
          color: ${$colors.textPrimary};
          box-shadow: ${shadows.md};
        `;
      default:
        return css`
          background: transparent;
          color: ${$colors.textSecondary};
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonInner = styled.span<{ $loading?: boolean }>`
  opacity: ${({ $loading }) => ($loading ? 0.6 : 1)};
`;
