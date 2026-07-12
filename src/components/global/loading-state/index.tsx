import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { useLoadingState } from './helper';
import { LoadingText, LoadingWrap, SkeletonCard, SkeletonGrid } from './styled';

interface LoadingStateProps {
  text?: string;
}

export function LoadingState({ text }: LoadingStateProps) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  useLoadingState();

  return (
    <LoadingWrap>
      <SkeletonGrid>
        <SkeletonCard $palette={palette} />
        <SkeletonCard $palette={palette} />
        <SkeletonCard $palette={palette} />
      </SkeletonGrid>
      <LoadingText $palette={palette}>
        {text ?? t('common.loading')}
      </LoadingText>
    </LoadingWrap>
  );
}
