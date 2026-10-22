import { useState } from 'react';
import { Form, Upload, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/auth/use-auth';
import { authService } from '@/services/authService';
import { vendorService } from '@/services/vendorService';

export interface FormValues {
  full_name: string;
  phone: string;
  business_name: string;
  owner_name?: string;
  city?: string;
  state?: string;
  address?: string;
  description?: string;
  experience_years?: number;
  aadhaar_number: string;
  pan_number: string;
  gstin?: string;
  agree: boolean;
}

export type DocumentKind =
  | 'AADHAAR_FRONT'
  | 'AADHAAR_BACK'
  | 'VENDOR_PROFILE_IMAGE'
  | 'GST_CERTIFICATE';

// Mirrors the API's verification upload rules (VERIFICATION_MIME_TYPES, 5MB).
const MAX_DOCUMENT_BYTES = 5 * 1024 * 1024;
const DOCUMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const IMAGE_TYPES = ['image/jpeg', 'image/png'];
export const DOCUMENT_ACCEPT = '.pdf,.jpg,.jpeg,.png';
export const IMAGE_ACCEPT = '.jpg,.jpeg,.png';

export const DOCUMENT_ORDER: DocumentKind[] = [
  'AADHAAR_FRONT',
  'AADHAAR_BACK',
  'VENDOR_PROFILE_IMAGE',
  'GST_CERTIFICATE',
];

// Indian / international mobile phone validator: 10 to 15 digits, optional + prefix
export const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

const EMPTY_FILES: Record<DocumentKind, UploadFile[]> = {
  AADHAAR_FRONT: [],
  AADHAAR_BACK: [],
  VENDOR_PROFILE_IMAGE: [],
  GST_CERTIFICATE: [],
};

export function useBecomeVendorModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const { t } = useTranslation();
  const { session, refreshSession } = useAuth();
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(EMPTY_FILES);
  // Set once the profile exists, so a retry only re-sends documents instead of
  // re-creating the vendor (which the API rejects as a duplicate).
  const [vendorId, setVendorId] = useState<string | null>(null);

  const initialValues: Partial<FormValues> = {
    full_name: session?.user?.name || '',
    phone: session?.user?.phone || '',
    business_name: '',
    city: session?.user?.city || '',
    agree: false,
  };

  const failedKinds = DOCUMENT_ORDER.filter(
    kind => files[kind][0]?.status === 'error',
  );

  const setFileStatus = (kind: DocumentKind, status: UploadFile['status']) =>
    setFiles(current => ({
      ...current,
      [kind]: current[kind].map(file => ({ ...file, status })),
    }));

  const uploadProps = (kind: DocumentKind): UploadProps => {
    const allowed =
      kind === 'VENDOR_PROFILE_IMAGE' ? IMAGE_TYPES : DOCUMENT_TYPES;
    return {
      maxCount: 1,
      fileList: files[kind],
      disabled: loading,
      accept: kind === 'VENDOR_PROFILE_IMAGE' ? IMAGE_ACCEPT : DOCUMENT_ACCEPT,
      beforeUpload: file => {
        if (!allowed.includes(file.type)) {
          message.error(t('vendor.becomeVendorFileType', { name: file.name }));
          return Upload.LIST_IGNORE;
        }
        if (file.size > MAX_DOCUMENT_BYTES) {
          message.error(t('vendor.becomeVendorFileSize', { name: file.name }));
          return Upload.LIST_IGNORE;
        }
        // Keep the file locally; it is sent once the application is submitted.
        return false;
      },
      onChange: ({ fileList }) =>
        setFiles(current => ({ ...current, [kind]: fileList.slice(-1) })),
    };
  };

  const createProfile = async (values: FormValues): Promise<string | null> => {
    if (values.full_name || values.phone) {
      await authService.updateMe({
        full_name: values.full_name.trim(),
        phone: values.phone.trim(),
      });
    }
    const res = await vendorService.createProfile({
      business_name: values.business_name.trim(),
      owner_name: values.owner_name?.trim() || values.full_name.trim(),
      mobile_number: values.phone.trim(),
      city: values.city?.trim() || undefined,
      state: values.state?.trim() || undefined,
      address: values.address?.trim() || undefined,
      description: values.description?.trim() || undefined,
      experience_years: values.experience_years,
      aadhaar_number: values.aadhaar_number.trim(),
      pan_number: values.pan_number.trim().toUpperCase(),
      gstin: values.gstin?.trim().toUpperCase() || undefined,
    });
    if (res.error || !res.data) {
      message.error(res.error || t('vendor.becomeVendorFailed'));
      return null;
    }
    return res.data.id;
  };

  /** Uploads every document not yet confirmed by the API; returns true when all succeed. */
  const uploadPending = async (targetVendorId: string): Promise<boolean> => {
    let allUploaded = true;
    for (const kind of DOCUMENT_ORDER) {
      const file = files[kind][0];
      const raw = file?.originFileObj;
      if (!raw || file.status === 'done') continue;
      setFileStatus(kind, 'uploading');
      const uploaded = await vendorService.submitVerification(
        targetVendorId,
        kind,
        raw,
      );
      setFileStatus(kind, uploaded.error ? 'error' : 'done');
      if (uploaded.error) {
        allUploaded = false;
        message.error(
          t('vendor.becomeVendorUploadFailed', {
            document: t(`vendor.becomeVendorDoc_${kind}`),
            reason: uploaded.error,
          }),
        );
      }
    }
    return allUploaded;
  };

  const reset = () => {
    form.resetFields();
    setFiles(EMPTY_FILES);
    setVendorId(null);
  };

  const handleFinish = async (values: FormValues) => {
    if (
      !files.AADHAAR_FRONT[0]?.originFileObj ||
      !files.AADHAAR_BACK[0]?.originFileObj
    ) {
      message.error(t('vendor.becomeVendorAadhaarRequired'));
      return;
    }
    try {
      setLoading(true);
      const targetVendorId = vendorId ?? (await createProfile(values));
      if (!targetVendorId) return;
      setVendorId(targetVendorId);

      const allUploaded = await uploadPending(targetVendorId);
      // Keep the modal, the form and the failed files so the vendor can retry.
      if (!allUploaded) return;

      message.success(t('vendor.becomeVendorSubmitted'));
      reset();
      onClose();
      await refreshSession();
      onSuccess?.();
    } catch (err: unknown) {
      message.error(
        err instanceof Error ? err.message : t('vendor.becomeVendorFailed'),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // A created profile with missing documents stays pending; reloading the session
    // shows the vendor their pending state instead of the sign-up prompt again.
    if (vendorId) void refreshSession();
    onClose();
  };

  return {
    t,
    form,
    loading,
    initialValues,
    failedKinds,
    profileCreated: vendorId !== null,
    uploadProps,
    handleFinish,
    handleClose,
  };
}
