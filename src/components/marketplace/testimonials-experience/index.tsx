import { motion } from 'framer-motion';
import { Play, Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandColors } from '@/theme/brand';
import { useTestimonialsExperience } from './helper';
import {
  Wrap,
  Hero,
  HeroImage,
  HeroContent,
  TrustBar,
  TrustItem,
  Filters,
  FilterBtn,
  FeaturedSection,
  StoryCard,
  StoryPhoto,
  StoryBody,
  VideoRow,
  VideoCard,
  PlayIcon,
  CarouselTrack,
  CarouselInner,
  ReviewCard,
  GalleryMasonry,
  GalleryItem,
} from './styled';

export function TestimonialsExperience() {
  const { t } = useTranslation();
  const {
    palette,
    filter,
    setFilter,
    filters,
    trustScore,
    avgRating,
    featured,
    stories,
    videos,
    gallery,
  } = useTestimonialsExperience();

  return (
    <Wrap>
      <Hero>
        <HeroImage
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85"
          alt=""
        />
        <HeroContent
          $palette={palette}
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>{t('marketplace.testimonialsHero')}</h1>
          <p>{t('landing.testimonialsSubtitle')}</p>
        </HeroContent>
      </Hero>

      <TrustBar $palette={palette}>
        <TrustItem>
          <strong>{trustScore}</strong>
          <span>{t('marketplace.testimonialsTrustScore')}</span>
        </TrustItem>
        <TrustItem>
          <strong>
            <Star size={18} fill="currentColor" /> {avgRating}
          </strong>
          <span>{t('marketplace.testimonialsAvgRating')}</span>
        </TrustItem>
        <TrustItem>
          <strong>12,400+</strong>
          <span>{t('marketplace.testimonialsFeatured')}</span>
        </TrustItem>
      </TrustBar>

      <Filters>
        {filters.map(f => (
          <FilterBtn
            key={f.id}
            type="button"
            $active={filter === f.id}
            $palette={palette}
            onClick={() => setFilter(f.id)}
          >
            {t(f.labelKey)}
          </FilterBtn>
        ))}
      </Filters>

      <FeaturedSection>
        <h2>{t('marketplace.testimonialsFeatured')}</h2>
        <StoryCard
          $palette={palette}
          as={motion.article}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          viewport={{ once: true }}
        >
          <StoryPhoto src={featured.photo} alt={featured.name} />
          <StoryBody $palette={palette}>
            <Quote size={28} opacity={0.3} />
            <p>&ldquo;{featured.quote}&rdquo;</p>
            <cite>
              {featured.name} · {featured.event}
            </cite>
          </StoryBody>
        </StoryCard>
      </FeaturedSection>

      <FeaturedSection>
        <h2>{t('marketplace.testimonialsVideo')}</h2>
        <VideoRow>
          {videos.map(v => (
            <VideoCard key={v.id} $palette={palette}>
              <img src={v.thumb} alt={v.title} loading="lazy" />
              <PlayIcon>
                <Play size={24} fill={brandColors.sage} />
              </PlayIcon>
              <span>{v.title}</span>
            </VideoCard>
          ))}
        </VideoRow>
      </FeaturedSection>

      <FeaturedSection>
        <h2>{t('marketplace.testimonialsSuccess')}</h2>
        <CarouselTrack $palette={palette}>
          <CarouselInner>
            {[...stories, ...stories].map((s, i) => (
              <ReviewCard key={`${s.id}-${i}`} $palette={palette}>
                <div>
                  <Star size={14} fill="currentColor" /> {s.rating}
                </div>
                <p>&ldquo;{s.comment}&rdquo;</p>
                <cite>— {s.customerName}</cite>
              </ReviewCard>
            ))}
          </CarouselInner>
        </CarouselTrack>
      </FeaturedSection>

      <FeaturedSection>
        <h2>{t('marketplace.testimonialsWeddingGallery')}</h2>
        <GalleryMasonry>
          {gallery.map((url, i) => (
            <GalleryItem
              key={i}
              $tall={i % 3 === 0}
              as={motion.div}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
            >
              <img src={url} alt="" loading="lazy" />
            </GalleryItem>
          ))}
        </GalleryMasonry>
      </FeaturedSection>
    </Wrap>
  );
}
