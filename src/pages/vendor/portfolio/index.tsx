import { Button, Select, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useVendorPortfolio } from './helper';
import {
  Grid,
  MediaCard,
  PageEyebrow,
  PageHeader,
  PageLead,
  PageTitle,
} from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function VendorPortfolioPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    portfolio,
    services,
    serviceId,
    setServiceId,
    isLoading,
    uploadMutation,
    deleteMutation,
  } = useVendorPortfolio();

  if (isLoading && !portfolio.length && !services.length) {
    return <LoadingState />;
  }

  return (
    <>
      <PageHeader>
        <div>
          <PageEyebrow>Service photos</PageEyebrow>
          <PageTitle $palette={palette}>{t('vendor.portfolioTitle')}</PageTitle>
          <PageLead $palette={palette}>
            Photos upload to your services on the server and show on the shop.
          </PageLead>
        </div>
      </PageHeader>

      {services.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 16,
            alignItems: 'center',
          }}
        >
          <Select
            style={{ minWidth: 260, flex: 1 }}
            value={serviceId || undefined}
            onChange={setServiceId}
            options={services.map(s => ({
              value: s.id,
              label: s.title,
            }))}
            placeholder="Attach photo to service"
          />
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={file => {
              uploadMutation.mutate(file);
              return false;
            }}
          >
            <Button type="primary" loading={uploadMutation.isPending}>
              {t('vendor.addMedia')}
            </Button>
          </Upload>
        </div>
      )}

      {portfolio.length === 0 ? (
        <EmptyState />
      ) : (
        <Grid>
          {portfolio.map(p => (
            <div key={p.id} style={{ position: 'relative' }}>
              <MediaCard $palette={palette} $url={p.url} />
              <Button
                size="small"
                danger
                style={{ marginTop: 8 }}
                loading={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(p)}
              >
                Remove
              </Button>
            </div>
          ))}
        </Grid>
      )}
    </>
  );
}
