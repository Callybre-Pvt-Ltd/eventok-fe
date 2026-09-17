import { createPortal } from 'react-dom';
import { Check, Headset } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SUPPORT_SERVICES, useSupportWidget } from './helper';
import {
  Backdrop,
  Chip,
  Chips,
  Dismiss,
  Eyebrow,
  Form,
  Input,
  Launcher,
  LauncherAvatar,
  LauncherLabel,
  LauncherSub,
  LauncherTitle,
  Modal,
  Row,
  Select,
  Submit,
  Success,
  Title,
} from './styled';

export function SupportWidget() {
  const { t } = useTranslation();
  const widget = useSupportWidget();

  const modal = widget.open
    ? createPortal(
        <Backdrop onClick={widget.close} role="presentation">
          <Modal
            role="dialog"
            aria-modal="true"
            aria-label={t('storefront.supportTitle')}
            onClick={event => event.stopPropagation()}
          >
            <Eyebrow>{t('storefront.supportEyebrow')}</Eyebrow>
            <Title>{t('storefront.supportTitle')}</Title>
            <Chips>
              <Chip>
                <Check size={12} /> {t('storefront.supportChipBooking')}
              </Chip>
              <Chip>
                <Check size={12} /> {t('storefront.supportChipResponse')}
              </Chip>
            </Chips>

            {widget.sent ? (
              <Success>{t('storefront.supportThanks')}</Success>
            ) : (
              <Form onSubmit={widget.submit}>
                <Row>
                  <Input
                    value={widget.name}
                    onChange={event => widget.setName(event.target.value)}
                    placeholder={t('storefront.supportName')}
                    aria-label={t('storefront.supportName')}
                  />
                  <Input
                    value={widget.phone}
                    onChange={event => widget.setPhone(event.target.value)}
                    placeholder={t('storefront.supportPhone')}
                    aria-label={t('storefront.supportPhone')}
                    inputMode="tel"
                  />
                </Row>
                <Select
                  value={widget.service}
                  onChange={event => widget.setService(event.target.value)}
                  aria-label={t('storefront.supportService')}
                >
                  {SUPPORT_SERVICES.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <Submit type="submit" disabled={!widget.canSubmit}>
                  {t('storefront.supportSubmit')}
                </Submit>
              </Form>
            )}

            <Dismiss type="button" onClick={widget.close}>
              {t('storefront.supportDismiss')}
            </Dismiss>
          </Modal>
        </Backdrop>,
        document.body,
      )
    : null;

  return (
    <>
      <Launcher
        type="button"
        onClick={widget.openWidget}
        aria-label={t('storefront.supportOpen')}
      >
        <LauncherAvatar>
          <Headset size={18} />
        </LauncherAvatar>
        <LauncherLabel>
          <LauncherTitle>{t('storefront.supportQuick')}</LauncherTitle>
          <LauncherSub>{t('storefront.supportOnline')}</LauncherSub>
        </LauncherLabel>
      </Launcher>
      {modal}
    </>
  );
}
