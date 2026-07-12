import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PublicHeader } from '@/components/global/public-header';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { useVendorPending } from './helper';
import {
  ItemMeta,
  PageTitle,
  PendingContent,
  PendingIcon,
  PendingPage,
  PendingWrap,
} from './styled';

export default function VendorPendingPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  useVendorPending();

  return (
    <PendingPage $palette={palette}>
      <PublicHeader />
      <PendingContent>
        <PageTitle $palette={palette}>{t('auth.pendingApproval')}</PageTitle>
        <PendingWrap>
          <PendingIcon $palette={palette}>
            <Clock size={36} />
          </PendingIcon>
          <ItemMeta $palette={palette}>{t('vendor.pendingBanner')}</ItemMeta>
        </PendingWrap>
      </PendingContent>
    </PendingPage>
  );
}
