import { Smartphone, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAnnouncementBar } from './helper';
import {
  Bar,
  Copy,
  Dismiss,
  Install,
  Left,
  Mark,
  Right,
  Subtitle,
  Title,
} from './styled';

export function AnnouncementBar() {
  const { t } = useTranslation();
  const { visible, dismiss } = useAnnouncementBar();

  if (!visible) return null;

  return (
    <Bar>
      <Left>
        <Mark>
          <Smartphone size={16} />
        </Mark>
        <Copy>
          <Title>{t('storefront.appBannerTitle')}</Title>
          <Subtitle>{t('storefront.appBannerSubtitle')}</Subtitle>
        </Copy>
      </Left>
      <Right>
        <Install type="button">{t('storefront.appBannerCta')}</Install>
        <Dismiss
          type="button"
          onClick={dismiss}
          aria-label={t('storefront.appBannerDismiss')}
        >
          <X size={16} />
        </Dismiss>
      </Right>
    </Bar>
  );
}
