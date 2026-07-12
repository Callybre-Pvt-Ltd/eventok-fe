import type { SectionPattern } from '../../tokens/sections';
import { useSectionShell } from './helper';
import { Shell, Inner, Content, FlowTail, BackgroundPhoto } from './styled';

interface SectionShellProps {
  pattern: SectionPattern;
  children: React.ReactNode;
  bgImage?: string;
  id?: string;
}

export function SectionShell({
  pattern,
  children,
  bgImage,
  id,
}: SectionShellProps) {
  const { colors, ref } = useSectionShell();

  return (
    <Shell
      ref={ref}
      id={id}
      $pattern={pattern}
      $colors={colors}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
    >
      {bgImage && pattern.bg === 'photo' && (
        <BackgroundPhoto src={bgImage} alt="" aria-hidden />
      )}
      <Inner $pattern={pattern}>
        <Content $pattern={pattern}>{children}</Content>
      </Inner>
      {pattern.flowOut !== 'continue' && (
        <FlowTail $flow={pattern.flowOut} $colors={colors} />
      )}
    </Shell>
  );
}
