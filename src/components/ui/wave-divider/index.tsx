import { wavePaths, type WaveVariant } from './helper';
import { WaveRoot, WaveSvg } from './styled';

interface WaveDividerProps {
  fill: string;
  variant?: WaveVariant;
  flip?: boolean;
  overlap?: boolean;
  height?: string;
  className?: string;
}

export function WaveDivider({
  fill,
  variant = 'festivity',
  flip = false,
  overlap = true,
  height = 'clamp(72px, 11vw, 112px)',
  className,
}: WaveDividerProps) {
  return (
    <WaveRoot $flip={flip} $overlap={overlap} className={className} aria-hidden>
      <WaveSvg
        $height={height}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={wavePaths[variant]} fill={fill} />
      </WaveSvg>
    </WaveRoot>
  );
}

export { WaveOverlay } from './styled';
