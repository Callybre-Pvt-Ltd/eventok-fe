import {
  ArrowUpDown,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { EVENT_TYPE_FILTERS, SORT_OPTIONS } from '@/constants/catalog';
import { ROUTES } from '@/constants/routes';
import { FiltersPanel } from '@/components/storefront/filters-panel';
import { ProductCard } from '@/components/storefront/product-card';
import { StoreLayout } from '@/components/storefront/store-layout';
import type { CatalogSortOption } from '@/types/catalog';
import { useShopPage } from './helper';
import {
  ActiveFiltersWrap,
  Breadcrumbs,
  ChipRemove,
  ClearAllBtn,
  Crumb,
  CrumbCurrent,
  Empty,
  EmptyAction,
  FabCount,
  FilterChip,
  FilterPill,
  FiltersColumn,
  Grid,
  Layout,
  MobileBarGroup,
  MobileFilterBar,
  MobileFilterBtn,
  MobileSortIcon,
  MobileSortSelect,
  MobileSortWrap,
  Page,
  PageTitle,
  PillRow,
  ResultCount,
  Results,
  ResultsHead,
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
  SheetTitleWrap,
  ShopSearchBox,
  ShopSearchClear,
  ShopSearchIcon,
  ShopSearchInput,
  SkeletonCard,
  SortLabel,
  SortRow,
  SortSelect,
  TitleBlock,
  ToolbarRight,
  UpdatingBar,
  UpdatingTrack,
} from './styled';

export default function ShopPage() {
  const { t } = useTranslation();
  const shop = useShopPage();
  const isUpdating = shop.isFetching && !shop.isLoading;

  return (
    <StoreLayout>
      <Page>
        <Breadcrumbs aria-label="breadcrumb">
          <Crumb to={ROUTES.HOME}>{t('storefront.shopBreadcrumbHome')}</Crumb>
          <ChevronRight size={14} />
          {shop.category ? (
            <>
              <Crumb to={ROUTES.SHOP}>
                {t('storefront.shopBreadcrumbShop')}
              </Crumb>
              <ChevronRight size={14} />
              <CrumbCurrent>{shop.category.name}</CrumbCurrent>
            </>
          ) : (
            <CrumbCurrent>{t('storefront.shopBreadcrumbShop')}</CrumbCurrent>
          )}
        </Breadcrumbs>

        <MobileFilterBar>
          <MobileBarGroup>
            <MobileFilterBtn
              type="button"
              $active={shop.activeFilterCount > 0}
              onClick={shop.openFilters}
            >
              <SlidersHorizontal size={14} />
              <span>{t('storefront.shopOpenFilters')}</span>
              {shop.activeFilterCount > 0 && (
                <FabCount>{shop.activeFilterCount}</FabCount>
              )}
            </MobileFilterBtn>

            <MobileSortWrap>
              <MobileSortIcon>
                <ArrowUpDown size={13} />
              </MobileSortIcon>
              <MobileSortSelect
                value={shop.sort}
                onChange={e =>
                  shop.setSort(e.target.value as CatalogSortOption)
                }
                aria-label={t('storefront.shopSortBy')}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </MobileSortSelect>
            </MobileSortWrap>
          </MobileBarGroup>

          <ResultCount>
            {t('storefront.shopResults', { count: shop.services.length })}
          </ResultCount>
        </MobileFilterBar>

        <Layout>
          <FiltersColumn>
            <FiltersPanel
              minPrice={shop.minPrice}
              maxPrice={shop.maxPrice}
              selectedTags={shop.selectedTags}
              eventType={shop.eventType}
              sort={shop.sort}
              hasPhotosOnly={shop.hasPhotosOnly}
              hasInclusionsOnly={shop.hasInclusionsOnly}
              hasPolicyOnly={shop.hasPolicyOnly}
              activeFilterCount={shop.activeFilterCount}
              onPriceRangeChange={shop.setPriceRange}
              onTagToggle={shop.toggleTag}
              onTogglePref={shop.togglePref}
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
              <TitleBlock>
                <PageTitle>
                  {shop.category?.name ?? t('storefront.shopBreadcrumbShop')}
                </PageTitle>
                <ResultCount>
                  {t('storefront.shopResults', { count: shop.services.length })}
                </ResultCount>
              </TitleBlock>

              <ToolbarRight>
                <ShopSearchBox>
                  <ShopSearchIcon>
                    <Search size={14} />
                  </ShopSearchIcon>
                  <ShopSearchInput
                    type="search"
                    value={shop.search}
                    onChange={e => shop.setSearch(e.target.value)}
                    placeholder={t('storefront.shopSearchPlaceholder')}
                    aria-label={t('storefront.shopSearchPlaceholder')}
                  />
                  {shop.search && (
                    <ShopSearchClear
                      type="button"
                      onClick={() => shop.setSearch('')}
                      aria-label={t('common.clear', 'Clear search')}
                    >
                      <X size={12} />
                    </ShopSearchClear>
                  )}
                </ShopSearchBox>

                <SortRow>
                  <SortLabel htmlFor="shop-sort-select">
                    {t('storefront.shopSortBy')}
                  </SortLabel>
                  <SortSelect
                    id="shop-sort-select"
                    value={shop.sort}
                    onChange={e =>
                      shop.setSort(e.target.value as CatalogSortOption)
                    }
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </SortSelect>
                </SortRow>
              </ToolbarRight>
            </ResultsHead>

            {shop.activeFilters.length > 0 && (
              <ActiveFiltersWrap>
                {shop.activeFilters.map(chip => (
                  <FilterChip
                    key={chip.key}
                    type="button"
                    onClick={chip.onRemove}
                  >
                    <span>{chip.label}</span>
                    <ChipRemove aria-hidden>
                      <X size={12} />
                    </ChipRemove>
                  </FilterChip>
                ))}
                <ClearAllBtn type="button" onClick={shop.reset}>
                  {t('storefront.shopReset')}
                </ClearAllBtn>
              </ActiveFiltersWrap>
            )}

            <UpdatingTrack $active={isUpdating} aria-hidden>
              <UpdatingBar $active={isUpdating} />
            </UpdatingTrack>

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
              <Grid $updating={isUpdating}>
                {shop.services.map(service => (
                  <ProductCard key={service.id} service={service} />
                ))}
              </Grid>
            )}
          </Results>
        </Layout>

        <SheetOverlay
          $open={shop.filtersOpen}
          onClick={shop.closeFilters}
          aria-hidden
        />
        <Sheet $open={shop.filtersOpen} aria-hidden={!shop.filtersOpen}>
          <SheetGrip />
          <SheetHead>
            <SheetTitleWrap>
              <SheetTitle>{t('storefront.shopFiltersAndSort')}</SheetTitle>
              {shop.activeFilterCount > 0 && (
                <FabCount>{shop.activeFilterCount}</FabCount>
              )}
            </SheetTitleWrap>
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
              inSheet
              minPrice={shop.minPrice}
              maxPrice={shop.maxPrice}
              selectedTags={shop.selectedTags}
              eventType={shop.eventType}
              sort={shop.sort}
              hasPhotosOnly={shop.hasPhotosOnly}
              hasInclusionsOnly={shop.hasInclusionsOnly}
              hasPolicyOnly={shop.hasPolicyOnly}
              activeFilterCount={shop.activeFilterCount}
              onPriceRangeChange={shop.setPriceRange}
              onTagToggle={shop.toggleTag}
              onEventTypeChange={shop.setEventType}
              onSortChange={shop.setSort}
              onTogglePref={shop.togglePref}
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
