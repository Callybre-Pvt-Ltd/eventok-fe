import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useAdminBookings, type AdminBookingView } from './helper';
import { PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

const statusColorMap: Record<string, string> = {
  requested: 'blue',
  admin_review: 'gold',
  vendor_assigned: 'cyan',
  payment_pending: 'orange',
  confirmed: 'green',
  in_progress: 'geekblue',
  completed: 'purple',
  cancelled: 'red',
};

export default function AdminBookingsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { bookings, isLoading } = useAdminBookings();

  if (isLoading) return <LoadingState />;

  const columns: ColumnsType<AdminBookingView> = [
    {
      title: 'Service / Event',
      key: 'service',
      render: (_, b) => (
        <div>
          <strong>{b.serviceName || b.eventType || 'Service Booking'}</strong>
          {b.serviceCategory && (
            <div style={{ marginTop: '0.25rem' }}>
              <Tag color="cyan">{b.serviceCategory}</Tag>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (_, b) => (
        <div>
          <strong>{b.customerName || 'Customer'}</strong>
          <div style={{ fontSize: '0.75rem', color: '#666' }}>{b.customerEmail}</div>
          {b.customerPhone && (
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{b.customerPhone}</div>
          )}
        </div>
      ),
    },
    {
      title: 'Event Date & Location',
      key: 'event',
      render: (_, b) => (
        <div>
          <strong>{b.eventDate}</strong>
          <div style={{ fontSize: '0.75rem', color: '#666' }}>
            {b.city || 'Location not specified'}
            {b.guestCount ? ` · ${b.guestCount} guests` : ''}
          </div>
        </div>
      ),
    },
    {
      title: 'Vendor Assigned',
      key: 'vendor',
      render: (_, b) => (
        <div>
          <div>{b.vendorBusinessName || b.vendorName || (b.vendorId ? `Vendor: ${b.vendorId.slice(0, 8)}...` : 'Not assigned yet')}</div>
          {b.totalAmount ? (
            <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>
              ₹{b.totalAmount}
            </div>
          ) : null}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={statusColorMap[status] || 'default'}
          style={{ textTransform: 'uppercase', fontWeight: 600 }}
        >
          {status.replace(/_/g, ' ')}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <PageTitle $palette={palette}>{t('admin.bookings')}</PageTitle>
      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'No bookings found' }}
        bordered
      />
    </>
  );
}

