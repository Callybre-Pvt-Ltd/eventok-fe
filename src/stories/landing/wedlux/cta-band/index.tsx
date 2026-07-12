import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { ArrowCta } from '@/components/ui/arrow-cta';
import { Starburst } from '@/components/ui/starburst';
import { CreamSection, SectionShell } from '../shared/styled';
import { useWedluxCtaBand } from './helper';
import { CtaAction, CtaBand, CtaStarburst, CtaText } from './styled';

export function WedluxCtaBand() {
  const { t } = useTranslation();
  const { scope } = useWedluxCtaBand();

  return (
    <CreamSection id="cta" ref={scope}>
      <SectionShell>
        <CtaBand data-reveal>
          <CtaStarburst aria-hidden>
            <Starburst size={120} />
          </CtaStarburst>
          <CtaText>{t('landing.wedluxCtaText')}</CtaText>
          <CtaAction>
            <ArrowCta
              to={ROUTES.CONTACT}
              label={t('landing.wedluxCtaButton')}
            />
          </CtaAction>
        </CtaBand>
      </SectionShell>
    </CreamSection>
  );
}
