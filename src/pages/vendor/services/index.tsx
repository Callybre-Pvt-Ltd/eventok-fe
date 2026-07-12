import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useVendorServices } from './helper';
import { ItemTitle, List, ListItem, PageHeader, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function VendorServicesPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { services } = useVendorServices();
  return (
    <>
      <PageHeader>
        <PageTitle $palette={palette}>{t('vendor.servicesTitle')}</PageTitle>
        <Button type="primary">{t('vendor.addService')}</Button>
      </PageHeader>
      <List>
        {services.map(s => (
          <ListItem $palette={palette} key={s}>
            <ItemTitle $palette={palette}>{s}</ItemTitle>
          </ListItem>
        ))}
      </List>
    </>
  );
}
