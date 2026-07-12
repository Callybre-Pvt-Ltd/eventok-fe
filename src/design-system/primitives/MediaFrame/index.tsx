import type { AspectRatio } from '../../tokens/photography';
import { useMediaFrame } from './helper';
import { Frame, Image, Overlay, Caption } from './styled';

interface MediaFrameProps {
  src: string;
  alt: string;
  ratio?: AspectRatio;
  overlay?: boolean;
  caption?: string;
  priority?: boolean;
}

export function MediaFrame({
  src,
  alt,
  ratio = 'card',
  overlay = true,
  caption,
}: MediaFrameProps) {
  const { colors } = useMediaFrame();

  return (
    <Frame $ratio={ratio} $colors={colors}>
      <Image src={src} alt={alt} loading="lazy" />
      {overlay && <Overlay $colors={colors} />}
      {caption && <Caption>{caption}</Caption>}
    </Frame>
  );
}
