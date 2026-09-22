import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { categoryService, vendorService } from '@/services';
import { DECORATION_CATEGORIES } from '@/constants/decorationCategories';
import { MAX_SERVICE_IMAGES } from '@/constants/servicePresets';

export type UpdateServiceInput = {
  serviceId: string;
  category_id: string;
  title: string;
  description?: string;
  starting_price: number;
  city: string;
  state: string;
  whats_included: string[];
  good_to_know: string[];
  cancellation_policy: string[];
  images: File[];
};

export type CreateServiceInput = {
  category_id: string;
  title: string;
  description?: string;
  starting_price: number;
  city: string;
  state: string;
  whats_included: string[];
  good_to_know: string[];
  cancellation_policy: string[];
  images: File[];
};

function buildDescription(values: CreateServiceInput) {
  const base = values.description?.trim() ?? '';
  const area = `Service area: ${values.city}, ${values.state}, India`;
  return base ? `${base}\n\n${area}` : area;
}

export function useVendorServices() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const vendorId = session?.user.vendorId;
  const isAdmin = session?.user.role === 'admin';

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
    queryKey: ['categories', 'decoration'],
    queryFn: async () => {
      if (isAdmin) {
        await categoryService.ensureDecorationCategories();
      }
      const res = await categoryService.getAll();
      if (res.error) throw new Error(res.error);
      const live = (res.data ?? []).filter(c => c.id);
      if (live.length) return live;
      return DECORATION_CATEGORIES.map(c => ({
        id: '',
        name: c.name,
        slug: c.slug,
        icon: c.icon,
        description: c.blurb,
      }));
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: CreateServiceInput) => {
      if (!values.category_id) {
        throw new Error(
          'Categories are not loaded from the server yet. Ask admin to open Categories once, or run seed-demo.',
        );
      }
      if (!values.images.length) {
        throw new Error('Add at least one real photo of this setup.');
      }
      if (values.images.length > MAX_SERVICE_IMAGES) {
        throw new Error(`You can upload at most ${MAX_SERVICE_IMAGES} images.`);
      }

      const res = await vendorService.createService(resolvedVendorId!, {
        category_id: values.category_id,
        title: values.title,
        description: buildDescription(values),
        starting_price: values.starting_price,
        whats_included: values.whats_included,
        good_to_know: values.good_to_know,
        cancellation_policy: values.cancellation_policy,
      });
      if (res.error || !res.data) throw new Error(res.error ?? 'Create failed');

      await vendorService.updateVendor(resolvedVendorId!, {
        city: values.city,
        state: values.state,
      });

      for (const file of values.images) {
        const uploaded = await vendorService.uploadServiceImage(
          res.data.id,
          file,
        );
        if (uploaded.error) {
          throw new Error(
            uploaded.error ??
              'Service created but an image failed to upload — retry from the card.',
          );
        }
      }

      const published = await vendorService.updateService(res.data.id, {
        status: 'PUBLISHED',
      });
      if (published.error || !published.data) {
        throw new Error(
          published.error ??
            'Service created but publish failed — use Publish on the card.',
        );
      }
      return published.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'services'] });
      queryClient.invalidateQueries({ queryKey: ['vendor', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['vendor', 'portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['storefront'] });
      message.success('Service live with your photos — customers can book it');
    },
    onError: (err: Error) => message.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: async (values: UpdateServiceInput) => {
      if (!values.category_id) {
        throw new Error('Pick a category before saving.');
      }
      const res = await vendorService.updateService(values.serviceId, {
        category_id: values.category_id,
        title: values.title,
        description: buildDescription(values),
        starting_price: values.starting_price,
        whats_included: values.whats_included,
        good_to_know: values.good_to_know,
        cancellation_policy: values.cancellation_policy,
      });
      if (res.error || !res.data) throw new Error(res.error ?? 'Update failed');

      await vendorService.updateVendor(resolvedVendorId!, {
        city: values.city,
        state: values.state,
      });

      // Images are additive on edit: existing photos stay, new ones are appended.
      for (const file of values.images.slice(0, MAX_SERVICE_IMAGES)) {
        const uploaded = await vendorService.uploadServiceImage(
          values.serviceId,
          file,
        );
        if (uploaded.error) {
          throw new Error(
            uploaded.error ??
              'Service saved but an image failed to upload — retry from the card.',
          );
        }
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'services'] });
      queryClient.invalidateQueries({ queryKey: ['vendor', 'portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['storefront'] });
      message.success('Service updated');
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
      queryClient.invalidateQueries({ queryKey: ['storefront'] });
      message.success('Service published — customers can book it');
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
      message.success('Service removed');
    },
    onError: (err: Error) => message.error(err.message),
  });

  const uploadMutation = useMutation({
    mutationFn: async ({
      serviceId,
      files,
    }: {
      serviceId: string;
      files: File[];
    }) => {
      if (!files.length) throw new Error('Choose at least one image');
      for (const file of files.slice(0, MAX_SERVICE_IMAGES)) {
        const res = await vendorService.uploadServiceImage(serviceId, file);
        if (res.error) throw new Error(res.error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'services'] });
      queryClient.invalidateQueries({ queryKey: ['vendor', 'portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['storefront'] });
      message.success('Images uploaded');
    },
    onError: (err: Error) => message.error(err.message),
  });

  const categoriesReady = (categoriesQuery.data ?? []).some(c => c.id);

  return {
    services: servicesQuery.data ?? [],
    categories: categoriesQuery.data ?? [],
    categoriesReady,
    isLoading: servicesQuery.isLoading || meQuery.isLoading,
    createMutation,
    updateMutation,
    publishMutation,
    deleteMutation,
    uploadMutation,
    vendorId: resolvedVendorId,
    vendorCity: meQuery.data?.city ?? session?.user.city ?? '',
  };
}
