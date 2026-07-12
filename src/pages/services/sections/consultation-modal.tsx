import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { FormEvent } from 'react';
import type { DiscoveryVendor } from '../filters';
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
} from '../styled';
import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily } from '@/theme';

const ModalGhostBtn = styled.button`
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.65rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.16);
  background: transparent;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
`;

interface ConsultModalProps {
  vendor: DiscoveryVendor | null;
  sent: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConsultationModal({
  vendor,
  sent,
  onClose,
  onSubmit,
}: ConsultModalProps) {
  const { t } = useTranslation();
  const open = Boolean(vendor);

  useEffect(() => {
    if (!open) return;
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

  return (
    <ModalOverlay $open={open} onClick={onClose} aria-hidden={!open}>
      <Modal
        $open={open}
        role="dialog"
        aria-modal="true"
        aria-label={t('servicesPage.consultTitle')}
        onClick={e => e.stopPropagation()}
      >
        {sent ? (
          <>
            <ModalTitle>{t('servicesPage.consultSuccessTitle')}</ModalTitle>
            <ModalLead>{t('servicesPage.consultSuccessLead')}</ModalLead>
            <ModalActions>
              <PrimaryCta type="button" onClick={onClose}>
                {t('servicesPage.consultClose')}
              </PrimaryCta>
            </ModalActions>
          </>
        ) : (
          <>
            <ModalTitle>{t('servicesPage.consultTitle')}</ModalTitle>
            <ModalLead>
              {t('servicesPage.consultLead', {
                vendor: vendor?.displayName ?? 'a verified professional',
              })}
            </ModalLead>
            <form onSubmit={onSubmit}>
              <FormGrid>
                <FormField>
                  {t('servicesPage.consultName')}
                  <input name="name" required autoComplete="name" />
                </FormField>
                <FormField>
                  {t('servicesPage.consultEmail')}
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </FormField>
                <FormField>
                  {t('servicesPage.consultEvent')}
                  <select name="event" defaultValue={vendor?.category ?? ''}>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Other">Other</option>
                  </select>
                </FormField>
                <FormField>
                  {t('servicesPage.consultDate')}
                  <input name="date" type="date" />
                </FormField>
                <FormField>
                  {t('servicesPage.consultGuests')}
                  <input
                    name="guests"
                    type="number"
                    min={10}
                    placeholder="100"
                  />
                </FormField>
                <FormField>
                  {t('servicesPage.consultMessage')}
                  <textarea
                    name="message"
                    required
                    placeholder="Share your vision…"
                  />
                </FormField>
              </FormGrid>
              <ModalActions>
                <ModalGhostBtn type="button" onClick={onClose}>
                  {t('servicesPage.consultClose')}
                </ModalGhostBtn>
                <PrimaryCta type="submit">
                  {t('servicesPage.consultSubmit')}
                </PrimaryCta>
              </ModalActions>
              <ModalNote>{t('servicesPage.consultNote')}</ModalNote>
            </form>
          </>
        )}
      </Modal>
    </ModalOverlay>
  );
}
