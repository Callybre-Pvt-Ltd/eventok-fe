import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { vendorService } from '@/services';
import type { VendorPrivate } from '@/types';

export function useAdminApprovals() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ['admin-vendors'],
    queryFn: () => vendorService.getAdminVendors(),
  });
  const pending = (query.data?.data ?? []).filter(
    v => v.status === 'pending' || v.status === 'under_review',
  );

  const [reviewTarget, setReviewTarget] = useState<VendorPrivate | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejecting, setRejecting] = useState(false);

  const kycQuery = useQuery({
    queryKey: ['admin-vendor-kyc', reviewTarget?.id],
    queryFn: () => vendorService.getVendorKyc(reviewTarget!.id),
    enabled: !!reviewTarget,
  });

  const docsQuery = useQuery({
    queryKey: ['admin-vendor-docs', reviewTarget?.id],
    queryFn: () => vendorService.listVerifications(reviewTarget!.id),
    enabled: !!reviewTarget,
  });

  const openReview = (vendor: VendorPrivate) => {
    setReviewTarget(vendor);
    setRejecting(false);
    setRejectReason('');
  };

  const closeReview = () => {
    setReviewTarget(null);
    setRejecting(false);
    setRejectReason('');
  };

  const approve = async (id: string) => {
    const res = await vendorService.approveVendor(id);
    if (res.error) {
      message.error(res.error);
      return;
    }
    message.success('Vendor approved');
    qc.invalidateQueries({ queryKey: ['admin-vendors'] });
    closeReview();
  };

  const confirmReject = async () => {
    if (!reviewTarget || !rejectReason.trim()) return;
    const res = await vendorService.rejectVendor(
      reviewTarget.id,
      rejectReason.trim(),
    );
    if (res.error) {
      message.error(res.error);
      return;
    }
    message.success('Vendor rejected');
    qc.invalidateQueries({ queryKey: ['admin-vendors'] });
    closeReview();
  };

  return {
    pending,
    isLoading: query.isLoading,
    approve,
    reviewTarget,
    openReview,
    closeReview,
    kyc: kycQuery.data?.data,
    kycLoading: kycQuery.isLoading,
    documents: docsQuery.data?.data ?? [],
    documentsLoading: docsQuery.isLoading,
    rejecting,
    setRejecting,
    rejectReason,
    setRejectReason,
    confirmReject,
  };
}
