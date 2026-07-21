import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CalendarCheck,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PublicHeader } from '@/components/global/public-header';
import { PublicFooter } from '@/components/global/public-footer';
import { ROUTES } from '@/constants/routes';
import {
  discoveryVendors,
  formatBudget,
  type DiscoveryVendor,
} from '@/pages/services/filters';
import {
  BadgeRow,
  BarFill,
  BarList,
  BarRow,
  BarTrack,
  BigRating,
  Breadcrumb,
  CategoryLink,
  DetailWrap,
  EmptyState,
  FaqItem,
  FaqList,
  GalleryMasonry,
  GalleryPane,
  HighlightItem,
  Highlights,
  InfoPane,
  InfoTile,
  InfoTiles,
  MainImage,
  MainImageWrap,
  MrpLine,
  OfferChip,
  OfferItem,
  OfferList,
  PageShell,
  Pill,
  PriceNote,
  PriceRow,
  PriceSection,
  PriceValue,
  PrimaryBuy,
  ProcessStep,
  ProcessSteps,
  ProductCard,
  RatingBadge,
  RatingBreakdown,
  RatingRow,
  ReviewCard,
  ReviewCount,
  ReviewList,
  SecondaryBuy,
  SectionBody,
  SectionCard,
  SectionTitle,
  SimilarCard,
  SimilarGrid,
  SpecGrid,
  SpecLabel,
  SpecValue,
  StickyBar,
  StickyCta,
  StickyPrice,
  Tag,
  TagRow,
  Thumb,
  ThumbColumn,
  Title,
  CtaStack,
  SplitSections,
} from './styled';
import { BookServiceModal } from './book-modal';

function getServiceById(id: string | undefined): DiscoveryVendor | null {
  if (!id) return null;
  return discoveryVendors.find(s => s.id === id) ?? null;
}

function formatFullPrice(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function buildReviews(service: DiscoveryVendor) {
  const names = [
    'Ananya R.',
    'Rohan M.',
    'Priya S.',
    'Kabir D.',
    'Neha V.',
    'Arjun P.',
  ];
  return names.slice(0, 4).map((name, index) => ({
    id: `${service.id}-rev-${index}`,
    name,
    rating: Math.max(4, Math.round(service.rating) - (index % 2)),
    date: `2026-0${3 + index}-1${index}`,
    comment: [
      `Booked ${service.displayName} for our ${service.category.toLowerCase()} and the execution felt premium end to end.`,
      `Loved the coordination and attention to detail. The gallery matched what we actually got on the day.`,
      `Smooth process through EventOK. Clear communication and a polished final experience.`,
      `Great value for the booking. Guests kept asking who planned everything.`,
    ][index],
  }));
}

const RATING_BARS = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 6 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 2 },
];

