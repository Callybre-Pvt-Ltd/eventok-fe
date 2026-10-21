import { Alert, Modal, Form, Input, Checkbox, Button, Upload } from 'antd';
import {
  PHONE_REGEX,
  useBecomeVendorModal,
  type DocumentKind,
  type FormValues,
} from './helper';
import {
  Actions,
  ActionsItem,
  FailedNotice,
  FullWidthNumber,
  Intro,
  ScrollBody,
} from './styled';

interface BecomeVendorModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const UPLOAD_FIELDS: { kind: DocumentKind; required: boolean }[] = [
  { kind: 'AADHAAR_FRONT', required: true },
  { kind: 'AADHAAR_BACK', required: true },
  { kind: 'VENDOR_PROFILE_IMAGE', required: false },
  { kind: 'GST_CERTIFICATE', required: false },
];

export function BecomeVendorModal({
  open,
  onClose,
  onSuccess,
}: BecomeVendorModalProps) {
  const {
    t,
    form,
    loading,
    initialValues,
    failedKinds,
    profileCreated,
    uploadProps,
    handleFinish,
    handleClose,
  } = useBecomeVendorModal({ onClose, onSuccess });

  return (
    <Modal
      title={t('vendor.becomeVendorTitle')}
      open={open}
      onCancel={handleClose}
      footer={null}
      destroyOnHidden
      centered
      width={640}
    >
      <ScrollBody>
        <Intro>{t('vendor.becomeVendorIntro')}</Intro>

        <Form<FormValues>
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleFinish}
          requiredMark="optional"
          disabled={loading}
        >
          <Form.Item
            label={t('vendor.becomeVendorFullName')}
            name="full_name"
            rules={[
              {
                required: true,
                message: t('vendor.becomeVendorFullNameRequired'),
              },
              { min: 2, message: t('vendor.becomeVendorFullNameMin') },
              { max: 100, message: t('vendor.becomeVendorFullNameMax') },
            ]}
          >
            <Input
              placeholder={t('vendor.becomeVendorFullNamePlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t('vendor.becomeVendorPhone')}
            name="phone"
            rules={[
              {
                required: true,
                message: t('vendor.becomeVendorPhoneRequired'),
              },
              {
                pattern: PHONE_REGEX,
                message: t('vendor.becomeVendorPhoneInvalid'),
              },
            ]}
          >
            <Input
              placeholder={t('vendor.becomeVendorPhonePlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t('vendor.becomeVendorBusinessName')}
            name="business_name"
            rules={[
              {
                required: true,
                message: t('vendor.becomeVendorBusinessNameRequired'),
              },
              { min: 3, message: t('vendor.becomeVendorBusinessNameMin') },
              { max: 200, message: t('vendor.becomeVendorBusinessNameMax') },
            ]}
          >
            <Input
              placeholder={t('vendor.becomeVendorBusinessNamePlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t('vendor.becomeVendorOwnerName')}
            name="owner_name"
          >
            <Input
              placeholder={t('vendor.becomeVendorOwnerNamePlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t('vendor.becomeVendorCity')}
            name="city"
            rules={[{ max: 100, message: t('vendor.becomeVendorCityMax') }]}
          >
            <Input
              placeholder={t('vendor.becomeVendorCityPlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item label={t('vendor.becomeVendorState')} name="state">
            <Input
              placeholder={t('vendor.becomeVendorStatePlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item label={t('vendor.becomeVendorAddress')} name="address">
            <Input
              placeholder={t('vendor.becomeVendorAddressPlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item label={t('vendor.becomeVendorAbout')} name="description">
            <Input.TextArea
              rows={3}
              placeholder={t('vendor.becomeVendorAboutPlaceholder')}
            />
          </Form.Item>

          <Form.Item
            label={t('vendor.becomeVendorExperience')}
            name="experience_years"
          >
            <FullWidthNumber min={0} max={80} size="large" />
          </Form.Item>

          <Form.Item
            label={t('vendor.becomeVendorAadhaar')}
            name="aadhaar_number"
            rules={[
              {
                required: true,
                message: t('vendor.becomeVendorAadhaarNumberRequired'),
              },
              {
                pattern: /^\d{12}$/,
                message: t('vendor.becomeVendorAadhaarInvalid'),
              },
            ]}
          >
            <Input
              placeholder={t('vendor.becomeVendorAadhaarPlaceholder')}
              size="large"
              maxLength={12}
            />
          </Form.Item>

          <Form.Item
            label={t('vendor.becomeVendorPan')}
            name="pan_number"
            rules={[
              { required: true, message: t('vendor.becomeVendorPanRequired') },
              {
                pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/i,
                message: t('vendor.becomeVendorPanInvalid'),
              },
            ]}
            normalize={(value: string) => value?.toUpperCase()}
          >
            <Input placeholder="ABCDE1234F" size="large" maxLength={10} />
          </Form.Item>

          <Form.Item
            label={t('vendor.becomeVendorGstin')}
            name="gstin"
            rules={[
              {
                pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i,
                message: t('vendor.becomeVendorGstinInvalid'),
              },
            ]}
          >
            <Input
              placeholder={t('vendor.becomeVendorGstinPlaceholder')}
              size="large"
              maxLength={15}
            />
          </Form.Item>

          {UPLOAD_FIELDS.map(({ kind, required }) => (
            <Form.Item
              key={kind}
              label={t(`vendor.becomeVendorDoc_${kind}`)}
              required={required}
              extra={t(
                kind === 'VENDOR_PROFILE_IMAGE'
                  ? 'vendor.becomeVendorImageHint'
                  : 'vendor.becomeVendorDocumentHint',
              )}
            >
              <Upload {...uploadProps(kind)}>
                <Button>
                  {t('vendor.becomeVendorChooseFile', {
                    document: t(`vendor.becomeVendorDoc_${kind}`),
                  })}
                </Button>
              </Upload>
            </Form.Item>
          ))}

          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(t('vendor.becomeVendorTermsRequired')),
                      ),
              },
            ]}
          >
            <Checkbox>
              {t('vendor.becomeVendorTermsPrefix')}{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                {t('vendor.becomeVendorTermsLink')}
              </a>{' '}
              {t('vendor.becomeVendorTermsSuffix')}
            </Checkbox>
          </Form.Item>

          {failedKinds.length > 0 && (
            <FailedNotice role="alert">
              <Alert
                type="error"
                showIcon
                message={t('vendor.becomeVendorRetryTitle')}
                description={t('vendor.becomeVendorRetryBody', {
                  documents: failedKinds
                    .map(kind => t(`vendor.becomeVendorDoc_${kind}`))
                    .join(', '),
                })}
              />
            </FailedNotice>
          )}

          <ActionsItem>
            <Actions>
              <Button onClick={handleClose} disabled={loading}>
                {t('vendor.becomeVendorCancel')}
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {profileCreated
                  ? t('vendor.becomeVendorRetry')
                  : t('vendor.becomeVendorSubmit')}
              </Button>
            </Actions>
          </ActionsItem>
        </Form>
      </ScrollBody>
    </Modal>
  );
}
