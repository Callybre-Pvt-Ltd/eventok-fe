import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAuth } from '@/hooks/auth/use-auth';
import { categoryService, vendorService } from '@/services';
import type { VendorApiService as ApiService } from '@/services/vendorService';
import { ROUTES } from '@/constants/routes';
import type { Category } from '@/types';
import { MAX_SERVICE_IMAGES } from '@/constants/servicePresets';

export const STEP_LABELS = [
  'Basics',
  'Pricing',
  "What's included",
  'Add-ons',
  'Service area',
  'Photos',
  'Policies',
  'Review',
] as const;

export const TOTAL_STEPS = STEP_LABELS.length;

const ESTIMATED_COMMISSION_PERCENT = 3;
const ESTIMATED_ADVANCE_PERCENT = 20;

export interface ServiceImage {
  id: string;
  image_url: string;
  display_order: number;
}

export function useServiceWizard() {
  const { serviceId: routeServiceId } = useParams<{ serviceId?: string }>();
  const navigate = useNavigate();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const vendorId = session?.user.vendorId ?? '';
  const isEditing = !!routeServiceId;

  const [step, setStep] = useState(1);
  const [maxUnlocked, setMaxUnlocked] = useState(1);
  const [serviceId, setServiceId] = useState<string | null>(
    routeServiceId ?? null,
  );
  const [liveService, setLiveService] = useState<ApiService | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [publishedJustNow, setPublishedJustNow] = useState(false);
  const [draftSavedJustNow, setDraftSavedJustNow] = useState(false);

  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [whatsIncluded, setWhatsIncluded] = useState<string[]>([]);
  const [goodToKnow, setGoodToKnow] = useState<string[]>([]);
  const [cancellationPolicy, setCancellationPolicy] = useState<string[]>([]);
  const [cancelWindow, setCancelWindow] = useState('48 hours');
  const [refundType, setRefundType] = useState('100% full refund');

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoryService.getAll().then(res => setCategories(res.data ?? []));
  }, []);

  // Load existing service if editing
  useEffect(() => {
    if (!routeServiceId) {
      // Check local draft
      try {
        const saved = localStorage.getItem(`eventok_draft_${vendorId}`);
        if (saved) {
          const draft = JSON.parse(saved);
          if (draft.title && !title) {
            setTitle(draft.title || '');
            setCategoryId(draft.categoryId || '');
            setDescription(draft.description || '');
            setPrice(draft.price || '');
            setWhatsIncluded(draft.whatsIncluded || []);
            setGoodToKnow(draft.goodToKnow || []);
            setCancellationPolicy(draft.cancellationPolicy || []);
            if (draft.cancelWindow) setCancelWindow(draft.cancelWindow);
            if (draft.serviceId) setServiceId(draft.serviceId);
            setDraftSavedJustNow(true);
          }
        }
      } catch {
        // ignore parse error
      }
      return;
    }

    vendorService.getService(routeServiceId).then(res => {
      if (res.error || !res.data) {
        setLoadingInitial(false);
        message.error(res.error ?? 'Could not load this service');
        navigate(ROUTES.VENDOR_SERVICES);
        return;
      }
      const s = res.data;
      setLiveService(s);
      setCategoryId(s.category_id);
      setTitle(s.title);
      setDescription(s.description ?? '');
      setPrice(String(s.starting_price));
      setWhatsIncluded(s.whats_included ?? []);
      setGoodToKnow(s.good_to_know ?? []);
      setCancellationPolicy(s.cancellation_policy ?? []);
      setMaxUnlocked(TOTAL_STEPS);
      setLoadingInitial(false);
    });
  }, [routeServiceId, navigate, vendorId]);

  // Persist draft to local storage on key changes
  useEffect(() => {
    if (isEditing) return;
    if (!title && !price && !categoryId) return;
    try {
      localStorage.setItem(
        `eventok_draft_${vendorId}`,
        JSON.stringify({
          serviceId,
          categoryId,
          title,
          description,
          price,
          whatsIncluded,
          goodToKnow,
          cancellationPolicy,
          cancelWindow,
          updatedAt: new Date().toISOString(),
        }),
      );
    } catch {
      // ignore
    }
  }, [
    isEditing,
    vendorId,
    serviceId,
    categoryId,
    title,
    description,
    price,
    whatsIncluded,
    goodToKnow,
    cancellationPolicy,
    cancelWindow,
  ]);

  const canSubmitBasics =
    categoryId.trim().length > 0 && title.trim().length > 0;
  const canSubmitPricing = Number(price) > 0;

  const pricePreview = useMemo(() => {
    const base = Number(price) || 0;
    const commission = Math.round((base * ESTIMATED_COMMISSION_PERCENT) / 100);
    const customerTotal = base + commission;
    const advance = Math.round(
      (customerTotal * ESTIMATED_ADVANCE_PERCENT) / 100,
    );
    return {
      base,
      commission,
      customerTotal,
      advance,
      remaining: customerTotal - advance,
    };
  }, [price]);

  const authoritativePricing = liveService
    ? {
        base: Number(liveService.starting_price),
        commission: Number(liveService.commission_amount ?? 0),
        customerTotal: Number(
          liveService.customer_price ?? liveService.starting_price,
        ),
      }
    : null;

  const unlock = (next: number) => setMaxUnlocked(m => Math.max(m, next));

  const createDraft = async (): Promise<boolean> => {
    if (!vendorId) return false;
    setSaving(true);
    const res = await vendorService.createService(vendorId, {
      category_id: categoryId,
      title: title.trim(),
      description: description.trim() || undefined,
      starting_price: Number(price),
    });
    setSaving(false);
    if (res.error || !res.data) {
      message.error(res.error ?? 'Could not create service');
      return false;
    }
    setServiceId(res.data.id);
    setLiveService(res.data);
    queryClient.invalidateQueries({ queryKey: ['vendor', 'services'] });
    setDraftSavedJustNow(true);
    return true;
  };

  const patchDraft = async (
    payload: Partial<{
      title: string;
      description: string;
      starting_price: number;
      category_id: string;
      whats_included: string[];
      good_to_know: string[];
      cancellation_policy: string[];
      status: string;
    }>,
  ): Promise<boolean> => {
    if (!serviceId) return true;
    // The API rejects explicit nulls, so only send the fields that actually have a value.
    const body = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined),
    );
    setSaving(true);
    const res = await vendorService.updateService(serviceId, body);
    setSaving(false);
    if (res.error || !res.data) {
      message.error(res.error ?? 'Could not save changes');
      return false;
    }
    setLiveService(res.data);
    setDraftSavedJustNow(true);
    return true;
  };

  const goNext = async () => {
    if (step === 1) {
      if (!canSubmitBasics) {
        message.error('Pick a category and give your service a name');
        return;
      }
      if (serviceId) {
        const ok = await patchDraft({
          category_id: categoryId,
          title: title.trim(),
          description: description.trim() || undefined,
        });
        if (!ok) return;
      }
      unlock(2);
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!canSubmitPricing) {
        message.error('Enter a service price greater than zero');
        return;
      }
      const ok = serviceId
        ? await patchDraft({ starting_price: Number(price) })
        : await createDraft();
      if (!ok) return;
      unlock(3);
      setStep(3);
      return;
    }
    if (step === 3) {
      const ok = await patchDraft({ whats_included: whatsIncluded });
      if (!ok) return;
      unlock(4);
      setStep(4);
      return;
    }
    if (step === 7) {
      const fullPolicy = [
        `Free cancellation up to ${cancelWindow} before event (${refundType}).`,
        ...cancellationPolicy,
      ];
      const ok = await patchDraft({
        good_to_know: goodToKnow,
        cancellation_policy: fullPolicy,
      });
      if (!ok) return;
      unlock(8);
      setStep(8);
      return;
    }
    unlock(step + 1);
    setStep(s => Math.min(TOTAL_STEPS, s + 1));
  };

  const goBack = () => setStep(s => Math.max(1, s - 1));

  const goToStep = (target: number) => {
    if (isEditing || target <= maxUnlocked) setStep(target);
  };

  const publish = async () => {
    const ok = await patchDraft({ status: 'PUBLISHED' });
    if (!ok) return;
    setPublishedJustNow(true);
    try {
      localStorage.removeItem(`eventok_draft_${vendorId}`);
    } catch {
      // ignore
    }
    queryClient.invalidateQueries({ queryKey: ['vendor', 'services'] });
    message.success('Service published — customers can book it');
  };

  /** Persist whatever has been entered so far, then leave. Without the patch the button
   *  claimed to have saved a draft that only existed in local storage. */
  const saveAndExit = async () => {
    if (serviceId) {
      const ok = await patchDraft({
        category_id: categoryId || undefined,
        title: title.trim() || undefined,
        description: description.trim() || undefined,
        starting_price: Number(price) > 0 ? Number(price) : undefined,
        whats_included: whatsIncluded,
        good_to_know: goodToKnow,
        cancellation_policy: cancellationPolicy,
      });
      if (!ok) return;
      message.success('Draft saved');
    }
    navigate(ROUTES.VENDOR_SERVICES);
  };

  return {
    step,
    setStep: goToStep,
    maxUnlocked,
    isEditing,
    loadingInitial,
    saving,
    serviceId,
    vendorId,
    publishedJustNow,
    draftSavedJustNow,
    categories,
    categoryId,
    setCategoryId,
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    whatsIncluded,
    setWhatsIncluded,
    goodToKnow,
    setGoodToKnow,
    cancellationPolicy,
    setCancellationPolicy,
    cancelWindow,
    setCancelWindow,
    refundType,
    setRefundType,
    pricePreview,
    authoritativePricing,
    liveService,
    goNext,
    goBack,
    publish,
    saveAndExit,
    maxImages: MAX_SERVICE_IMAGES,
  };
}

export type ServiceWizard = ReturnType<typeof useServiceWizard>;
