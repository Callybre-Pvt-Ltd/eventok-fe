import { useDesignTokens } from '../../hooks/useDesignTokens';

export type ButtonTone =
  | 'celebration'
  | 'soft'
  | 'ghost'
  | 'outline'
  | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

export function useButtonLogic({
  loading,
  disabled,
  onClick,
}: {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const { colors } = useDesignTokens();
  const isDisabled = Boolean(loading || disabled);
  const handleClick = () => {
    if (!isDisabled) onClick?.();
  };
  return { colors, isDisabled, handleClick };
}
