import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SearchHero } from '@/components/ui/search-hero';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';
import {
  fadeUp,
  MotionDiv,
  staggerContainer,
  viewportOnce,
} from '@/utils/motion';
import { useHero } from './helper';
import {
  FloatCard,
  FloatOrb,
  HeroActions,
  HeroBadge,
  HeroContent,
  HeroGrid,
  HeroImage,
  HeroInner,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  HeroVisual,
  ParallaxLayer,
  SearchWrap,
} from './styled';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600';

export function Hero() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { parallaxRef } = useHero();

  return (
    <HeroSection $palette={palette}>
      <HeroInner>
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <HeroGrid>
            <HeroContent>
              <MotionDiv variants={fadeUp}>
                <HeroBadge $palette={palette}>
                  <Sparkles size={14} />
                  {t('landing.heroBadge')}
                </HeroBadge>
              </MotionDiv>
              <MotionDiv variants={fadeUp}>
                <HeroTitle $palette={palette}>
                  {t('landing.heroTitle')}
                </HeroTitle>
              </MotionDiv>
              <MotionDiv variants={fadeUp}>
                <HeroSubtitle $palette={palette}>
                  {t('landing.heroSubtitle')}
                </HeroSubtitle>
              </MotionDiv>
              <MotionDiv variants={fadeUp}>
                <HeroActions>
                  <Link to={ROUTES.VENDORS}>
                    <Button variant="primary" size="lg">
                      {t('landing.heroCta')}
                    </Button>
                  </Link>
                  <Link to={ROUTES.ABOUT}>
                    <Button variant="outline" size="lg">
                      {t('landing.heroSecondary')}
                    </Button>
                  </Link>
                </HeroActions>
              </MotionDiv>
              <MotionDiv variants={fadeUp}>
                <SearchWrap>
                  <SearchHero />
                </SearchWrap>
              </MotionDiv>
            </HeroContent>
            <HeroVisual>
              <ParallaxLayer ref={parallaxRef}>
                <FloatOrb
                  $palette={palette}
                  $size="200px"
                  $top="0"
                  $right="0"
                />
                <FloatOrb
                  $palette={palette}
                  $size="120px"
                  $top="60%"
                  $right="20%"
                />
                <HeroImage $url={HERO_IMAGE} />
                <FloatCard $palette={palette} $top="10%" $left="0" $delay={0} />
                <FloatCard
                  $palette={palette}
                  $top="70%"
                  $left="60%"
                  $delay={1}
                />
              </ParallaxLayer>
            </HeroVisual>
          </HeroGrid>
        </MotionDiv>
      </HeroInner>
    </HeroSection>
  );
}
