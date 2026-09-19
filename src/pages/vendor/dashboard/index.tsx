import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useVendorDashboard } from './helper';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import {
  Banner,
  PageEyebrow,
  PageHeader,
  PageLead,
  PageTitle,
  StatCard,
  StatLabel,
  StatValue,
  StatsGrid,
} from './styled';

export default function VendorDashboardPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { totalBookings, activeBookings, rating, isLoading, isPending } =
    useVendorDashboard();
  if (isLoading) return <LoadingState />;
  return (
    <>
      {isPending && (
        <Banner $palette={palette}>{t('vendor.pendingBanner')}</Banner>
      )}
      <PageHeader>
        <div>
          <PageEyebrow>Partner workspace</PageEyebrow>
          <PageTitle $palette={palette}>{t('vendor.dashboardTitle')}</PageTitle>
          <PageLead $palette={palette}>
            Track bookings and keep your decoration services ready to book.
          </PageLead>
        </div>
      </PageHeader>
      <StatsGrid>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>{t('vendor.totalBookings')}</StatLabel>
          <StatValue $palette={palette}>{totalBookings}</StatValue>
        </StatCard>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>{t('vendor.activeBookings')}</StatLabel>
          <StatValue $palette={palette}>{activeBookings}</StatValue>
        </StatCard>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>{t('vendor.rating')}</StatLabel>
          <StatValue $palette={palette}>{rating}</StatValue>
        </StatCard>
      </StatsGrid>
    </>
  );
}
