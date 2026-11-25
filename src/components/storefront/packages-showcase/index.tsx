import { ArrowRight, Check, Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import {
  OutlinePill,
  Section,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '@/components/storefront/shared/styled';
import { formatPrice } from '@/utils/storefront/pricing';
import {
  PACKAGE_BUDGET_LIMITS,
  usePackagesShowcase,
  type PackageSort,
} from './helper';
import {
  Body,
  BudgetPill,
  Card,
  ClearIconBtn,
  ControlsGroup,
  Description,
  EmptyFilterBox,
  FilterPanel,
  FilterPillsRow,
  FilterTopRow,
  Foot,
  GoButton,
  Grid,
  Image,
  ImageFallback,
  ImageWrap,
  IncludeTag,
  IncludesRow,
  Name,
  Price,
  PriceLabel,
  ResetLink,
  SavingsTag,
  SearchIcon,
  SearchInput,
  SearchWrap,
  SelectControl,
  VendorLine,
  ViewAllRow,
} from './styled';

interface PackagesShowcaseProps {
  showEmptyState?: boolean;
}

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('') || 'EO';

export function PackagesShowcase({ showEmptyState }: PackagesShowcaseProps) {
  const { t } = useTranslation();
  const showcase = usePackagesShowcase();

  if (!showcase.packages.length) {
    if (!showEmptyState) return null;
    return (
      <Section>
        <SectionInner>
          <SectionTitle>{t('storefront.packagesTitle')}</SectionTitle>
          <SectionSubtitle>{t('storefront.packagesEmpty')}</SectionSubtitle>
        </SectionInner>
      </Section>
    );
  }

  const displayed = showEmptyState
    ? showcase.filteredPackages
    : showcase.packages;

  return (
    <Section>
      <SectionInner>
        <SectionTitle>{t('storefront.packagesTitle')}</SectionTitle>
        <SectionSubtitle>{t('storefront.packagesSubtitle')}</SectionSubtitle>

        {showEmptyState && (
          <FilterPanel>
            <FilterTopRow>
              <SearchWrap>
                <SearchIcon>
                  <Search size={15} />
                </SearchIcon>
                <SearchInput
                  type="search"
                  value={showcase.query}
                  onChange={e => showcase.setQuery(e.target.value)}
                  placeholder="Search packages or service providers..."
                  aria-label="Search packages or service providers"
                />
                {showcase.query && (
                  <ClearIconBtn
                    type="button"
                    onClick={() => showcase.setQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={12} />
                  </ClearIconBtn>
                )}
              </SearchWrap>

              <ControlsGroup>
                {showcase.providers.length > 1 && (
                  <SelectControl
                    value={showcase.provider}
                    onChange={e => showcase.setProvider(e.target.value)}
                    aria-label="Filter by service provider"
                  >
                    <option value="all">All providers</option>
                    {showcase.providers.map(name => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </SelectControl>
                )}

                <SelectControl
                  value={showcase.sort}
                  onChange={e =>
                    showcase.setSort(e.target.value as PackageSort)
                  }
                  aria-label="Sort packages"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="savings">Highest Savings</option>
                </SelectControl>
              </ControlsGroup>
            </FilterTopRow>

            <FilterPillsRow>
              {PACKAGE_BUDGET_LIMITS.map(limit => (
                <BudgetPill
                  key={limit.id}
                  type="button"
                  $active={showcase.budgetId === limit.id}
                  onClick={() => showcase.setBudgetId(limit.id)}
                >
                  {limit.label}
                </BudgetPill>
              ))}
              {showcase.hasFilters && (
                <ResetLink type="button" onClick={showcase.reset}>
                  Reset all
                </ResetLink>
              )}
            </FilterPillsRow>
          </FilterPanel>
        )}

        {displayed.length === 0 ? (
          <EmptyFilterBox>
            <span>No packages match your current filters.</span>
            <ResetLink type="button" onClick={showcase.reset}>
              Clear all filters
            </ResetLink>
          </EmptyFilterBox>
        ) : (
          <Grid>
            {displayed.map(item => (
              <Card key={item.id} to={`${ROUTES.PACKAGES}/${item.id}`}>
                <ImageWrap>
                  {item.image ? (
                    <Image src={item.image} alt={item.name} loading="lazy" />
                  ) : (
                    <ImageFallback aria-hidden="true">
                      {initialsOf(item.name)}
                    </ImageFallback>
                  )}
                </ImageWrap>
                <Body>
                  {item.vendorName && (
                    <VendorLine>{item.vendorName}</VendorLine>
                  )}
                  <Name>{item.name}</Name>
                  <Description>{item.description}</Description>

                  {item.serviceSlugs && item.serviceSlugs.length > 0 && (
                    <IncludesRow>
                      {item.serviceSlugs.map(slug => (
                        <IncludeTag key={slug}>
                          <Check size={11} color="var(--color-primary)" />
                          {slug.replace(/-/g, ' ')}
                        </IncludeTag>
                      ))}
                    </IncludesRow>
                  )}

                  {item.savings > 0 && (
                    <SavingsTag>
                      Save {formatPrice(item.savings)} on Bundle
                    </SavingsTag>
                  )}

                  <Foot>
                    <div>
                      <PriceLabel>{t('storefront.startingFrom')}</PriceLabel>
                      <Price>{formatPrice(item.startingPrice)}</Price>
                    </div>
                    <GoButton aria-hidden="true">
                      View Package <ArrowRight size={14} />
                    </GoButton>
                  </Foot>
                </Body>
              </Card>
            ))}
          </Grid>
        )}

        {!showEmptyState && (
          <ViewAllRow>
            <OutlinePill to={ROUTES.PACKAGES}>
              Explore All Bundles <ArrowRight size={16} />
            </OutlinePill>
          </ViewAllRow>
        )}
      </SectionInner>
    </Section>
  );
}
