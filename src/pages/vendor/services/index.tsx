import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Drawer, Dropdown, Input, Modal, message } from 'antd';
import type { MenuProps } from 'antd';
import {
  Copy,
  ExternalLink,
  Eye,
  ImageIcon,
  MoreVertical,
  PauseCircle,
  Pencil,
  PlayCircle,
  Plus,
  Search,
  Trash2,
  Calendar,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingState } from '@/components/global/loading-state';
import { ROUTES } from '@/constants/routes';
import { vendorService } from '@/services';
import type { VendorApiService as ApiService } from '@/services/vendorService';
import { useVendorServices } from './helper';
import {
  ActionCell,
  AreaText,
  CategoryTag,
  CountText,
  DateText,
  DrawerImageGrid,
  DrawerSection,
  DrawerSectionTitle,
  DrawerThumb,
  EmptyWorkspace,
  FilterBar,
  FilterLeft,
  HeaderActions,
  HeaderEyebrow,
  HeaderLeft,
  HeaderSection,
  HeaderSubtitle,
  HeaderTitle,
  Page,
  PriceBlock,
  PriceCustomer,
  PriceMain,
  ServiceInfo,
  ServiceRow,
  ServiceTableHeader,
  ServiceTableWrap,
  ServiceTitleText,
  ServiceSubtext,
  StatusFilterBtn,
  StatusIndicator,
  StatusPillGroup,
  Thumbnail,
} from './styled';

