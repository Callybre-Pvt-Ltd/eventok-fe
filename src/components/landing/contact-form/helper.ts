import { useCallback, useState } from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function useContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (data: ContactFormData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    return data;
  }, []);

  return { submitted, loading, onSubmit };
}
