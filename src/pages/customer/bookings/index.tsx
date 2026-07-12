import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { ErrorState } from '@/components/global/error-state';
import { EmptyState } from '@/components/global/empty-state';
import { useCustomerBookings } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function CustomerBookingsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { bookings, isLoading, error, refetch } = useCustomerBookings();
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => refetch()} />;
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
                {b.eventDate} · {b.guestCount} guests · {b.status}
              </ItemMeta>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
