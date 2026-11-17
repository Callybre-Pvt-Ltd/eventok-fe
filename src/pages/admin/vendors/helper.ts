import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { vendorService } from '@/services';
import type { VendorPrivate } from '@/types';

export type VendorStatusFilter = 'all' | 'approved' | 'pending' | 'rejected';
export type VendorSortOption =
  | 'name_asc'
  | 'name_desc'
  | 'rating_desc'
  | 'experience_desc'
  | 'newest';

export function useAdminVendors() {
  const qc = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize status filter from URL if provided (e.g. ?status=pending)
  const initialStatus = (searchParams.get('status') as VendorStatusFilter) || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilterState] = useState<VendorStatusFilter>(
    ['all', 'approved', 'pending', 'rejected'].includes(initialStatus)
      ? initialStatus
      : 'all',
  );
  const [sortBy, setSortBy] = useState<VendorSortOption>('name_asc');

  const setStatusFilter = (filter: VendorStatusFilter) => {
    setStatusFilterState(filter);
    const newParams = new URLSearchParams(searchParams);
    if (filter === 'all') {
      newParams.delete('status');
    } else {
      newParams.set('status', filter);
    }
    setSearchParams(newParams, { replace: true });
  };

  const query = useQuery({
    queryKey: ['admin-vendors'],
    queryFn: () => vendorService.getAdminVendors(),
  });

  const rawVendors: VendorPrivate[] = query.data?.data ?? [];

  // Counts for pills
  const allCount = rawVendors.length;
  const approvedCount = rawVendors.filter(v => v.status === 'approved').length;
  const pendingCount = rawVendors.filter(
    v => v.status === 'pending' || v.status === 'under_review',
  ).length;

  // Filtered and Sorted Vendors
  const vendors = useMemo(() => {
    let result = [...rawVendors];

    // Status filter
    if (statusFilter === 'approved') {
      result = result.filter(v => v.status === 'approved');
    } else if (statusFilter === 'pending') {
      result = result.filter(
        v => v.status === 'pending' || v.status === 'under_review',
      );
    } else if (statusFilter === 'rejected') {
      result = result.filter(v => v.status === 'rejected');
    }

    // Search query
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter(v => {
        const nameMatch = v.businessName?.toLowerCase().includes(term);
        const ownerMatch = v.ownerName?.toLowerCase().includes(term);
        const cityMatch = v.city?.toLowerCase().includes(term);
        const phoneMatch =
          v.phone?.includes(term) || v.mobileNumber?.includes(term);
        const emailMatch = v.email?.toLowerCase().includes(term);
        return nameMatch || ownerMatch || cityMatch || phoneMatch || emailMatch;
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name_asc':
          return (a.businessName || '').localeCompare(b.businessName || '');
        case 'name_desc':
          return (b.businessName || '').localeCompare(a.businessName || '');
        case 'rating_desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'experience_desc':
          return (b.experience || 0) - (a.experience || 0);
        case 'newest':
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        default:
          return 0;
      }
    });

    return result;
  }, [rawVendors, statusFilter, searchTerm, sortBy]);

  // Review & Approval State
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
    message.success('Vendor approved successfully');
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
    vendors,
    rawVendors,
    isLoading: query.isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    allCount,
    approvedCount,
    pendingCount,
    reviewTarget,
    openReview,
    closeReview,
    approve,
    rejecting,
    setRejecting,
    rejectReason,
    setRejectReason,
    confirmReject,
    kyc: kycQuery.data?.data,
    kycLoading: kycQuery.isLoading,
    documents: docsQuery.data?.data ?? [],
    documentsLoading: docsQuery.isLoading,
  };
}
