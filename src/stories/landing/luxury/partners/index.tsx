import { useTranslation } from 'react-i18next';
import { PartnerLogo, PartnersRow, PartnersSection } from './styled';

const PARTNER_KEYS = [
  'landing.luxuryPartner1',
  'landing.luxuryPartner2',
  'landing.luxuryPartner3',
  'landing.luxuryPartner4',
  'landing.luxuryPartner5',
] as const;

export function LuxuryPartners() {
  const { t } = useTranslation();

  return (
    <PartnersSection>
      <PartnersRow>
        {PARTNER_KEYS.map(key => (
          <PartnerLogo key={key}>{t(key)}</PartnerLogo>
        ))}
      </PartnersRow>
    </PartnersSection>
  );
}
