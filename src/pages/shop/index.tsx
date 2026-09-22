import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { EVENT_TYPE_FILTERS } from '@/constants/catalog';
import { ROUTES } from '@/constants/routes';
import { FiltersPanel } from '@/components/storefront/filters-panel';
import { ProductCard } from '@/components/storefront/product-card';
import { StoreLayout } from '@/components/storefront/store-layout';
import { useShopPage } from './helper';
import {
  Breadcrumbs,
  FabCount,
  FilterFab,
  FiltersColumn,
  Crumb,
  CrumbCurrent,
  Empty,
  EmptyAction,
  FilterPill,
  Grid,
  Layout,
  Sheet,
  SheetApply,
  SheetBody,
  SheetClose,
  SheetFoot,
  SheetGrip,
  SheetHead,
  SheetOverlay,
  SheetReset,
  SheetTitle,
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
          <FiltersColumn>
            <FiltersPanel
              maxPrice={shop.maxPrice}
              selectedTags={shop.selectedTags}
              onPriceChange={shop.setMaxPrice}
              onTagToggle={shop.toggleTag}
              onReset={shop.reset}
            />
          </FiltersColumn>

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

        <FilterFab type="button" onClick={shop.openFilters}>
          <SlidersHorizontal size={16} />
          {t('storefront.shopFilters')}
          {shop.activeFilterCount > 0 && (
            <FabCount>{shop.activeFilterCount}</FabCount>
          )}
        </FilterFab>

        <SheetOverlay
          $open={shop.filtersOpen}
          onClick={shop.closeFilters}
          aria-hidden
        />
        <Sheet $open={shop.filtersOpen} aria-hidden={!shop.filtersOpen}>
          <SheetGrip />
          <SheetHead>
            <SheetTitle>{t('storefront.shopFilters')}</SheetTitle>
            <SheetClose
              type="button"
              onClick={shop.closeFilters}
              aria-label={t('common.close')}
            >
              <X size={18} />
            </SheetClose>
          </SheetHead>
          <SheetBody>
            <FiltersPanel
              maxPrice={shop.maxPrice}
              selectedTags={shop.selectedTags}
              onPriceChange={shop.setMaxPrice}
              onTagToggle={shop.toggleTag}
              onReset={shop.reset}
            />
          </SheetBody>
          <SheetFoot>
            <SheetReset type="button" onClick={shop.reset}>
              {t('storefront.shopReset')}
            </SheetReset>
            <SheetApply type="button" onClick={shop.closeFilters}>
              {t('storefront.shopShowResults', {
                count: shop.services.length,
              })}
            </SheetApply>
          </SheetFoot>
        </Sheet>
      </Page>
    </StoreLayout>
  );
}
