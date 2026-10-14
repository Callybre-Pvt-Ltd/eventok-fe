import { Table, Select, Button, Drawer, Popconfirm, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, Trash2 } from 'lucide-react';
import { CustomAntdSearchInput } from '@/components/global/custom-antd-search-input';
import { ErrorState } from '@/components/global/error-state';
import { LoadingState } from '@/components/global/loading-state';
import type { AdminApiService } from '@/services/vendorService';
import {
  ALL_CATEGORIES,
  useAdminServices,
  type ServiceStatusFilter,
} from './helper';
import {
  Page,
  HeaderSection,
  HeaderLeft,
  HeaderEyebrow,
  HeaderTitle,
  HeaderSubtitle,
  ControlsBar,
  ControlsLeft,
  StatusPillGroup,
  StatusFilterBtn,
  TableWrapper,
  StatusBadge,
  ServiceCell,
  ServiceTitleText,
  ServiceSubtext,
  DrawerContent,
  DrawerHeader,
  DrawerCategory,
  DrawerTitle,
  DrawerDescription,
  GalleryStrip,
  GalleryThumb,
  SectionBlock,
  SectionTitle,
  PricingBreakdownTable,
  PricingRow,
  BulletList,
  AddonList,
  AddonRow,
  DrawerActions,
} from './styled';