export default function VendorServicesPage() {
  const {
    services,
    categories,
    isLoading,
    deleteMutation,
    vendorId,
    vendorCity,
  } = useVendorServices();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'ALL' | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'
  >('ALL');
  const [detailService, setDetailService] = useState<ApiService | null>(null);
  const [detailImages, setDetailImages] = useState<
    { id: string; image_url: string }[]
  >([]);
  const [duplicating, setDuplicating] = useState(false);

  const openDrawer = async (service: ApiService) => {
    setDetailService(service);
    const res = await vendorService.listServiceImages(service.id);
    if (!res.error) setDetailImages(res.data ?? []);
  };

  const closeDrawer = () => {
    setDetailService(null);
    setDetailImages([]);
  };

  const handleDuplicate = async (service: ApiService) => {
    if (!vendorId) return;
    setDuplicating(true);
    const res = await vendorService.createService(vendorId, {
      category_id: service.category_id,
      title: `${service.title} (Copy)`,
      description: service.description || undefined,
      starting_price: Number(service.starting_price),
      whats_included: service.whats_included || [],
      good_to_know: service.good_to_know || [],
      cancellation_policy: service.cancellation_policy || [],
    });
    setDuplicating(false);
    if (res.error) {
      message.error(res.error);
      return;
    }
    message.success('Draft service duplicated');
    navigate(`${ROUTES.VENDOR_SERVICES}/${res.data?.id}/edit`);
  };

  // The backend only knows DRAFT / PUBLISHED / ARCHIVED, so "unpublish" returns the
  // listing to DRAFT rather than a PAUSED state that the API would reject.
  const handleToggleStatus = async (service: ApiService) => {
    const nextStatus = service.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const res = await vendorService.updateService(service.id, {
      status: nextStatus,
    });
    if (res.error) {
      message.error(res.error);
      return;
    }
    message.success(
      nextStatus === 'PUBLISHED'
        ? 'Service is live — customers can book it'
        : 'Service unpublished and saved as a draft',
    );
    queryClient.invalidateQueries({ queryKey: ['vendor', 'services'] });
    queryClient.invalidateQueries({ queryKey: ['storefront'] });
  };

  const handleDelete = (service: ApiService) => {
    Modal.confirm({
      title: `Delete “${service.title}”?`,
      content:
        'This service listing will be permanently removed from your catalog and will no longer be bookable by customers.',
      okText: 'Delete service',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => deleteMutation.mutate(service.id),
    });
  };

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const cat = categories.find(c => c.id === s.category_id);
      const matchesSearch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        (cat?.name && cat.name.toLowerCase().includes(search.toLowerCase()));

      if (!matchesSearch) return false;

      if (statusFilter === 'ALL') return true;
      return s.status === statusFilter;
    });
  }, [services, categories, search, statusFilter]);

  if (isLoading) return <LoadingState />;

  const goCreate = () => navigate(`${ROUTES.VENDOR_SERVICES}/new`);
  const goEdit = (serviceId: string) =>
    navigate(`${ROUTES.VENDOR_SERVICES}/${serviceId}/edit`);

  const getActionMenu = (service: ApiService): MenuProps['items'] => [
    {
      key: 'view',
      icon: <Eye size={14} />,
      label: 'View details',
      onClick: () => openDrawer(service),
    },
    {
      key: 'edit',
      icon: <Pencil size={14} />,
      label: 'Edit in wizard',
      onClick: () => goEdit(service.id),
    },
    {
      key: 'duplicate',
      icon: <Copy size={14} />,
      label: 'Duplicate as draft',
      disabled: duplicating,
      onClick: () => handleDuplicate(service),
    },
    {
      key: 'toggle-status',
      icon:
        service.status === 'PUBLISHED' ? (
          <PauseCircle size={14} />
        ) : (
          <PlayCircle size={14} />
        ),
      label: service.status === 'PUBLISHED' ? 'Unpublish' : 'Publish now',
      onClick: () => handleToggleStatus(service),
    },
    {
      key: 'bookings',
      icon: <Calendar size={14} />,
      label: 'View bookings',
      onClick: () => navigate(ROUTES.VENDOR_BOOKINGS),
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      icon: <Trash2 size={14} />,
      danger: true,
      label: 'Delete service',
      onClick: () => handleDelete(service),
    },
  ];

  return (
    <Page>
      <HeaderSection>
        <HeaderLeft>
          <HeaderEyebrow>Vendor workspace</HeaderEyebrow>
          <HeaderTitle>Services</HeaderTitle>
          <HeaderSubtitle>
            Manage the decoration services customers can discover and book from
            your shop.
          </HeaderSubtitle>
        </HeaderLeft>
        <HeaderActions>
          <Button
            icon={<ExternalLink size={14} />}
            onClick={() => navigate(ROUTES.VENDOR_PROFILE)}
          >
            View public profile
          </Button>
          <Button
            type="primary"
            icon={<Plus size={16} strokeWidth={2.4} />}
            onClick={goCreate}
          >
            Create service
          </Button>
        </HeaderActions>
      </HeaderSection>

      <FilterBar>
        <FilterLeft>
          <Input
            placeholder="Search by service name or category…"
            prefix={<Search size={14} color="#94a3b8" />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            allowClear
            style={{ maxWidth: 320 }}
          />
          <StatusPillGroup>
            <StatusFilterBtn
              type="button"
              $active={statusFilter === 'ALL'}
              onClick={() => setStatusFilter('ALL')}
            >
              All ({services.length})
            </StatusFilterBtn>
            <StatusFilterBtn
              type="button"
              $active={statusFilter === 'PUBLISHED'}
              onClick={() => setStatusFilter('PUBLISHED')}
            >
              Live ({services.filter(s => s.status === 'PUBLISHED').length})
            </StatusFilterBtn>
            <StatusFilterBtn
              type="button"
              $active={statusFilter === 'DRAFT'}
              onClick={() => setStatusFilter('DRAFT')}
            >
              Draft ({services.filter(s => s.status === 'DRAFT').length})
            </StatusFilterBtn>
            <StatusFilterBtn
              type="button"
              $active={statusFilter === 'ARCHIVED'}
              onClick={() => setStatusFilter('ARCHIVED')}
            >
              Archived ({services.filter(s => s.status === 'ARCHIVED').length})
            </StatusFilterBtn>
          </StatusPillGroup>
        </FilterLeft>
        <CountText>
          Showing {filteredServices.length} of {services.length} services
        </CountText>
      </FilterBar>

      {services.length === 0 ? (
        <EmptyWorkspace>
          <h3>List your first decoration service</h3>
          <p>
            Create services in our step-by-step wizard, set your price, upload
            photos of your work, and publish when you're ready.
          </p>
          <Button
            type="primary"
            size="large"
            icon={<Plus size={16} />}
            onClick={goCreate}
          >
            Create service
          </Button>
        </EmptyWorkspace>
      ) : filteredServices.length === 0 ? (
        <EmptyWorkspace>
          <h3>No services match your filters</h3>
          <p>Try clearing your search query or switching the status filter.</p>
          <Button
            onClick={() => {
              setSearch('');
              setStatusFilter('ALL');
            }}
          >
            Reset filters
          </Button>
        </EmptyWorkspace>
      ) : (
        <ServiceTableWrap>
          <ServiceTableHeader>
            <div>Photo</div>
            <div>Service</div>
            <div>Category</div>
            <div>Price & Customer Total</div>
            <div className="hide-tablet">Coverage</div>
            <div>Status</div>
            <div className="hide-tablet">Updated</div>
            <div style={{ textAlign: 'right' }}>Actions</div>
          </ServiceTableHeader>

          {filteredServices.map(s => {
            const cat = categories.find(c => c.id === s.category_id);
            const customerTotal = s.customer_price ?? s.starting_price;
            const updatedDate = s.created_at
              ? new Date(s.created_at).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                })
              : 'Recent';

            return (
              <ServiceRow key={s.id} onClick={() => openDrawer(s)}>
                <Thumbnail>
                  <ImageIcon size={20} />
                </Thumbnail>

                <ServiceInfo>
                  <ServiceTitleText title={s.title}>{s.title}</ServiceTitleText>
                  <ServiceSubtext>
                    {s.whats_included?.length
                      ? `${s.whats_included.length} inclusions · `
                      : ''}
                    {s.description || 'No description provided'}
                  </ServiceSubtext>
                </ServiceInfo>

                <div>
                  <CategoryTag>{cat?.name || 'Decor'}</CategoryTag>
                </div>

                <PriceBlock>
                  <PriceMain>
                    ₹{Number(s.starting_price).toLocaleString('en-IN')}
                  </PriceMain>
                  <PriceCustomer>
                    Customer ₹{Number(customerTotal).toLocaleString('en-IN')}
                  </PriceCustomer>
                </PriceBlock>

                <div className="hide-tablet">
                  <AreaText>{vendorCity || 'Regional coverage'}</AreaText>
                </div>

                <div>
                  <StatusIndicator $status={s.status}>
                    {s.status === 'PUBLISHED'
                      ? 'Live'
                      : s.status.replace(/_/g, ' ')}
                  </StatusIndicator>
                </div>

                <div className="hide-tablet">
                  <DateText>{updatedDate}</DateText>
                </div>

                <ActionCell onClick={e => e.stopPropagation()}>
                  <Dropdown
                    menu={{ items: getActionMenu(s) }}
                    trigger={['click']}
                    placement="bottomRight"
                  >
                    <Button
                      type="text"
                      size="small"
                      icon={<MoreVertical size={16} />}
                      aria-label="Service options"
                    />
                  </Dropdown>
                </ActionCell>
              </ServiceRow>
            );
          })}
        </ServiceTableWrap>
      )}

      {/* Service Details Drawer */}
      <Drawer
        title={detailService?.title || 'Service details'}
        open={!!detailService}
        onClose={closeDrawer}
        width={520}
        extra={
          detailService && (
            <Button
              type="primary"
              size="small"
              icon={<Pencil size={13} />}
              onClick={() => {
                const id = detailService.id;
                closeDrawer();
                goEdit(id);
              }}
            >
              Edit service
            </Button>
          )
        }
      >
        {detailService && (
          <div>
            <DrawerSection>
              <DrawerSectionTitle>Listing Status</DrawerSectionTitle>
              <div>
                <StatusIndicator $status={detailService.status}>
                  {detailService.status === 'PUBLISHED'
                    ? 'Live on marketplace'
                    : detailService.status.replace(/_/g, ' ')}
                </StatusIndicator>
              </div>
            </DrawerSection>

            {detailImages.length > 0 && (
              <DrawerSection>
                <DrawerSectionTitle>
                  Photos ({detailImages.length})
                </DrawerSectionTitle>
                <DrawerImageGrid>
                  {detailImages.map(img => (
                    <DrawerThumb key={img.id} src={img.image_url} alt="" />
                  ))}
                </DrawerImageGrid>
              </DrawerSection>
            )}

            <DrawerSection>
              <DrawerSectionTitle>Pricing & Commission</DrawerSectionTitle>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  fontSize: '0.875rem',
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ color: '#64748b' }}>Your service price:</span>
                  <strong>
                    ₹
                    {Number(detailService.starting_price).toLocaleString(
                      'en-IN',
                    )}
                  </strong>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ color: '#64748b' }}>
                    Platform commission (3%):
                  </span>
                  <span>
                    + ₹
                    {Number(
                      detailService.commission_amount ??
                        Math.round(Number(detailService.starting_price) * 0.03),
                    ).toLocaleString('en-IN')}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '0.35rem',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Customer pays:</span>
                  <strong style={{ color: '#16a34a' }}>
                    ₹
                    {Number(
                      detailService.customer_price ??
                        detailService.starting_price,
                    ).toLocaleString('en-IN')}
                  </strong>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ color: '#64748b' }}>
                    Advance payment (20%):
                  </span>
                  <span>
                    ₹
                    {Math.round(
                      Number(
                        detailService.customer_price ??
                          detailService.starting_price,
                      ) * 0.2,
                    ).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </DrawerSection>

            <DrawerSection>
              <DrawerSectionTitle>Description</DrawerSectionTitle>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: '#334155',
                  whiteSpace: 'pre-line',
                }}
              >
                {detailService.description || 'No description provided.'}
              </p>
            </DrawerSection>

            <DrawerSection>
              <DrawerSectionTitle>What's Included</DrawerSectionTitle>
              {detailService.whats_included &&
              detailService.whats_included.length > 0 ? (
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '1.25rem',
                    fontSize: '0.875rem',
                    color: '#334155',
                  }}
                >
                  {detailService.whats_included.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  None specified
                </span>
              )}
            </DrawerSection>

            <DrawerSection>
              <DrawerSectionTitle>Policies</DrawerSectionTitle>
              {detailService.cancellation_policy &&
              detailService.cancellation_policy.length > 0 ? (
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '1.25rem',
                    fontSize: '0.875rem',
                    color: '#334155',
                  }}
                >
                  {detailService.cancellation_policy.map((p, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>
                      {p}
                    </li>
                  ))}
                </ul>
              ) : (
                <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  Standard platform policy
                </span>
              )}
            </DrawerSection>
          </div>
        )}
      </Drawer>
    </Page>
  );
}
