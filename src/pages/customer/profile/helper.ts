import { useAuth } from '@/hooks/auth/use-auth';
export function useCustomerProfile() {
  const { session } = useAuth();
  return { user: session?.user };
}
