import { useMemo } from 'react';
import { Button, Tag } from 'antd';
import { Calendar, Plus, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { ROUTES } from '@/constants/routes';
import { useVendorDashboard } from './helper';
import {
  BlockHeader,
  BlockTitle,
  BookingInfo,
  BookingList,
  BookingMeta,
  BookingRow,
  BookingTitle,
  DashboardGrid,
  DashboardWrap,
  GreetingEyebrow,
  GreetingHeader,
  GreetingSub,
  GreetingTitle,
  MetricLabel,
  MetricNumber,
  MetricsRow,
  MetricSubtext,
  MetricTile,
  PerformanceItem,
  SectionBlock,
} from './styled';

export default function VendorDashboardPage() {
  const {
    vendor,
    pendingRequests,
    upcomingBookings,
    totalBookings,
    revenue,
    servicesCount,
    packagesCount,
    vendorStatus,
    isLoading,
  } = useVendorDashboard();
  const navigate = useNavigate();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const vendorDisplayName =
    vendor?.businessName || vendor?.ownerName || 'Partner';

  if (isLoading) return <LoadingState />;

  return (
    <DashboardWrap>
      <GreetingHeader>
        <GreetingEyebrow>Vendor Overview</GreetingEyebrow>
        <GreetingTitle>
          {greeting}, {vendorDisplayName}
        </GreetingTitle>
        <GreetingSub>
          Here's what's happening with your EventOK decoration business today.
        </GreetingSub>
      </GreetingHeader>

      {/* Top Key Business Metrics */}
      <MetricsRow>
        <MetricTile>
          <MetricLabel>Total Revenue</MetricLabel>
          <MetricNumber $accent>
            ₹{revenue.toLocaleString('en-IN')}
          </MetricNumber>
          <MetricSubtext>From confirmed & completed events</MetricSubtext>
        </MetricTile>

        <MetricTile>
          <MetricLabel>Pending Requests</MetricLabel>
          <MetricNumber>{pendingRequests.length}</MetricNumber>
          <MetricSubtext>Awaiting your confirmation</MetricSubtext>
        </MetricTile>

        <MetricTile>
          <MetricLabel>Upcoming Events</MetricLabel>
          <MetricNumber>{upcomingBookings.length}</MetricNumber>
          <MetricSubtext>Scheduled decor bookings</MetricSubtext>
        </MetricTile>

        <MetricTile>
          <MetricLabel>Total Bookings</MetricLabel>
          <MetricNumber>{totalBookings}</MetricNumber>
          <MetricSubtext>Lifetime bookings</MetricSubtext>
        </MetricTile>

        <MetricTile>
          <MetricLabel>Active Services</MetricLabel>
          <MetricNumber>{servicesCount}</MetricNumber>
          <MetricSubtext>{packagesCount} package bundles</MetricSubtext>
        </MetricTile>
      </MetricsRow>

      {/* Structured 2-column workspace */}
      <DashboardGrid>
        {/* Left Column: Requests & Upcoming Bookings */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <SectionBlock>
            <BlockHeader>
              <BlockTitle>Pending Booking Requests</BlockTitle>
              <Button
                type="link"
                size="small"
                onClick={() => navigate(ROUTES.VENDOR_BOOKINGS)}
              >
                View all ({pendingRequests.length})
              </Button>
            </BlockHeader>

            {pendingRequests.length === 0 ? (
              <EmptyState description="No pending requests right now. New requests will appear here." />
            ) : (
              <BookingList>
                {pendingRequests.slice(0, 4).map(b => (
                  <BookingRow key={b.id}>
                    <BookingInfo>
                      <BookingTitle>
                        {b.serviceName || 'Custom Decoration'} ·{' '}
                        {b.customerName || 'Customer'}
                      </BookingTitle>
                      <BookingMeta>
                        Event date: <strong>{b.eventDate}</strong> · Amount: ₹
                        {Number(b.totalAmount ?? 0).toLocaleString('en-IN')}
                      </BookingMeta>
                    </BookingInfo>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => navigate(ROUTES.VENDOR_BOOKINGS)}
                    >
                      Review
                    </Button>
                  </BookingRow>
                ))}
              </BookingList>
            )}
          </SectionBlock>

          <SectionBlock>
            <BlockHeader>
              <BlockTitle>Upcoming Scheduled Events</BlockTitle>
              <Button
                type="link"
                size="small"
                onClick={() => navigate(ROUTES.VENDOR_BOOKINGS)}
              >
                Calendar
              </Button>
            </BlockHeader>

            {upcomingBookings.length === 0 ? (
              <EmptyState description="No upcoming events scheduled yet." />
            ) : (
              <BookingList>
                {upcomingBookings.slice(0, 4).map(b => (
                  <BookingRow key={b.id}>
                    <BookingInfo>
                      <BookingTitle>
                        {b.serviceName || 'Decoration Service'}
                      </BookingTitle>
                      <BookingMeta>
                        {b.customerName || 'Customer'} · {b.eventDate} ·{' '}
                        {b.city || 'Regional'}
                      </BookingMeta>
                    </BookingInfo>
                    <Tag color="green">CONFIRMED</Tag>
                  </BookingRow>
                ))}
              </BookingList>
            )}
          </SectionBlock>
        </div>

        {/* Right Column: Performance & Quick Actions */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <SectionBlock>
            <BlockHeader>
              <BlockTitle>Storefront Actions</BlockTitle>
            </BlockHeader>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              <Button
                type="primary"
                icon={<Plus size={15} />}
                block
                style={{ textAlign: 'left', height: 42 }}
                onClick={() => navigate(`${ROUTES.VENDOR_SERVICES}/new`)}
              >
                Create new service
              </Button>
              <Button
                icon={<Wrench size={15} />}
                block
                style={{ textAlign: 'left', height: 42 }}
                onClick={() => navigate(ROUTES.VENDOR_SERVICES)}
              >
                Manage service catalog
              </Button>
              <Button
                icon={<Calendar size={15} />}
                block
                style={{ textAlign: 'left', height: 42 }}
                onClick={() => navigate(ROUTES.VENDOR_BOOKINGS)}
              >
                Review booking requests
              </Button>
            </div>
          </SectionBlock>

          <SectionBlock>
            <BlockHeader>
              <BlockTitle>Account & Verification Status</BlockTitle>
            </BlockHeader>
            <div>
              <PerformanceItem>
                <span style={{ color: '#64748b' }}>Profile verification:</span>
                <Tag
                  color={
                    vendorStatus === 'approved'
                      ? 'green'
                      : vendorStatus === 'rejected'
                      ? 'red'
                      : 'orange'
                  }
                >
                  {vendorStatus.toUpperCase()}
                </Tag>
              </PerformanceItem>
              <PerformanceItem>
                <span style={{ color: '#64748b' }}>Storefront city:</span>
                <strong>{vendor?.city || 'Regional'}</strong>
              </PerformanceItem>
              <PerformanceItem>
                <span style={{ color: '#64748b' }}>Service listings:</span>
                <strong>{servicesCount} live / draft</strong>
              </PerformanceItem>
              <PerformanceItem>
                <span style={{ color: '#64748b' }}>Packages:</span>
                <strong>{packagesCount} configured</strong>
              </PerformanceItem>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <Button
                type="link"
                size="small"
                style={{ padding: 0 }}
                onClick={() => navigate(ROUTES.VENDOR_PROFILE)}
              >
                Manage business profile & KYC docs →
              </Button>
            </div>
          </SectionBlock>
        </div>
      </DashboardGrid>
    </DashboardWrap>
  );
}
