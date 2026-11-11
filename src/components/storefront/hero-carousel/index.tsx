import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme/useTheme';
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
  HeroWrap,
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
  const { mode } = useTheme();

  return (
    <HeroWrap>
      {hero.slides.map((slide, position) => {
        const heroImage =
          mode === 'light'
            ? slide.imageLight || slide.image
            : slide.imageDark || slide.image;

        return (
          <Slide key={slide.id} $active={position === hero.index}>
            <SlideImage
              src={heroImage}
              alt={`${slide.titleLead} ${slide.titleAccent} ${slide.titleTrail}`}
              loading={position === 0 ? 'eager' : 'lazy'}
              $position={slide.objectPosition}
            />
            <Scrim />
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
                  <Play size={13} fill="currentColor" />
                  {t('storefront.heroHowItWorks')}
                </GhostCta>
              </Buttons>
            </Content>
          </Slide>
        );
      })}

      {hero.slides.length > 1 && (
        <>
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
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                hero.prev();
              }}
              aria-label={t('storefront.heroPrev')}
            >
              <ChevronLeft size={20} />
            </Arrow>
            <Arrow
              type="button"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                hero.next();
              }}
              aria-label={t('storefront.heroNext')}
            >
              <ChevronRight size={20} />
            </Arrow>
          </Arrows>
        </>
      )}
    </HeroWrap>
  );
}
