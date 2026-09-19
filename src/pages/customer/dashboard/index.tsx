import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ROUTES } from '@/constants/routes';
import { LoadingState } from '@/components/global/loading-state';
import { useCustomerDashboard } from './helper';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import {
  ItemMeta,
  ItemTitle,
  List,
  ListItem,
  PageTitle,
  StatCard,
  StatLabel,
  StatValue,
  StatsGrid,
} from './styled';

export default function CustomerDashboardPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { upcoming, unread, bookings, isLoading } = useCustomerDashboard();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('customer.dashboardTitle')}</PageTitle>
      <StatsGrid>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>
            {t('customer.upcomingBookings')}
          </StatLabel>
          <StatValue $palette={palette}>{upcoming}</StatValue>
        </StatCard>
        <StatCard $palette={palette}>
          <StatLabel $palette={palette}>
            {t('customer.notifications')}
          </StatLabel>
          <StatValue $palette={palette}>{unread}</StatValue>
        </StatCard>
      </StatsGrid>
      <StatLabel $palette={palette}>{t('customer.quickActions')}</StatLabel>
      <StatsGrid>
        <Link to={ROUTES.SHOP}>
          <Button block>{t('customer.browseVendors')}</Button>
        </Link>
        <Link to={ROUTES.CUSTOMER_CHAT}>
          <Button block>{t('customer.chatWithAdmin')}</Button>
        </Link>
      </StatsGrid>
      <StatLabel $palette={palette}>{t('customer.bookingHistory')}</StatLabel>
      <List>
        {bookings.slice(0, 5).map(b => (
          <ListItem $palette={palette} key={b.id}>
            <ItemTitle $palette={palette}>{b.eventType}</ItemTitle>
            <ItemMeta $palette={palette}>
              {b.eventDate} · {b.status}
            </ItemMeta>
          </ListItem>
        ))}
        {bookings.length === 0 && (
          <ItemMeta $palette={palette}>{t('customer.noBookings')}</ItemMeta>
        )}
      </List>
    </>
  );
}
