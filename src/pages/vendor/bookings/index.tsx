import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useVendorBookings } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function VendorBookingsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { bookings, isLoading } = useVendorBookings();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('vendor.bookings')}</PageTitle>
      {bookings.length === 0 ? (
        <EmptyState description={t('vendor.noBookings')} />
      ) : (
        <List>
          {bookings.map(b => (
            <ListItem $palette={palette} key={b.id}>
              <ItemTitle $palette={palette}>{b.eventType}</ItemTitle>
              <ItemMeta $palette={palette}>
                {b.eventDate} · {b.status}
              </ItemMeta>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
