import { useCallback, useState } from 'react';

export const faqItems = [
  {
    id: '1',
    question: 'How does EventOK work?',
    answer:
      'EventOK connects you with verified vendors through our admin-supervised marketplace. Every enquiry and booking is managed safely by our team.',
  },
  {
    id: '2',
    question: 'Can I contact vendors directly?',
    answer:
      'No. For your safety, all communication goes through our admin team. Vendors personal details are never shared with customers.',
  },
  {
    id: '3',
    question: 'How do payments work?',
    answer:
      'All payments are processed securely through the EventOK platform. You can pay advance or full amounts as directed by admin.',
  },
  {
    id: '4',
    question: 'How do vendors get approved?',
    answer:
      'Vendors register and submit their portfolio. Our admin team reviews and approves vendors before they appear on the marketplace.',
  },
  {
    id: '5',
    question: 'What types of events are supported?',
    answer:
      'We support weddings, corporate events, birthdays, photography, catering, decoration, and more across multiple categories.',
  },
] as const;

export function useFaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);

  const toggle = useCallback((id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  }, []);

  return { faqItems, openId, toggle };
}
