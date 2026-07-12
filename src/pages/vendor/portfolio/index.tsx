import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useVendorPortfolio } from './helper';
import { Grid, MediaCard, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function VendorPortfolioPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { portfolio, isLoading } = useVendorPortfolio();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('vendor.portfolioTitle')}</PageTitle>
      <Button type="primary">{t('vendor.addMedia')}</Button>
      {portfolio.length === 0 ? (
        <EmptyState />
      ) : (
        <Grid>
          {portfolio.map(p => (
            <MediaCard
              key={p.id}
              $palette={palette}
              $url={p.url}
              title={p.caption}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
