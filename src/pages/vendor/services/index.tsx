import { useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { useVendorServices } from './helper';
import { ItemTitle, List, ListItem, PageHeader, PageTitle } from './styled';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import styled from 'styled-components';
import { fontFamily } from '@/theme';

const FormCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid rgba(10, 10, 10, 0.08);
  border-radius: 0.25rem;
  background: #fff;
  font-family: ${fontFamily.body};
`;

const Meta = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  opacity: 0.7;
`;

const RowActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export default function VendorServicesPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    services,
    categories,
    isLoading,
    createMutation,
    publishMutation,
    deleteMutation,
    uploadMutation,
  } = useVendorServices();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <LoadingState />;

  return (
    <>
      <PageHeader>
        <PageTitle $palette={palette}>{t('vendor.servicesTitle')}</PageTitle>
        <Button type="primary" onClick={() => setShowForm(v => !v)}>
          {t('vendor.addService')}
        </Button>
      </PageHeader>

      {showForm ? (
        <FormCard>
          <Form
            layout="vertical"
            onFinish={values => {
              createMutation.mutate({
                category_id: values.category_id,
                title: values.title,
                description: values.description,
                starting_price: values.starting_price,
              });
              setShowForm(false);
            }}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Title required' }]}
            >
              <Input placeholder="Birthday décor package" />
            </Form.Item>
            <Form.Item
              name="category_id"
              label="Category"
              rules={[{ required: true, message: 'Category required' }]}
            >
              <Select
                options={categories.map(c => ({
                  value: c.id,
                  label: c.name,
                }))}
                placeholder="Select category"
              />
            </Form.Item>
            <Form.Item
              name="starting_price"
              label="Starting price (₹)"
              rules={[{ required: true, message: 'Price required' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createMutation.isPending}
            >
              Create service
            </Button>
          </Form>
        </FormCard>
      ) : null}

      {services.length === 0 ? (
        <EmptyState description="No services yet. Create one to appear in search." />
      ) : (
        <List>
          {services.map(s => (
            <ListItem $palette={palette} key={s.id}>
              <ItemTitle $palette={palette}>{s.title}</ItemTitle>
              <Meta>
                ₹{Number(s.starting_price).toLocaleString('en-IN')} · {s.status}
              </Meta>
              <RowActions>
                {s.status !== 'PUBLISHED' ? (
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => publishMutation.mutate(s.id)}
                  >
                    Publish
                  </Button>
                ) : null}
                <Upload
                  showUploadList={false}
                  beforeUpload={file => {
                    uploadMutation.mutate({ serviceId: s.id, file });
                    return false;
                  }}
                >
                  <Button size="small">Upload image</Button>
                </Upload>
                <Button
                  size="small"
                  danger
                  onClick={() => deleteMutation.mutate(s.id)}
                >
                  Delete
                </Button>
              </RowActions>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
