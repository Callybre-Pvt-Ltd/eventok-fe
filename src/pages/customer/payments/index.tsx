import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useCustomerPayments } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function CustomerPaymentsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { payments, isLoading } = useCustomerPayments();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('customer.paymentHistory')}</PageTitle>
      {payments.length === 0 ? (
        <EmptyState description={t('customer.noPayments')} />
      ) : (
        <List>
          {payments.map(p => (
            <ListItem $palette={palette} key={p.id}>
              <ItemTitle $palette={palette}>
                ₹{p.amount.toLocaleString()}
              </ItemTitle>
              <ItemMeta $palette={palette}>
                {p.type} · {p.status} ·{' '}
                {new Date(p.createdAt).toLocaleDateString()}
              </ItemMeta>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
