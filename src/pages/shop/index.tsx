import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { EVENT_TYPE_FILTERS } from '@/constants/catalog';
import { ROUTES } from '@/constants/routes';
import { FiltersPanel } from '@/components/storefront/filters-panel';
import { ProductCard } from '@/components/storefront/product-card';
import { StoreLayout } from '@/components/storefront/store-layout';
import { useShopPage } from './helper';
import {
  Breadcrumbs,
  Crumb,
  CrumbCurrent,
  Empty,
  EmptyAction,
  FilterPill,
  Grid,
  Layout,
  Page,
  PageTitle,
  PillRow,
  ResultCount,
  Results,
  ResultsHead,
  SkeletonCard,
} from './styled';

export default function ShopPage() {
  const { t } = useTranslation();
  const shop = useShopPage();

  return (
    <StoreLayout>
      <Page>
        <Breadcrumbs aria-label="breadcrumb">
          <Crumb to={ROUTES.HOME}>{t('storefront.shopBreadcrumbHome')}</Crumb>
          <ChevronRight size={14} />
          <CrumbCurrent>
            {shop.category?.name ?? t('storefront.shopBreadcrumbShop')}
          </CrumbCurrent>
        </Breadcrumbs>

        <Layout>
          <FiltersPanel
            maxPrice={shop.maxPrice}
            selectedTags={shop.selectedTags}
            onPriceChange={shop.setMaxPrice}
            onTagToggle={shop.toggleTag}
            onReset={shop.reset}
          />

          <Results>
            <PillRow>
              {EVENT_TYPE_FILTERS.map(filter => (
                <FilterPill
                  key={filter.value}
                  type="button"
                  $active={shop.eventType === filter.value}
                  onClick={() => shop.setEventType(filter.value)}
                >
                  {filter.label}
                </FilterPill>
              ))}
            </PillRow>

            <ResultsHead>
              <PageTitle>
                {shop.category?.name ?? t('storefront.shopBreadcrumbShop')}
              </PageTitle>
              <ResultCount>
                {t('storefront.shopResults', { count: shop.services.length })}
              </ResultCount>
            </ResultsHead>

            {shop.isLoading ? (
              <Grid>
                {Array.from({ length: 8 }, (_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </Grid>
            ) : shop.services.length === 0 ? (
              <Empty>
                {t('storefront.shopEmpty')}
                <EmptyAction type="button" onClick={shop.reset}>
                  {t('storefront.shopEmptyAction')}
                </EmptyAction>
              </Empty>
            ) : (
              <Grid>
                {shop.services.map(service => (
                  <ProductCard key={service.id} service={service} />
                ))}
              </Grid>
            )}
          </Results>
        </Layout>
      </Page>
    </StoreLayout>
  );
}
