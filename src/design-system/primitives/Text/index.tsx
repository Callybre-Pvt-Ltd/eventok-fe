import type { TypeVariant } from '../../tokens/typography';
import { useTextStyles } from './helper';
import { StyledText } from './styled';

interface TextProps {
  variant: TypeVariant;
  children: React.ReactNode;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'brand';
  align?: 'left' | 'center' | 'right';
}

export function Text({
  variant,
  children,
  as,
  color = 'primary',
  align = 'left',
}: TextProps) {
  const { colors } = useTextStyles();

  return (
    <StyledText
      as={as ?? defaultTag(variant)}
      $variant={variant}
      $color={color}
      $align={align}
      $colors={colors}
    >
      {children}
    </StyledText>
  );
}

function defaultTag(variant: TypeVariant) {
  if (variant === 'display') return 'h1';
  if (variant === 'headline') return 'h2';
  if (variant === 'title') return 'h3';
  if (variant === 'eyebrow') return 'span';
  return 'p';
}
