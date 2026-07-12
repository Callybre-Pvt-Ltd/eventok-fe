import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export interface HeroSearchFields {
  category: string;
  location: string;
  date: string;
  guests: string;
}

export const showcaseImages = [
  {
    id: 'main',
    src: 'https://images.unsplash.com/photo-1478146896981-8e2292bb2b0b?w=1200&q=85&auto=format&fit=crop',
    alt: 'Outdoor celebration with lights',
    tall: true,
  },
  {
    id: 'catering',
    src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85&auto=format&fit=crop',
    alt: 'Elegant catering setup',
    tall: false,
  },
  {
    id: 'venue',
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=85&auto=format&fit=crop',
    alt: 'Live event atmosphere',
    tall: false,
  },
] as const;

export const quickCategories = [
  { slug: 'wedding', labelKey: 'categoryWedding' },
  { slug: 'birthday', labelKey: 'categoryBirthday' },
  { slug: 'corporate', labelKey: 'categoryCorporate' },
  { slug: 'photography', labelKey: 'categoryPhotography' },
] as const;

export function useEditorialHero() {
  const navigate = useNavigate();
  const [fields, setFields] = useState<HeroSearchFields>({
    category: '',
    location: '',
    date: '',
    guests: '',
  });

  const updateField = (key: keyof HeroSearchFields, value: string) => {
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

  const goToCategory = (slug: string) => {
    navigate(`${ROUTES.SERVICES}?type=${slug}`);
  };

  return {
    fields,
    updateField,
    handleSearch,
    goToCategory,
    images: showcaseImages,
    categories: quickCategories,
  };
}
