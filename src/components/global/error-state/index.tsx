import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/theme';
import { useErrorState } from './helper';
import { ErrorIcon, ErrorTitle, ErrorWrap } from './styled';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  useErrorState(onRetry);

  return (
    <ErrorWrap $palette={palette}>
      <ErrorIcon $palette={palette}>
        <AlertCircle size={32} />
      </ErrorIcon>
      <ErrorTitle $palette={palette}>{message ?? t('common.error')}</ErrorTitle>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          {t('common.retry')}
        </Button>
      )}
    </ErrorWrap>
  );
}
