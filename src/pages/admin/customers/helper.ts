import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Modal, message } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { authService } from '@/services';
import type { User, UserRole } from '@/types';

export type RoleFilter = 'ALL' | UserRole;

export function useAdminCustomers() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL');

  const isSuperAdmin = session?.user?.role === 'super_admin';
  const currentUserId = session?.user?.id;

  const query = useQuery({
    queryKey: ['admin-users', roleFilter],
    queryFn: async () => {
      const res = await authService.listUsers(
        roleFilter !== 'ALL' ? roleFilter : undefined,
      );
      if (res.error) throw new Error(res.error);
      return (res.data ?? []) as User[];
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: string;
      role: UserRole;
    }) => {
      const res = await authService.updateUserRole(userId, role);
      if (res.error || !res.data) {
        throw new Error(res.error ?? 'Failed to update user role');
      }
      return res.data;
    },
    onSuccess: (updatedUser) => {
      message.success(
        `Role for ${updatedUser.name || updatedUser.email} updated to ${updatedUser.role.replace('_', ' ').toUpperCase()}`,
      );
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (err: Error) => {
      message.error(err.message || 'Failed to update user role');
    },
  });

  const handleRoleChange = (targetUser: User, newRole: UserRole) => {
    if (targetUser.role === newRole) return;

    const isPromotingToSuperAdmin = newRole === 'super_admin';
    const isDemotingFromSuperAdmin = targetUser.role === 'super_admin';
    const targetName = targetUser.name || targetUser.email || 'this user';

    let title = 'Change User Role';
    let content = `Are you sure you want to change the role of ${targetName} to ${newRole.replace('_', ' ').toUpperCase()}?`;

    if (isPromotingToSuperAdmin) {
      title = 'Promote to Super Administrator';
      content = `Are you sure you want to promote ${targetName} to Super Admin? This user will receive full administrative access across EventOK.`;
    } else if (isDemotingFromSuperAdmin) {
      title = 'Revoke Super Administrator Privileges';
      content = `Are you sure you want to revoke Super Admin privileges from ${targetName}?`;
    }

    Modal.confirm({
      title,
      content,
      okText: 'Confirm Change',
      cancelText: 'Cancel',
      okType: isPromotingToSuperAdmin || isDemotingFromSuperAdmin ? 'danger' : 'primary',
      onOk: async () => {
        await updateRoleMutation.mutateAsync({
          userId: targetUser.id,
          role: newRole,
        });
      },
    });
  };

  const rawUsers = query.data ?? [];

  const customers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return rawUsers;
    return rawUsers.filter(u => {
      const name = (u.name || '').toLowerCase();
      const email = (u.email || '').toLowerCase();
      const phone = (u.phone || '').toLowerCase();
      const city = (u.city || '').toLowerCase();
      return (
        name.includes(term) ||
        email.includes(term) ||
        phone.includes(term) ||
        city.includes(term)
      );
    });
  }, [rawUsers, searchTerm]);

  return {
    customers,
    rawCount: rawUsers.length,
    isLoading: query.isLoading,
    isUpdatingRole: updateRoleMutation.isPending,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    isSuperAdmin,
    currentUserId,
    handleRoleChange,
    refetch: query.refetch,
  };
}
