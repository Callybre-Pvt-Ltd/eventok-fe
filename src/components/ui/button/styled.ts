import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import type { ThemePalette } from '@/theme';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, radii, shadows } from '@/theme';
import type { ButtonSize, ButtonVariant } from './helper';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const StyledButton = styled(motion.button)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
  $palette: ThemePalette;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: none;
  cursor: pointer;
  font-family: ${fontFamily.display};
  font-weight: 700;
  border-radius: ${radii.full};
  transition: box-shadow 0.25s ease, background 0.25s ease;
  font-size: ${({ $size }) =>
    $size === 'sm'
      ? fontSizes.sm
      : $size === 'lg'
      ? fontSizes.lg
      : fontSizes.md};
  padding: ${({ $size }) =>
    $size === 'sm'
      ? '0.5rem 1.25rem'
      : $size === 'lg'
      ? '1rem 2.25rem'
      : '0.75rem 1.75rem'};

  ${({ $variant, $palette }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${$palette.gradientPrimary};
          color: ${brandColors.chocolate};
          box-shadow: ${shadows.md};
          &:hover:not(:disabled) { box-shadow: ${shadows.glow}; }
        `;
      case 'secondary':
        return `
          background: ${$palette.primaryLight};
          color: ${$palette.primary};
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${$palette.text};
          border: 1.5px solid ${$palette.border};
        `;
      default:
        return `
          background: transparent;
          color: ${$palette.textSecondary};
        `;
    }
  }}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const ButtonContent = styled.span<{ $loading?: boolean }>`
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
`;

export const Spinner = styled.span<{ $palette: ThemePalette }>`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(${brandRgb.sage}, 0.3);
  border-top-color: ${brandColors.sage};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;
