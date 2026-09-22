import { Button, Input, InputNumber, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { useVendorProfile } from './helper';
import {
  Card,
  FieldLabel,
  FormField,
  FormGrid,
  PageEyebrow,
  PageHeader,
  PageLead,
  PageTitle,
} from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';

export default function VendorProfilePage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { user, isLoading, form, saveMutation, uploadDoc } = useVendorProfile();

  if (isLoading) return <LoadingState />;

  return (
    <>
      <PageHeader>
        <div>
          <PageEyebrow>Partner profile</PageEyebrow>
          <PageTitle $palette={palette}>{t('vendor.profile')}</PageTitle>
          <PageLead $palette={palette}>
            Changes save to the EventOK backend — not just this browser.
          </PageLead>
        </div>
      </PageHeader>
      <Card $palette={palette}>
        <FormGrid>
          <FormField>
            <FieldLabel>{t('auth.name')}</FieldLabel>
            <Input
              value={form.name}
              onChange={e => form.setName(e.target.value)}
              placeholder={t('auth.name')}
              size="large"
            />
          </FormField>
          <FormField>
            <FieldLabel>{t('auth.email')}</FieldLabel>
            <Input value={user?.email} disabled size="large" />
          </FormField>
          <FormField>
            <FieldLabel>Business name</FieldLabel>
            <Input
              value={form.businessName}
              onChange={e => form.setBusinessName(e.target.value)}
              placeholder="Business name"
              size="large"
            />
          </FormField>
          <FormField>
            <FieldLabel>{t('auth.city')}</FieldLabel>
            <Input
              value={form.city}
              onChange={e => form.setCity(e.target.value)}
              placeholder={t('auth.city')}
              size="large"
            />
          </FormField>
          <FormField>
            <FieldLabel>State</FieldLabel>
            <Input
              value={form.state}
              onChange={e => form.setState(e.target.value)}
              placeholder="State"
              size="large"
            />
          </FormField>
          <FormField>
            <FieldLabel>Address</FieldLabel>
            <Input
              value={form.address}
              onChange={e => form.setAddress(e.target.value)}
              placeholder="Address"
              size="large"
            />
          </FormField>
          <FormField>
            <FieldLabel>About your business</FieldLabel>
            <Input.TextArea
              value={form.description}
              onChange={e => form.setDescription(e.target.value)}
              placeholder="About your business"
              rows={3}
            />
          </FormField>
          <FormField>
            <FieldLabel>Years of experience</FieldLabel>
            <InputNumber
              value={Number(form.experience) || 0}
              onChange={v => form.setExperience(String(v ?? 0))}
              min={0}
              max={80}
              style={{ width: '100%' }}
              size="large"
            />
          </FormField>
          <Upload
            accept="image/*,.pdf"
            showUploadList={false}
            beforeUpload={file => {
              uploadDoc.mutate({ documentType: 'ID_PROOF', file });
              return false;
            }}
          >
            <Button loading={uploadDoc.isPending}>
              {t('vendor.kycUpload')}
            </Button>
          </Upload>
          <Upload
            accept="image/*,.pdf"
            showUploadList={false}
            beforeUpload={file => {
              uploadDoc.mutate({ documentType: 'GST_CERTIFICATE', file });
              return false;
            }}
          >
            <Button loading={uploadDoc.isPending}>
              {t('vendor.gstUpload')}
            </Button>
          </Upload>
          <Button
            type="primary"
            loading={saveMutation.isPending}
            onClick={() => saveMutation.mutate()}
          >
            {t('common.save')}
          </Button>
        </FormGrid>
      </Card>
    </>
  );
}
