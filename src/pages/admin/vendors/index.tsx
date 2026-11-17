import { Button, Input, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowUpDown, FileText, ShieldCheck, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CustomAntdSearchInput } from '@/components/global/custom-antd-search-input';
import { LoadingState } from '@/components/global/loading-state';
import {
  AdminStatusBadge,
  AdminTableCard,
  AdminToolbar,
  AdminToolbarLeft,
  AdminToolbarRight,
  CellPrimary,
  CellSecondary,
  CellStack,
  FilterButton,
  FilterGroup,
} from '@/components/ui/admin-table';
import {
  Field,
  FieldLabel,
  FormModal,
  Section,
  SectionLabel,
} from '@/components/ui/form-modal';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { VendorPrivate } from '@/types';
import { useAdminVendors, type VendorSortOption } from './helper';
import {
  DocList,
  DocThumb,
  KycGrid,
  KycLabel,
  KycRow,
  KycValue,
  PageEyebrow,
  PageHeader,
  PageLead,
  PageTitle,
  RatingBadge,
} from './styled';

export default function AdminVendorsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    vendors,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    allCount,
    approvedCount,
    pendingCount,
    reviewTarget,
    openReview,
    closeReview,
    approve,
    rejecting,
    setRejecting,
    rejectReason,
    setRejectReason,
    confirmReject,
    kyc,
    documents,
  } = useAdminVendors();

  if (isLoading) return <LoadingState />;

  const isPendingVendor =
    reviewTarget?.status === 'pending' ||
    reviewTarget?.status === 'under_review';

  const columns: ColumnsType<VendorPrivate> = [
    {
      title: 'Business / Shop Name',
      key: 'businessName',
      align: 'left',
      render: (_, record) => (
        <CellStack>
          <CellPrimary>{record.businessName}</CellPrimary>
          <CellSecondary>
            {record.ownerName
              ? `Owner: ${record.ownerName}`
              : 'Owner not specified'}
            {record.mobileNumber || record.phone
              ? ` · ${record.mobileNumber || record.phone}`
              : ''}
          </CellSecondary>
        </CellStack>
      ),
    },
    {
      title: 'City / Location',
      dataIndex: 'city',
      key: 'city',
      align: 'left',
      render: (city: string) => (
        <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>
          {city || '—'}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: string) => <AdminStatusBadge status={status} />,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      align: 'right',
      render: (rating: number, record) => (
        <RatingBadge>
          <Star size={13} fill="#d97706" color="#d97706" />
          <span>{rating ? Number(rating).toFixed(1) : '0.0'}</span>
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--color-text-secondary)',
              fontWeight: 400,
            }}
          >
            ({record.reviewCount || 0})
          </span>
        </RatingBadge>
      ),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      align: 'right',
      render: (exp: number) => (
        <span
          style={{
            fontVariantNumeric: 'tabular-nums',
            color: 'var(--color-text)',
            fontWeight: 500,
          }}
        >
          {exp ? `${exp} yrs` : '—'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, record) => {
        const isPending =
          record.status === 'pending' || record.status === 'under_review';
        return isPending ? (
          <Button
            type="primary"
            size="small"
            icon={<ShieldCheck size={14} />}
            onClick={() => openReview(record)}
          >
            Review KYC
          </Button>
        ) : (
          <Button
            size="small"
            icon={<FileText size={14} />}
            onClick={() => openReview(record)}
          >
            View KYC
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader>
        <div>
          <PageEyebrow>MARKETPLACE MANAGEMENT</PageEyebrow>
          <PageTitle $palette={palette}>{t('admin.vendors')}</PageTitle>
          <PageLead $palette={palette}>
            Manage, filter, and audit vendor partners across the EventOk
            platform.
          </PageLead>
        </div>
      </PageHeader>

      <AdminToolbar>
        <AdminToolbarLeft>
          <CustomAntdSearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search vendor by name, owner, city, phone…"
          />

          <FilterGroup>
            <FilterButton
              $active={statusFilter === 'all'}
              onClick={() => setStatusFilter('all')}
            >
              All ({allCount})
            </FilterButton>
            <FilterButton
              $active={statusFilter === 'approved'}
              onClick={() => setStatusFilter('approved')}
            >
              Approved ({approvedCount})
            </FilterButton>
            <FilterButton
              $active={statusFilter === 'pending'}
              onClick={() => setStatusFilter('pending')}
            >
              Pending ({pendingCount})
            </FilterButton>
          </FilterGroup>
        </AdminToolbarLeft>

        <AdminToolbarRight>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={14} color="var(--color-text-secondary)" />
            <Select
              value={sortBy}
              onChange={(val: VendorSortOption) => setSortBy(val)}
              style={{ width: 180 }}
              options={[
                { value: 'name_asc', label: 'Name (A to Z)' },
                { value: 'name_desc', label: 'Name (Z to A)' },
                { value: 'rating_desc', label: 'Highest Rated' },
                { value: 'experience_desc', label: 'Most Experienced' },
                { value: 'newest', label: 'Newest First' },
              ]}
            />
          </div>
        </AdminToolbarRight>
      </AdminToolbar>

      <AdminTableCard>
        <Table
          dataSource={vendors}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: false }}
          locale={{ emptyText: 'No vendors found matching your criteria' }}
        />
      </AdminTableCard>

      {/* KYC Review & Document Modal */}
      <FormModal
        open={!!reviewTarget}
        onClose={closeReview}
        icon={ShieldCheck}
        title={reviewTarget?.businessName ?? ''}
        subtitle={
          isPendingVendor
            ? 'Review submitted KYC details and documents before deciding.'
            : 'Vendor profile and KYC details overview.'
        }
        width={640}
        footer={
          isPendingVendor ? (
            rejecting ? (
              <>
                <Button onClick={() => setRejecting(false)}>
                  {t('admin.cancel')}
                </Button>
                <Button
                  danger
                  type="primary"
                  disabled={!rejectReason.trim()}
                  onClick={confirmReject}
                >
                  {t('admin.confirmReject')}
                </Button>
              </>
            ) : (
              <>
                <Button danger onClick={() => setRejecting(true)}>
                  {t('admin.reject')}
                </Button>
                <Button
                  type="primary"
                  onClick={() => reviewTarget && approve(reviewTarget.id)}
                >
                  {t('admin.approve')}
                </Button>
              </>
            )
          ) : (
            <Button onClick={closeReview}>
              {t('common.close') || 'Close'}
            </Button>
          )
        }
      >
        <Section>
          <SectionLabel>KYC Details</SectionLabel>
          <KycGrid>
            <KycRow>
              <KycLabel>{t('admin.ownerName')}</KycLabel>
              <KycValue>
                {kyc?.owner_name ||
                  reviewTarget?.ownerName ||
                  t('admin.notProvided')}
              </KycValue>
            </KycRow>
            <KycRow>
              <KycLabel>{t('admin.mobileNumber')}</KycLabel>
              <KycValue>
                {kyc?.mobile_number ||
                  reviewTarget?.mobileNumber ||
                  reviewTarget?.phone ||
                  t('admin.notProvided')}
              </KycValue>
            </KycRow>
            <KycRow>
              <KycLabel>{t('admin.aadhaar')}</KycLabel>
              <KycValue>
                {kyc?.aadhaar_number ||
                  reviewTarget?.maskedAadhaar ||
                  t('admin.notProvided')}
              </KycValue>
            </KycRow>
            <KycRow>
              <KycLabel>{t('admin.pan')}</KycLabel>
              <KycValue>
                {kyc?.pan_number ||
                  reviewTarget?.maskedPan ||
                  t('admin.notProvided')}
              </KycValue>
            </KycRow>
            <KycRow>
              <KycLabel>{t('admin.gstin')}</KycLabel>
              <KycValue>
                {kyc?.gstin || reviewTarget?.gstin || t('admin.notProvided')}
              </KycValue>
            </KycRow>
            <KycRow>
              <KycLabel>Verification Status</KycLabel>
              <KycValue>
                <AdminStatusBadge status={reviewTarget?.status || 'pending'} />
              </KycValue>
            </KycRow>
          </KycGrid>
        </Section>

        <Section>
          <SectionLabel>{t('admin.documents')}</SectionLabel>
          {documents.length === 0 ? (
            <p
              style={{
                margin: 0,
                color: 'var(--color-text-secondary)',
                fontSize: '0.85rem',
              }}
            >
              {t('admin.noDocs')}
            </p>
          ) : (
            <DocList>
              {documents.map(d => (
                <DocThumb
                  key={d.id}
                  href={d.file_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText size={22} />
                  <span>{d.document_type.replace('_', ' ').toUpperCase()}</span>
                </DocThumb>
              ))}
            </DocList>
          )}
        </Section>

        {rejecting && (
          <Section>
            <Field>
              <FieldLabel>{t('admin.rejectReasonLabel')}</FieldLabel>
              <Input.TextArea
                rows={3}
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder={t('admin.rejectReasonPlaceholder')}
              />
            </Field>
          </Section>
        )}
      </FormModal>
    </>
  );
}
