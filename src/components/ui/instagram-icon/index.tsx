export interface InstagramIconProps {
  size?: number;
  className?: string;
}

const PATHS = [
  'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
  'M16 11.37a4 4 0 1 1-3.37-3.37A4 4 0 0 1 16 11.37z',
  'M17.5 6.5h.01',
];

export function InstagramIcon({ size = 20, className }: InstagramIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS.map(d => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
