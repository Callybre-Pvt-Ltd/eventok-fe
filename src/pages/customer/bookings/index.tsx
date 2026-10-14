import { Button, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/global/empty-state';
import { ErrorState } from '@/components/global/error-state';
import { LoadingState } from '@/components/global/loading-state';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { useAuth } from '@/hooks/auth/use-auth';
import { paymentService } from '@/services';
import {
  bookingLabelKey,
  bookingTone,
  isContactVisible,
} from '@/utils/booking-status';
import { useCustomerBookings } from './helper';
import {
  BookingHead,
  ItemMeta,
  ItemTitle,
  List,
  ListItem,
  PageTitle,
  PayRow,
  StatusBadge,
  StatusNote,
  VendorCard,
  VendorLabel,
  VendorName,
  VendorPhone,
} from './styled';

export default function CustomerBookingsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { session } = useAuth();
  const { bookings, vendorContacts, isLoading, error, refetch } =
    useCustomerBookings();
  const [payingId, setPayingId] = useState<string | null>(null);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  const pay = async (bookingId: string) => {
    setPayingId(bookingId);
    const res = await paymentService.openCheckout({
      bookingId,
      name: session?.user.name,
      email: session?.user.email,
      onSuccess: () => {
        message.success('Payment submitted. Status updates after webhook.');
        refetch();
      },
    });
    setPayingId(null);
    if (res.error) {
      message.error(res.error);
      return;
    }
    if (res.data && !res.data.configured) {
      message.warning(res.data.message ?? 'Payments not configured');
    }
  };

  return (
    <>
      <PageTitle $palette={palette}>{t('customer.bookings')}</PageTitle>
      {bookings.length === 0 ? (
        <EmptyState description={t('customer.noBookings')} />
      ) : (
        <List>
          {bookings.map(booking => {
            const contact = vendorContacts.get(booking.id);
            return (
              <ListItem $palette={palette} key={booking.id}>
                <BookingHead>
                  <ItemTitle $palette={palette}>
                    {booking.serviceName || booking.eventType}
                  </ItemTitle>
                  <StatusBadge $tone={bookingTone(booking.status)}>
                    {t(bookingLabelKey(booking.status))}
                  </StatusBadge>
                </BookingHead>

                <ItemMeta $palette={palette}>
                  {booking.serviceCategory
                    ? `${booking.serviceCategory} · `
                    : ''}
                  {booking.eventDate}
                  {booking.city ? ` · ${booking.city}` : ''}
                </ItemMeta>

                <StatusNote>
                  {t(`${bookingLabelKey(booking.status)}Note`)}
                </StatusNote>

                {isContactVisible(booking.status) && (
                  <VendorCard>
                    <VendorLabel>{t('customer.bookingVendor')}</VendorLabel>
                    <VendorName>
                      {contact?.name ?? t('customer.bookingVendorLoading')}
                    </VendorName>
                    {contact?.mobileNumber ? (
                      <VendorPhone href={`tel:${contact.mobileNumber}`}>
                        {contact.mobileNumber}
                      </VendorPhone>
                    ) : (
                      contact && (
                        <StatusNote>
                          {t('customer.bookingVendorNoPhone')}
                        </StatusNote>
                      )
                    )}
                  </VendorCard>
                )}

                {booking.status === 'payment_pending' && (
                  <PayRow>
                    <Button
                      type="primary"
                      size="small"
                      loading={payingId === booking.id}
                      onClick={() => pay(booking.id)}
                    >
                      {t('customer.bookingPayNow')}
                    </Button>
                  </PayRow>
                )}
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}
