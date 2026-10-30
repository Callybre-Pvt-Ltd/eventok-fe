import { useState } from 'react';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Upload,
  message,
} from 'antd';
import type { UploadFile } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { authService } from '@/services/authService';
import { vendorService } from '@/services/vendorService';

interface BecomeVendorModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormValues {
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

// Indian / international mobile phone validator: 10 to 15 digits, optional + prefix
const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

export function BecomeVendorModal({
  open,
  onClose,
  onSuccess,
}: BecomeVendorModalProps) {
  const { session, refreshSession } = useAuth();
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [aadhaarFront, setAadhaarFront] = useState<UploadFile[]>([]);
  const [aadhaarBack, setAadhaarBack] = useState<UploadFile[]>([]);
  const [profileImage, setProfileImage] = useState<UploadFile[]>([]);
  const [shopProof, setShopProof] = useState<UploadFile[]>([]);
  const [gstFile, setGstFile] = useState<UploadFile[]>([]);

  useBodyScrollLock(open);

  const initialValues: Partial<FormValues> = {
    full_name: session?.user?.name || '',
    phone: session?.user?.phone || '',
    business_name: '',
    city: session?.user?.city || '',
    agree: false,
  };

  const handleFinish = async (values: FormValues) => {
    try {
      setLoading(true);

      if (!aadhaarFront[0]?.originFileObj || !aadhaarBack[0]?.originFileObj) {
        message.error('Upload both sides of your Aadhaar.');
        return;
      }

      if (!shopProof[0]?.originFileObj) {
        message.error('Please upload a photo of your shop or store.');
        return;
      }

      // 1. Update user profile phone & name if changed
      if (values.full_name || values.phone) {
        await authService.updateMe({
          full_name: values.full_name.trim(),
          phone: values.phone.trim(),
        });
      }

      // 2. Create vendor profile
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

      let vendorId = res.data?.id;
      if (
        !vendorId &&
        res.error &&
        res.error.toLowerCase().includes('already exists')
      ) {
        const myProfile = await vendorService.getMe();
        if (myProfile.data?.id) {
          vendorId = myProfile.data.id;
        }
      }

      if (!vendorId) {
        message.error(res.error || 'Failed to submit application');
        return;
      }

      const uploads: Array<{
        type:
          | 'AADHAAR_FRONT'
          | 'AADHAAR_BACK'
          | 'VENDOR_PROFILE_IMAGE'
          | 'SHOP_PROOF'
          | 'GST_CERTIFICATE';
        file?: UploadFile;
      }> = [
        { type: 'AADHAAR_FRONT', file: aadhaarFront[0] },
        { type: 'AADHAAR_BACK', file: aadhaarBack[0] },
        { type: 'VENDOR_PROFILE_IMAGE', file: profileImage[0] },
        { type: 'SHOP_PROOF', file: shopProof[0] },
        { type: 'GST_CERTIFICATE', file: gstFile[0] },
      ];
      for (const upload of uploads) {
        const raw = upload.file?.originFileObj;
        if (!raw) continue;
        const uploaded = await vendorService.submitVerification(
          vendorId,
          upload.type,
          raw,
        );
        if (uploaded.error) {
          message.warning(
            `Profile saved, but ${upload.type
              .replaceAll('_', ' ')
              .toLowerCase()} failed to upload.`,
          );
        }
      }

      message.success(
        'Vendor application submitted! It is now pending Super Admin review.',
      );
      form.resetFields();
      setAadhaarFront([]);
      setAadhaarBack([]);
      setProfileImage([]);
      setShopProof([]);
      setGstFile([]);
      onClose();
      await refreshSession();
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Failed to submit application';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Become an EventOK Vendor"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
      width={640}
      styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
    >
      <p
        style={{ color: '#666', marginBottom: '1.25rem', fontSize: '0.875rem' }}
      >
        Register your service or shop. Once submitted, our Super Admin team will
        review and approve your vendor profile.
      </p>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFinish}
        requiredMark="optional"
      >
        <Form.Item
          label="Your Full Name"
          name="full_name"
          rules={[
            { required: true, message: 'Please enter your name' },
            { min: 2, message: 'Name must be at least 2 characters' },
            { max: 100, message: 'Name cannot exceed 100 characters' },
          ]}
        >
          <Input placeholder="e.g. John Doe" size="large" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: 'Please enter your phone number' },
            {
              pattern: PHONE_REGEX,
              message:
                'Please enter a valid 10-digit phone number (e.g. 9876543210 or +919876543210)',
            },
          ]}
        >
          <Input placeholder="e.g. 9876543210" size="large" />
        </Form.Item>

        <Form.Item
          label="Name of Shop or Service"
          name="business_name"
          rules={[
            {
              required: true,
              message: 'Please enter your shop or service name',
            },
            {
              min: 3,
              message: 'Shop or service name must be at least 3 characters',
            },
            {
              max: 200,
              message: 'Shop or service name cannot exceed 200 characters',
            },
          ]}
        >
          <Input placeholder="e.g. Royal Caterers & Decorators" size="large" />
        </Form.Item>

        <Form.Item label="Owner name" name="owner_name">
          <Input placeholder="Name on Aadhaar / PAN" size="large" />
        </Form.Item>

        <Form.Item
          label="City / Location"
          name="city"
          rules={[{ max: 100, message: 'City cannot exceed 100 characters' }]}
        >
          <Input placeholder="e.g. Mumbai" size="large" />
        </Form.Item>

        <Form.Item label="State" name="state">
          <Input placeholder="e.g. Maharashtra" size="large" />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input placeholder="Shop or studio address" size="large" />
        </Form.Item>

        <Form.Item label="About your business" name="description">
          <Input.TextArea rows={3} placeholder="What you offer" />
        </Form.Item>

        <Form.Item label="Years of experience" name="experience_years">
          <InputNumber
            min={0}
            max={80}
            size="large"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Aadhaar number"
          name="aadhaar_number"
          rules={[
            { required: true, message: 'Aadhaar number is required' },
            { pattern: /^\d{12}$/, message: 'Enter a 12-digit Aadhaar number' },
          ]}
        >
          <Input
            placeholder="12-digit Aadhaar number"
            size="large"
            maxLength={12}
          />
        </Form.Item>

        <Form.Item
          label="PAN"
          name="pan_number"
          rules={[
            { required: true, message: 'PAN is required' },
            {
              pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/i,
              message: 'Enter a valid PAN, e.g. ABCDE1234F',
            },
          ]}
        >
          <Input
            placeholder="ABCDE1234F"
            size="large"
            maxLength={10}
            onChange={e =>
              form.setFieldValue('pan_number', e.target.value.toUpperCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="GSTIN (optional)"
          name="gstin"
          rules={[
            {
              pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i,
              message: 'Enter a valid 15-character GSTIN',
            },
          ]}
        >
          <Input placeholder="15-character GSTIN" size="large" maxLength={15} />
        </Form.Item>

        <Form.Item label="Aadhaar front" required>
          <Upload
            accept="image/*,.pdf"
            maxCount={1}
            fileList={aadhaarFront}
            beforeUpload={() => false}
            onChange={({ fileList }) => setAadhaarFront(fileList.slice(-1))}
          >
            <Button>Upload Aadhaar (front)</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Aadhaar back" required>
          <Upload
            accept="image/*,.pdf"
            maxCount={1}
            fileList={aadhaarBack}
            beforeUpload={() => false}
            onChange={({ fileList }) => setAadhaarBack(fileList.slice(-1))}
          >
            <Button>Upload Aadhaar (back)</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Profile image">
          <Upload
            accept="image/*"
            maxCount={1}
            fileList={profileImage}
            beforeUpload={() => false}
            onChange={({ fileList }) => setProfileImage(fileList.slice(-1))}
          >
            <Button>Upload profile image</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Shop / Store proof photo"
          required
          extra="Upload a clear photo of your shop, store-front, or workspace. This helps us verify your business."
        >
          <Upload
            accept="image/*"
            maxCount={1}
            fileList={shopProof}
            beforeUpload={() => false}
            onChange={({ fileList }) => setShopProof(fileList.slice(-1))}
            listType="picture"
          >
            <Button>Upload shop / store photo</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="GST certificate (optional)">
          <Upload
            accept="image/*,.pdf"
            maxCount={1}
            fileList={gstFile}
            beforeUpload={() => false}
            onChange={({ fileList }) => setGstFile(fileList.slice(-1))}
          >
            <Button>Upload GST certificate</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error('You must accept the terms and conditions'),
                    ),
            },
          ]}
        >
          <Checkbox>
            I agree to the{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </a>{' '}
            and Vendor Code of Conduct.
          </Checkbox>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
            }}
          >
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit Application
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
