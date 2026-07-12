import { ArrowUpRight } from 'lucide-react';
import { CtaCircle, CtaGroup, CtaPill } from './styled';

export interface ArrowCtaProps {
  to: string;
  label: string;
  dark?: boolean;
}

export function ArrowCta({ to, label, dark }: ArrowCtaProps) {
  return (
    <CtaGroup>
      <CtaPill to={to} $dark={dark}>
        {label}
      </CtaPill>
      <CtaCircle $dark={dark} aria-hidden>
        <ArrowUpRight size={18} />
      </CtaCircle>
    </CtaGroup>
  );
}
