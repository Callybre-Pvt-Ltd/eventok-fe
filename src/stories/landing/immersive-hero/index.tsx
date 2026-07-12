import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Button,
  Eyebrow,
  landingStoryArc,
  photography,
  SectionShell,
  Text,
} from '@/design-system';
import { ROUTES } from '@/constants/routes';
import { EventSearch } from '../shared/event-search';
import { useImmersiveHero } from './helper';
import {
  HeroActions,
  HeroContent,
  HeroOverlay,
  ParallaxImg,
  ParallaxPhoto,
  SearchWrap,
  TextBlock,
} from './styled';

const pattern = landingStoryArc[0];

export function ImmersiveHero() {
  const { t } = useTranslation();
  const { colors, parallaxRef } = useImmersiveHero();

  return (
    <SectionShell
      pattern={pattern}
      bgImage={photography.hero.wedding}
      id="hero"
    >
      <ParallaxPhoto ref={parallaxRef}>
        <ParallaxImg src={photography.hero.wedding} alt="" aria-hidden />
      </ParallaxPhoto>
      <HeroOverlay $colors={colors} />
      <HeroContent $colors={colors}>
        <TextBlock>
          <Eyebrow>{t('landing.heroBadge')}</Eyebrow>
          <Text variant="display" color="inverse">
            {t('landing.heroTitle')}
          </Text>
          <Text variant="lead" color="inverse">
            {t('landing.heroSubtitle')}
          </Text>
          <HeroActions>
            <Link to={ROUTES.VENDORS}>
              <Button tone="celebration" size="lg">
                {t('landing.heroCta')}
              </Button>
            </Link>
            <Link to={ROUTES.ABOUT}>
              <Button tone="ghost" size="lg">
                {t('landing.heroSecondary')}
              </Button>
            </Link>
          </HeroActions>
          <SearchWrap>
            <EventSearch />
          </SearchWrap>
        </TextBlock>
      </HeroContent>
    </SectionShell>
  );
}
