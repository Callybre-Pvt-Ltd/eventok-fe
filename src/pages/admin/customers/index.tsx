import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { CustomAntdSearchInput } from '@/components/global/custom-antd-search-input';
import { LoadingState } from '@/components/global/loading-state';
import {
  AdminTableCard,
  AdminToolbar,
  AdminToolbarLeft,
  CellPrimary,
  CellSecondary,
  CellStack,
} from '@/components/ui/admin-table';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import {
  PageEyebrow,
  PageHeader,
  PageLead,
  PageTitle,
} from '@/components/ui/portal-primitives/styled';
import type { User } from '@/types';
import { useAdminCustomers } from './helper';

export default function AdminCustomersPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { customers, isLoading, searchTerm, setSearchTerm } =
    useAdminCustomers();

  if (isLoading) return <LoadingState />;

  const columns: ColumnsType<User> = [
    {
      title: 'Customer / User',
      key: 'name',
      align: 'left',
      render: (_, record) => (
        <CellStack>
          <CellPrimary>{record.name || 'Anonymous User'}</CellPrimary>
          <CellSecondary>{record.email || 'No email'}</CellSecondary>
        </CellStack>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      align: 'left',
      render: (phone: string) => (
        <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>
          {phone || '—'}
        </span>
      ),
    },
    {
      title: 'City / Region',
      dataIndex: 'city',
      key: 'city',
      align: 'left',
      render: (city: string) => (
        <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>
          {city || '—'}
        </span>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (role: string) => {
        const color =
          role === 'admin' || role === 'super_admin'
            ? 'purple'
            : role === 'vendor'
            ? 'orange'
            : 'blue';
        return (
          <Tag
            color={color}
            style={{
              borderRadius: 6,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {role.replace('_', ' ')}
          </Tag>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader>
        <div>
          <PageEyebrow>USER DIRECTORY</PageEyebrow>
          <PageTitle $palette={palette}>{t('admin.customers')}</PageTitle>
          <PageLead $palette={palette}>
            View and manage customer accounts, registered users, and role
            assignments across EventOK.
          </PageLead>
        </div>
      </PageHeader>

      <AdminToolbar>
        <AdminToolbarLeft>
          <CustomAntdSearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search users by name, email, phone, city…"
          />
        </AdminToolbarLeft>
      </AdminToolbar>

      <AdminTableCard>
        <Table
          dataSource={customers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: false }}
          locale={{ emptyText: 'No users found matching your search' }}
        />
      </AdminTableCard>
    </>
  );
}
