import { useHorizontalRail } from './helper';
import { Rail, Track, FadeLeft, FadeRight } from './styled';

interface HorizontalRailProps {
  children: React.ReactNode;
}

export function HorizontalRail({ children }: HorizontalRailProps) {
  const { colors, trackRef, showLeft, showRight, scroll } = useHorizontalRail();

  return (
    <Rail $colors={colors}>
      {showLeft && <FadeLeft $colors={colors} />}
      {showRight && <FadeRight $colors={colors} />}
      <Track ref={trackRef} onScroll={scroll}>
        {children}
      </Track>
    </Rail>
  );
}
