import { Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCustomerProfile } from './helper';
import { Card, FormGrid, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function CustomerProfilePage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { user } = useCustomerProfile();
  return (
    <>
      <PageTitle $palette={palette}>{t('customer.profileSettings')}</PageTitle>
      <Card $palette={palette}>
        <FormGrid>
          <Input
            defaultValue={user?.name}
            placeholder={t('auth.name')}
            size="large"
          />
          <Input
            defaultValue={user?.email}
            placeholder={t('auth.email')}
            size="large"
            disabled
          />
          <Input
            defaultValue={user?.city}
            placeholder={t('auth.city')}
            size="large"
          />
          <Button type="primary">{t('common.save')}</Button>
        </FormGrid>
      </Card>
    </>
  );
}
