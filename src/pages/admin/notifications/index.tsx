import { Button, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminNotifications } from './helper';
import { PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { Notification } from '@/types';

export default function AdminNotificationsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { notifications, isLoading, markRead } = useAdminNotifications();

  if (isLoading) return <LoadingState />;

  const columns: ColumnsType<Notification> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record) => (
        <span>
          {!record.read && <span style={{ color: '#e8006f', marginRight: '6px' }}>●</span>}
          <strong>{title}</strong>
        </span>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'Status',
      dataIndex: 'read',
      key: 'read',
      render: (read: boolean) => (
        <Tag color={read ? 'default' : 'processing'}>
          {read ? 'READ' : 'UNREAD'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) =>
        !record.read ? (
          <Button size="small" onClick={() => markRead.mutate(record.id)}>
            Mark read
          </Button>
        ) : (
          '—'
        ),
    },
  ];

  return (
    <>
      <PageTitle $palette={palette}>{t('admin.notifications')}</PageTitle>
      <Table
        dataSource={notifications}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'No notifications found' }}
        bordered
      />
    </>
  );
}

