import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { DiscoveryVendor } from '@/pages/services/filters';
import { formatBudget } from '@/pages/services/filters';
import {
  FormField,
  FormGrid,
  Modal,
  ModalActions,
  ModalLead,
  ModalNote,
  ModalOverlay,
  ModalTitle,
  PrimaryCta,
} from '@/pages/services/styled';
import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily } from '@/theme';
import { useAuth } from '@/hooks/auth/use-auth';
import { bookingService } from '@/services';
import { ROUTES } from '@/constants/routes';

const ModalGhostBtn = styled.button`
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.65rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.16);
  background: transparent;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
`;

const ErrorText = styled.p`
  margin: 0 0 0.75rem;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  color: #c62828;
`;

interface BookServiceModalProps {
  service: DiscoveryVendor | null;
  onClose: () => void;
}

export function BookServiceModal({ service, onClose }: BookServiceModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session } = useAuth();
  const open = Boolean(service);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSent(false);
      setError(null);
      setLoading(false);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!service) return;

    if (!session?.user) {
      navigate(ROUTES.LOGIN, {
        state: { from: { pathname: `${ROUTES.SERVICES}/${service.id}` } },
      });
      return;
    }

    const form = new FormData(event.currentTarget);
    const eventDate = String(form.get('date') ?? '');
    const guestCount = Number(form.get('guests') ?? 0);
    const notes = String(form.get('message') ?? '');
    const eventType = String(form.get('event') || service.category);

    if (!eventDate || !guestCount) {
      setError(t('servicesPage.bookFormError'));
      return;
    }

    setLoading(true);
    setError(null);
    const { error: apiError } = await bookingService.createRequest({
      customerId: session.user.id,
      vendorId: service.id,
      eventDate,
      eventType,
      guestCount,
      city: session.user.city || service.city,
      notes: notes
        ? `${notes}\n\nService: ${service.displayName}`
        : `Booking request for ${service.displayName}`,
    });
    setLoading(false);

    if (apiError) {
      setError(apiError);
      return;
    }
    setSent(true);
  };

  return (
    <ModalOverlay $open={open} onClick={onClose} aria-hidden={!open}>
      <Modal
        $open={open}
        role="dialog"
        aria-modal="true"
        aria-label={t('servicesPage.bookTitle')}
        onClick={e => e.stopPropagation()}
      >
        {sent ? (
          <>
            <ModalTitle>{t('servicesPage.bookSuccessTitle')}</ModalTitle>
            <ModalLead>{t('servicesPage.bookSuccessLead')}</ModalLead>
            <ModalActions>
              <PrimaryCta
                type="button"
                onClick={() => navigate(ROUTES.CUSTOMER_BOOKINGS)}
              >
                {t('servicesPage.viewBookings')}
              </PrimaryCta>
              <ModalGhostBtn type="button" onClick={onClose}>
                {t('common.close')}
              </ModalGhostBtn>
            </ModalActions>
          </>
        ) : (
          <>
            <ModalTitle>{t('servicesPage.bookTitle')}</ModalTitle>
            <ModalLead>
              {t('servicesPage.bookLead', {
                service: service?.displayName ?? '',
                price: service ? formatBudget(service.budgetFrom) : '',
              })}
            </ModalLead>
            {error ? <ErrorText>{error}</ErrorText> : null}
            <form onSubmit={onSubmit}>
              <FormGrid>
                <FormField>
                  {t('servicesPage.consultName')}
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    defaultValue={session?.user.name ?? ''}
                  />
                </FormField>
                <FormField>
                  {t('servicesPage.consultEmail')}
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    defaultValue={session?.user.email ?? ''}
                  />
                </FormField>
                <FormField>
                  {t('servicesPage.consultEvent')}
                  <select
                    name="event"
                    defaultValue={service?.category ?? 'Wedding'}
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Other">Other</option>
                  </select>
                </FormField>
                <FormField>
                  {t('servicesPage.consultDate')}
                  <input name="date" type="date" required />
                </FormField>
                <FormField>
                  {t('servicesPage.consultGuests')}
                  <input
                    name="guests"
                    type="number"
                    min={10}
                    placeholder="100"
                    required
                  />
                </FormField>
                <FormField>
                  {t('servicesPage.consultMessage')}
                  <textarea
                    name="message"
                    placeholder={t('servicesPage.bookNotesPlaceholder')}
                  />
                </FormField>
              </FormGrid>
              <ModalActions>
                <ModalGhostBtn type="button" onClick={onClose}>
                  {t('common.close')}
                </ModalGhostBtn>
                <PrimaryCta type="submit" disabled={loading}>
                  {loading
                    ? t('common.loading')
                    : t('servicesPage.bookSubmit')}
                </PrimaryCta>
              </ModalActions>
              <ModalNote>{t('servicesPage.bookNote')}</ModalNote>
            </form>
          </>
        )}
      </Modal>
    </ModalOverlay>
  );
}
