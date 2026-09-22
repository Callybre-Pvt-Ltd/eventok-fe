import { DatePicker, Modal, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { StoreLayout } from '@/components/storefront/store-layout';
import { formatPrice } from '@/utils/storefront/pricing';
import { useCheckoutPage } from './helper';
import {
  BookingId,
  Card,
  ConfirmList,
  ConfirmRow,
  ConfirmTotal,
  CardTitle,
  Checkbox,
  ErrorText,
  Field,
  Form,
  Input,
  Layout,
  Page,
  PayButton,
  PrivacyNote,
  Row,
  Success,
  SuccessLink,
  SuccessText,
  SuccessTitle,
  Summary,
  SummaryLine,
  SummaryStrong,
  TermsRow,
  TextArea,
  Title,
} from './styled';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const checkout = useCheckoutPage();

  if (checkout.bookingId) {
    return (
      <StoreLayout>
        <Page>
          <Success>
            <CheckCircle2 size={40} />
            <SuccessTitle>{t('storefront.checkoutSuccessTitle')}</SuccessTitle>
            <SuccessText>{t('storefront.checkoutSuccessCopy')}</SuccessText>
            <BookingId>
              {t('storefront.checkoutBookingId')}: {checkout.bookingId}
            </BookingId>
            <SuccessText>{t('storefront.checkoutPrivacyNote')}</SuccessText>
            <SuccessLink to={ROUTES.CUSTOMER_BOOKINGS}>
              {t('storefront.checkoutViewOrders')}
            </SuccessLink>
          </Success>
        </Page>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <Page>
        <Title>{t('storefront.checkoutTitle')}</Title>
        <Layout>
          <Form onSubmit={checkout.submit}>
            <Card>
              <CardTitle>{t('storefront.checkoutEventDetails')}</CardTitle>
              <Row>
                <Field>
                  {t('storefront.checkoutDate')}
                  <DatePicker
                    size="large"
                    format="DD MMM YYYY"
                    placeholder={t('storefront.checkoutDate')}
                    value={
                      checkout.form.eventDate
                        ? dayjs(checkout.form.eventDate)
                        : null
                    }
                    disabledDate={current =>
                      current && current < dayjs().startOf('day')
                    }
                    onChange={value =>
                      checkout.setField(
                        'eventDate',
                        value ? value.format('YYYY-MM-DD') : '',
                      )
                    }
                  />
                </Field>
                <Field>
                  {t('storefront.checkoutTime')}
                  <TimePicker
                    size="large"
                    format="h:mm A"
                    use12Hours
                    minuteStep={5}
                    placeholder={t('storefront.checkoutTime')}
                    value={
                      checkout.form.eventTime
                        ? dayjs(checkout.form.eventTime, 'HH:mm')
                        : null
                    }
                    onChange={value =>
                      checkout.setField(
                        'eventTime',
                        value ? value.format('HH:mm') : '',
                      )
                    }
                  />
                </Field>
              </Row>
              <Field>
                {t('storefront.checkoutVenue')}
                <Input
                  value={checkout.form.venue}
                  onChange={event =>
                    checkout.setField('venue', event.target.value)
                  }
                />
              </Field>
              <Row>
                <Field>
                  {t('storefront.checkoutCity')}
                  <Input
                    value={checkout.form.city}
                    onChange={event =>
                      checkout.setField('city', event.target.value)
                    }
                  />
                </Field>
                <Field>
                  {t('storefront.checkoutPincode')}
                  <Input
                    value={checkout.form.pincode}
                    onChange={event =>
                      checkout.setField('pincode', event.target.value)
                    }
                    inputMode="numeric"
                  />
                </Field>
              </Row>
            </Card>

            <Card>
              <CardTitle>{t('storefront.checkoutContact')}</CardTitle>
              <Row>
                <Field>
                  {t('storefront.checkoutName')}
                  <Input
                    value={checkout.form.name}
                    onChange={event =>
                      checkout.setField('name', event.target.value)
                    }
                  />
                </Field>
                <Field>
                  {t('storefront.checkoutPhone')}
                  <Input
                    value={checkout.form.phone}
                    onChange={event =>
                      checkout.setField('phone', event.target.value)
                    }
                    inputMode="tel"
                  />
                </Field>
              </Row>
              <Field>
                {t('storefront.checkoutEmail')}
                <Input
                  type="email"
                  value={checkout.form.email}
                  onChange={event =>
                    checkout.setField('email', event.target.value)
                  }
                />
              </Field>
              <Field>
                {t('storefront.checkoutNotes')}
                <TextArea
                  value={checkout.form.notes}
                  onChange={event =>
                    checkout.setField('notes', event.target.value)
                  }
                />
              </Field>
              <TermsRow>
                <Checkbox
                  type="checkbox"
                  checked={checkout.form.agreed}
                  onChange={event =>
                    checkout.setField('agreed', event.target.checked)
                  }
                />
                {t('storefront.checkoutTerms')}
              </TermsRow>
              {checkout.error && (
                <ErrorText>{t('storefront.checkoutRequired')}</ErrorText>
              )}
            </Card>
          </Form>

          <Summary>
            <SummaryStrong>
              <span>{t('storefront.cartSummary')}</span>
            </SummaryStrong>
            {checkout.lines.map(line => (
              <SummaryLine key={line.serviceSlug}>
                <span>
                  {line.service.title} × {line.quantity}
                </span>
                <span>{formatPrice(line.service.price * line.quantity)}</span>
              </SummaryLine>
            ))}
            <SummaryLine>
              <span>{t('storefront.cartSubtotal')}</span>
              <span>{formatPrice(checkout.totals.subtotal)}</span>
            </SummaryLine>
            <SummaryStrong>
              <span>{t('storefront.cartDueNow')}</span>
              <span>{formatPrice(checkout.totals.dueNow)}</span>
            </SummaryStrong>
            <SummaryLine>
              <span>{t('storefront.cartDueLater')}</span>
              <span>{formatPrice(checkout.totals.dueLater)}</span>
            </SummaryLine>
            <PayButton
              type="submit"
              onClick={checkout.submit}
              disabled={checkout.authLoading}
            >
              {checkout.isSignedIn
                ? t('storefront.checkoutReview')
                : t('storefront.checkoutSignInToBook')}
            </PayButton>
            {checkout.error && (
              <ErrorText>{t('storefront.checkoutRequired')}</ErrorText>
            )}
            <PrivacyNote>{t('storefront.checkoutPrivacyNote')}</PrivacyNote>
          </Summary>
        </Layout>

        <Modal
          open={checkout.confirming}
          title={t('storefront.checkoutConfirmTitle')}
          okText={t('storefront.checkoutConfirmOk')}
          cancelText={t('common.back')}
          onOk={checkout.confirmOrder}
          onCancel={checkout.cancelConfirm}
          centered
        >
          <ConfirmList>
            {checkout.lines.map(line => (
              <ConfirmRow key={line.serviceSlug}>
                <span>
                  {line.service.title} × {line.quantity}
                </span>
                <span>{formatPrice(line.service.price * line.quantity)}</span>
              </ConfirmRow>
            ))}
            <ConfirmRow>
              <span>{t('storefront.checkoutDate')}</span>
              <span>
                {checkout.form.eventDate
                  ? dayjs(checkout.form.eventDate).format('DD MMM YYYY')
                  : '—'}
                {checkout.form.eventTime ? `, ${checkout.form.eventTime}` : ''}
              </span>
            </ConfirmRow>
            <ConfirmRow>
              <span>{t('storefront.checkoutVenue')}</span>
              <span>
                {checkout.form.venue}
                {checkout.form.city ? `, ${checkout.form.city}` : ''}
              </span>
            </ConfirmRow>
            <ConfirmRow>
              <span>{t('storefront.checkoutName')}</span>
              <span>
                {checkout.form.name} · {checkout.form.phone}
              </span>
            </ConfirmRow>
            <ConfirmRow>
              <ConfirmTotal>{t('storefront.cartDueNow')}</ConfirmTotal>
              <ConfirmTotal>{formatPrice(checkout.totals.dueNow)}</ConfirmTotal>
            </ConfirmRow>
          </ConfirmList>
        </Modal>
      </Page>
    </StoreLayout>
  );
}
