import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { categoryService } from '@/services';
import type { Category } from '@/types';

export interface CategoryFormValues {
  name: string;
  icon: string;
}

const EMPTY_FORM: CategoryFormValues = { name: '', icon: '' };

export function useAdminCategories() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<CategoryFormValues>(EMPTY_FORM);

  const query = useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: async () => {
      const res = await categoryService.listForAdmin();
      if (res.error) throw new Error(res.error);
      return res.data ?? [];
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
    queryClient.invalidateQueries({ queryKey: ['categories'] });
    queryClient.invalidateQueries({ queryKey: ['storefront'] });
  };

  const saveMutation = useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      const name = values.name.trim();
      if (!name) throw new Error(t('admin.categoryNameRequired'));
      const res = editing
        ? await categoryService.update(editing.id, {
            name,
            icon: values.icon.trim(),
          })
        : await categoryService.create({ name, icon: values.icon.trim() });
      if (res.error || !res.data)
        throw new Error(res.error ?? 'Request failed');
      return res.data;
    },
    onSuccess: () => {
      message.success(
        editing ? t('admin.categoryUpdated') : t('admin.categoryCreated'),
      );
      invalidate();
      closeForm();
    },
    onError: (error: Error) => message.error(error.message),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async (category: Category) => {
      const res = await categoryService.update(category.id, {
        isActive: !(category.isActive ?? true),
      });
      if (res.error) throw new Error(res.error);
    },
    onSuccess: () => {
      message.success(t('admin.categoryUpdated'));
      invalidate();
    },
    onError: (error: Error) => message.error(error.message),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setIsFormOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setForm({ name: category.name, icon: category.icon ?? '' });
    setIsFormOpen(true);
  };

  function closeForm() {
    setIsFormOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  }

  const setName = (name: string) => setForm(prev => ({ ...prev, name }));
  const setIcon = (icon: string) => setForm(prev => ({ ...prev, icon }));

  const filtered = useMemo(() => {
    const categories = query.data ?? [];
    const term = search.trim().toLowerCase();
    if (!term) return categories;
    return categories.filter(category =>
      category.name.toLowerCase().includes(term),
    );
  }, [query.data, search]);

  return {
    categories: filtered,
    totalCount: (query.data ?? []).length,
    isLoading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
    search,
    setSearch,
    isFormOpen,
    isEditing: Boolean(editing),
    form,
    setName,
    setIcon,
    openCreate,
    openEdit,
    closeForm,
    saveMutation,
    toggleActiveMutation,
  };
}
