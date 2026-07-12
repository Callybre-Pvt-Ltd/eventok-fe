import { useTheme } from '@/theme';
import { useButton, type ButtonVariant, type ButtonSize } from './helper';
import { StyledButton, ButtonContent, Spinner } from './styled';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  const { palette } = useTheme();
  const { isDisabled, handleClick } = useButton({
    loading,
    disabled,
    onClick,
  });

  return (
    <StyledButton
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $palette={palette}
      disabled={isDisabled}
      onClick={handleClick}
      whileHover={isDisabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
    >
      <ButtonContent $loading={loading}>
        {loading ? <Spinner $palette={palette} /> : children}
      </ButtonContent>
    </StyledButton>
  );
}
