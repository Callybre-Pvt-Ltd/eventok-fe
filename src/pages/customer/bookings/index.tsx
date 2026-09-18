import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { ErrorState } from '@/components/global/error-state';
import { EmptyState } from '@/components/global/empty-state';
import { useCustomerBookings } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { paymentService } from '@/services';
import { useAuth } from '@/hooks/auth/use-auth';
import { useState } from 'react';

export default function CustomerBookingsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { session } = useAuth();
  const { bookings, isLoading, error, refetch } = useCustomerBookings();
  const [payingId, setPayingId] = useState<string | null>(null);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  const pay = async (bookingId: string) => {
    setPayingId(bookingId);
    const res = await paymentService.openCheckout({
      bookingId,
      name: session?.user.name,
      email: session?.user.email,
      onSuccess: () => {
        message.success('Payment submitted. Status updates after webhook.');
        refetch();
      },
    });
    setPayingId(null);
    if (res.error) {
      message.error(res.error);
      return;
    }
    if (res.data && !res.data.configured) {
      message.warning(res.data.message ?? 'Payments not configured');
    }
  };

  return (
    <>
      <PageTitle $palette={palette}>{t('customer.bookings')}</PageTitle>
      {bookings.length === 0 ? (
        <EmptyState description={t('customer.noBookings')} />
      ) : (
        <List>
          {bookings.map(b => (
            <ListItem $palette={palette} key={b.id}>
              <ItemTitle $palette={palette}>{b.eventType}</ItemTitle>
              <ItemMeta $palette={palette}>
                {b.eventDate} ·{' '}
                {b.guestCount ? `${b.guestCount} guests · ` : ''}
                {b.status}
              </ItemMeta>
              {b.status === 'payment_pending' ? (
                <Button
                  type="primary"
                  size="small"
                  style={{ marginTop: 8 }}
                  loading={payingId === b.id}
                  onClick={() => pay(b.id)}
                >
                  Pay now
                </Button>
              ) : null}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
