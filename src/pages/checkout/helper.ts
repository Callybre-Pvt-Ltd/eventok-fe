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
import { bookingService } from '@/services';

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

/** Short, human-quotable reference derived from the real booking id. */
function bookingReference(bookingId: string): string {
  return `EO${bookingId.replace(/-/g, '').slice(0, 8).toUpperCase()}`;
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
  const [placing, setPlacing] = useState(false);
  const [failureMessage, setFailureMessage] = useState<string | null>(null);

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

  /** Step 2: the visitor confirmed the review modal — place the order.
   *
   * Each cart line becomes a real direct booking, which is what puts the job in the
   * vendor's Bookings queue and notifies them (and the Admins). A line that the API
   * rejects is reported instead of being swallowed, so nobody leaves the page believing
   * a booking exists when it does not.
   */
  const confirmOrder = useCallback(async () => {
    if (!session?.user?.id || lines.length === 0) return;
    setConfirming(false);
    setPlacing(true);
    setFailureMessage(null);

    // Lines are independent bookings, so they are placed together.
    const results = await Promise.all(
      lines.map(async line => ({
        line,
        res: await bookingService.createDirectBooking({
          service_id: line.service.id,
          booking_date: form.eventDate,
        }),
      })),
    );
    const createdIds: string[] = [];
    const bookedSlugs: string[] = [];
    const failures: string[] = [];
    for (const { line, res } of results) {
      if (res.error || !res.data) {
        failures.push(
          `${line.service.title}: ${res.error ?? 'Request failed'}`,
        );
      } else {
        createdIds.push(res.data.id);
        bookedSlugs.push(line.serviceSlug);
      }
    }

    setPlacing(false);

    if (createdIds.length === 0) {
      setFailureMessage(
        failures.join('\n') || 'We could not place this booking.',
      );
      return;
    }

    setFailureMessage(failures.length ? failures.join('\n') : null);
    setBookingId(bookingReference(createdIds[0]));
    // Lines that failed stay in the cart so they can be retried.
    if (failures.length) {
      bookedSlugs.forEach(slug => basket.removeFromCart(slug));
    } else {
      clearCheckoutDraft();
      basket.clearCart();
    }
  }, [basket, form.eventDate, lines, session]);

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
    placing,
    failureMessage,
    cancelConfirm: () => setConfirming(false),
  };
}
