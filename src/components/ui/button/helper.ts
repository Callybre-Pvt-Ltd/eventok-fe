export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export function useButton({
  loading,
  disabled,
  onClick,
}: {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const isDisabled = Boolean(loading || disabled);
  const handleClick = () => {
    if (!isDisabled) onClick?.();
  };
  return { isDisabled, handleClick };
}