export default function ServiceDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const service = useMemo(() => getServiceById(id), [id]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);

  const similar = useMemo(() => {
    if (!service) return [];
    return discoveryVendors
      .filter(
        item =>
          item.id !== service.id &&
          (item.categorySlug === service.categorySlug ||
            item.tags.some(tag => service.tags.includes(tag))),
      )
      .slice(0, 4);
  }, [service]);

  if (!service) {
    return (
      <PageShell>
        <PublicHeader />
        <DetailWrap>
          <EmptyState>
            <Breadcrumb>
              <Link to={ROUTES.HOME}>{t('common.appName')}</Link>
              <span aria-hidden>/</span>
              <Link to={ROUTES.SERVICES}>{t('nav.services')}</Link>
            </Breadcrumb>
            <Title>{t('servicesPage.serviceNotFound')}</Title>
            <SectionBody style={{ marginTop: '0.75rem' }}>
              {t('servicesPage.serviceNotFoundLead')}
            </SectionBody>
            <div style={{ marginTop: '1rem' }}>
              <SecondaryBuy to={ROUTES.SERVICES}>
                {t('servicesPage.backToServices')}
              </SecondaryBuy>
            </div>
          </EmptyState>
        </DetailWrap>
        <PublicFooter />
      </PageShell>
    );
  }

  const images = service.images?.length ? service.images : [service.image];
  const activeImage = images[activeIndex] ?? images[0];
  const compareAt = Math.round(service.budgetFrom * 1.18);
  const reviews = buildReviews(service);
  const longDescription = [
    service.description,
    `This ${service.category.toLowerCase()} service is curated for ${service.city} and nearby destinations, with styling that fits ${service.tags
      .slice(0, 2)
      .join(' and ')
      .toLowerCase()} celebrations.`,
    'EventOK keeps vendor contacts private. Browse the service, book directly on the platform, and continue planning with EventOK support.',
  ].join(' ');

  const openBook = () => setBookOpen(true);
  return (
    <PageShell>
      <PublicHeader />
      <DetailWrap>
        <Breadcrumb aria-label="Breadcrumb">
          <Link to={ROUTES.HOME}>{t('common.appName')}</Link>
          <span aria-hidden>/</span>
          <Link to={ROUTES.SERVICES}>{t('nav.services')}</Link>
          <span aria-hidden>/</span>
          <Link to={`${ROUTES.SERVICES}?type=${service.categorySlug}`}>
            {service.category}
          </Link>
          <span aria-hidden>/</span>
          <span data-current>{service.displayName}</span>
        </Breadcrumb>

        <ProductCard>
          <GalleryPane>
            <ThumbColumn>
              {images.map((src, index) => (
                <Thumb
                  key={`${service.id}-thumb-${index}`}
                  type="button"
                  $active={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${t('servicesPage.serviceGallery')} ${index + 1}`}
                >
                  <img src={src} alt="" loading="lazy" />
                </Thumb>
              ))}
            </ThumbColumn>

            <MainImageWrap>
              <MainImage src={activeImage} alt={service.displayName} />
              <BadgeRow>
                {service.verified ? (
                  <Pill>
                    <ShieldCheck size={12} aria-hidden />
                    {t('servicesPage.verified')}
                  </Pill>
                ) : null}
                {service.featured ? (
                  <Pill $tone="featured">{t('servicesPage.featured')}</Pill>
                ) : null}
              </BadgeRow>
            </MainImageWrap>
          </GalleryPane>

          <InfoPane>
            <CategoryLink to={`${ROUTES.SERVICES}?type=${service.categorySlug}`}>
              {service.category}
            </CategoryLink>

            <Title>{service.displayName}</Title>

            <RatingRow>
              <RatingBadge>
                {service.rating.toFixed(1)}
                <Star size={11} fill="currentColor" aria-hidden />
              </RatingBadge>
              <ReviewCount>
                {service.projects.toLocaleString('en-IN')}{' '}
                {t('servicesPage.reviews')} · {service.bookings}{' '}
                {t('servicesPage.orders')}
              </ReviewCount>
            </RatingRow>

            <PriceSection>
              <MrpLine>
                {t('servicesPage.mrp')}
                <s>{formatFullPrice(compareAt)}</s>
              </MrpLine>
              <PriceRow>
                <PriceValue>{formatFullPrice(service.budgetFrom)}</PriceValue>
                <OfferChip>{t('servicesPage.startingOffer')}</OfferChip>
              </PriceRow>
              <PriceNote>
                {t('servicesPage.priceInclusiveNote', {
                  amount: formatBudget(service.budgetFrom),
                })}
              </PriceNote>
              <OfferList>
                <OfferItem>
                  <strong>{t('servicesPage.offerBank')}</strong>
                  {t('servicesPage.offerBankDetail')}
                </OfferItem>
                <OfferItem>
                  <strong>{t('servicesPage.offerBundle')}</strong>
                  {t('servicesPage.offerBundleDetail')}
                </OfferItem>
                <OfferItem>
                  <strong>{t('servicesPage.offerEarly')}</strong>
                  {t('servicesPage.offerEarlyDetail')}
                </OfferItem>
              </OfferList>
            </PriceSection>

            <InfoTiles>
              <InfoTile>
                <strong>{t('servicesPage.tileLocation')}</strong>
                <span>
                  <MapPin
                    size={12}
                    style={{ display: 'inline', verticalAlign: '-1px' }}
                    aria-hidden
                  />{' '}
                  {service.city}, {service.state}
                </span>
              </InfoTile>
              <InfoTile>
                <strong>{t('servicesPage.tileAvailability')}</strong>
                <span>
                  <CalendarCheck
                    size={12}
                    style={{ display: 'inline', verticalAlign: '-1px' }}
                    aria-hidden
                  />{' '}
                  {service.availableThisMonth
                    ? t('servicesPage.availableThisMonth')
                    : t('servicesPage.checkAvailability')}
                </span>
              </InfoTile>
              <InfoTile>
                <strong>{t('servicesPage.tileExperience')}</strong>
                <span>
                  {service.years}+ {t('servicesPage.years')}
                </span>
              </InfoTile>
              <InfoTile>
                <strong>{t('servicesPage.tileStyle')}</strong>
                <span>
                  <Sparkles
                    size={12}
                    style={{ display: 'inline', verticalAlign: '-1px' }}
                    aria-hidden
                  />{' '}
                  {service.tags.slice(0, 2).join(' · ')}
                </span>
              </InfoTile>
            </InfoTiles>

            <div>
              <SectionTitle>{t('servicesPage.highlights')}</SectionTitle>
              <Highlights>
                {service.tags.map(tag => (
                  <HighlightItem key={tag}>{tag} styling</HighlightItem>
                ))}
                <HighlightItem>
                  {t('servicesPage.highlightPhotos', { count: images.length })}
                </HighlightItem>
                <HighlightItem>
                  {t('servicesPage.highlightPrivateQuote')}
                </HighlightItem>
                <HighlightItem>
                  {t('servicesPage.highlightCoverage', {
                    city: service.city,
                  })}
                </HighlightItem>
              </Highlights>
            </div>

            <TagRow>
              {service.tags.map(tag => (
                <Tag key={`chip-${tag}`}>{tag}</Tag>
              ))}
              {service.eventTypes.slice(0, 3).map(type => (
                <Tag key={`type-${type}`}>{type}</Tag>
              ))}
            </TagRow>

            <CtaStack>
              <PrimaryBuy type="button" onClick={openBook}>
                {t('servicesPage.bookNow')}
              </PrimaryBuy>
              <SecondaryBuy to={ROUTES.SERVICES}>
                {t('servicesPage.backToServices')}
              </SecondaryBuy>
            </CtaStack>
          </InfoPane>
        </ProductCard>

        <SplitSections>
          <SectionCard>
            <SectionTitle>{t('servicesPage.aboutService')}</SectionTitle>
            <SectionBody>{longDescription}</SectionBody>
          </SectionCard>
          <SectionCard>
            <SectionTitle>{t('servicesPage.whatsIncluded')}</SectionTitle>
            <Highlights>
              <HighlightItem>{t('servicesPage.includePlan')}</HighlightItem>
              <HighlightItem>{t('servicesPage.includeDecor')}</HighlightItem>
              <HighlightItem>{t('servicesPage.includeCoord')}</HighlightItem>
              <HighlightItem>{t('servicesPage.includeSupport')}</HighlightItem>
              <HighlightItem>{t('servicesPage.includeReport')}</HighlightItem>
            </Highlights>
          </SectionCard>
        </SplitSections>

        <SectionCard>
          <SectionTitle>{t('servicesPage.howItWorks')}</SectionTitle>
          <ProcessSteps>
            <ProcessStep>
              <strong>1. {t('servicesPage.stepBrowse')}</strong>
              <span>{t('servicesPage.stepBrowseDetail')}</span>
            </ProcessStep>
            <ProcessStep>
              <strong>2. {t('servicesPage.stepCompare')}</strong>
              <span>{t('servicesPage.stepCompareDetail')}</span>
            </ProcessStep>
            <ProcessStep>
              <strong>3. {t('servicesPage.stepPlan')}</strong>
              <span>{t('servicesPage.stepPlanDetail')}</span>
            </ProcessStep>
            <ProcessStep>
              <strong>4. {t('servicesPage.stepCelebrate')}</strong>
              <span>{t('servicesPage.stepCelebrateDetail')}</span>
            </ProcessStep>
          </ProcessSteps>
        </SectionCard>

        <SectionCard>
          <SectionTitle>{t('servicesPage.serviceGallery')}</SectionTitle>
          <GalleryMasonry>
            {images.map((src, index) => (
              <img
                key={`${service.id}-grid-${index}`}
                src={src}
                alt=""
                loading="lazy"
              />
            ))}
          </GalleryMasonry>
        </SectionCard>

        <SplitSections>
          <SectionCard>
            <SectionTitle>{t('servicesPage.specifications')}</SectionTitle>
            <SpecGrid>
              <SpecLabel>{t('servicesPage.categoryLabel')}</SpecLabel>
              <SpecValue>{service.category}</SpecValue>
              <SpecLabel>{t('servicesPage.ratingLabel')}</SpecLabel>
              <SpecValue>
                {service.rating.toFixed(1)} / 5 · {service.projects}{' '}
                {t('servicesPage.reviews')}
              </SpecValue>
              <SpecLabel>{t('servicesPage.servicePrice')}</SpecLabel>
              <SpecValue>
                {t('servicesPage.startingBudget')}{' '}
                {formatFullPrice(service.budgetFrom)}
              </SpecValue>
              <SpecLabel>{t('servicesPage.tileLocation')}</SpecLabel>
              <SpecValue>{service.locationLabel}</SpecValue>
              <SpecLabel>{t('servicesPage.portfolioImages')}</SpecLabel>
              <SpecValue>{images.length}</SpecValue>
              <SpecLabel>{t('servicesPage.availabilityLabel')}</SpecLabel>
              <SpecValue>
                {service.availableThisMonth
                  ? t('servicesPage.availableThisMonth')
                  : t('servicesPage.checkAvailability')}
              </SpecValue>
              <SpecLabel>{t('servicesPage.tileExperience')}</SpecLabel>
              <SpecValue>
                {service.years}+ {t('servicesPage.years')}
              </SpecValue>
              <SpecLabel>{t('servicesPage.eventTypeLabel')}</SpecLabel>
              <SpecValue>{service.eventTypes.join(', ')}</SpecValue>
            </SpecGrid>
          </SectionCard>
          <SectionCard>
            <SectionTitle>{t('servicesPage.faqTitle')}</SectionTitle>
            <FaqList>
              <FaqItem>
                <summary>{t('servicesPage.faq1q')}</summary>
                <p>{t('servicesPage.faq1a')}</p>
              </FaqItem>
              <FaqItem>
                <summary>{t('servicesPage.faq2q')}</summary>
                <p>{t('servicesPage.faq2a')}</p>
              </FaqItem>
              <FaqItem>
                <summary>{t('servicesPage.faq3q')}</summary>
                <p>{t('servicesPage.faq3a')}</p>
              </FaqItem>
              <FaqItem>
                <summary>{t('servicesPage.faq4q')}</summary>
                <p>{t('servicesPage.faq4a')}</p>
              </FaqItem>
            </FaqList>
          </SectionCard>
        </SplitSections>

        <SectionCard>
          <SectionTitle>{t('servicesPage.ratingsReviews')}</SectionTitle>
          <RatingBreakdown>
            <BigRating>
              <strong>{service.rating.toFixed(1)}</strong>
              <span>
                {service.projects.toLocaleString('en-IN')}{' '}
                {t('servicesPage.reviews')}
              </span>
            </BigRating>
            <BarList>
              {RATING_BARS.map(bar => (
                <BarRow key={bar.stars}>
                  <span>{bar.stars}★</span>
                  <BarTrack>
                    <BarFill $pct={bar.pct} />
                  </BarTrack>
                  <span>{bar.pct}%</span>
                </BarRow>
              ))}
            </BarList>
          </RatingBreakdown>
          <ReviewList>
            {reviews.map(review => (
              <ReviewCard key={review.id}>
                <header>
                  <RatingBadge>
                    {review.rating}
                    <Star size={11} fill="currentColor" aria-hidden />
                  </RatingBadge>
                  <h3>{review.name}</h3>
                  <time dateTime={review.date}>{review.date}</time>
                </header>
                <p>{review.comment}</p>
              </ReviewCard>
            ))}
          </ReviewList>
        </SectionCard>

        {similar.length > 0 ? (
          <SectionCard>
            <SectionTitle>{t('servicesPage.similarServices')}</SectionTitle>
            <SimilarGrid>
              {similar.map(item => (
                <SimilarCard
                  key={item.id}
                  to={`${ROUTES.SERVICES}/${item.id}`}
                >
                  <img src={item.image} alt="" loading="lazy" />
                  <div>
                    <h3>{item.displayName}</h3>
                    <strong>{formatFullPrice(item.budgetFrom)}</strong>
                    <span>
                      ★ {item.rating.toFixed(1)} · {item.category}
                    </span>
                  </div>
                </SimilarCard>
              ))}
            </SimilarGrid>
          </SectionCard>
        ) : null}
      </DetailWrap>

      <StickyBar>
        <StickyPrice>
          <small>{t('servicesPage.servicePrice')}</small>
          <strong>{formatFullPrice(service.budgetFrom)}</strong>
        </StickyPrice>
        <StickyCta type="button" onClick={openBook}>
          {t('servicesPage.bookNow')}
        </StickyCta>
      </StickyBar>

      <BookServiceModal
        service={bookOpen ? service : null}
        onClose={() => setBookOpen(false)}
      />

      <PublicFooter />
    </PageShell>
  );
}
