import { Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { CustomAntdSearchInput } from '@/components/global/custom-antd-search-input';
import { LoadingState } from '@/components/global/loading-state';
import {
  AdminTableCard,
  AdminToolbar,
  AdminToolbarLeft,
  AdminToolbarRight,
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
import type { User, UserRole } from '@/types';
import { useAdminCustomers } from './helper';

export default function AdminCustomersPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    customers,
    isLoading,
    isUpdatingRole,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    isSuperAdmin,
    handleRoleChange,
  } = useAdminCustomers();

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
      title: 'Current Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (role: string) => {
        const color =
          role === 'super_admin'
            ? 'magenta'
            : role === 'admin'
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
    ...(isSuperAdmin
      ? [
          {
            title: 'Manage Role',
            key: 'manageRole',
            align: 'center' as const,
            render: (_: unknown, record: User) => (
              <Select
                value={record.role}
                size="middle"
                style={{ width: 140 }}
                disabled={isUpdatingRole}
                onChange={(newRole: UserRole) =>
                  handleRoleChange(record, newRole)
                }
                options={[
                  { label: 'Super Admin', value: 'super_admin' },
                  { label: 'Admin', value: 'admin' },
                  { label: 'Vendor', value: 'vendor' },
                  { label: 'Client', value: 'customer' },
                ]}
              />
            ),
          },
        ]
      : []),
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
        <AdminToolbarRight>
          <Select
            value={roleFilter}
            onChange={setRoleFilter}
            style={{ width: 160 }}
            options={[
              { label: 'All Roles', value: 'ALL' },
              { label: 'Super Admins', value: 'super_admin' },
              { label: 'Admins', value: 'admin' },
              { label: 'Vendors', value: 'vendor' },
              { label: 'Clients', value: 'customer' },
            ]}
          />
        </AdminToolbarRight>
      </AdminToolbar>

      <AdminTableCard>
        <Table
          dataSource={customers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: false }}
          locale={{ emptyText: 'No users found matching your criteria' }}
        />
      </AdminTableCard>
    </>
  );
}
