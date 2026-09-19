import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { vendorService } from '@/services';

const DAYS = [
  { day: 0, label: 'Monday' },
  { day: 1, label: 'Tuesday' },
  { day: 2, label: 'Wednesday' },
  { day: 3, label: 'Thursday' },
  { day: 4, label: 'Friday' },
  { day: 5, label: 'Saturday' },
  { day: 6, label: 'Sunday' },
] as const;

const DEFAULT_START = '09:00:00';
const DEFAULT_END = '18:00:00';

export function useVendorAvailability() {
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

  const availabilityQuery = useQuery({
    queryKey: ['vendor', 'availability', serviceId],
    queryFn: async () => {
      const res = await vendorService.getAvailability(serviceId);
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
    enabled: Boolean(serviceId),
  });

  const [selectedDays, setSelectedDays] = useState<Set<number>>(new Set());

  useEffect(() => {
    const windows = availabilityQuery.data ?? [];
    const next = new Set<number>();
    for (const w of windows) {
      if (w.is_available) next.add(w.day_of_week);
    }
    setSelectedDays(next);
  }, [availabilityQuery.data]);

  const toggleDay = (day: number) => {
    setSelectedDays(prev => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!serviceId) throw new Error('Select a service first');
      const windows = DAYS.filter(d => selectedDays.has(d.day)).map(d => ({
        day_of_week: d.day,
        start_time: DEFAULT_START,
        end_time: DEFAULT_END,
        is_available: true,
      }));
      const res = await vendorService.setAvailability(serviceId, windows);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vendor', 'availability', serviceId],
      });
      message.success('Availability saved to server');
    },
    onError: (err: Error) => message.error(err.message),
  });

  const dayRows = useMemo(
    () =>
      DAYS.map(d => ({
        ...d,
        active: selectedDays.has(d.day),
      })),
    [selectedDays],
  );

  return {
    services,
    serviceId,
    setServiceId,
    dayRows,
    toggleDay,
    saveMutation,
    isLoading: servicesQuery.isLoading || availabilityQuery.isLoading,
  };
}
