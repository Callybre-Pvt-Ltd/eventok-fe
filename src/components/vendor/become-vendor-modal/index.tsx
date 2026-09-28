import { useState } from 'react';
import { Modal, Form, Input, Checkbox, Button, message } from 'antd';
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
  city?: string;
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
        city: values.city?.trim() || undefined,
        description: 'Vendor application submitted via storefront',
      });

      if (res.error) {
        message.error(res.error);
        return;
      }

      message.success(
        'Vendor application submitted! It is now pending Super Admin review.',
      );
      form.resetFields();
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

        <Form.Item
          label="City / Location"
          name="city"
          rules={[{ max: 100, message: 'City cannot exceed 100 characters' }]}
        >
          <Input placeholder="e.g. Mumbai" size="large" />
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
