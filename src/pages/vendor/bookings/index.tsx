import { useState, useMemo } from 'react';
import { Button, Drawer, Input, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AlertTriangle, Eye, Phone, Search, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import {
  Field,
  FieldLabel,
  FormModal,
  PreviewCard,
  PreviewRow,
  PreviewValue,
} from '@/components/ui/form-modal';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { bookingService } from '@/services';
import type { Booking, BookingStatus } from '@/types';
import { useVendorBookings } from './helper';
import {
  ActionRow,
  ContactNotice,
  DrawerLabel,
  DrawerSection,
  DrawerValue,
  FilterBar,
  FilterLeft,
  MetaRow,
  PageTitle,
  RefundNotice,
} from './styled';

const STATUS_COLOR: Record<string, string> = {
  pending_vendor_acceptance: 'gold',
  payment_pending: 'orange',
  confirmed: 'green',
  in_progress: 'geekblue',
  completed: 'purple',
  rejected: 'red',
  cancelled: 'default',
};

const FILTERS: (BookingStatus | 'all')[] = [
  'all',
  'pending_vendor_acceptance',
  'confirmed',
  'in_progress',
  'completed',
  'rejected',
  'cancelled',
];

const REJECT_REASONS = [
  'Date unavailable / Already booked for this date',
  'Venue location outside serviceable range',
  'Capacity / decor inventory limit reached',
  'Customer special requests cannot be fulfilled',
  'Other reason',
];

export default function VendorBookingsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    bookings,
    isLoading,
    statusFilter,
    setStatusFilter,
    acceptMutation,
    rejectMutation,
    rejectTarget,
    rejectReason,
    setRejectReason,
    openReject,
    closeReject,
    confirmReject,
    refundAmount,
  } = useVendorBookings();

  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [contactData, setContactData] = useState<{
    name: string;
    mobile_number: string | null;
  } | null>(null);
  const [selectedReasonPreset, setSelectedReasonPreset] = useState(
    REJECT_REASONS[0],
  );
  const [customReasonNote, setCustomReasonNote] = useState('');

  const openDrawer = async (b: Booking) => {
    setSelectedBooking(b);
    setContactData(null);
    if (
      b.status === 'confirmed' ||
      b.status === 'in_progress' ||
      b.status === 'completed'
    ) {
      const res = await bookingService.getContact(b.id);
      if (!res.error && res.data) {
        setContactData(res.data);
      }
    }
  };

  const closeDrawer = () => {
    setSelectedBooking(null);
    setContactData(null);
  };

  const statusLabel = (status: string): string => {
    const key =
      status === 'pending_vendor_acceptance'
        ? 'statusPendingAcceptance'
        : status === 'payment_pending'
        ? 'statusPendingPayment'
        : status === 'confirmed'
        ? 'statusConfirmed'
        : status === 'in_progress'
        ? 'statusInProgress'
        : status === 'completed'
        ? 'statusCompleted'
        : status === 'rejected'
        ? 'statusRejected'
        : status === 'cancelled'
        ? 'statusCancelled'
        : '';
    return key ? t(`vendor.${key}`) : status;
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const term = search.toLowerCase();
      const matchCustomer = b.customerName?.toLowerCase().includes(term);
      const matchService = b.serviceName?.toLowerCase().includes(term);
      const matchId = String(b.id).toLowerCase().includes(term);
      return !search || matchCustomer || matchService || matchId;
    });
  }, [bookings, search]);

  if (isLoading) return <LoadingState />;

  const handleOpenRejectModal = (b: Booking) => {
    setSelectedReasonPreset(REJECT_REASONS[0]);
    setCustomReasonNote('');
    setRejectReason(REJECT_REASONS[0]);
    openReject(b);
  };

  const handleReasonPresetChange = (val: string) => {
    setSelectedReasonPreset(val);
    const combined = customReasonNote ? `${val}: ${customReasonNote}` : val;
    setRejectReason(combined);
  };

  const handleCustomNoteChange = (text: string) => {
    setCustomReasonNote(text);
    const combined = text
      ? `${selectedReasonPreset}: ${text}`
      : selectedReasonPreset;
    setRejectReason(combined);
  };

  const columns: ColumnsType<Booking> = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
      render: id => <code>{String(id).slice(0, 8)}</code>,
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (_, b) => (
        <div>
          <strong>{b.customerName || 'Customer'}</strong>
          {b.city && <MetaRow>{b.city}</MetaRow>}
        </div>
      ),
    },
    {
      title: 'Service / Package',
      key: 'service',
      render: (_, b) => (
        <div>
          <span>{b.serviceName || 'Custom Service'}</span>
          {b.eventType && <MetaRow>{b.eventType}</MetaRow>}
        </div>
      ),
    },
    {
      title: 'Event Date',
      dataIndex: 'eventDate',
      key: 'eventDate',
      render: d => <strong>{d}</strong>,
    },
    {
      title: 'Amount & Advance',
      key: 'amount',
      render: (_, b) => (
        <div>
          <strong>₹{Number(b.totalAmount ?? 0).toLocaleString('en-IN')}</strong>
          {b.advanceAmount ? (
            <MetaRow>
              Advance: ₹{Number(b.advanceAmount).toLocaleString('en-IN')}
            </MetaRow>
          ) : null}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={STATUS_COLOR[status] || 'default'}>
          {statusLabel(status)}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, b) => (
        <ActionRow onClick={e => e.stopPropagation()}>
          <Button
            size="small"
            icon={<Eye size={13} />}
            onClick={() => openDrawer(b)}
          >
            Details
          </Button>
          {b.status === 'pending_vendor_acceptance' ? (
            <>
              <Button
                type="primary"
                size="small"
                loading={acceptMutation.isPending}
                onClick={() => acceptMutation.mutate(b.id)}
              >
                Accept
              </Button>
              <Button
                danger
                size="small"
                loading={rejectMutation.isPending}
                onClick={() => handleOpenRejectModal(b)}
              >
                Reject
              </Button>
            </>
          ) : null}
        </ActionRow>
      ),
    },
  ];

  return (
    <>
      <PageTitle $palette={palette}>Manage Bookings</PageTitle>

      <FilterBar>
        <FilterLeft>
          <Input
            placeholder="Search customer, service, or booking ID…"
            prefix={<Search size={14} color="#94a3b8" />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            allowClear
            style={{ minWidth: 260, maxWidth: 360 }}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 220 }}
            options={FILTERS.map(f => ({
              value: f,
              label: f === 'all' ? 'All statuses' : statusLabel(f),
            }))}
          />
        </FilterLeft>
      </FilterBar>

      {filteredBookings.length === 0 ? (
        <EmptyState description="No bookings found matching your filters." />
      ) : (
        <Table
          dataSource={filteredBookings}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          onRow={record => ({
            onClick: () => openDrawer(record),
            style: { cursor: 'pointer' },
          })}
        />
      )}

      {/* Booking Details Drawer */}
      <Drawer
        title={
          selectedBooking
            ? `Booking #${String(selectedBooking.id).slice(0, 8)}`
            : 'Booking Details'
        }
        open={!!selectedBooking}
        onClose={closeDrawer}
        width={460}
      >
        {selectedBooking && (
          <div>
            <DrawerSection>
              <DrawerLabel>Status</DrawerLabel>
              <div>
                <Tag color={STATUS_COLOR[selectedBooking.status] || 'default'}>
                  {statusLabel(selectedBooking.status).toUpperCase()}
                </Tag>
              </div>
            </DrawerSection>

            <DrawerSection>
              <DrawerLabel>Service / Package</DrawerLabel>
              <DrawerValue>
                <strong>
                  {selectedBooking.serviceName || 'Custom Event Setup'}
                </strong>
              </DrawerValue>
              {selectedBooking.eventType && (
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Event type: {selectedBooking.eventType}
                </div>
              )}
            </DrawerSection>

            <DrawerSection>
              <DrawerLabel>Event Date & Location</DrawerLabel>
              <DrawerValue>
                <strong>{selectedBooking.eventDate}</strong>
              </DrawerValue>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                {selectedBooking.city || 'Regional service area'}
                {selectedBooking.guestCount
                  ? ` · ${selectedBooking.guestCount} guests`
                  : ''}
              </div>
            </DrawerSection>

            <DrawerSection>
              <DrawerLabel>Customer Contact Information</DrawerLabel>
              <DrawerValue>
                <strong>{selectedBooking.customerName || 'Customer'}</strong>
              </DrawerValue>

              {contactData?.mobile_number ? (
                <ContactNotice $revealed>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    <Phone size={14} />
                    <span>{contactData.mobile_number}</span>
                  </div>
                  <div style={{ marginTop: '0.2rem' }}>
                    Customer phone number verified for this confirmed booking.
                  </div>
                </ContactNotice>
              ) : selectedBooking.status === 'confirmed' ||
                selectedBooking.status === 'in_progress' ||
                selectedBooking.status === 'completed' ? (
                <ContactNotice $revealed>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    <Phone size={14} />
                    <span>
                      {selectedBooking.customerPhone || 'Contact verified'}
                    </span>
                  </div>
                </ContactNotice>
              ) : (
                <ContactNotice>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontWeight: 600,
                      color: '#475569',
                    }}
                  >
                    <ShieldAlert size={14} />
                    <span>Customer phone hidden</span>
                  </div>
                  <div style={{ marginTop: '0.2rem' }}>
                    Phone number is hidden before booking confirmation. Once you
                    accept this request, customer contact details are unlocked.
                  </div>
                </ContactNotice>
              )}
            </DrawerSection>

            <DrawerSection>
              <DrawerLabel>Pricing & Financials</DrawerLabel>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  fontSize: '0.875rem',
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ color: '#64748b' }}>
                    Total booking amount:
                  </span>
                  <strong>
                    ₹
                    {Number(selectedBooking.totalAmount ?? 0).toLocaleString(
                      'en-IN',
                    )}
                  </strong>
                </div>
                {selectedBooking.advanceAmount ? (
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span style={{ color: '#64748b' }}>
                      Advance payment (paid upfront):
                    </span>
                    <strong style={{ color: '#16a34a' }}>
                      ₹
                      {Number(selectedBooking.advanceAmount).toLocaleString(
                        'en-IN',
                      )}
                    </strong>
                  </div>
                ) : null}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '0.35rem',
                  }}
                >
                  <span style={{ color: '#64748b' }}>
                    Remaining due at event:
                  </span>
                  <strong>
                    ₹
                    {(
                      Number(selectedBooking.totalAmount ?? 0) -
                      Number(selectedBooking.advanceAmount ?? 0)
                    ).toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            </DrawerSection>

            {selectedBooking.status === 'rejected' && (
              <DrawerSection>
                <DrawerLabel>Refund Lifecycle</DrawerLabel>
                <RefundNotice>
                  <strong>Refund initiated (mock lifecycle):</strong>
                  <div>
                    Amount: ₹
                    {Number(selectedBooking.advanceAmount ?? 0).toLocaleString(
                      'en-IN',
                    )}
                  </div>
                  <div>Status: REFUND INITIATED → REFUNDED</div>
                  <div>Reason: Vendor rejected booking</div>
                </RefundNotice>
              </DrawerSection>
            )}

            {selectedBooking.status === 'pending_vendor_acceptance' && (
              <div
                style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}
              >
                <Button
                  type="primary"
                  block
                  loading={acceptMutation.isPending}
                  onClick={() => {
                    acceptMutation.mutate(selectedBooking.id);
                    closeDrawer();
                  }}
                >
                  Accept booking
                </Button>
                <Button
                  danger
                  block
                  loading={rejectMutation.isPending}
                  onClick={() => {
                    closeDrawer();
                    handleOpenRejectModal(selectedBooking);
                  }}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Reject Confirmation Modal with Structured Reasons */}
      <FormModal
        open={!!rejectTarget}
        onClose={closeReject}
        icon={AlertTriangle}
        title="Reject booking request?"
        subtitle="Are you sure you want to decline this customer booking? This action cannot be undone."
        primaryLabel="Confirm rejection"
        onPrimary={confirmReject}
        primaryDanger
        primaryLoading={rejectMutation.isPending}
        primaryDisabled={!rejectReason.trim()}
        secondaryLabel="Cancel"
      >
        <PreviewCard $palette={palette}>
          <PreviewRow>
            <span>
              {refundAmount > 0
                ? `Customer advance payment of ₹${refundAmount.toLocaleString(
                    'en-IN',
                  )} will be initiated for refund.`
                : 'No advance was collected for this booking.'}
            </span>
          </PreviewRow>
          {refundAmount > 0 ? (
            <PreviewRow>
              <PreviewValue $strong>
                ₹{refundAmount.toLocaleString('en-IN')}
              </PreviewValue>
            </PreviewRow>
          ) : null}
        </PreviewCard>

        <Field>
          <FieldLabel>Select reason for rejection</FieldLabel>
          <Select
            value={selectedReasonPreset}
            onChange={handleReasonPresetChange}
            style={{ width: '100%', marginBottom: '0.75rem' }}
            options={REJECT_REASONS.map(r => ({ value: r, label: r }))}
          />
        </Field>

        <Field>
          <FieldLabel>Optional note for customer</FieldLabel>
          <Input.TextArea
            value={customReasonNote}
            onChange={e => handleCustomNoteChange(e.target.value)}
            placeholder="e.g. We have an existing wedding mandate that requires all staff."
            rows={3}
          />
        </Field>
      </FormModal>
    </>
  );
}
