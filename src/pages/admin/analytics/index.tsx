import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminAnalytics } from './helper';
import { PageTitle, StatCard, StatLabel, StatValue, StatsGrid } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function AdminAnalyticsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { stats, isLoading } = useAdminAnalytics();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.analytics')}</PageTitle>
      <StatsGrid>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>
            {t('admin.pendingApprovals')}
          </StatLabel>
          <StatValue $palette={palette}>{stats?.pendingApprovals}</StatValue>
        </StatCard>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>{t('admin.totalRevenue')}</StatLabel>
          <StatValue $palette={palette}>
            ₹{stats?.totalRevenue?.toLocaleString()}
          </StatValue>
        </StatCard>
      </StatsGrid>
    </>
  );
}
