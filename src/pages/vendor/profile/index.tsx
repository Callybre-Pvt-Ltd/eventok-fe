import { Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useVendorProfile } from './helper';
import { Card, FormGrid, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function VendorProfilePage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { user } = useVendorProfile();
  return (
    <>
      <PageTitle $palette={palette}>{t('vendor.profile')}</PageTitle>
      <Card $palette={palette}>
        <FormGrid>
          <Input
            defaultValue={user?.name}
            placeholder={t('auth.name')}
            size="large"
          />
          <Input defaultValue={user?.email} disabled size="large" />
          <Input
            defaultValue={user?.city}
            placeholder={t('auth.city')}
            size="large"
          />
          <Button>{t('vendor.kycUpload')}</Button>
          <Button>{t('vendor.gstUpload')}</Button>
          <Button type="primary">{t('common.save')}</Button>
        </FormGrid>
      </Card>
    </>
  );
}
