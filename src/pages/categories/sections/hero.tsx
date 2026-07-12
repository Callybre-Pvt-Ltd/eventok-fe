import { useTranslation } from 'react-i18next';
import { photography } from '@/design-system/tokens/photography';
import { WaveDivider } from '@/components/ui/wave-divider';
import { luxuryColors } from '@/theme/brand';
import {
  HeroBg,
  HeroEyebrow,
  HeroInner,
  HeroLead,
  HeroScrim,
  HeroSection,
  HeroTitle,
  HeroWaveSlot,
} from '../styled';

export function CategoriesHero() {
  const { t } = useTranslation();

  return (
    <HeroSection>
      <HeroBg
        src={photography.hero.corporate}
        alt=""
        aria-hidden
        loading="eager"
      />
      <HeroScrim />
      <HeroInner>
        <HeroEyebrow>{t('categoriesPage.heroEyebrow')}</HeroEyebrow>
        <HeroTitle>{t('categoriesPage.heroTitle')}</HeroTitle>
        <HeroLead>{t('categoriesPage.heroLead')}</HeroLead>
      </HeroInner>
      <HeroWaveSlot>
        <WaveDivider fill={luxuryColors.ivory} variant="festivity" />
      </HeroWaveSlot>
    </HeroSection>
  );
}
