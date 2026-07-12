import { useCallback, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ROUTES } from '@/constants/routes';

export const footerQuickLinks = [
  { path: ROUTES.HOME, labelKey: 'nav.home' },
  { path: ROUTES.ABOUT, labelKey: 'nav.about' },
  { path: ROUTES.SERVICES, labelKey: 'nav.services' },
] as const;

export const footerSupportLinks = [
  { path: ROUTES.CONTACT, labelKey: 'nav.contact' },
  { path: ROUTES.FAQ, labelKey: 'nav.faq' },
  { path: ROUTES.TESTIMONIALS, labelKey: 'nav.testimonials' },
] as const;

export const footerSocialLinks = [
  {
    label: 'Facebook',
    paths: [
      'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    ],
  },
  {
    label: 'Twitter',
    paths: [
      'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
    ],
  },
  {
    label: 'LinkedIn',
    paths: [
      'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
      'M2 9h4v12H2z',
      'M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
    ],
  },
  {
    label: 'Instagram',
    paths: [
      'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
      'M16 11.37a4 4 0 1 1-3.37-3.37A4 4 0 0 1 16 11.37z',
      'M17.5 6.5h.01',
    ],
  },
] as const;

export function usePublicFooter() {
  const [email, setEmail] = useState('');

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const onNewsletterSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setEmail('');
    },
    [],
  );

  return { email, onEmailChange, onNewsletterSubmit };
}
