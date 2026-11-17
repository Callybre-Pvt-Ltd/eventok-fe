import { Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CustomAntdSearchInput } from '@/components/global/custom-antd-search-input';
import { ErrorState } from '@/components/global/error-state';
import { LoadingState } from '@/components/global/loading-state';
import {
  AdminStatusBadge,
  AdminTableCard,
  AdminToolbar,
  AdminToolbarLeft,
  CellPrimary,
  CellSecondary,
  CellStack,
  PriceCellText,
} from '@/components/ui/admin-table';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { Booking } from '@/types';
import { useAdminBookings } from './helper';
import {
  CategoryBadge,
  PageEyebrow,
  PageHeader,
  PageLead,
  PageTitle,
  PhoneLink,
} from './styled';

export default function AdminBookingsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    bookings,
    isLoading,
    isFetching,
    error,
    refetch,
    search,
    setSearch,
    vendorId,
    setVendorId,
    vendorOptions,
  } = useAdminBookings();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={() => refetch()} />;

  const formatPrice = (amount: number | string | undefined | null) => {
    const val = Number(amount ?? 0);
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const columns: ColumnsType<Booking> = [
    {
      title: t('admin.bookingVendor') || 'Vendor',
      key: 'vendor',
      align: 'left',
      render: (_value, booking) => (
        <CellStack>
          <CellPrimary>
            {booking.vendorBusinessName ||
              booking.vendorName ||
              t('admin.bookingVendorUnassigned')}
          </CellPrimary>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            {booking.vendorPhone ? (
              <PhoneLink href={`tel:${booking.vendorPhone}`}>
                {booking.vendorPhone}
              </PhoneLink>
            ) : (
              <CellSecondary>{t('admin.bookingNoPhone')}</CellSecondary>
            )}
            {booking.pricingMode && booking.pricingMode !== 'quotation' && (
              <CategoryBadge>
                {booking.pricingMode === 'direct_package'
                  ? t('admin.bookingPackage')
                  : t('admin.bookingService')}
              </CategoryBadge>
            )}
          </div>
        </CellStack>
      ),
    },
    {
      title: t('admin.bookingItem') || 'Service / Event',
      key: 'item',
      align: 'left',
      render: (_value, booking) => (
        <CellStack>
          <CellPrimary>
            {booking.serviceName || booking.eventType || t('admin.bookings')}
          </CellPrimary>
          {booking.serviceCategory && (
            <CellSecondary>{booking.serviceCategory}</CellSecondary>
          )}
        </CellStack>
      ),
    },
    {
      title: t('admin.bookingCustomer') || 'Customer',
      key: 'customer',
      align: 'left',
      render: (_value, booking) => (
        <CellStack>
          <CellPrimary>{booking.customerName || '—'}</CellPrimary>
          <CellSecondary>
            {booking.customerEmail}
            {booking.customerPhone ? ` · ${booking.customerPhone}` : ''}
          </CellSecondary>
        </CellStack>
      ),
    },
    {
      title: t('admin.bookingDate') || 'Event Date',
      dataIndex: 'eventDate',
      key: 'eventDate',
      align: 'left',
      render: (dateStr: string) => {
        if (!dateStr) return <span style={{ color: 'var(--color-text-secondary)' }}>—</span>;
        const d = new Date(dateStr);
        const formatted = isNaN(d.getTime())
          ? dateStr
          : d.toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <CalendarIcon size={14} color="var(--color-text-secondary)" />
            <span style={{ fontWeight: 500 }}>{formatted}</span>
          </div>
        );
      },
    },
    {
      title: t('admin.amount') || 'Total Amount',
      key: 'amount',
      align: 'right',
      render: (_value, booking) => (
        <PriceCellText $accent>{formatPrice(booking.totalAmount)}</PriceCellText>
      ),
    },
    {
      title: t('admin.status') || 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: string) => <AdminStatusBadge status={status} />,
    },
  ];

  return (
    <>
      <PageHeader>
        <div>
          <PageEyebrow>MARKETPLACE MANAGEMENT</PageEyebrow>
          <PageTitle $palette={palette}>{t('admin.bookings')}</PageTitle>
          <PageLead $palette={palette}>
            Track all customer bookings, assigned vendor partners, and order statuses.
          </PageLead>
        </div>
      </PageHeader>

      <AdminToolbar>
        <AdminToolbarLeft>
          <CustomAntdSearchInput
            value={search}
            onChange={setSearch}
            placeholder={t('admin.bookingSearchPlaceholder')}
          />
          <Select
            value={vendorId}
            onChange={setVendorId}
            options={vendorOptions}
            showSearch
            optionFilterProp="label"
            style={{ minWidth: 220 }}
            placeholder="Filter by vendor"
          />
        </AdminToolbarLeft>
      </AdminToolbar>

      <AdminTableCard>
        <Table
          dataSource={bookings}
          columns={columns}
          rowKey="id"
          loading={isFetching}
          pagination={{ pageSize: 10, showSizeChanger: false }}
          locale={{ emptyText: t('admin.bookingEmpty') }}
        />
      </AdminTableCard>
    </>
  );
}
