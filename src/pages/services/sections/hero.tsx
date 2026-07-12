import { useTranslation } from 'react-i18next';
import {
  HeroEyebrow,
  HeroInner,
  HeroLead,
  HeroSection,
  HeroTitle,
} from '../styled';

export function DiscoveryHero() {
  const { t } = useTranslation();

  return (
    <HeroSection>
      <HeroInner>
        <HeroEyebrow data-disc-hero>
          {t('servicesPage.heroEyebrow')}
        </HeroEyebrow>
        <HeroTitle data-disc-hero>{t('servicesPage.heroTitle')}</HeroTitle>
        <HeroLead data-disc-hero>{t('servicesPage.heroLead')}</HeroLead>
      </HeroInner>
    </HeroSection>
  );
}
