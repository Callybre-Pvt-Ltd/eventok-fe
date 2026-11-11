import { Button, Tag } from 'antd';
import { FolderTree, MapPin, TrendingUp, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '@/components/global/empty-state';
import { LoadingState } from '@/components/global/loading-state';
import { ROUTES } from '@/constants/routes';
import { useAdminDashboard } from './helper';
import {
  ActionTile,
  ActionTileGrid,
  BlockHeader,
  BlockTitle,
  CockpitEyebrow,
  CockpitGrid,
  CockpitHeader,
  CockpitSub,
  CockpitTitle,
  CockpitWrap,
  FeedInfo,
  FeedList,
  FeedMeta,
  FeedRow,
  FeedTitle,
  MetricLabel,
  MetricNumber,
  MetricsRow,
  MetricSubtext,
  MetricTile,
  SectionBlock,
} from './styled';

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { stats, pendingVendors, recentBookings, isLoading } =
    useAdminDashboard();

  if (isLoading) return <LoadingState />;

  return (
    <CockpitWrap>
      <CockpitHeader>
        <CockpitEyebrow>Marketplace Command Center</CockpitEyebrow>
        <CockpitTitle>{t('admin.dashboardTitle')}</CockpitTitle>
        <CockpitSub>
          Live operational status, vendor verifications, and booking activity
          across EventOK.
        </CockpitSub>
      </CockpitHeader>

      {/* 5-Column High Density Metric Ribbon */}
      <MetricsRow>
        <MetricTile $accent>
          <MetricLabel>Gross Platform Revenue</MetricLabel>
          <MetricNumber $accent>
            ₹{stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : '0'}
          </MetricNumber>
          <MetricSubtext>From completed vendor bookings</MetricSubtext>
        </MetricTile>

        <MetricTile>
          <MetricLabel>{t('admin.totalBookings')}</MetricLabel>
          <MetricNumber>{stats?.totalBookings ?? 0}</MetricNumber>
          <MetricSubtext>
            {stats?.bookingsThisMonth ?? 0} booked this month
          </MetricSubtext>
        </MetricTile>

        <MetricTile>
          <MetricLabel>{t('admin.totalVendors')}</MetricLabel>
          <MetricNumber>{stats?.totalVendors ?? 0}</MetricNumber>
          <MetricSubtext>Registered decorator partners</MetricSubtext>
        </MetricTile>

        <MetricTile>
          <MetricLabel>{t('admin.totalCustomers')}</MetricLabel>
          <MetricNumber>{stats?.totalCustomers ?? 0}</MetricNumber>
          <MetricSubtext>Active platform customers</MetricSubtext>
        </MetricTile>

        <MetricTile $accent={Boolean(stats?.pendingApprovals)}>
          <MetricLabel>{t('admin.pendingApprovals')}</MetricLabel>
          <MetricNumber $accent={Boolean(stats?.pendingApprovals)}>
            {stats?.pendingApprovals ?? pendingVendors.length}
          </MetricNumber>
          <MetricSubtext>Requires KYC verification</MetricSubtext>
        </MetricTile>
      </MetricsRow>

      {/* 2-Column Split Workspace */}
      <CockpitGrid>
        {/* Left Column: Actionable Approvals Queue */}
        <SectionBlock>
          <BlockHeader>
            <BlockTitle>Pending Vendor Verifications</BlockTitle>
            <Button
              type="link"
              size="small"
              onClick={() => navigate(ROUTES.ADMIN_APPROVALS)}
            >
              View all ({pendingVendors.length})
            </Button>
          </BlockHeader>

          {pendingVendors.length === 0 ? (
            <EmptyState description="All vendor applications have been audited. No pending KYC reviews." />
          ) : (
            <FeedList>
              {pendingVendors.slice(0, 5).map(v => (
                <FeedRow key={v.id}>
                  <FeedInfo>
                    <FeedTitle>{v.businessName}</FeedTitle>
                    <FeedMeta>
                      Owner: {v.ownerName || 'Not provided'} · Mobile:{' '}
                      {v.mobileNumber || 'Not provided'}
                    </FeedMeta>
                  </FeedInfo>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => navigate(ROUTES.ADMIN_APPROVALS)}
                  >
                    Audit KYC
                  </Button>
                </FeedRow>
              ))}
            </FeedList>
          )}
        </SectionBlock>

        {/* Right Column: Platform Controls & Recent Activity */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <SectionBlock>
            <BlockHeader>
              <BlockTitle>Platform Controls</BlockTitle>
            </BlockHeader>
            <ActionTileGrid>
              <ActionTile onClick={() => navigate(ROUTES.ADMIN_CATEGORIES)}>
                <FolderTree size={18} color="var(--color-primary)" />
                <span>Categories</span>
              </ActionTile>
              <ActionTile onClick={() => navigate(ROUTES.ADMIN_SERVICES)}>
                <Wrench size={18} color="var(--color-primary)" />
                <span>Services</span>
              </ActionTile>
              <ActionTile onClick={() => navigate(ROUTES.ADMIN_LOCATIONS)}>
                <MapPin size={18} color="var(--color-primary)" />
                <span>Locations</span>
              </ActionTile>
              <ActionTile onClick={() => navigate(ROUTES.ADMIN_REPORTS)}>
                <TrendingUp size={18} color="var(--color-primary)" />
                <span>Reports</span>
              </ActionTile>
            </ActionTileGrid>
          </SectionBlock>

          <SectionBlock>
            <BlockHeader>
              <BlockTitle>Recent Bookings Activity</BlockTitle>
              <Button
                type="link"
                size="small"
                onClick={() => navigate(ROUTES.ADMIN_BOOKINGS)}
              >
                All bookings
              </Button>
            </BlockHeader>

            {recentBookings.length === 0 ? (
              <EmptyState description="No recent bookings logged on the platform yet." />
            ) : (
              <FeedList>
                {recentBookings.slice(0, 4).map(b => (
                  <FeedRow key={b.id}>
                    <FeedInfo>
                      <FeedTitle>
                        {b.serviceName || b.eventType || 'Event Booking'}
                      </FeedTitle>
                      <FeedMeta>
                        Date: {b.eventDate} · Amount: ₹
                        {Number(b.totalAmount ?? 0).toLocaleString('en-IN')}
                      </FeedMeta>
                    </FeedInfo>
                    <Tag
                      color={
                        b.status === 'confirmed'
                          ? 'green'
                          : b.status === 'completed'
                          ? 'purple'
                          : 'orange'
                      }
                    >
                      {b.status.replace('_', ' ').toUpperCase()}
                    </Tag>
                  </FeedRow>
                ))}
              </FeedList>
            )}
          </SectionBlock>
        </div>
      </CockpitGrid>
    </CockpitWrap>
  );
}
