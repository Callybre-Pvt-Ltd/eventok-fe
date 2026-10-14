import { Button, Input, InputNumber } from 'antd';
import { Check, PackagePlus, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import {
  Field,
  FieldLabel,
  FormModal,
  PreviewCard,
  PreviewLabel,
  PreviewRow,
  PreviewValue,
  Section,
  SectionLabel,
  SelectableList,
  SelectableName,
  SelectablePrice,
  SelectableRow,
} from '@/components/ui/form-modal';
import { useVendorPackages } from './helper';
import {
  PackageCard,
  PackageGrid,
  PackageName,
  PageTitle,
  PriceLabel,
  PriceRow,
  PriceValue,
  SavingsBadge,
  Toolbar,
  VisibilityLabel,
  VisibilityRow,
} from './styled';

export default function VendorPackagesPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    packages,
    isLoading,
    publishedServices,
    open,
    setOpen,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    serviceIds,
    setServiceIds,
    createMutation,
    toggleActiveMutation,
    canSubmit,
    preview,
  } = useVendorPackages();

  if (isLoading) return <LoadingState />;

  const toggleService = (id: string) => {
    setServiceIds(
      serviceIds.includes(id)
        ? serviceIds.filter(s => s !== id)
        : [...serviceIds, id],
    );
  };

  return (
    <>
      <Toolbar>
        <PageTitle $palette={palette}>{t('vendor.packagesTitle')}</PageTitle>
        <Button
          type="primary"
          size="large"
          icon={<Plus size={16} strokeWidth={2.5} />}
          onClick={() => setOpen(true)}
        >
          {t('vendor.addPackage')}
        </Button>
      </Toolbar>

      {packages.length === 0 ? (
        <EmptyState description={t('vendor.noPackages')} />
      ) : (
        <PackageGrid>
          {packages.map(pkg => (
            <PackageCard $palette={palette} key={pkg.id}>
              <PackageName $palette={palette}>{pkg.name}</PackageName>
              <PriceRow>
                <PriceLabel $palette={palette}>
                  {t('vendor.individualTotal')}
                </PriceLabel>
                <PriceValue>
                  ₹{Number(pkg.individual_total).toLocaleString('en-IN')}
                </PriceValue>
              </PriceRow>
              <PriceRow>
                <PriceLabel $palette={palette}>
                  {t('vendor.packagePrice')}
                </PriceLabel>
                <PriceValue>
                  ₹{Number(pkg.price).toLocaleString('en-IN')}
                </PriceValue>
              </PriceRow>
              <PriceRow>
                <PriceLabel $palette={palette}>
                  {t('vendor.customerPrice')}
                </PriceLabel>
                <PriceValue $emphasis>
                  ₹{Number(pkg.customer_price).toLocaleString('en-IN')}
                </PriceValue>
              </PriceRow>
              {Number(pkg.savings) > 0 ? (
                <SavingsBadge>
                  {t('vendor.savings')}: ₹
                  {Number(pkg.savings).toLocaleString('en-IN')}
                </SavingsBadge>
              ) : null}
              <VisibilityRow>
                <VisibilityLabel $live={pkg.is_active}>
                  {pkg.is_active
                    ? t('vendor.packageLive')
                    : t('vendor.packageHidden')}
                </VisibilityLabel>
                <Button
                  size="small"
                  loading={toggleActiveMutation.isPending}
                  onClick={() => toggleActiveMutation.mutate(pkg)}
                >
                  {pkg.is_active
                    ? t('vendor.packageHide')
                    : t('vendor.packagePublish')}
                </Button>
              </VisibilityRow>
            </PackageCard>
          ))}
        </PackageGrid>
      )}

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        icon={PackagePlus}
        title={t('vendor.addPackage')}
        subtitle="Bundle your own published services into one discounted offer"
        primaryLabel={
          createMutation.isPending ? 'Creating…' : t('vendor.create')
        }
        onPrimary={() => createMutation.mutate()}
        primaryDisabled={!canSubmit}
        primaryLoading={createMutation.isPending}
      >
        <Section>
          <SectionLabel>Package details</SectionLabel>
          <Field>
            <FieldLabel>{t('vendor.packageName')}</FieldLabel>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Haldi + Mandap Combo"
              size="large"
            />
          </Field>
          <Field>
            <FieldLabel>Description (optional)</FieldLabel>
            <Input.TextArea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What makes this bundle a good deal?"
              rows={2}
            />
          </Field>
          <Field>
            <FieldLabel>{t('vendor.packagePrice')}</FieldLabel>
            <InputNumber
              value={price ? Number(price) : undefined}
              onChange={v => setPrice(v ? String(v) : '')}
              placeholder="25000"
              style={{ width: '100%' }}
              size="large"
              min={1}
              prefix="₹"
            />
          </Field>
        </Section>

        <Section>
          <SectionLabel>{t('vendor.selectServices')}</SectionLabel>
          <SelectableList>
            {publishedServices.map(s => {
              const checked = serviceIds.includes(s.id);
              return (
                <SelectableRow key={s.id} $palette={palette} $checked={checked}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleService(s.id)}
                    hidden
                  />
                  <SelectableName $palette={palette}>{s.title}</SelectableName>
                  <SelectablePrice>
                    ₹{Number(s.starting_price).toLocaleString('en-IN')}
                  </SelectablePrice>
                  {checked ? <Check size={16} strokeWidth={3} /> : null}
                </SelectableRow>
              );
            })}
          </SelectableList>
        </Section>

        {serviceIds.length > 0 && Number(price) > 0 ? (
          <Section>
            <SectionLabel>Pricing preview</SectionLabel>
            <PreviewCard $palette={palette}>
              <PreviewRow>
                <PreviewLabel $palette={palette}>
                  {t('vendor.individualTotal')}
                </PreviewLabel>
                <PreviewValue>
                  ₹{preview.individualTotal.toLocaleString('en-IN')}
                </PreviewValue>
              </PreviewRow>
              <PreviewRow>
                <PreviewLabel $palette={palette}>
                  {t('vendor.savings')}
                </PreviewLabel>
                <PreviewValue>
                  ₹{Math.max(preview.savings, 0).toLocaleString('en-IN')}
                </PreviewValue>
              </PreviewRow>
              <PreviewRow>
                <PreviewLabel $palette={palette}>
                  Est. platform commission (3%)
                </PreviewLabel>
                <PreviewValue>
                  ₹{preview.commission.toLocaleString('en-IN')}
                </PreviewValue>
              </PreviewRow>
              <PreviewRow>
                <PreviewLabel $palette={palette}>
                  {t('vendor.customerPrice')}
                </PreviewLabel>
                <PreviewValue $strong>
                  ₹{preview.customerPrice.toLocaleString('en-IN')}
                </PreviewValue>
              </PreviewRow>
            </PreviewCard>
          </Section>
        ) : null}
      </FormModal>
    </>
  );
}
