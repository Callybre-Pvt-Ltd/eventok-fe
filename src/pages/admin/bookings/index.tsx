import { Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { CustomAntdSearchInput } from '@/components/global/custom-antd-search-input';
import { ErrorState } from '@/components/global/error-state';
import { LoadingState } from '@/components/global/loading-state';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { Booking } from '@/types';
import { useAdminBookings } from './helper';
import {
  CategoryBadge,
  FilterBar,
  FilterSearch,
  MutedLine,
  PageTitle,
  PhoneLink,
  StrongLine,
  VendorCell,
} from './styled';

const statusColorMap: Record<string, string> = {
  requested: 'blue',
  admin_review: 'gold',
  vendor_assigned: 'cyan',
  pending_vendor_acceptance: 'gold',
  payment_pending: 'orange',
  confirmed: 'green',
  in_progress: 'geekblue',
  completed: 'purple',
  rejected: 'red',
  cancelled: 'red',
};

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

  const columns: ColumnsType<Booking> = [
    {
      title: t('admin.bookingVendor'),
      key: 'vendor',
      render: (_value, booking) => (
        <VendorCell>
          <StrongLine>
            {booking.vendorBusinessName ||
              booking.vendorName ||
              t('admin.bookingVendorUnassigned')}
          </StrongLine>
          {booking.vendorPhone ? (
            <PhoneLink href={`tel:${booking.vendorPhone}`}>
              {booking.vendorPhone}
            </PhoneLink>
          ) : (
            <MutedLine>{t('admin.bookingNoPhone')}</MutedLine>
          )}
          {booking.pricingMode && booking.pricingMode !== 'quotation' && (
            <CategoryBadge>
              {booking.pricingMode === 'direct_package'
                ? t('admin.bookingPackage')
                : t('admin.bookingService')}
            </CategoryBadge>
          )}
        </VendorCell>
      ),
    },
    {
      title: t('admin.bookingItem'),
      key: 'item',
      render: (_value, booking) => (
        <VendorCell>
          <StrongLine>
            {booking.serviceName || booking.eventType || t('admin.bookings')}
          </StrongLine>
          {booking.serviceCategory && (
            <MutedLine>{booking.serviceCategory}</MutedLine>
          )}
        </VendorCell>
      ),
    },
    {
      title: t('admin.bookingCustomer'),
      key: 'customer',
      render: (_value, booking) => (
        <VendorCell>
          <StrongLine>{booking.customerName || '—'}</StrongLine>
          <MutedLine>{booking.customerEmail}</MutedLine>
          {booking.customerPhone ? (
            <PhoneLink href={`tel:${booking.customerPhone}`}>
              {booking.customerPhone}
            </PhoneLink>
          ) : (
            <MutedLine>{t('admin.bookingNoPhone')}</MutedLine>
          )}
        </VendorCell>
      ),
    },
    {
      title: t('admin.bookingDate'),
      dataIndex: 'eventDate',
      key: 'eventDate',
    },
    {
      title: t('admin.amount'),
      key: 'amount',
      render: (_value, booking) =>
        `₹${Number(booking.totalAmount ?? 0).toLocaleString('en-IN')}`,
    },
    {
      title: t('admin.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColorMap[status] || 'default'}>
          {status.replace(/_/g, ' ')}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <PageTitle $palette={palette}>{t('admin.bookings')}</PageTitle>

      <FilterBar>
        <FilterSearch>
          <CustomAntdSearchInput
            value={search}
            onChange={setSearch}
            placeholder={t('admin.bookingSearchPlaceholder')}
          />
        </FilterSearch>
        <Select
          value={vendorId}
          onChange={setVendorId}
          options={vendorOptions}
          showSearch
          optionFilterProp="label"
          style={{ minWidth: 220 }}
        />
      </FilterBar>

      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="id"
        loading={isFetching}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: t('admin.bookingEmpty') }}
        bordered
      />
    </>
  );
}
