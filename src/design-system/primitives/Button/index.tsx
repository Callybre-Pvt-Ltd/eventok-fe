import { useButtonLogic, type ButtonTone, type ButtonSize } from './helper';
import { StyledButton, ButtonInner } from './styled';

interface ButtonProps {
  children: React.ReactNode;
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export function Button({
  children,
  tone = 'celebration',
  size = 'md',
  fullWidth,
  loading,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  const { colors, isDisabled, handleClick } = useButtonLogic({
    loading,
    disabled,
    onClick,
  });

  return (
    <StyledButton
      type={type}
      $tone={tone}
      $size={size}
      $fullWidth={fullWidth}
      $colors={colors}
      disabled={isDisabled}
      onClick={handleClick}
      whileHover={isDisabled ? undefined : { y: -2 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
    >
      <ButtonInner $loading={loading}>{children}</ButtonInner>
    </StyledButton>
  );
}
