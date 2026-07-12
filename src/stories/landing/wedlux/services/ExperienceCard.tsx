import { useTranslation } from 'react-i18next';
import { ArrowUpRight, MapPin, ShieldCheck, Star } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { Experience, ExperienceLayout } from './experiences';
import {
  Card,
  CardBody,
  CardTitle,
  CategoryBadge,
  CtaRow,
  GalleryRow,
  GalleryThumb,
  GhostCta,
  Location,
  Media,
  MetaItem,
  MetaRow,
  Partner,
  PartnerAvatar,
  Photo,
  PrimaryCta,
  Rating,
  Story,
  SweepLayer,
  TopRow,
  Verified,
} from './styled';

interface ExperienceCardProps {
  experience: Experience;
  variant?: ExperienceLayout;
}

export function ExperienceCard({ experience, variant }: ExperienceCardProps) {
  const { t } = useTranslation();
  const layout = variant ?? experience.layout;
  const featured = layout === 'featured';
  const showStory = featured || layout === 'panorama';
  const showGallery = featured && experience.gallery?.length;
  const showFullMeta = featured || layout === 'medium' || layout === 'panorama';

  return (
    <Card $variant={layout} data-exp-card>
      <Media data-exp-parallax={featured ? '' : undefined}>
        <Photo
          src={experience.image}
          alt={t(experience.titleKey)}
          loading="lazy"
          decoding="async"
        />
        <SweepLayer data-exp-sweep />
      </Media>

      <CardBody $featured={featured}>
        <TopRow>
          <CategoryBadge>{t(experience.categoryKey)}</CategoryBadge>
          <Verified>
            <ShieldCheck size={12} aria-hidden />
            {t('landing.wedluxExpVerified')}
          </Verified>
        </TopRow>

        <Location>
          <MapPin size={13} aria-hidden />
          {t(experience.locationKey)}
        </Location>

        <CardTitle $featured={featured}>{t(experience.titleKey)}</CardTitle>

        {showStory ? <Story>{t(experience.storyKey)}</Story> : null}

        {showFullMeta ? (
          <MetaRow data-exp-meta>
            <Rating>
              <Star size={13} fill="currentColor" aria-hidden />
              {experience.rating.toFixed(1)}
              <span aria-hidden>·</span>
              {t('landing.wedluxExpReviews', { count: experience.reviewCount })}
            </Rating>
            <MetaItem>
              {t('landing.wedluxExpGuests', { range: experience.guests })}
            </MetaItem>
            <MetaItem>{t(experience.availabilityKey)}</MetaItem>
            <Partner>
              <PartnerAvatar aria-hidden>
                {experience.partnerInitials}
              </PartnerAvatar>
              {t('landing.wedluxExpPartner')}
            </Partner>
          </MetaRow>
        ) : (
          <MetaRow data-exp-meta>
            <Rating>
              <Star size={12} fill="currentColor" aria-hidden />
              {experience.rating.toFixed(1)}
            </Rating>
            <MetaItem>{t(experience.availabilityKey)}</MetaItem>
          </MetaRow>
        )}

        {showGallery ? (
          <GalleryRow aria-hidden>
            {experience.gallery!.slice(0, 3).map(src => (
              <GalleryThumb key={src} src={src} alt="" loading="lazy" />
            ))}
          </GalleryRow>
        ) : null}

        <CtaRow data-exp-cta>
          <PrimaryCta to={ROUTES.CONTACT}>
            {t('landing.wedluxExpRequestQuote')}
            <ArrowUpRight size={14} aria-hidden />
          </PrimaryCta>
          <GhostCta to={ROUTES.SERVICES}>
            {featured
              ? t('landing.wedluxExpExploreStory')
              : t('landing.wedluxExpDiscover')}
          </GhostCta>
        </CtaRow>
      </CardBody>
    </Card>
  );
}
