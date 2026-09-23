import { Button, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useVendorAvailability } from './helper';
import {
  ItemMeta,
  ItemTitle,
  List,
  ListItem,
  PageEyebrow,
  PageHeader,
  PageLead,
  PageTitle,
} from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function VendorAvailabilityPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    services,
    serviceId,
    setServiceId,
    dayRows,
    toggleDay,
    saveMutation,
    isLoading,
  } = useVendorAvailability();

  if (isLoading && !services.length) return <LoadingState />;

  return (
    <>
      <PageHeader>
        <div>
          <PageEyebrow>Booking windows</PageEyebrow>
          <PageTitle $palette={palette}>
            {t('vendor.availabilityTitle')}
          </PageTitle>
          <PageLead $palette={palette}>
            Availability is stored per service on the backend (9am–6pm on
            selected days).
          </PageLead>
        </div>
      </PageHeader>

      {services.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <Select
            style={{ width: '100%', maxWidth: 420, marginBottom: 16 }}
            value={serviceId || undefined}
            onChange={setServiceId}
            options={services.map(s => ({
              value: s.id,
              label: `${s.title} (${s.status})`,
            }))}
            placeholder="Select a service"
          />
          <List>
            {dayRows.map(row => (
              <ListItem $palette={palette} key={row.day}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div>
                    <ItemTitle $palette={palette}>{row.label}</ItemTitle>
                    <ItemMeta $palette={palette}>
                      {row.active ? 'Available 09:00–18:00' : 'Unavailable'}
                    </ItemMeta>
                  </div>
                  <Switch
                    checked={row.active}
                    onChange={() => toggleDay(row.day)}
                  />
                </div>
              </ListItem>
            ))}
          </List>
          <Button
            type="primary"
            loading={saveMutation.isPending}
            onClick={() => saveMutation.mutate()}
            disabled={!serviceId}
            style={{ marginTop: 16 }}
          >
            {t('common.save')}
          </Button>
        </>
      )}
    </>
  );
}
