import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { authService } from '@/services';
import type { User } from '@/types';

export function useSuperAdmins() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session, refreshSession } = useAuth();

  const isCurrentSuperAdmin = session?.user?.role === 'super_admin';
  const currentUserId = session?.user?.id;

  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [demoteTarget, setDemoteTarget] = useState<User | null>(null);

  const superAdminsQuery = useQuery({
    queryKey: ['admin-super-admins'],
    queryFn: async () => {
      const res = await authService.listSuperAdmins();
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
  });

  const allUsersQuery = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await authService.listUsers();
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-super-admins'] });
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  };

  const promoteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await authService.promoteToSuperAdmin(userId);
      if (res.error || !res.data) {
        throw new Error(res.error ?? 'Failed to promote user');
      }
      return res.data;
    },
    onSuccess: () => {
      message.success(t('admin.promoteSuccess'));
      invalidate();
      setIsPromoteModalOpen(false);
      setSelectedUserId(null);
    },
    onError: (err: Error) => {
      message.error(err.message);
    },
  });

  const demoteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await authService.demoteSuperAdmin(userId);
      if (res.error || !res.data) {
        throw new Error(res.error ?? 'Failed to demote super admin');
      }
      return res.data;
    },
    onSuccess: async (_, demotedUserId) => {
      message.success(t('admin.demoteSuccess'));
      invalidate();
      setDemoteTarget(null);
      if (demotedUserId === currentUserId) {
        await refreshSession();
        navigate(ROUTES.ADMIN_DASHBOARD);
      }
    },
    onError: (err: Error) => {
      message.error(err.message);
    },
  });

  const superAdmins = useMemo(() => superAdminsQuery.data ?? [], [superAdminsQuery.data]);
  const allUsers = useMemo(() => allUsersQuery.data ?? [], [allUsersQuery.data]);

  const superAdminIds = useMemo(
    () => new Set(superAdmins.map(u => u.id)),
    [superAdmins],
  );

  const candidateUsers = useMemo(
    () => allUsers.filter(u => !superAdminIds.has(u.id) && u.role !== 'super_admin'),
    [allUsers, superAdminIds],
  );

  const isLastSuperAdmin = superAdmins.length <= 1;

  const handlePromoteConfirm = () => {
    if (!selectedUserId) return;
    promoteMutation.mutate(selectedUserId);
  };

  const handleDemoteConfirm = () => {
    if (!demoteTarget) return;
    demoteMutation.mutate(demoteTarget.id);
  };

  return {
    superAdmins,
    isLoading: superAdminsQuery.isLoading || allUsersQuery.isLoading,
    error: superAdminsQuery.error ? (superAdminsQuery.error as Error).message : null,
    refetch: () => {
      superAdminsQuery.refetch();
      allUsersQuery.refetch();
    },
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
    isPromoting: promoteMutation.isPending,
    isDemoting: demoteMutation.isPending,
  };
}
