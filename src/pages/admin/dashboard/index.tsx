import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminDashboard } from './helper';
import { PageTitle, StatCard, StatLabel, StatValue, StatsGrid } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { stats, isLoading } = useAdminDashboard();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.dashboardTitle')}</PageTitle>
      <StatsGrid>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>{t('admin.totalRevenue')}</StatLabel>
          <StatValue $palette={palette}>
            ₹{stats?.totalRevenue?.toLocaleString()}
          </StatValue>
        </StatCard>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>{t('admin.totalBookings')}</StatLabel>
          <StatValue $palette={palette}>{stats?.totalBookings}</StatValue>
        </StatCard>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>{t('admin.totalVendors')}</StatLabel>
          <StatValue $palette={palette}>{stats?.totalVendors}</StatValue>
        </StatCard>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>{t('admin.totalCustomers')}</StatLabel>
          <StatValue $palette={palette}>{stats?.totalCustomers}</StatValue>
        </StatCard>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>{t('admin.pendingApprovals')}</StatLabel>
          <StatValue $palette={palette}>{stats?.pendingApprovals}</StatValue>
        </StatCard>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>Open enquiries</StatLabel>
          <StatValue $palette={palette}>{stats?.openEnquiries ?? 0}</StatValue>
        </StatCard>
      </StatsGrid>
    </>
  );
}
