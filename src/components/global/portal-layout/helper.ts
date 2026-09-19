import { useTranslation } from 'react-i18next';
import type { UserRole } from '@/types';
import { usePortalSidebar } from '@/components/global/portal-sidebar/helper';
import { useTheme } from '@/theme';

const PORTAL_COPY: Record<
  UserRole,
  { eyebrow: string; label: string }
> = {
  admin: { eyebrow: 'EventOK control', label: 'Super admin portal' },
  vendor: { eyebrow: 'EventOK partners', label: 'Vendor workspace' },
  customer: { eyebrow: 'EventOK', label: 'Customer portal' },
};

export function usePortalLayout(role: UserRole) {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const sidebar = usePortalSidebar(role);
  const copy = PORTAL_COPY[role] ?? {
    eyebrow: t('common.appName'),
    label: t('common.appName'),
  };

  return {
    role,
    palette,
    portalEyebrow: copy.eyebrow,
    portalLabel: copy.label,
    appName: t('common.appName'),
    ...sidebar,
  };
}
