import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useAdminBookings } from './helper';
import {
  BookingCard,
  BookingCardHeader,
  CategoryBadge,
  DetailSection,
  DetailsGrid,
  List,
  NotesBox,
  PageTitle,
  PrimaryText,
  SecondaryText,
  SectionLabel,
  ServiceTitle,
} from './styled';
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

  return (
    <>
      <PageTitle $palette={palette}>{t('admin.bookings')}</PageTitle>
      {bookings.length === 0 ? (
        <EmptyState description="No bookings found" />
      ) : (
        <List>
          {bookings.map(b => (
            <BookingCard $palette={palette} key={b.id}>
              <BookingCardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <ServiceTitle $palette={palette}>
                    {b.serviceName || b.eventType || 'Service Booking'}
                  </ServiceTitle>
                  {b.serviceCategory && <CategoryBadge>{b.serviceCategory}</CategoryBadge>}
                </div>
                <Tag color={statusColorMap[b.status] || 'default'} style={{ textTransform: 'uppercase', fontWeight: 600 }}>
                  {b.status.replace(/_/g, ' ')}
                </Tag>
              </BookingCardHeader>

              <DetailsGrid>
                <DetailSection $palette={palette}>
                  <SectionLabel>Customer Details</SectionLabel>
                  <PrimaryText $palette={palette}>
                    {b.customerName || 'Customer'}
                  </PrimaryText>
                  <SecondaryText $palette={palette}>
                    {b.customerEmail || b.customerId}
                  </SecondaryText>
                  {b.customerPhone && (
                    <SecondaryText $palette={palette}>{b.customerPhone}</SecondaryText>
                  )}
                </DetailSection>

                <DetailSection $palette={palette}>
                  <SectionLabel>Event & Location</SectionLabel>
                  <PrimaryText $palette={palette}>
                    {b.eventDate}
                  </PrimaryText>
                  <SecondaryText $palette={palette}>
                    {b.city || 'Location not specified'}
                  </SecondaryText>
                  {b.guestCount ? (
                    <SecondaryText $palette={palette}>{b.guestCount} guests</SecondaryText>
                  ) : null}
                </DetailSection>

                <DetailSection $palette={palette}>
                  <SectionLabel>Vendor Details</SectionLabel>
                  <PrimaryText $palette={palette}>
                    {b.vendorBusinessName || b.vendorName || (b.vendorId ? `Vendor: ${b.vendorId.slice(0, 8)}...` : 'Not assigned yet')}
                  </PrimaryText>
                  <SecondaryText $palette={palette}>
                    {b.totalAmount ? `Total / Budget: ₹${b.totalAmount}` : 'No pricing set'}
                  </SecondaryText>
                </DetailSection>
              </DetailsGrid>

              {b.notes && (
                <NotesBox $palette={palette}>
                  <strong style={{ display: 'block', marginBottom: '0.2rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    Requirements / Notes:
                  </strong>
                  {b.notes}
                </NotesBox>
              )}
            </BookingCard>
          ))}
        </List>
      )}
    </>
  );
}
