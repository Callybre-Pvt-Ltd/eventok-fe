import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { photography } from '@/design-system/tokens/photography';
import { serviceItems } from '../helper';
import {
  DisplayTitle,
  IvoryButton,
  IvorySection,
  ScriptEyebrow,
  SectionShell,
} from '../shared/styled';
import {
  ServiceImage,
  ServiceImageCol,
  ServiceItem,
  ServiceList,
  ServiceRow,
  ServiceTextCol,
  ServicesLead,
} from './styled';

export function FestivityServices() {
  const { t } = useTranslation();

  return (
    <IvorySection>
      <SectionShell>
        <ServiceRow>
          <ServiceTextCol>
            <ScriptEyebrow>
              {t('landing.festivityServicesEyebrow')}
            </ScriptEyebrow>
            <DisplayTitle>{t('landing.festivityServicesTitle')}</DisplayTitle>
            <ServicesLead>{t('landing.festivityServicesLead')}</ServicesLead>
            <ServiceList>
              {serviceItems.map(item => (
                <ServiceItem key={item.key}>{t(item.labelKey)}</ServiceItem>
              ))}
            </ServiceList>
            <IvoryButton to={ROUTES.SERVICES}>
              {t('landing.festivityServicesCta')}
            </IvoryButton>
          </ServiceTextCol>
          <ServiceImageCol>
            <ServiceImage src={photography.weddings[3]} alt="" loading="lazy" />
          </ServiceImageCol>
        </ServiceRow>
      </SectionShell>
    </IvorySection>
  );
}
