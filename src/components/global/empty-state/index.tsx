import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { useEmptyState } from './helper';
import { EmptyDesc, EmptyIcon, EmptyTitle, EmptyWrap } from './styled';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { Icon } = useEmptyState(icon);

  return (
    <EmptyWrap $palette={palette}>
      <EmptyIcon $palette={palette}>
        <Icon size={28} />
      </EmptyIcon>
      <EmptyTitle $palette={palette}>{title ?? t('common.empty')}</EmptyTitle>
      {description && <EmptyDesc $palette={palette}>{description}</EmptyDesc>}
    </EmptyWrap>
  );
}
