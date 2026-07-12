import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useVendorAvailability } from './helper';
import { ItemTitle, List, ListItem, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function VendorAvailabilityPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { slots } = useVendorAvailability();
  return (
    <>
      <PageTitle $palette={palette}>{t('vendor.availabilityTitle')}</PageTitle>
      <List>
        {slots.map(s => (
          <ListItem $palette={palette} key={s}>
            <ItemTitle $palette={palette}>{s}</ItemTitle>
          </ListItem>
        ))}
      </List>
      <Button type="primary">{t('common.save')}</Button>
    </>
  );
}
