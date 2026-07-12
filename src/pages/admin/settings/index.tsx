import { Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAdminSettings } from './helper';
import { Card, FormGrid, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function AdminSettingsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  useAdminSettings();
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.settings')}</PageTitle>
      <Card $palette={palette}>
        <FormGrid>
          <Input
            placeholder="Platform Commission %"
            size="large"
            defaultValue="10"
          />
          <Input
            placeholder="Support Email"
            size="large"
            defaultValue="support@eventok.demo"
          />
          <Button type="primary">{t('common.save')}</Button>
        </FormGrid>
      </Card>
    </>
  );
}
