import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services';
import type { User } from '@/types';

export function useAdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');

  const query = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await authService.listUsers();
      if (res.error) throw new Error(res.error);
      return (res.data ?? []) as User[];
    },
  });

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
    searchTerm,
    setSearchTerm,
  };
}
