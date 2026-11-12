import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
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
  SearchDivider,
  SearchFieldEvent,
  SearchFieldQuery,
  SearchSubmitBtn,
  SearchWidget,
  Slide,
  SlideImage,
  Subtitle,
  Title,
  TrustDot,
  TrustItem,
  TrustRow,
} from './styled';

const EVENT_OPTIONS = [
  { value: '', label: 'All Celebrations' },
  { value: 'wedding', label: 'Weddings & Receptions' },
  { value: 'birthday', label: 'Birthday Parties' },
  { value: 'anniversary', label: 'Anniversary Decor' },
  { value: 'corporate', label: 'Corporate Events' },
  { value: 'baby-shower', label: 'Baby Showers' },
  { value: 'home-decoration', label: 'Home Decor & Pooja' },
];

export function HeroCarousel() {
  const { t } = useTranslation();
  const hero = useHeroCarousel();
  const { mode } = useTheme();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [eventType, setEventType] = useState('');

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (eventType) params.set('event', eventType);
    const queryString = params.toString();
    navigate(queryString ? `${ROUTES.SHOP}?${queryString}` : ROUTES.SHOP);
  };

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

              <SearchWidget onSubmit={onSearchSubmit}>
                <SearchFieldEvent>
                  <Sparkles size={16} />
                  <select
                    value={eventType}
                    onChange={e => setEventType(e.target.value)}
                    aria-label="Filter by event celebration type"
                  >
                    {EVENT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </SearchFieldEvent>

                <SearchDivider />

                <SearchFieldQuery>
                  <Search size={18} />
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder='Search "Mandap", "Stage decor", "Photography"...'
                    aria-label="Search event services and decorations"
                  />
                </SearchFieldQuery>

                <SearchSubmitBtn type="submit">
                  <span>Find Services</span>
                  <ArrowRight size={16} />
                </SearchSubmitBtn>
              </SearchWidget>

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

              <TrustRow>
                <TrustItem>
                  <Star size={14} fill="currentColor" />
                  <span>4.9★ Rated by 12,000+ Hosts</span>
                </TrustItem>
                <TrustDot />
                <TrustItem>
                  <CheckCircle2 size={14} />
                  <span>450+ Verified Vendors</span>
                </TrustItem>
                <TrustDot />
                <TrustItem>
                  <ShieldCheck size={14} />
                  <span>100% Advance Protection</span>
                </TrustItem>
              </TrustRow>
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
        </>
      )}
    </HeroWrap>
  );
}
