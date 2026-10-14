import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { vendorService } from '@/services';

export function useVendorPackages() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const userId = session?.user.id ?? '';

  const vendorQuery = useQuery({
    queryKey: ['vendor-profile', userId],
    queryFn: () => vendorService.getVendorByUserId(userId),
    enabled: !!userId,
  });
  const vendorId = vendorQuery.data?.data?.id ?? '';

  const packagesQuery = useQuery({
    queryKey: ['vendor-packages', vendorId],
    queryFn: () => vendorService.listPackages(vendorId),
    enabled: !!vendorId,
  });

  const servicesQuery = useQuery({
    queryKey: ['vendor-services', vendorId],
    queryFn: () => vendorService.listMyServices(vendorId),
    enabled: !!vendorId,
  });

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [serviceIds, setServiceIds] = useState<string[]>([]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setServiceIds([]);
  };

  const invalidatePackages = () => {
    queryClient.invalidateQueries({ queryKey: ['vendor-packages', vendorId] });
    queryClient.invalidateQueries({ queryKey: ['storefront', 'packages'] });
  };

  const createMutation = useMutation({
    mutationFn: () =>
      vendorService.createPackage(vendorId, {
        name: name.trim(),
        description: description.trim() || undefined,
        price: Number(price),
        service_ids: serviceIds,
      }),
    onSuccess: res => {
      if (res.error) {
        message.error(res.error);
        return;
      }
      message.success('Package created and live on the storefront');
      resetForm();
      setOpen(false);
      invalidatePackages();
    },
  });

  /** Vendors control whether a bundle is listed publicly; the storefront only shows
   *  active packages, so flipping this is what takes it on or off the site. */
  const toggleActiveMutation = useMutation({
    mutationFn: async (pkg: { id: string; is_active: boolean }) => {
      const res = await vendorService.updatePackage(vendorId, pkg.id, {
        is_active: !pkg.is_active,
      });
      if (res.error) throw new Error(res.error);
      return !pkg.is_active;
    },
    onSuccess: isActive => {
      message.success(
        isActive ? 'Package is live on the storefront' : 'Package hidden',
      );
      invalidatePackages();
    },
    onError: (error: Error) => message.error(error.message),
  });

  const publishedServices = (servicesQuery.data?.data ?? []).filter(
    s => s.status === 'PUBLISHED',
  );

  const canSubmit =
    name.trim().length > 0 && Number(price) > 0 && serviceIds.length > 0;

  const ESTIMATED_COMMISSION_PERCENT = 3;
  const preview = useMemo(() => {
    const individualTotal = publishedServices
      .filter(s => serviceIds.includes(s.id))
      .reduce((sum, s) => sum + Number(s.starting_price), 0);
    const packagePrice = Number(price) || 0;
    const savings = individualTotal - packagePrice;
    const commission = Math.round(
      (packagePrice * ESTIMATED_COMMISSION_PERCENT) / 100,
    );
    const customerPrice = packagePrice + commission;
    return { individualTotal, savings, commission, customerPrice };
  }, [publishedServices, serviceIds, price]);

  return {
    packages: packagesQuery.data?.data ?? [],
    isLoading: packagesQuery.isLoading || vendorQuery.isLoading,
    publishedServices,
    open,
    setOpen,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    serviceIds,
    setServiceIds,
    createMutation,
    toggleActiveMutation,
    canSubmit,
    preview,
  };
}
