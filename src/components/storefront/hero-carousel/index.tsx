import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { useHeroCarousel } from './helper';
import {
  Accent,
  Arrow,
  Arrows,
  Buttons,
  Content,
  Dot,
  Dots,
  Eyebrow,
  GhostCta,
  Glow,
  HeroWrap,
  Panel,
  PrimaryCta,
  Scrim,
  Slide,
  SlideImage,
  Subtitle,
  Title,
} from './styled';

export function HeroCarousel() {
  const { t } = useTranslation();
  const hero = useHeroCarousel();

  return (
    <HeroWrap>
      <Panel>
        {hero.slides.map((slide, position) => (
          <Slide key={slide.id} $active={position === hero.index}>
            <SlideImage src={slide.image} alt="" aria-hidden />
            <Scrim />
            <Glow />
            <Content>
              <Eyebrow>{slide.eyebrow}</Eyebrow>
              <Title>
                {slide.titleLead} <Accent>{slide.titleAccent}</Accent>{' '}
                {slide.titleTrail}
              </Title>
              <Subtitle>{slide.subtitle}</Subtitle>
              <Buttons>
                <PrimaryCta to={slide.ctaHref}>
                  {t('storefront.heroExplore')}
                  <ArrowRight size={16} />
                </PrimaryCta>
                <GhostCta to={ROUTES.ABOUT}>
                  <Play size={14} />
                  {t('storefront.heroHowItWorks')}
                </GhostCta>
              </Buttons>
            </Content>
          </Slide>
        ))}

        <Dots>
          {hero.slides.map((slide, position) => (
            <Dot
              key={slide.id}
              type="button"
              $active={position === hero.index}
              onClick={() => hero.setIndex(position)}
              aria-label={t('storefront.heroSlideLabel', {
                index: position + 1,
              })}
            />
          ))}
        </Dots>

        <Arrows>
          <Arrow
            type="button"
            onClick={hero.prev}
            aria-label={t('storefront.heroPrev')}
          >
            <ChevronLeft size={18} />
          </Arrow>
          <Arrow
            type="button"
            onClick={hero.next}
            aria-label={t('storefront.heroNext')}
          >
            <ChevronRight size={18} />
          </Arrow>
        </Arrows>
      </Panel>
    </HeroWrap>
  );
}
