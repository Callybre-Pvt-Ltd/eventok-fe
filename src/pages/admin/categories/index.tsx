import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useAdminCategories } from './helper';
import {
  ItemMeta,
  ItemTitle,
  List,
  ListItem,
  PageHeader,
  PageTitle,
} from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { Button } from 'antd';

export default function AdminCategoriesPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { categories, isLoading, ensureMutation } = useAdminCategories();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageHeader>
        <PageTitle $palette={palette}>{t('admin.categories')}</PageTitle>
        <Button
          type="primary"
          loading={ensureMutation.isPending}
          onClick={() => ensureMutation.mutate()}
        >
          Sync decoration categories
        </Button>
      </PageHeader>
      {categories.length === 0 ? (
        <EmptyState description="No categories yet — click Sync decoration categories." />
      ) : (
        <List>
          {categories.map(c => (
            <ListItem $palette={palette} key={c.id}>
              <ItemTitle $palette={palette}>{c.name}</ItemTitle>
              <ItemMeta $palette={palette}>
                {c.slug}
                {c.description ? ` · ${c.description}` : ''}
              </ItemMeta>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
