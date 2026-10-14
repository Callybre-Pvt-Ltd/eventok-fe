import { Button, Input, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Pencil, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CustomAntdSearchInput } from '@/components/global/custom-antd-search-input';
import { ErrorState } from '@/components/global/error-state';
import { LoadingState } from '@/components/global/loading-state';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { Category } from '@/types';
import { useAdminCategories } from './helper';
import {
  FormBody,
  FormLabel,
  FormRow,
  NameText,
  PageHeader,
  PageTitle,
  RowActions,
  StatusTag,
  Toolbar,
  ToolbarSearch,
} from './styled';

export default function AdminCategoriesPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    categories,
    totalCount,
    isLoading,
    error,
    refetch,
    search,
    setSearch,
    isFormOpen,
    isEditing,
    form,
    setName,
    setIcon,
    openCreate,
    openEdit,
    closeForm,
    saveMutation,
    toggleActiveMutation,
  } = useAdminCategories();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={() => refetch()} />;

  const columns: ColumnsType<Category> = [
    {
      title: t('admin.categoryName'),
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <NameText>{name}</NameText>,
    },
    {
      title: t('admin.categoryServices'),
      dataIndex: 'serviceCount',
      key: 'serviceCount',
      render: (count?: number) => count ?? 0,
    },
    {
      title: t('admin.status'),
      key: 'status',
      render: (_value, record) => (
        <StatusTag $active={record.isActive ?? true}>
          {record.isActive ?? true
            ? t('admin.categoryActive')
            : t('admin.categoryInactive')}
        </StatusTag>
      ),
    },
    {
      title: '',
      key: 'actions',
      render: (_value, record) => (
        <RowActions>
          <Button
            size="small"
            icon={<Pencil size={14} />}
            onClick={() => openEdit(record)}
          >
            {t('admin.edit')}
          </Button>
          <Button
            size="small"
            danger={record.isActive ?? true}
            loading={toggleActiveMutation.isPending}
            onClick={() => toggleActiveMutation.mutate(record)}
          >
            {record.isActive ?? true
              ? t('admin.categoryDeactivate')
              : t('admin.categoryActivate')}
          </Button>
        </RowActions>
      ),
    },
  ];

  return (
    <>
      <PageHeader>
        <PageTitle $palette={palette}>{t('admin.categories')}</PageTitle>
        <Button type="primary" icon={<Plus size={16} />} onClick={openCreate}>
          {t('admin.addCategory')}
        </Button>
      </PageHeader>

      <Toolbar>
        <ToolbarSearch>
          <CustomAntdSearchInput
            value={search}
            onChange={setSearch}
            placeholder={t('admin.categorySearchPlaceholder')}
          />
        </ToolbarSearch>
        <span>
          {t('admin.categoryCount', {
            shown: categories.length,
            total: totalCount,
          })}
        </span>
      </Toolbar>

      <Table
        dataSource={categories}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: t('admin.categoryEmpty') }}
        bordered
      />

      <Modal
        open={isFormOpen}
        title={isEditing ? t('admin.editCategory') : t('admin.addCategory')}
        okText={isEditing ? t('admin.save') : t('admin.addCategory')}
        cancelText={t('admin.cancel')}
        confirmLoading={saveMutation.isPending}
        onCancel={closeForm}
        onOk={() => saveMutation.mutate(form)}
        destroyOnHidden
      >
        <FormBody>
          <FormRow>
            <FormLabel>{t('admin.categoryName')}</FormLabel>
            <Input
              value={form.name}
              onChange={event => setName(event.target.value)}
              placeholder={t('admin.categoryNamePlaceholder')}
              maxLength={100}
              autoFocus
            />
          </FormRow>
          <FormRow>
            <FormLabel>{t('admin.categoryIcon')}</FormLabel>
            <Input
              value={form.icon}
              onChange={event => setIcon(event.target.value)}
              placeholder={t('admin.categoryIconPlaceholder')}
              maxLength={255}
            />
          </FormRow>
        </FormBody>
      </Modal>
    </>
  );
}
