import { useTranslation } from 'react-i18next';
import type { UserRole } from '@/types';
import { usePortalSidebar } from '@/components/global/portal-sidebar/helper';
import { useTheme } from '@/theme';

export function usePortalLayout(role: UserRole) {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const sidebar = usePortalSidebar(role);

  return {
    role,
    palette,
    appName: t('common.appName'),
    ...sidebar,
  };
}
