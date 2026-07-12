import { useAuth } from '@/hooks/auth/use-auth';
export function useVendorProfile() {
  const { session } = useAuth();
  return { user: session?.user };
}
