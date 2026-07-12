import { useTranslation } from 'react-i18next';
import { useVendorEarnings } from './helper';
import { PageTitle, StatCard, StatLabel, StatValue, StatsGrid } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function VendorEarningsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { total, pending } = useVendorEarnings();
  return (
    <>
      <PageTitle $palette={palette}>{t('vendor.earningsTitle')}</PageTitle>
      <StatsGrid>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>{t('vendor.totalEarnings')}</StatLabel>
          <StatValue $palette={palette}>₹{total.toLocaleString()}</StatValue>
        </StatCard>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>Pending</StatLabel>
          <StatValue $palette={palette}>₹{pending.toLocaleString()}</StatValue>
        </StatCard>
      </StatsGrid>
    </>
  );
}
