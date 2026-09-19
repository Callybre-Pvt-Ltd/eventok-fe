import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { authService, vendorService } from '@/services';

export function useVendorProfile() {
  const { session, refreshSession } = useAuth();
  const queryClient = useQueryClient();

  const vendorQuery = useQuery({
    queryKey: ['vendor', 'me'],
    queryFn: async () => {
      const res = await vendorService.getMe();
      if (res.error || !res.data) throw new Error(res.error ?? 'No vendor');
      return res.data;
    },
    enabled: session?.user.role === 'vendor',
  });

  const vendor = vendorQuery.data;
  const user = session?.user;

  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('0');

  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.city) setCity(user.city);
  }, [user?.name, user?.city]);

  useEffect(() => {
    if (!vendor) return;
    setBusinessName(vendor.businessName || '');
    setCity(vendor.city || user?.city || '');
    setAddress(vendor.address || '');
    setDescription(vendor.description || '');
    setExperience(String(vendor.experience ?? 0));
  }, [vendor, user?.city]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!vendor?.id) throw new Error('Vendor profile not loaded');
      const nameRes = await authService.updateMe({
        full_name: name.trim() || undefined,
      });
      if (nameRes.error) throw new Error(nameRes.error);

      const vendorRes = await vendorService.updateVendor(vendor.id, {
        business_name: businessName.trim() || undefined,
        city: city.trim() || undefined,
        state: state.trim() || undefined,
        address: address.trim() || undefined,
        description: description.trim() || undefined,
        experience_years: Number(experience) || 0,
      });
      if (vendorRes.error || !vendorRes.data) {
        throw new Error(vendorRes.error ?? 'Failed to save vendor profile');
      }
      return vendorRes.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'me'] });
      await refreshSession();
      message.success('Profile saved to server');
    },
    onError: (err: Error) => message.error(err.message),
  });

  const uploadDoc = useMutation({
    mutationFn: async ({
      documentType,
      file,
    }: {
      documentType: 'ID_PROOF' | 'GST_CERTIFICATE';
      file: File;
    }) => {
      if (!vendor?.id) throw new Error('Vendor profile not loaded');
      const res = await vendorService.submitVerification(
        vendor.id,
        documentType,
        file,
      );
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => message.success('Document uploaded for verification'),
    onError: (err: Error) => message.error(err.message),
  });

  return {
    user,
    vendor,
    isLoading: vendorQuery.isLoading,
    form: {
      name,
      setName,
      businessName,
      setBusinessName,
      city,
      setCity,
      state,
      setState,
      address,
      setAddress,
      description,
      setDescription,
      experience,
      setExperience,
    },
    saveMutation,
    uploadDoc,
  };
}
