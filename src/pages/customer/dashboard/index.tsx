import { Button, Tag } from 'antd';
import {
  ArrowRight,
  Boxes,
  CalendarCheck2,
  Compass,
  MessageSquare,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '@/components/global/empty-state';
import { LoadingState } from '@/components/global/loading-state';
import { ROUTES } from '@/constants/routes';
import { useCustomerDashboard } from './helper';
import {
  BlockHeader,
  BlockTitle,
  BookingInfo,
  BookingMeta,
  BookingRow,
  BookingTitle,
  HubGrid,
  HubHeader,
  HubSub,
  HubTitle,
  HubWrap,
  LauncherCard,
  LauncherIconWrap,
  LauncherLeft,
  LauncherList,
  LauncherSub,
  LauncherText,
  LauncherTitle,
  SectionBlock,
} from './styled';

export default function CustomerDashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { upcoming, unread, bookings, isLoading } = useCustomerDashboard();

  if (isLoading) return <LoadingState />;

  return (
    <HubWrap>
      <HubHeader>
        <HubTitle>{t('customer.dashboardTitle')}</HubTitle>
        <HubSub>
          Manage your celebration bookings, view decorator status, and discover
          tailored event packages.
        </HubSub>
      </HubHeader>

      <HubGrid>
        {/* Left Column: Recent Bookings */}
        <SectionBlock>
          <BlockHeader>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <CalendarCheck2 size={18} color="var(--color-primary)" />
              <BlockTitle>{t('customer.bookingHistory')}</BlockTitle>
              {upcoming > 0 && <Tag color="orange">{upcoming} Upcoming</Tag>}
            </div>
            <Button
              type="link"
              size="small"
              onClick={() => navigate(ROUTES.CUSTOMER_BOOKINGS)}
            >
              All bookings ({bookings.length})
            </Button>
          </BlockHeader>

          {bookings.length === 0 ? (
            <EmptyState description={t('customer.noBookings')} />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              {bookings.slice(0, 5).map(b => (
                <BookingRow key={b.id}>
                  <BookingInfo>
                    <BookingTitle>{b.serviceName || b.eventType}</BookingTitle>
                    <BookingMeta>
                      Event date: <strong>{b.eventDate}</strong> · Amount: ₹
                      {Number(b.totalAmount ?? 0).toLocaleString('en-IN')}
                    </BookingMeta>
                  </BookingInfo>
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
                </BookingRow>
              ))}
            </div>
          )}
        </SectionBlock>

        {/* Right Column: Planning Launchers */}
        <SectionBlock>
          <BlockHeader>
            <BlockTitle>Quick Actions</BlockTitle>
          </BlockHeader>

          <LauncherList>
            <LauncherCard onClick={() => navigate(ROUTES.SHOP)}>
              <LauncherLeft>
                <LauncherIconWrap>
                  <Compass size={18} />
                </LauncherIconWrap>
                <LauncherText>
                  <LauncherTitle>Browse Decorators</LauncherTitle>
                  <LauncherSub>
                    Explore wedding, birthday & party themes
                  </LauncherSub>
                </LauncherText>
              </LauncherLeft>
              <ArrowRight size={16} color="var(--color-text-secondary)" />
            </LauncherCard>

            <LauncherCard onClick={() => navigate(ROUTES.PACKAGE_BUILDER)}>
              <LauncherLeft>
                <LauncherIconWrap>
                  <Boxes size={18} />
                </LauncherIconWrap>
                <LauncherText>
                  <LauncherTitle>Build Custom Package</LauncherTitle>
                  <LauncherSub>
                    Combine decor, lighting, and stage bundles
                  </LauncherSub>
                </LauncherText>
              </LauncherLeft>
              <ArrowRight size={16} color="var(--color-text-secondary)" />
            </LauncherCard>

            <LauncherCard onClick={() => navigate(ROUTES.CUSTOMER_CHAT)}>
              <LauncherLeft>
                <LauncherIconWrap>
                  <MessageSquare size={18} />
                </LauncherIconWrap>
                <LauncherText>
                  <LauncherTitle>EventOK Concierge Chat</LauncherTitle>
                  <LauncherSub>
                    {unread > 0
                      ? `${unread} unread messages`
                      : 'Need help planning? Chat with us'}
                  </LauncherSub>
                </LauncherText>
              </LauncherLeft>
              <ArrowRight size={16} color="var(--color-text-secondary)" />
            </LauncherCard>
          </LauncherList>
        </SectionBlock>
      </HubGrid>
    </HubWrap>
  );
}
