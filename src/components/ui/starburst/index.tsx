export interface StarburstProps {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

/** Wedlux decorative starburst motif */
export function Starburst({
  size = 96,
  color = 'currentColor',
  opacity = 1,
  className,
}: StarburstProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      style={{ opacity }}
    >
      <path
        d="M50 0 L56 38 L82 12 L62 44 L100 50 L62 56 L82 88 L56 62 L50 100 L44 62 L18 88 L38 56 L0 50 L38 44 L18 12 L44 38 Z"
        fill={color}
      />
    </svg>
  );
}
