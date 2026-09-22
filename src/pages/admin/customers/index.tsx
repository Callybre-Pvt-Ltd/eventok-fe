import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { formatEmailWithRole } from '@/utils/auth/roles';
import { useAdminCustomers } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';

export default function AdminCustomersPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { customers, isLoading } = useAdminCustomers();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.customers')}</PageTitle>
      {customers.length === 0 ? (
        <EmptyState />
      ) : (
        <List>
          {customers.map(c => (
            <ListItem $palette={palette} key={c.id}>
              <ItemTitle $palette={palette}>{c.name}</ItemTitle>
              <ItemMeta $palette={palette}>
                {formatEmailWithRole(c.email, c.role)} · {c.city || '—'}
              </ItemMeta>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
