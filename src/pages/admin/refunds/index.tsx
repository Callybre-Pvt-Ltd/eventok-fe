import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { AdminRefund } from '@/services/paymentService';
import { useAdminRefunds } from './helper';
import { PageTitle } from './styled';

const STATUS_COLOR: Record<string, string> = {
  requested: 'gold',
  processing: 'blue',
  completed: 'green',
  rejected: 'red',
};

export default function AdminRefundsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { refunds, isLoading } = useAdminRefunds();

  if (isLoading) return <LoadingState />;

  const columns: ColumnsType<AdminRefund> = [
    {
      title: t('admin.refundId'),
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <code>{id.slice(0, 8)}</code>,
    },
    {
      title: t('admin.bookingId'),
      dataIndex: 'bookingId',
      key: 'bookingId',
      render: (id: string | null) => (id ? <code>{id.slice(0, 8)}</code> : '—'),
    },
    {
      title: t('admin.amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <strong>₹{amount.toLocaleString('en-IN')}</strong>
      ),
    },
    {
      title: t('admin.reason'),
      dataIndex: 'reason',
      key: 'reason',
      render: (reason: string | null) => reason || '—',
    },
    {
      title: t('admin.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={STATUS_COLOR[status] || 'default'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: t('admin.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => new Date(value).toLocaleDateString('en-IN'),
    },
  ];

  return (
    <>
      <PageTitle $palette={palette}>{t('admin.refunds')}</PageTitle>
      <Table
        dataSource={refunds}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: t('admin.noRefunds') }}
        bordered
      />
    </>
  );
}
