import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import { LoadingState } from '@/components/global/loading-state';
import { ROUTES } from '@/constants/routes';
import { marketplaceService } from '@/services';
import { formatBudget } from '@/pages/services/filters';
import {
  BadgeRow,
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
  RatingRow,
  ReviewCount,
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

function formatFullPrice(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export default function ServiceDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);

  const serviceQuery = useQuery({
    queryKey: ['marketplace', 'service', id],
    queryFn: async () => {
      const res = await marketplaceService.getService(id!);
      if (res.error || !res.data) throw new Error(res.error ?? 'Not found');
      return res.data;
    },
    enabled: Boolean(id),
  });

  const similarQuery = useQuery({
    queryKey: ['marketplace', 'similar', serviceQuery.data?.categorySlug],
    queryFn: async () => {
      const res = await marketplaceService.listServices({
        category_id: serviceQuery.data?.categorySlug,
        page_size: 8,
      });
      if (res.error) throw new Error(res.error);
      return (res.data?.items ?? []).filter(item => item.id !== id).slice(0, 4);
    },
    enabled: Boolean(serviceQuery.data?.categorySlug),
  });

  const service = serviceQuery.data ?? null;
  const similar = similarQuery.data ?? [];

  if (serviceQuery.isLoading) {
    return (
      <PageShell>
        <PublicHeader />
        <LoadingState />
        <PublicFooter />
      </PageShell>
    );
  }

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
            <SectionBody>{t('servicesPage.serviceNotFoundLead')}</SectionBody>
            <SecondaryBuy to={ROUTES.SERVICES}>
              {t('servicesPage.backToServices')}
            </SecondaryBuy>
          </EmptyState>
        </DetailWrap>
        <PublicFooter />
      </PageShell>
    );
  }

  const images = service.images?.length ? service.images : [service.image];
  const activeImage = images[activeIndex] ?? images[0];
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
                  aria-label={`${t('servicesPage.serviceGallery')} ${
                    index + 1
                  }`}
                >
                  <img src={src} alt="" loading="lazy" />
                </Thumb>
              ))}
            </ThumbColumn>

            <MainImageWrap>
              <MainImage src={activeImage} alt={service.displayName} />
              <BadgeRow>
                <Pill>
                  <ShieldCheck size={12} aria-hidden />
                  {t('servicesPage.verified')}
                </Pill>
              </BadgeRow>
            </MainImageWrap>
          </GalleryPane>

          <InfoPane>
            <CategoryLink to={ROUTES.SERVICES}>{service.category}</CategoryLink>
            <Title>{service.displayName}</Title>

            <RatingRow>
              <RatingBadge>
                {service.rating ? service.rating.toFixed(1) : '—'}
                <Star size={11} fill="currentColor" aria-hidden />
              </RatingBadge>
              <ReviewCount>{t('servicesPage.bookNow')}</ReviewCount>
            </RatingRow>

            <PriceSection>
              <PriceRow>
                <PriceValue>{formatFullPrice(service.budgetFrom)}</PriceValue>
              </PriceRow>
              <PriceNote>
                {t('servicesPage.priceInclusiveNote', {
                  amount: formatBudget(service.budgetFrom),
                })}
              </PriceNote>
            </PriceSection>

            <InfoTiles>
              <InfoTile>
                <strong>{t('servicesPage.tileLocation')}</strong>
                <span>
                  <MapPin size={12} aria-hidden /> India
                </span>
              </InfoTile>
              <InfoTile>
                <strong>{t('servicesPage.tileAvailability')}</strong>
                <span>
                  <CalendarCheck size={12} aria-hidden />{' '}
                  {t('servicesPage.checkAvailability')}
                </span>
              </InfoTile>
              <InfoTile>
                <strong>{t('servicesPage.tileStyle')}</strong>
                <span>
                  <Sparkles size={12} aria-hidden /> {service.category}
                </span>
              </InfoTile>
            </InfoTiles>

            <TagRow>
              {service.tags.map(tag => (
                <Tag key={`chip-${tag}`}>{tag}</Tag>
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
            <SectionBody>
              {service.description ||
                'Book this service for your event date. EventOK keeps vendor contacts private.'}
            </SectionBody>
          </SectionCard>
          <SectionCard>
            <SectionTitle>{t('servicesPage.whatsIncluded')}</SectionTitle>
            <Highlights>
              <HighlightItem>{t('servicesPage.includePlan')}</HighlightItem>
              <HighlightItem>{t('servicesPage.includeCoord')}</HighlightItem>
              <HighlightItem>{t('servicesPage.includeSupport')}</HighlightItem>
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

        <SectionCard>
          <SectionTitle>{t('servicesPage.specifications')}</SectionTitle>
          <SpecGrid>
            <SpecLabel>{t('servicesPage.categoryLabel')}</SpecLabel>
            <SpecValue>{service.category}</SpecValue>
            <SpecLabel>{t('servicesPage.servicePrice')}</SpecLabel>
            <SpecValue>
              {t('servicesPage.startingBudget')}{' '}
              {formatFullPrice(service.budgetFrom)}
            </SpecValue>
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
          </FaqList>
        </SectionCard>

        {similar.length > 0 ? (
          <SectionCard>
            <SectionTitle>{t('servicesPage.similarServices')}</SectionTitle>
            <SimilarGrid>
              {similar.map(item => (
                <SimilarCard key={item.id} to={`${ROUTES.SERVICES}/${item.id}`}>
                  <img src={item.image} alt="" loading="lazy" />
                  <div>
                    <h3>{item.displayName}</h3>
                    <strong>{formatFullPrice(item.budgetFrom)}</strong>
                    <span>{item.category}</span>
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
