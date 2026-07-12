import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export interface SearchFields {
  category: string;
  location: string;
  date: string;
  guests: string;
}

export function useSearchHero() {
  const navigate = useNavigate();
  const [fields, setFields] = useState<SearchFields>({
    category: '',
    location: '',
    date: '',
    guests: '',
  });

  const updateField = (key: keyof SearchFields, value: string) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (fields.category) params.set('category', fields.category);
    if (fields.location) params.set('location', fields.location);
    if (fields.date) params.set('date', fields.date);
    if (fields.guests) params.set('guests', fields.guests);
    const qs = params.toString();
    navigate(`${ROUTES.SERVICES}${qs ? `?${qs}` : ''}`);
  };

  return { fields, updateField, handleSearch };
}
