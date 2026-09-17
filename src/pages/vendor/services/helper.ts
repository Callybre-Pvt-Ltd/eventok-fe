import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { categoryService, vendorService } from '@/services';

export function useVendorServices() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const vendorId = session?.user.vendorId;

  const meQuery = useQuery({
    queryKey: ['vendor', 'me'],
    queryFn: async () => {
      const res = await vendorService.getMe();
      if (res.error || !res.data) throw new Error(res.error ?? 'No vendor');
      return res.data;
    },
    enabled: Boolean(session?.user.role === 'vendor'),
  });

  const resolvedVendorId = vendorId ?? meQuery.data?.id;

  const servicesQuery = useQuery({
    queryKey: ['vendor', 'services', resolvedVendorId],
    queryFn: async () => {
      const res = await vendorService.listMyServices(resolvedVendorId!);
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
    enabled: Boolean(resolvedVendorId),
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await categoryService.getAll();
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: {
      category_id: string;
      title: string;
      description?: string;
      starting_price: number;
    }) => {
      const res = await vendorService.createService(resolvedVendorId!, values);
      if (res.error || !res.data) throw new Error(res.error ?? 'Create failed');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'services'] });
      message.success('Service created');
    },
    onError: (err: Error) => message.error(err.message),
  });

  const publishMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const res = await vendorService.updateService(serviceId, {
        status: 'PUBLISHED',
      });
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'services'] });
      message.success('Service published');
    },
    onError: (err: Error) => message.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const res = await vendorService.deleteService(serviceId);
      if (res.error) throw new Error(res.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'services'] });
      message.success('Service deleted');
    },
    onError: (err: Error) => message.error(err.message),
  });

  const uploadMutation = useMutation({
    mutationFn: async ({
      serviceId,
      file,
    }: {
      serviceId: string;
      file: File;
    }) => {
      const res = await vendorService.uploadServiceImage(serviceId, file);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => message.success('Image uploaded'),
    onError: (err: Error) => message.error(err.message),
  });

  return {
    services: servicesQuery.data ?? [],
    categories: categoriesQuery.data ?? [],
    isLoading: servicesQuery.isLoading || meQuery.isLoading,
    createMutation,
    publishMutation,
    deleteMutation,
    uploadMutation,
    vendorId: resolvedVendorId,
  };
}
