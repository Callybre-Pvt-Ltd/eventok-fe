import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { vendorService } from '@/services';

export function useServiceAddons(serviceId: string) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['service-addons', serviceId],
    queryFn: () => vendorService.listServiceAddons(serviceId),
    enabled: !!serviceId,
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['service-addons', serviceId] });

  const createMutation = useMutation({
    mutationFn: () =>
      vendorService.createServiceAddon(serviceId, {
        name: name.trim(),
        description: description.trim() || undefined,
        price: Number(price),
      }),
    onSuccess: res => {
      if (res.error) {
        message.error(res.error);
        return;
      }
      message.success('Add-on added');
      setName('');
      setDescription('');
      setPrice('');
      invalidate();
    },
    onError: (err: Error) => message.error(err.message),
  });

  const toggleMutation = useMutation({
    mutationFn: ({
      addonId,
      isActive,
    }: {
      addonId: string;
      isActive: boolean;
    }) =>
      vendorService.updateServiceAddon(serviceId, addonId, {
        is_active: isActive,
      }),
    onSuccess: res => {
      if (res.error) {
        message.error(res.error);
        return;
      }
      invalidate();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (addonId: string) =>
      vendorService.deleteServiceAddon(serviceId, addonId),
    onSuccess: res => {
      if (res.error) {
        message.error(res.error);
        return;
      }
      message.success('Add-on removed');
      invalidate();
    },
  });

  const canSubmit = name.trim().length > 0 && Number(price) > 0;

  return {
    addons: query.data?.data ?? [],
    isLoading: query.isLoading,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    createMutation,
    toggleMutation,
    deleteMutation,
    canSubmit,
  };
}
