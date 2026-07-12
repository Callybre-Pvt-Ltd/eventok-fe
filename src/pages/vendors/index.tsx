import { useTranslation } from 'react-i18next';
import { PublicHeader } from '@/components/global/public-header';
import { PublicFooter } from '@/components/global/public-footer';
import { PremiumSearch } from '@/components/marketplace/premium-search';
import { VendorPortfolioCard } from '@/components/marketplace/vendor-portfolio-card';
import { LoadingState } from '@/components/global/loading-state';
import { ErrorState } from '@/components/global/error-state';
import { EmptyState } from '@/components/global/empty-state';
import { useVendorsPage } from './helper';
import {
  Content,
  Grid,
  HeroBand,
  HeroCopy,
  HeroTitle,
  HeroLead,
  Main,
  PageWrap,
  SearchWrap,
} from './styled';

export default function VendorsPage() {
  const { t } = useTranslation();
  const { filtered, isLoading, error, refetch, palette, categoryMap } =
    useVendorsPage();

  return (
    <PageWrap $palette={palette}>
      <PublicHeader />
      <Main>
        <HeroBand $palette={palette}>
          <HeroCopy>
            <HeroTitle $palette={palette}>
              {t('marketplace.searchTitle')}
            </HeroTitle>
            <HeroLead $palette={palette}>
              {t('marketplace.searchSubtitle')}
            </HeroLead>
          </HeroCopy>
          <SearchWrap>
            <PremiumSearch />
          </SearchWrap>
        </HeroBand>
        <Content>
          {isLoading && <LoadingState />}
          {error && <ErrorState onRetry={() => refetch()} />}
          {!isLoading && !error && filtered.length === 0 && <EmptyState />}
          {!isLoading && !error && filtered.length > 0 && (
            <Grid>
              {filtered.map(v => (
                <VendorPortfolioCard
                  key={v.id}
                  vendor={v}
                  categoryNames={v.categories
                    .map(id => categoryMap[id])
                    .filter(Boolean)}
                />
              ))}
            </Grid>
          )}
        </Content>
      </Main>
      <PublicFooter />
    </PageWrap>
  );
}
