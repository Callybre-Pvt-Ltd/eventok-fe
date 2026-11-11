import { useTranslation } from 'react-i18next';
import { useLoadingState } from './helper';
import {
  LoadingText,
  LoadingWrap,
  SkeletonAvatar,
  SkeletonBody,
  SkeletonCard,
  SkeletonFooter,
  SkeletonGrid,
  SkeletonHeader,
  SkeletonLine,
  SkeletonMeta,
  SkeletonPill,
  Spinner,
  StatusRow,
} from './styled';

interface LoadingStateProps {
  text?: string;
  count?: number;
  fullPage?: boolean;
}

export function LoadingState({
  text,
  count = 1,
  fullPage = false,
}: LoadingStateProps) {
  const { t } = useTranslation();
  useLoadingState();

  const cards = Array.from({ length: Math.max(1, count) });
  const displayText = text ?? t('common.loading');

  return (
    <LoadingWrap $fullPage={fullPage}>
      <SkeletonGrid $single={count === 1}>
        {cards.map((_, index) => (
          <SkeletonCard key={index}>
            <SkeletonHeader>
              <SkeletonAvatar />
              <SkeletonMeta>
                <SkeletonLine $width="55%" $height="0.875rem" />
                <SkeletonLine $width="35%" $height="0.625rem" />
              </SkeletonMeta>
            </SkeletonHeader>

            <SkeletonBody>
              <SkeletonLine $width="100%" $height="0.6875rem" />
              <SkeletonLine $width="88%" $height="0.6875rem" />
              <SkeletonLine $width="65%" $height="0.6875rem" />
            </SkeletonBody>

            <SkeletonFooter>
              <SkeletonPill $width="5rem" />
              <SkeletonPill $width="3.5rem" />
            </SkeletonFooter>
          </SkeletonCard>
        ))}
      </SkeletonGrid>

      <StatusRow>
        <Spinner aria-hidden="true" />
        <LoadingText>{displayText}</LoadingText>
      </StatusRow>
    </LoadingWrap>
  );
}
