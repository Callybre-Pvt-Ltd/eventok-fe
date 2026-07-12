import { useTranslation } from 'react-i18next';
import { useAdminCustomers } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function AdminCustomersPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { customers } = useAdminCustomers();
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.customers')}</PageTitle>
      <List>
        {customers.map(c => (
          <ListItem $palette={palette} key={c.id}>
            <ItemTitle $palette={palette}>{c.name}</ItemTitle>
            <ItemMeta $palette={palette}>
              {c.email} · {c.city}
            </ItemMeta>
          </ListItem>
        ))}
      </List>
    </>
  );
}
