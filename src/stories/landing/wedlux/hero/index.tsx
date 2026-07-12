import { useTranslation } from 'react-i18next';
import { Camera, ChevronDown, MapPin, Star } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { Starburst } from '@/components/ui/starburst';
import { MagneticCta } from './MagneticCta';
import { useWedluxHero } from './helper';
import {
  AccentMedia,
  BrandChip,
  CardEyebrow,
  CardMeta,
  CardTitle,
  CtaRow,
  DecorOrbit,
  DecorRing,
  FloatingCard,
  HeroCopy,
  HeroGlow,
  HeroGrid,
  HeroGridLines,
  HeroImage,
  HeroLead,
  HeroMedia,
  HeroRoot,
  HeroShell,
  MarqueeTrack,
  MarqueeViewport,
  MediaGlow,
  MediaStage,
  ScrollArrow,
  ScrollCue,
  StarRow,
  StatItem,
  StatLabel,
  StatsStrip,
  StatValue,
  TitleBlock,
  TitleLine,
  TitleLineInner,
  TrustBar,
  TrustInner,
  TrustLabel,
} from './styled';

export function WedluxHero() {
  const { t } = useTranslation();
  const { scope, heroImage, accentImage, titleLines, stats, brands } =
    useWedluxHero();

  const marqueeBrands = [...brands, ...brands];

  return (
    <HeroRoot id="hero" ref={scope}>
      <HeroGlow data-hero-glow aria-hidden />
      <HeroGridLines aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </HeroGridLines>

      <HeroShell>
        <HeroGrid>
          <HeroCopy>
            <DecorOrbit data-hero-decor aria-hidden>
              <Starburst size={96} />
            </DecorOrbit>
            <DecorRing data-hero-decor aria-hidden />

            <TitleBlock>
              {titleLines.map(line => (
                <TitleLine key={line}>
                  <TitleLineInner data-hero-line>{line}</TitleLineInner>
                </TitleLine>
              ))}
            </TitleBlock>

            <HeroLead data-hero-lead>{t('landing.wedluxHeroLead')}</HeroLead>

            <CtaRow data-hero-cta>
              <MagneticCta
                to={ROUTES.SERVICES}
                label={t('landing.wedluxHeroCta')}
              />
            </CtaRow>
          </HeroCopy>

          <MediaStage>
            <MediaGlow aria-hidden />
            <HeroMedia data-hero-media>
              <HeroImage
                data-hero-media-img
                src={heroImage}
                alt={t('landing.wedluxHeroImageAlt')}
                loading="eager"
                fetchPriority="high"
              />
            </HeroMedia>

            <FloatingCard data-hero-card $pos="tl">
              <StarRow aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={11} fill="currentColor" />
                ))}
              </StarRow>
              <CardTitle>{t('landing.wedluxHeroCardRating')}</CardTitle>
              <CardMeta>{t('landing.wedluxHeroCardVerified')}</CardMeta>
            </FloatingCard>

            <FloatingCard data-hero-card $pos="tr">
              <CardEyebrow>{t('landing.wedluxHeroCardDone')}</CardEyebrow>
              <CardTitle>{t('landing.wedluxHeroCardWeddings')}</CardTitle>
              <CardMeta>{t('landing.wedluxHeroCardCurated')}</CardMeta>
            </FloatingCard>

            <FloatingCard data-hero-card $pos="bl">
              <CardEyebrow>
                <Camera size={11} style={{ marginRight: 4 }} />
                {t('landing.wedluxHeroCardPhoto')}
              </CardEyebrow>
              <CardTitle>{t('landing.wedluxHeroCardLuxury')}</CardTitle>
              <CardMeta>
                <MapPin size={11} style={{ marginRight: 4 }} />
                {t('landing.wedluxHeroCardPlace')}
              </CardMeta>
            </FloatingCard>

            <AccentMedia data-hero-accent>
              <img src={accentImage} alt="" aria-hidden loading="lazy" />
            </AccentMedia>
          </MediaStage>
        </HeroGrid>

        <StatsStrip>
          {stats.map(stat => (
            <StatItem key={stat.labelKey} data-hero-stat>
              <StatValue
                data-hero-count={stat.value}
                data-hero-suffix={stat.suffix}
              >
                0{stat.suffix}
              </StatValue>
              <StatLabel>{t(stat.labelKey)}</StatLabel>
            </StatItem>
          ))}
        </StatsStrip>

        <ScrollCue href="#services" data-hero-scroll>
          <ScrollArrow data-hero-scroll-arrow aria-hidden>
            <ChevronDown size={18} />
          </ScrollArrow>
          {t('landing.wedluxHeroScroll')}
        </ScrollCue>
      </HeroShell>

      <TrustBar data-hero-trust>
        <TrustInner>
          <TrustLabel>{t('landing.wedluxHeroTrusted')}</TrustLabel>
          <MarqueeViewport>
            <MarqueeTrack data-hero-marquee-track>
              {marqueeBrands.map((brand, index) => (
                <BrandChip key={`${brand}-${index}`}>{brand}</BrandChip>
              ))}
            </MarqueeTrack>
          </MarqueeViewport>
        </TrustInner>
      </TrustBar>
    </HeroRoot>
  );
}
