import { ArrowRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import {
  Section,
  SectionInner,
  SectionTitle,
} from '@/components/storefront/shared/styled';
import { formatPrice } from '@/utils/storefront/pricing';
import { useVenuesSection } from './helper';
import {
  Banner,
  BannerCollage,
  BannerCopy,
  BannerCta,
  BannerEyebrow,
  BannerGlow,
  BannerImage,
  BannerTitle,
  ListHead,
  VenueBody,
  VenueButton,
  VenueCard,
  VenueFoot,
  VenueGrid,
  VenueImage,
  VenueMeta,
  VenueName,
  VenuePrice,
  VenueTag,
  VenueUnit,
} from './styled';

export function VenuesSection() {
  const { t } = useTranslation();
  const { venues } = useVenuesSection();

  return (
    <Section>
      <SectionInner>
        <Banner>
          <BannerGlow />
          <BannerCopy>
            <BannerEyebrow>{t('storefront.venuesEyebrow')}</BannerEyebrow>
            <BannerTitle>{t('storefront.venuesTitle')}</BannerTitle>
            <BannerCta href={`${ROUTES.SHOP}?category=cafe-booking`}>
              {t('storefront.venuesCta')}
              <ArrowRight size={16} />
            </BannerCta>
          </BannerCopy>
          <BannerCollage>
            {venues.slice(0, 3).map(venue => (
              <BannerImage key={venue.id} src={venue.image} alt="" />
            ))}
          </BannerCollage>
        </Banner>

        <ListHead>
          <SectionTitle>{t('storefront.venuesListTitle')}</SectionTitle>
        </ListHead>
        <VenueGrid>
          {venues.map(venue => (
            <VenueCard key={venue.id}>
              <VenueImage src={venue.image} alt={venue.name} loading="lazy" />
              <VenueBody>
                <VenueName>{venue.name}</VenueName>
                <VenueMeta>
                  <MapPin size={12} />
                  {venue.location}
                </VenueMeta>
                <VenueTag>{venue.tag}</VenueTag>
                <VenueFoot>
                  <span>
                    <VenuePrice>
                      {formatPrice(venue.startingPricePerPerson)}
                    </VenuePrice>
                    <VenueUnit>{t('storefront.perPerson')}</VenueUnit>
                  </span>
                  <VenueButton href={`${ROUTES.SHOP}?category=cafe-booking`}>
                    {t('storefront.venuesView')}
                  </VenueButton>
                </VenueFoot>
              </VenueBody>
            </VenueCard>
          ))}
        </VenueGrid>
      </SectionInner>
    </Section>
  );
}
