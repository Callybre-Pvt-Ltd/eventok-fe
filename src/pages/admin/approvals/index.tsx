import { Button, Input, Table, Tag } from 'antd';
import { FileText, ShieldCheck } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import {
  Field,
  FieldLabel,
  FormModal,
  Section,
  SectionLabel,
} from '@/components/ui/form-modal';
import { useAdminApprovals } from './helper';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import {
  DocList,
  DocThumb,
  KycGrid,
  KycLabel,
  KycRow,
  KycValue,
  PageTitle,
} from './styled';
import type { VendorPrivate } from '@/types';

export default function AdminApprovalsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    pending,
    isLoading,
    approve,
    reviewTarget,
    openReview,
    closeReview,
    kyc,
    documents,
    rejecting,
    setRejecting,
    rejectReason,
    setRejectReason,
    confirmReject,
  } = useAdminApprovals();

  if (isLoading) return <LoadingState />;

  const columns: ColumnsType<VendorPrivate> = [
    {
      title: 'Business / Shop Name',
      dataIndex: 'businessName',
      key: 'businessName',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: t('admin.ownerName'),
      dataIndex: 'ownerName',
      key: 'ownerName',
      render: (v: string) => v || t('admin.notProvided'),
    },
    {
      title: t('admin.mobileNumber'),
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      render: (v: string) => v || t('admin.notProvided'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'under_review' ? 'blue' : 'orange'}>
          {status.replace('_', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button size="small" onClick={() => openReview(record)}>
          {t('admin.review')}
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageTitle $palette={palette}>{t('admin.approvals')}</PageTitle>
      <Table
        dataSource={pending}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: t('admin.noPending') }}
        bordered
      />

      <FormModal
        open={!!reviewTarget}
        onClose={closeReview}
        icon={ShieldCheck}
        title={reviewTarget?.businessName ?? ''}
        subtitle="Review KYC details and submitted documents before deciding."
        width={640}
        footer={
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
        }
      >
        <Section>
          <SectionLabel>KYC details</SectionLabel>
          <KycGrid>
            <KycRow>
              <KycLabel>{t('admin.ownerName')}</KycLabel>
              <KycValue>{kyc?.owner_name || t('admin.notProvided')}</KycValue>
            </KycRow>
            <KycRow>
              <KycLabel>{t('admin.mobileNumber')}</KycLabel>
              <KycValue>
                {kyc?.mobile_number || t('admin.notProvided')}
              </KycValue>
            </KycRow>
            <KycRow>
              <KycLabel>{t('admin.aadhaar')}</KycLabel>
              <KycValue>
                {kyc?.aadhaar_number || t('admin.notProvided')}
              </KycValue>
            </KycRow>
            <KycRow>
              <KycLabel>{t('admin.pan')}</KycLabel>
              <KycValue>{kyc?.pan_number || t('admin.notProvided')}</KycValue>
            </KycRow>
            <KycRow>
              <KycLabel>{t('admin.gstin')}</KycLabel>
              <KycValue>{kyc?.gstin || t('admin.notProvided')}</KycValue>
            </KycRow>
            <KycRow>
              <KycLabel>{t('admin.applicationDate')}</KycLabel>
              <KycValue>
                {kyc
                  ? new Date(kyc.created_at).toLocaleDateString('en-IN')
                  : '—'}
              </KycValue>
            </KycRow>
          </KycGrid>
        </Section>

        <Section>
          <SectionLabel>{t('admin.documents')}</SectionLabel>
          {documents.length === 0 ? (
            <p>{t('admin.noDocuments')}</p>
          ) : (
            <DocList>
              {documents.map(doc => (
                <DocThumb
                  key={doc.id}
                  href={doc.file_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText size={20} />
                  {doc.document_type.replace(/_/g, ' ')}
                </DocThumb>
              ))}
            </DocList>
          )}
        </Section>

        {rejecting ? (
          <Section>
            <Field>
              <FieldLabel>{t('admin.rejectReasonPrompt')}</FieldLabel>
              <Input.TextArea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder={t('admin.rejectReasonPlaceholder')}
                rows={3}
              />
            </Field>
          </Section>
        ) : null}
      </FormModal>
    </>
  );
}
