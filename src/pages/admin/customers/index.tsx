import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { useAdminCustomers } from './helper';
import { PageTitle } from './styled';
import type { User } from '@/types';

export default function AdminCustomersPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { customers, isLoading } = useAdminCustomers();

  if (isLoading) return <LoadingState />;

  const columns: ColumnsType<User> = [
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <strong>{text || 'Customer'}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => phone || '—',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag
          color={
            role === 'admin' ? 'purple' : role === 'vendor' ? 'gold' : 'blue'
          }
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      render: (city: string) => city || '—',
    },
  ];

  return (
    <>
      <PageTitle $palette={palette}>{t('admin.customers')}</PageTitle>
      <Table
        dataSource={customers}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'No customers found' }}
        bordered
      />
    </>
  );
}
