import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminVendors } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function AdminVendorsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { vendors, isLoading } = useAdminVendors();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.vendors')}</PageTitle>
      <List>
        {vendors.map(v => (
          <ListItem $palette={palette} key={v.id}>
            <ItemTitle $palette={palette}>{v.businessName}</ItemTitle>
            <ItemMeta $palette={palette}>
              {v.city} · {v.status} · ★ {v.rating}
            </ItemMeta>
          </ListItem>
        ))}
      </List>
    </>
  );
}
