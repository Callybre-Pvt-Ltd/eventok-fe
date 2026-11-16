import { Alert, Button, Modal, Select, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AlertTriangle, Info, Shield, ShieldAlert, UserMinus, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ErrorState } from '@/components/global/error-state';
import { LoadingState } from '@/components/global/loading-state';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { User } from '@/types';
import { useSuperAdmins } from './helper';
import {
  Card,
  ModalBody,
  ModalLabel,
  NoticeBanner,
  OptionLabel,
  PageHeader,
  PageLead,
  PageTitle,
  UserAvatar,
  UserCell,
  UserEmail,
  UserMeta,
  UserName,
} from './styled';

export default function AdminSuperAdminsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    superAdmins,
    isLoading,
    error,
    refetch,
    isCurrentSuperAdmin,
    currentUserId,
    isLastSuperAdmin,
    candidateUsers,
    isPromoteModalOpen,
    setIsPromoteModalOpen,
    selectedUserId,
    setSelectedUserId,
    demoteTarget,
    setDemoteTarget,
    handlePromoteConfirm,
    handleDemoteConfirm,
    isPromoting,
    isDemoting,
  } = useSuperAdmins();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={() => refetch()} />;

  const columns: ColumnsType<User> = [
    {
      title: 'Super Administrator',
      key: 'name',
      render: (_, record: User) => {
        const initial = (record.name || record.email || 'A')[0].toUpperCase();
        const isSelf = record.id === currentUserId;
        return (
          <UserCell>
            <UserAvatar>{initial}</UserAvatar>
            <UserMeta>
              <UserName>
                {record.name || 'Administrator'}
                {isSelf && (
                  <Tag color="cyan" style={{ marginLeft: 8, fontSize: 11 }}>
                    You
                  </Tag>
                )}
              </UserName>
              <UserEmail>{record.email}</UserEmail>
            </UserMeta>
          </UserCell>
        );
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => phone || '—',
    },
    {
      title: 'Role',
      key: 'role',
      render: () => (
        <Tag color="gold" icon={<Shield size={12} style={{ marginRight: 4 }} />}>
          SUPER ADMIN
        </Tag>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val: string) => (val ? new Date(val).toLocaleDateString() : '—'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: User) => {
        if (!isCurrentSuperAdmin) {
          return <span style={{ color: 'var(--color-text-secondary)' }}>View only</span>;
        }

        if (isLastSuperAdmin) {
          return (
            <Tooltip title={t('admin.lastSuperAdminWarning')}>
              <Button size="small" danger disabled icon={<UserMinus size={14} />}>
                {t('admin.demoteSuperAdmin')}
              </Button>
            </Tooltip>
          );
        }

        return (
          <Button
            size="small"
            danger
            icon={<UserMinus size={14} />}
            onClick={() => setDemoteTarget(record)}
          >
            {t('admin.demoteSuperAdmin')}
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle $palette={palette}>{t('admin.superAdminsTitle')}</PageTitle>
          <PageLead $palette={palette}>{t('admin.superAdminsDesc')}</PageLead>
        </div>
        {isCurrentSuperAdmin && (
          <Button
            type="primary"
            icon={<UserPlus size={16} />}
            onClick={() => {
              setSelectedUserId(null);
              setIsPromoteModalOpen(true);
            }}
          >
            {t('admin.promoteToSuperAdmin')}
          </Button>
        )}
      </PageHeader>

      {!isCurrentSuperAdmin && (
        <NoticeBanner $variant="info">
          <Info size={18} />
          <span>{t('admin.onlySuperAdminCanManage')}</span>
        </NoticeBanner>
      )}

      {isLastSuperAdmin && isCurrentSuperAdmin && (
        <NoticeBanner $variant="warning">
          <AlertTriangle size={18} />
          <span>
            {t('admin.lastSuperAdminWarning')} You may promote additional team members to share
            governance.
          </span>
        </NoticeBanner>
      )}

      <Card $palette={palette}>
        <Table
          dataSource={superAdmins}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>

      {/* Promote User to Super Admin Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={18} color="var(--color-primary)" />
            <span>{t('admin.promoteToSuperAdmin')}</span>
          </div>
        }
        open={isPromoteModalOpen}
        onOk={handlePromoteConfirm}
        confirmLoading={isPromoting}
        okText={t('admin.confirmPromote')}
        cancelText={t('admin.cancel')}
        okButtonProps={{ disabled: !selectedUserId }}
        onCancel={() => {
          setIsPromoteModalOpen(false);
          setSelectedUserId(null);
        }}
      >
        <ModalBody>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
            {t('admin.selectUserToPromote')}. Once promoted, this user will receive full Super
            Admin access to manage platform permissions and administrators.
          </p>

          <div>
            <ModalLabel>Candidate User</ModalLabel>
            <Select
              style={{ width: '100%' }}
              showSearch
              placeholder="Search by name or email…"
              value={selectedUserId}
              onChange={val => setSelectedUserId(val)}
              optionFilterProp="filterLabel"
              options={candidateUsers.map(user => ({
                value: user.id,
                filterLabel: `${user.name} ${user.email}`,
                label: (
                  <OptionLabel>
                    <span>
                      <strong>{user.name || 'User'}</strong> ({user.email})
                    </span>
                    <Tag
                      color={
                        user.role === 'admin'
                          ? 'purple'
                          : user.role === 'vendor'
                          ? 'gold'
                          : 'blue'
                      }
                      style={{ margin: 0, fontSize: 10 }}
                    >
                      {user.role.toUpperCase()}
                    </Tag>
                  </OptionLabel>
                ),
              }))}
            />
          </div>
        </ModalBody>
      </Modal>

      {/* Demote Super Admin Confirmation Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ef4444' }}>
            <ShieldAlert size={18} />
            <span>{t('admin.confirmDemote')}</span>
          </div>
        }
        open={Boolean(demoteTarget)}
        onOk={handleDemoteConfirm}
        confirmLoading={isDemoting}
        okText={t('admin.demoteSuperAdmin')}
        cancelText={t('admin.cancel')}
        okButtonProps={{ danger: true }}
        onCancel={() => setDemoteTarget(null)}
      >
        <ModalBody>
          <Alert
            type="warning"
            showIcon
            message="Demotion Confirmation"
            description={t('admin.demoteConfirmPrompt', {
              name: demoteTarget?.name || demoteTarget?.email || 'this user',
            })}
          />
          <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--color-text-secondary)' }}>
            The user will retain standard Admin privileges, but will no longer be able to manage
            Super Admins.
          </p>
        </ModalBody>
      </Modal>
    </>
  );
}
