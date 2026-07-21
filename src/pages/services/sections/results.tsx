import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import type { DiscoveryVendor } from '../filters';
import {
  CardBadge,
  CardBody,
  CardFeatured,
  CardImage,
  CardMedia,
  CtaRow,
  EmptyArt,
  EmptyLead,
  EmptyState,
  EmptyTips,
  EmptyTitle,
  LoadMoreBtn,
  LoadMoreWrap,
  NameBlock,
  PrimaryCta,
  ResultsGrid,
  ResultsSection,
  SkeletonBlock,
  SkeletonCard,
  Stat,
  Stats,
  Tag,
  TagRow,
  TrustNote,
  VendorCard,
  VendorMeta,
  VendorName,
} from '../styled';
import styled from 'styled-components';
import { brandRgb } from '@/theme/brand';
import { fontFamily } from '@/theme';

const ServiceDescription = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  line-height: 1.45;
  color: rgba(${brandRgb.chocolate}, 0.72);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const OpenLink = styled(Link)`
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.5rem 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.14);
  background: transparent;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  line-height: 1.2;
  color: rgba(${brandRgb.chocolate}, 1);

  @media (min-width: 768px) {
    min-height: 40px;
    border-radius: 9999px;
    padding: 0.45rem 0.65rem;
  }
`;

interface ResultsProps {
  vendors: DiscoveryVendor[];
  total: number;
  isFiltering: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onShowFeatured: () => void;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

export function DiscoveryResults({
  vendors,
  total,
  isFiltering,
  hasMore,
  onLoadMore,
  onShowFeatured,
  loadMoreRef,
}: ResultsProps) {
  const { t } = useTranslation();
  void total;

  return (
    <ResultsSection id="results">
      <TrustNote>{t('servicesPage.trustLine')}</TrustNote>

      {isFiltering ? (
        <ResultsGrid aria-busy="true" aria-label="Loading results">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i}>
              <SkeletonBlock $h="11rem" />
              <div
                style={{ padding: '0.75rem', display: 'grid', gap: '0.5rem' }}
              >
                <SkeletonBlock $h="1rem" />
                <SkeletonBlock $h="0.75rem" />
                <SkeletonBlock $h="2.5rem" />
              </div>
            </SkeletonCard>
          ))}
        </ResultsGrid>
      ) : vendors.length === 0 ? (
        <EmptyState>
          <EmptyArt aria-hidden />
          <EmptyTitle>{t('servicesPage.emptyTitle')}</EmptyTitle>
          <EmptyLead>{t('servicesPage.emptyLead')}</EmptyLead>
          <EmptyTips>
            <li>{t('servicesPage.emptyTip1')}</li>
            <li>{t('servicesPage.emptyTip2')}</li>
            <li>{t('servicesPage.emptyTip3')}</li>
          </EmptyTips>
          <PrimaryCta type="button" onClick={onShowFeatured}>
            {t('servicesPage.emptyBrowseFeatured')}
          </PrimaryCta>
        </EmptyState>
      ) : (
        <>
          <ResultsGrid>
            {vendors.map((service, index) => (
              <VendorCard key={service.id} data-disc-card>
                <CardMedia>
                  <CardImage
                    src={service.image}
                    alt={service.displayName}
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                  {service.verified ? (
                    <CardBadge>{t('servicesPage.verified')}</CardBadge>
                  ) : null}
                  {service.featured ? (
                    <CardFeatured>{t('servicesPage.featured')}</CardFeatured>
                  ) : null}
                </CardMedia>
                <CardBody>
                  <NameBlock>
                    <VendorName>{service.displayName}</VendorName>
                    <VendorMeta>
                      <span>{service.category}</span>
                      <span>
                        <Star
                          size={12}
                          fill="currentColor"
                          style={{ display: 'inline', verticalAlign: '-2px' }}
                          aria-hidden
                        />{' '}
                        {service.rating.toFixed(1)} ({service.projects}{' '}
                        {t('servicesPage.reviews')})
                      </span>
                    </VendorMeta>
                  </NameBlock>

                  <ServiceDescription>{service.description}</ServiceDescription>

                  <Stats>
                    <Stat>
                      <strong>{service.images?.length ?? 1}</strong>
                      <span>{t('servicesPage.portfolioImages')}</span>
                    </Stat>
                  </Stats>

                  <TagRow>
                    {service.tags.slice(0, 3).map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagRow>

                  <CtaRow>
                    <OpenLink to={`${ROUTES.SERVICES}/${service.id}`}>
                      {t('servicesPage.openService')}
                    </OpenLink>
                  </CtaRow>
                </CardBody>
              </VendorCard>
            ))}
          </ResultsGrid>

          {hasMore ? (
            <LoadMoreWrap>
              <div ref={loadMoreRef} aria-hidden />
              <LoadMoreBtn type="button" onClick={onLoadMore}>
                {t('servicesPage.loadMore')}
              </LoadMoreBtn>
            </LoadMoreWrap>
          ) : null}
        </>
      )}
    </ResultsSection>
  );
}