export default function AdminServicesPage() {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    vendorFilter,
    setVendorFilter,
    vendorOptions,
    categories,
    categoryMap,
    services,
    isLoading,
    isFetching,
    error,
    refetch,
    selectedService,
    setSelectedService,
    drawerImages,
    drawerAddons,
    deleteMutation,
  } = useAdminServices();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={() => refetch()} />;

  const formatPrice = (val: string | number | undefined) => {
    const num = Number(val) || 0;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const columns: ColumnsType<AdminApiService> = [
    {
      title: 'Service Listing',
      key: 'title',
      render: (_, record) => (
        <ServiceCell>
          <ServiceTitleText>{record.title}</ServiceTitleText>
          <ServiceSubtext>
            Added{' '}
            {new Date(record.created_at).toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </ServiceSubtext>
        </ServiceCell>
      ),
    },
    {
      title: 'Vendor',
      key: 'vendor',
      render: (_, record) => <strong>{record.vendor_name || '—'}</strong>,
    },
    {
      title: 'Category',
      key: 'category',
      render: (_, record) => {
        const catName = categoryMap.get(record.category_id) || 'Uncategorized';
        return <Tag color="blue">{catName}</Tag>;
      },
    },
    {
      title: 'Vendor Price',
      dataIndex: 'starting_price',
      key: 'starting_price',
      render: (val: string | number) => <strong>{formatPrice(val)}</strong>,
    },
    {
      title: 'Customer Total (+3%)',
      key: 'customer_price',
      render: (_, record) => {
        const vendorBase = Number(record.starting_price) || 0;
        const customerTotal = record.customer_price
          ? Number(record.customer_price)
          : Math.round(vendorBase * 1.03);
        return (
          <span style={{ color: '#059669', fontWeight: 600 }}>
            {formatPrice(customerTotal)}
          </span>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <StatusBadge $status={status}>{status.replace('_', ' ')}</StatusBadge>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          size="small"
          icon={<Eye size={14} />}
          onClick={() => setSelectedService(record)}
        >
          Inspect
        </Button>
      ),
    },
  ];

  // Pricing calculations for drawer
  const vendorBase = selectedService
    ? Number(selectedService.starting_price) || 0
    : 0;
  const commission = selectedService?.commission_amount
    ? Number(selectedService.commission_amount)
    : Math.round(vendorBase * 0.03);
  const customerTotal = selectedService?.customer_price
    ? Number(selectedService.customer_price)
    : vendorBase + commission;
  const advanceRequired = Math.round(customerTotal * 0.2);
  const remainingAtEvent = customerTotal - advanceRequired;

  return (
    <Page>
      <HeaderSection>
        <HeaderLeft>
          <HeaderEyebrow>MARKETPLACE MANAGEMENT</HeaderEyebrow>
          <HeaderTitle>Services Directory</HeaderTitle>
          <HeaderSubtitle>
            Browse every listing on the platform. Vendors publish their own
            services — search or filter by vendor to see what one partner
            offers.
          </HeaderSubtitle>
        </HeaderLeft>
      </HeaderSection>

      <ControlsBar>
        <ControlsLeft>
          <CustomAntdSearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by service or vendor name…"
          />

          <Select
            value={vendorFilter}
            onChange={setVendorFilter}
            style={{ width: 220 }}
            showSearch
            optionFilterProp="label"
            options={vendorOptions}
          />

          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 180 }}
            options={[
              { value: ALL_CATEGORIES, label: 'All Categories' },
              ...categories.map(category => ({
                value: category.id,
                label: category.name,
              })),
            ]}
          />
        </ControlsLeft>

        <StatusPillGroup>
          {(
            [
              { key: 'all', label: 'All' },
              { key: 'PUBLISHED', label: 'Live' },
              { key: 'DRAFT', label: 'Draft' },
              { key: 'ARCHIVED', label: 'Archived' },
            ] as const
          ).map(pill => (
            <StatusFilterBtn
              key={pill.key}
              $active={statusFilter === pill.key}
              onClick={() => setStatusFilter(pill.key as ServiceStatusFilter)}
            >
              {pill.label}
            </StatusFilterBtn>
          ))}
        </StatusPillGroup>
      </ControlsBar>

      <TableWrapper>
        <Table
          dataSource={services}
          columns={columns}
          rowKey="id"
          loading={isFetching}
          pagination={{ pageSize: 12, showSizeChanger: false }}
          locale={{ emptyText: 'No services match the current filters' }}
        />
      </TableWrapper>

      {/* Inspection Drawer */}
      <Drawer
        open={!!selectedService}
        onClose={() => setSelectedService(null)}
        width={560}
        title="Service Inspection"
      >
        {selectedService && (
          <DrawerContent>
            <DrawerHeader>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <DrawerCategory>
                  {categoryMap.get(selectedService.category_id) || 'Category'}
                </DrawerCategory>
                <StatusBadge $status={selectedService.status}>
                  {selectedService.status.replace('_', ' ')}
                </StatusBadge>
              </div>
              <DrawerTitle>{selectedService.title}</DrawerTitle>
              {selectedService.description && (
                <DrawerDescription>
                  {selectedService.description}
                </DrawerDescription>
              )}
            </DrawerHeader>

            {/* Gallery Images */}
            <SectionBlock>
              <SectionTitle>
                Service Photos ({drawerImages.length})
              </SectionTitle>
              {drawerImages.length > 0 ? (
                <GalleryStrip>
                  {drawerImages.map(img => (
                    <GalleryThumb
                      key={img.id}
                      src={img.image_url}
                      alt="Listing Photo"
                    />
                  ))}
                </GalleryStrip>
              ) : (
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                  No photos uploaded yet.
                </div>
              )}
            </SectionBlock>

            {/* Pricing Transparency */}
            <SectionBlock>
              <SectionTitle>Pricing Structure</SectionTitle>
              <PricingBreakdownTable>
                <PricingRow>
                  <span>Vendor Service Price:</span>
                  <span>{formatPrice(vendorBase)}</span>
                </PricingRow>
                <PricingRow>
                  <span>Platform Commission (+3%):</span>
                  <span style={{ color: '#059669' }}>
                    +{formatPrice(commission)}
                  </span>
                </PricingRow>
                <PricingRow $highlight>
                  <span>Customer Total:</span>
                  <span>{formatPrice(customerTotal)}</span>
                </PricingRow>
                <PricingRow>
                  <span>Advance Payment (20% upfront):</span>
                  <span style={{ color: '#2563eb' }}>
                    {formatPrice(advanceRequired)}
                  </span>
                </PricingRow>
                <PricingRow>
                  <span>Remaining after advance (80% at event):</span>
                  <span>{formatPrice(remainingAtEvent)}</span>
                </PricingRow>
              </PricingBreakdownTable>
            </SectionBlock>

            {/* Inclusions */}
            {selectedService.whats_included &&
              selectedService.whats_included.length > 0 && (
                <SectionBlock>
                  <SectionTitle>What's Included</SectionTitle>
                  <BulletList>
                    {selectedService.whats_included.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </BulletList>
                </SectionBlock>
              )}

            {/* Good to know */}
            {selectedService.good_to_know &&
              selectedService.good_to_know.length > 0 && (
                <SectionBlock>
                  <SectionTitle>Practical Notes / Good to Know</SectionTitle>
                  <BulletList>
                    {selectedService.good_to_know.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </BulletList>
                </SectionBlock>
              )}

            {/* Cancellation Policy */}
            {selectedService.cancellation_policy &&
              selectedService.cancellation_policy.length > 0 && (
                <SectionBlock>
                  <SectionTitle>Cancellation Policy</SectionTitle>
                  <BulletList>
                    {selectedService.cancellation_policy.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </BulletList>
                </SectionBlock>
              )}

            {/* Add-ons */}
            <SectionBlock>
              <SectionTitle>
                Optional Add-ons ({drawerAddons.length})
              </SectionTitle>
              {drawerAddons.length > 0 ? (
                <AddonList>
                  {drawerAddons.map(addon => (
                    <AddonRow key={addon.id}>
                      <div>
                        <strong>{addon.name}</strong>
                        {addon.description && (
                          <div
                            style={{ fontSize: '0.75rem', color: '#64748b' }}
                          >
                            {addon.description}
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <strong style={{ color: '#0f172a' }}>
                          {formatPrice(addon.price)}
                        </strong>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                          0% commission
                        </div>
                      </div>
                    </AddonRow>
                  ))}
                </AddonList>
              ) : (
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                  No add-ons offered for this service.
                </div>
              )}
            </SectionBlock>

            {/* Drawer Actions */}
            <DrawerActions>
              <Popconfirm
                title="Delete Service"
                description="Are you sure you want to permanently remove this service from the marketplace?"
                okText="Yes, Delete"
                okType="danger"
                cancelText="Cancel"
                onConfirm={() => deleteMutation.mutate(selectedService.id)}
              >
                <Button
                  danger
                  icon={<Trash2 size={16} />}
                  loading={deleteMutation.isPending}
                >
                  Delete
                </Button>
              </Popconfirm>
            </DrawerActions>
          </DrawerContent>
        )}
      </Drawer>
    </Page>
  );
}
