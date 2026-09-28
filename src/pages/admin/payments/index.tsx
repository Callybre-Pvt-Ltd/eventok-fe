import { Button, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminPayments } from './helper';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { PageTitle } from './styled';
import type { Payment } from '@/types';

export default function AdminPaymentsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { payments, isLoading, refundMutation } = useAdminPayments();

  if (isLoading) return <LoadingState />;

  const columns: ColumnsType<Payment> = [
    {
      title: 'Payment ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <code>{id.slice(0, 8)}...</code>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <strong>₹{amount.toLocaleString()}</strong>,
    },
    {
      title: 'Payment Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag>{type.toUpperCase()}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'completed'
            ? 'green'
            : status === 'refunded'
            ? 'magenta'
            : status === 'failed'
            ? 'red'
            : 'orange';
        return (
          <Tag color={color} style={{ textTransform: 'uppercase' }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) =>
        record.status === 'completed' ? (
          <Button
            size="small"
            danger
            loading={refundMutation.isPending}
            onClick={() => refundMutation.mutate(record.id)}
          >
            {t('admin.refund')}
          </Button>
        ) : (
          '—'
        ),
    },
  ];

  return (
    <>
      <PageTitle $palette={palette}>{t('admin.payments')}</PageTitle>
      <Table
        dataSource={payments}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'No payments found' }}
        bordered
      />
    </>
  );
}

