import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminVendors } from './helper';
import { PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { VendorPrivate } from '@/types';

export default function AdminVendorsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { vendors, isLoading } = useAdminVendors();

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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'approved'
            ? 'green'
            : status === 'rejected'
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
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => `★ ${rating || 0}`,
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: (exp: number) => (exp ? `${exp} yrs` : '—'),
    },
  ];

  return (
    <>
      <PageTitle $palette={palette}>{t('admin.vendors')}</PageTitle>
      <Table
        dataSource={vendors}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'No vendors found' }}
        bordered
      />
    </>
  );
}
