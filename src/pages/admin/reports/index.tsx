import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAdminReports } from './helper';
import { Card, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function AdminReportsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  useAdminReports();
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.reports')}</PageTitle>
      <Card $palette={palette}>
        <Button type="primary">{t('admin.exportReport')}</Button>
      </Card>
    </>
  );
}
