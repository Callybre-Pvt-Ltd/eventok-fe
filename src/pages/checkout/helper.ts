import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { useCartLines } from '@/hooks/storefront/use-cart-lines';
import { withNextPath } from '@/utils/auth/auth-return';
import {
  clearCheckoutDraft,
  readCheckoutDraft,
  saveCheckoutDraft,
} from '@/utils/storefront/checkout-draft';

export interface CheckoutForm {
  eventDate: string;
  eventTime: string;
  venue: string;
  city: string;
  pincode: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  agreed: boolean;
}

const EMPTY_FORM: CheckoutForm = {
  eventDate: '',
  eventTime: '',
  venue: '',
  city: '',
  pincode: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
  agreed: false,
};

function createBookingId(): string {
  return `EO${Date.now().toString(36).toUpperCase().slice(-8)}`;
}

export function useCheckoutPage() {
  const { lines, totals, basket } = useCartLines();
  const { session, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  // Restore anything typed before the visitor was sent off to sign in.
  const [form, setForm] = useState<CheckoutForm>(() => ({
    ...EMPTY_FORM,
    ...(readCheckoutDraft<CheckoutForm>() ?? {}),
  }));
  const [error, setError] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  // Prefill contact details from the signed-in account, without clobbering edits.
  useEffect(() => {
    if (!session) return;
    setForm(prev => ({
      ...prev,
      name: prev.name || session.user.name || '',
      email: prev.email || session.user.email || '',
      phone: prev.phone || session.user.phone || '',
    }));
  }, [session]);

  const setField = useCallback(
    <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) =>
      setForm(prev => {
        const next = { ...prev, [key]: value };
        saveCheckoutDraft(next);
        return next;
      }),
    [],
  );

  const isValid =
    Boolean(form.eventDate) &&
    Boolean(form.eventTime) &&
    form.venue.trim().length > 0 &&
    form.city.trim().length > 0 &&
    form.name.trim().length > 0 &&
    form.phone.trim().length >= 10 &&
    form.agreed;

  /** Step 1: sign in if needed, then validate before anything is confirmed. */
  const submit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      // Auth comes first. Blocking on a half-filled form here made the button look
      // dead, because the validation message sits far below the summary card.
      // Whatever has been typed is kept and restored on the way back.
      if (!session) {
        saveCheckoutDraft(form);
        navigate(withNextPath(ROUTES.LOGIN, ROUTES.CHECKOUT));
        return;
      }

      if (!isValid) {
        setError(true);
        return;
      }
      setError(false);
      setConfirming(true);
    },
    [form, isValid, navigate, session],
  );

  /** Step 2: the visitor confirmed the review modal — place the order. */
  const confirmOrder = useCallback(() => {
    setConfirming(false);
    setBookingId(createBookingId());
    clearCheckoutDraft();
    basket.clearCart();
  }, [basket]);

  return {
    lines,
    totals,
    form,
    setField,
    submit,
    error,
    bookingId,
    isValid,
    isSignedIn: Boolean(session),
    authLoading,
    confirming,
    confirmOrder,
    cancelConfirm: () => setConfirming(false),
  };
}
