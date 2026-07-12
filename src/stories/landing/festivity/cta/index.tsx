import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { IvoryButton, IvorySection, SectionShell } from '../shared/styled';
import { CtaLead, CtaShell, CtaTitle } from './styled';

export function FestivityCta() {
  const { t } = useTranslation();

  return (
    <IvorySection>
      <SectionShell>
        <CtaShell>
          <CtaTitle>{t('landing.festivityCtaTitle')}</CtaTitle>
          <CtaLead>{t('landing.festivityCtaLead')}</CtaLead>
          <IvoryButton to={ROUTES.CONTACT}>
            {t('landing.festivityCtaButton')}
          </IvoryButton>
        </CtaShell>
      </SectionShell>
    </IvorySection>
  );
}
