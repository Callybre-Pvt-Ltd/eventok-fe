import { ArrowUpRight, MapPin, ShieldCheck, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { formatBudget, type DiscoveryVendor } from '../filters';
import {
  CardBadge,
  CardBody,
  CardFeatured,
  CardHeader,
  CardImage,
  CardMedia,
  CtaRow,
  EmptyArt,
  EmptyLead,
  EmptyState,
  EmptyTips,
  EmptyTitle,
  GhostCta,
  LoadMoreBtn,
  LoadMoreWrap,
  Logo,
  MobileBudget,
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

interface ResultsProps {
  vendors: DiscoveryVendor[];
  total: number;
  isFiltering: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onConsult: (vendor: DiscoveryVendor) => void;
  onShowFeatured: () => void;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

export function DiscoveryResults({
  vendors,
  total,
  isFiltering,
  hasMore,
  onLoadMore,
  onConsult,
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
            {vendors.map((vendor, index) => (
              <VendorCard key={vendor.id} data-disc-card>
                <CardMedia>
                  <CardImage
                    src={vendor.image}
                    alt={vendor.displayName}
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                  {vendor.verified ? (
                    <CardBadge>
                      <ShieldCheck size={11} aria-hidden />
                      {t('servicesPage.verified')}
                    </CardBadge>
                  ) : null}
                  {vendor.featured ? (
                    <CardFeatured>{t('servicesPage.featured')}</CardFeatured>
                  ) : null}
                </CardMedia>
                <CardBody>
                  <CardHeader>
                    <Logo aria-hidden>{vendor.initials}</Logo>
                    <NameBlock>
                      <VendorName>{vendor.displayName}</VendorName>
                      <VendorMeta>
                        <span>{vendor.category}</span>
                        <span>
                          <MapPin
                            size={12}
                            style={{ display: 'inline', verticalAlign: '-2px' }}
                            aria-hidden
                          />{' '}
                          {vendor.city}
                        </span>
                        <span>
                          <Star
                            size={12}
                            fill="currentColor"
                            style={{ display: 'inline', verticalAlign: '-2px' }}
                            aria-hidden
                          />{' '}
                          {vendor.rating.toFixed(1)}
                        </span>
                      </VendorMeta>
                    </NameBlock>
                  </CardHeader>

                  <MobileBudget>
                    <span>{t('servicesPage.startingBudget')} </span>
                    {formatBudget(vendor.budgetFrom)}
                  </MobileBudget>

                  <Stats>
                    <Stat>
                      <strong>{vendor.projects}</strong>
                      <span>{t('servicesPage.projects')}</span>
                    </Stat>
                    <Stat>
                      <strong>{vendor.years}</strong>
                      <span>{t('servicesPage.years')}</span>
                    </Stat>
                    <Stat>
                      <strong>{vendor.portfolioCount}</strong>
                      <span>{t('servicesPage.portfolioImages')}</span>
                    </Stat>
                    <Stat>
                      <strong>{formatBudget(vendor.budgetFrom)}</strong>
                      <span>{t('servicesPage.startingBudget')}</span>
                    </Stat>
                  </Stats>

                  <TagRow>
                    {vendor.tags.slice(0, 3).map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagRow>

                  <CtaRow>
                    <GhostCta to={ROUTES.VENDORS}>
                      {t('servicesPage.viewPortfolio')}
                    </GhostCta>
                    <PrimaryCta type="button" onClick={() => onConsult(vendor)}>
                      {t('servicesPage.requestConsultation')}
                      <ArrowUpRight size={14} aria-hidden />
                    </PrimaryCta>
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
