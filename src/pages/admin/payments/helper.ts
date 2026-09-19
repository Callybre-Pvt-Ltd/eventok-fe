import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { paymentService } from '@/services';

export function useAdminPayments() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['all-payments'],
    queryFn: async () => {
      const res = await paymentService.getAllPayments();
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
  });

  const refundMutation = useMutation({
    mutationFn: async (paymentId: string) => {
      const res = await paymentService.refund(paymentId);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-payments'] });
      message.success('Refund submitted to backend');
    },
    onError: (err: Error) => message.error(err.message),
  });

  return {
    payments: query.data ?? [],
    isLoading: query.isLoading,
    refundMutation,
  };
}
