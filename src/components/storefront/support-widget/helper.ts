import { useCallback, useState, type FormEvent } from 'react';

export const SUPPORT_SERVICES = [
  'Wedding',
  'Birthday',
  'Anniversary',
  'Baby Shower',
  'Corporate Event',
  'Home Decoration',
];

export function useSupportWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(SUPPORT_SERVICES[0]);

  const close = useCallback(() => {
    setOpen(false);
    setSent(false);
  }, []);

  const submit = useCallback((event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  }, []);

  return {
    open,
    openWidget: () => setOpen(true),
    close,
    sent,
    submit,
    name,
    setName,
    phone,
    setPhone,
    service,
    setService,
    canSubmit: name.trim().length > 1 && phone.trim().length >= 10,
  };
}
