import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { vendorService } from '@/services';

export type PortfolioItem = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  url: string;
  caption: string;
};

export function useVendorPortfolio() {
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
    enabled: session?.user.role === 'vendor' && !vendorId,
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

  const services = servicesQuery.data ?? [];
  const [serviceId, setServiceId] = useState('');

  useEffect(() => {
    if (!serviceId && services[0]?.id) setServiceId(services[0].id);
  }, [services, serviceId]);

  const portfolioQuery = useQuery({
    queryKey: ['vendor', 'portfolio', resolvedVendorId, services.map(s => s.id).join(',')],
    queryFn: async () => {
      const items: PortfolioItem[] = [];
      for (const service of services) {
        const res = await vendorService.listServiceImages(service.id);
        if (res.error) continue;
        for (const img of res.data ?? []) {
          items.push({
            id: img.id,
            serviceId: service.id,
            serviceTitle: service.title,
            url: img.image_url,
            caption: service.title,
          });
        }
      }
      return items;
    },
    enabled: services.length > 0,
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!serviceId) throw new Error('Select a service to attach the photo');
      const res = await vendorService.uploadServiceImage(serviceId, file);
      if (res.error || !res.data) throw new Error(res.error ?? 'Upload failed');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['storefront'] });
      message.success('Photo saved to backend');
    },
    onError: (err: Error) => message.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (item: PortfolioItem) => {
      const res = await vendorService.deleteServiceImage(
        item.serviceId,
        item.id,
      );
      if (res.error) throw new Error(res.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['storefront'] });
      message.success('Photo removed');
    },
    onError: (err: Error) => message.error(err.message),
  });

  return {
    portfolio: portfolioQuery.data ?? [],
    services,
    serviceId,
    setServiceId,
    isLoading: servicesQuery.isLoading || portfolioQuery.isLoading,
    uploadMutation,
    deleteMutation,
  };
}
