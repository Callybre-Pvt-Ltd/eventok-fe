import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { photography } from '@/design-system/tokens/photography';
import {
  HeroBg,
  HeroCopy,
  HeroCta,
  HeroLead,
  HeroRoot,
  HeroScrim,
  HeroTitle,
} from './styled';

export function FestivityHero() {
  const { t } = useTranslation();

  return (
    <HeroRoot id="hero">
      <HeroBg
        src={photography.hero.wedding}
        alt=""
        aria-hidden
        loading="eager"
      />
      <HeroScrim />
      <HeroCopy>
        <HeroTitle>{t('landing.festivityHeroTitle')}</HeroTitle>
        <HeroLead>{t('landing.festivityHeroLead')}</HeroLead>
        <HeroCta to={ROUTES.SERVICES}>{t('landing.festivityHeroCta')}</HeroCta>
      </HeroCopy>
    </HeroRoot>
  );
}
