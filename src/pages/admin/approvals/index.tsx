import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminApprovals } from './helper';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { PageTitle } from './styled';
import type { VendorPrivate } from '@/types';

export default function AdminApprovalsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { pending, isLoading, approve, reject } = useAdminApprovals();

  if (isLoading) return <LoadingState />;

  const columns: ColumnsType<VendorPrivate> = [
    {
      title: 'Business / Shop Name',
      dataIndex: 'businessName',
      key: 'businessName',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'City / Location',
      dataIndex: 'city',
      key: 'city',
      render: (city: string) => city || '—',
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: (exp: number) => (exp ? `${exp} yrs` : '—'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="orange" style={{ textTransform: 'uppercase' }}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => approve(record.id)}
          >
            {t('admin.approve')}
          </Button>
          <Button danger size="small" onClick={() => reject(record.id)}>
            {t('admin.reject')}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageTitle $palette={palette}>{t('admin.approvals')}</PageTitle>
      <Table
        dataSource={pending}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: t('admin.noPending') }}
        bordered
      />
    </>
  );
}
