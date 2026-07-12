import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminBookings } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function AdminBookingsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { bookings, isLoading } = useAdminBookings();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.bookings')}</PageTitle>
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
    </>
  );
}
