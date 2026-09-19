import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useVendorEarnings } from './helper';
import {
  ItemMeta,
  ItemTitle,
  List,
  ListItem,
  PageTitle,
  StatCard,
  StatLabel,
  StatValue,
  StatsGrid,
} from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function VendorEarningsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { total, pending, items, isLoading } = useVendorEarnings();

  if (isLoading) return <LoadingState />;

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
      <List>
        {items.map(p => (
          <ListItem $palette={palette} key={p.id}>
            <ItemTitle $palette={palette}>
              ₹{Number(p.vendor_amount ?? p.amount).toLocaleString()}
            </ItemTitle>
            <ItemMeta $palette={palette}>
              {p.status} · {new Date(p.created_at).toLocaleDateString()}
            </ItemMeta>
          </ListItem>
        ))}
      </List>
    </>
  );
}
