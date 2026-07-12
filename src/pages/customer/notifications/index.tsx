import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useCustomerNotifications } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function CustomerNotificationsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { notifications, isLoading } = useCustomerNotifications();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('customer.notifications')}</PageTitle>
      {notifications.length === 0 ? (
        <EmptyState description={t('customer.noNotifications')} />
      ) : (
        <List>
          {notifications.map(n => (
            <ListItem $palette={palette} key={n.id}>
              <ItemTitle $palette={palette}>{n.title}</ItemTitle>
              <ItemMeta $palette={palette}>{n.body}</ItemMeta>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
