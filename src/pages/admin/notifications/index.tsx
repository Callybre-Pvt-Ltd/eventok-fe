import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useAdminNotifications } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function AdminNotificationsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { notifications, isLoading } = useAdminNotifications();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.notifications')}</PageTitle>
      {notifications.length === 0 ? (
        <EmptyState />
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
