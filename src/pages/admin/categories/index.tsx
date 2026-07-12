import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminCategories } from './helper';
import { ItemMeta, ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function AdminCategoriesPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { categories, isLoading } = useAdminCategories();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.categories')}</PageTitle>
      <Button type="primary">{t('admin.addCategory')}</Button>
      <List>
        {categories.map(c => (
          <ListItem $palette={palette} key={c.id}>
            <ItemTitle $palette={palette}>{c.name}</ItemTitle>
            <ItemMeta $palette={palette}>{c.description}</ItemMeta>
          </ListItem>
        ))}
      </List>
    </>
  );
}
