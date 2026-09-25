import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';

export function usePasswordInput() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [visible, setVisible] = useState(false);

  return {
    palette,
    visible,
    toggle: () => setVisible(v => !v),
    toggleLabel: visible ? t('auth.hidePassword') : t('auth.showPassword'),
  };
}
