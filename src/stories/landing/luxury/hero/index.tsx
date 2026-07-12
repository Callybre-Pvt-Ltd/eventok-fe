import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { photography } from '@/design-system/tokens/photography';
import {
  AvatarStack,
  FeatureBody,
  FeatureCard,
  FeatureLink,
  FeatureThumb,
  FeatureTitle,
  HeroBg,
  HeroCards,
  HeroCopy,
  HeroCta,
  HeroInner,
  HeroRoot,
  HeroScrim,
  HeroTag,
  HeroTagline,
  HeroTitle,
  SocialProofCard,
  SocialProofText,
} from './styled';

const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
];

export function LuxuryHero() {
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
      <HeroInner>
        <HeroCopy>
          <HeroTitle>{t('landing.luxuryHeroTitle')}</HeroTitle>
          <HeroCta to={ROUTES.SERVICES}>
            {t('landing.luxuryHeroCta')}
            <ArrowRight size={18} />
          </HeroCta>
          <HeroTagline>
            <HeroTag>{t('landing.luxuryHeroTag')}</HeroTag>
            {t('landing.luxuryHeroSubtitle')}
          </HeroTagline>
        </HeroCopy>

        <HeroCards>
          <SocialProofCard>
            <AvatarStack>
              {AVATARS.map(src => (
                <img key={src} src={src} alt="" />
              ))}
            </AvatarStack>
            <SocialProofText>{t('landing.luxurySocialProof')}</SocialProofText>
          </SocialProofCard>

          <FeatureCard>
            <FeatureThumb src={photography.weddings[3]} alt="" loading="lazy" />
            <FeatureBody>
              <FeatureTitle>{t('landing.luxuryFeatureCardTitle')}</FeatureTitle>
              <FeatureLink to={ROUTES.SERVICES}>
                {t('landing.luxuryReadMore')}
                <ArrowRight size={14} />
              </FeatureLink>
            </FeatureBody>
          </FeatureCard>
        </HeroCards>
      </HeroInner>
    </HeroRoot>
  );
}
