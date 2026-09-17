import { useCallback, useState, type FormEvent } from 'react';
import { useCartLines } from '@/hooks/storefront/use-cart-lines';

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
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [error, setError] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const setField = useCallback(
    <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) =>
      setForm(prev => ({ ...prev, [key]: value })),
    [],
  );

  const submit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const valid =
        form.eventDate &&
        form.venue.trim() &&
        form.city.trim() &&
        form.name.trim() &&
        form.phone.trim().length >= 10 &&
        form.agreed;

      if (!valid) {
        setError(true);
        return;
      }

      setError(false);
      setBookingId(createBookingId());
      basket.clearCart();
    },
    [basket, form],
  );

  return { lines, totals, form, setField, submit, error, bookingId };
}
