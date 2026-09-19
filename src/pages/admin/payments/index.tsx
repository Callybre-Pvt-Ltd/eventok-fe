import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminPayments } from './helper';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import {
  Actions,
  ItemMeta,
  ItemTitle,
  List,
  ListItem,
  PageTitle,
} from './styled';

export default function AdminPaymentsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { payments, isLoading, refundMutation } = useAdminPayments();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.payments')}</PageTitle>
      <List>
        {payments.map(p => (
          <ListItem $palette={palette} key={p.id}>
            <ItemTitle $palette={palette}>
              ₹{p.amount.toLocaleString()}
            </ItemTitle>
            <ItemMeta $palette={palette}>
              {p.status} · {p.type}
            </ItemMeta>
            {p.status === 'completed' && (
              <Actions>
                <Button
                  size="small"
                  loading={refundMutation.isPending}
                  onClick={() => refundMutation.mutate(p.id)}
                >
                  {t('admin.refund')}
                </Button>
              </Actions>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
}
