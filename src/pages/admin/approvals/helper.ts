import { useQuery, useQueryClient } from '@tanstack/react-query';
import { vendorService } from '@/services';
export function useAdminApprovals() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ['admin-vendors'],
    queryFn: () => vendorService.getAdminVendors(),
  });
  const pending = (query.data?.data ?? []).filter(v => v.status === 'pending');
  const approve = async (id: string) => {
    await vendorService.approveVendor(id);
    qc.invalidateQueries({ queryKey: ['admin-vendors'] });
  };
  const reject = async (id: string) => {
    await vendorService.rejectVendor(id, '');
    qc.invalidateQueries({ queryKey: ['admin-vendors'] });
  };
  return { pending, isLoading: query.isLoading, approve, reject };
}
