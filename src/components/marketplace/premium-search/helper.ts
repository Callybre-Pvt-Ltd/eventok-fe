import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';

const POPULAR = [
  'Wedding planners Mumbai',
  'Corporate events Delhi',
  'Birthday decor Pune',
  'Photography Bangalore',
  'Luxury catering',
];

const ALL_SUGGESTIONS = [
  'Wedding',
  'Corporate gala',
  'Birthday party',
  'Photography',
  'Catering',
  'Decoration',
  'Sangeet night',
  'Baby shower',
];

const RECENT_KEY = 'eventok_recent_searches';

export function usePremiumSearch() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState({
    eventType: '',
    city: '',
    date: '',
    guests: '',
    category: '',
  });

  const recent = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]') as string[];
    } catch {
      return [];
    }
  }, [open]);

  const suggestions = useMemo(() => {
    const q = fields.eventType.toLowerCase();
    if (!q) return [];
    return ALL_SUGGESTIONS.filter(s => s.toLowerCase().includes(q)).slice(0, 5);
  }, [fields.eventType]);

  const update = (key: keyof typeof fields, value: string) =>
    setFields(f => ({ ...f, [key]: value }));

  const saveRecent = useCallback(
    (term: string) => {
      const list = [term, ...recent.filter(r => r !== term)].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(list));
    },
    [recent],
  );

  const search = () => {
    const term = [fields.eventType, fields.city].filter(Boolean).join(' ');
    if (term) saveRecent(term);
    const params = new URLSearchParams();
    if (fields.city) params.set('city', fields.city);
    if (fields.eventType)
      params.set('category', fields.eventType.toLowerCase());
    setOpen(false);
    navigate(`${ROUTES.SERVICES}?${params.toString()}`);
  };

  const applySuggestion = (s: string) => {
    update('eventType', s);
  };

  return {
    palette,
    open,
    fields,
    update,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
    search,
    popular: POPULAR,
    recent,
    suggestions,
    applySuggestion,
  };
}
