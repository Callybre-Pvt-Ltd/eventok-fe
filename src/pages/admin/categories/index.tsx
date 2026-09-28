import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminCategories } from './helper';
import { PageHeader, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { Category } from '@/types';

export default function AdminCategoriesPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { categories, isLoading, ensureMutation } = useAdminCategories();

  if (isLoading) return <LoadingState />;

  const columns: ColumnsType<Category> = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <strong>{name}</strong>,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug: string) => <code>{slug}</code>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (desc: string) => desc || '—',
    },
  ];

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
      <Table
        dataSource={categories}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'No categories yet — click Sync decoration categories.' }}
        bordered
      />
    </>
  );
}

