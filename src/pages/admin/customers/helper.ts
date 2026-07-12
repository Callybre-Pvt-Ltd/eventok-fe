import { authService } from '@/services';
export function useAdminCustomers() {
  return {
    customers: authService.getUsers().filter(u => u.role === 'customer'),
  };
}
