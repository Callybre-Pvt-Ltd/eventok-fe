import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { ErrorState } from '@/components/global/error-state';
import { LoadingState } from '@/components/global/loading-state';
import { ROUTES } from '@/constants/routes';
import { useAuthContinuePage } from './helper';
import { PageWrap } from './styled';

export default function AuthContinuePage() {
  const { t } = useTranslation();
  const { redirectTo, toLogin, failed, retry } = useAuthContinuePage();

  if (redirectTo) return <Navigate to={redirectTo} replace />;
  if (toLogin) return <Navigate to={ROUTES.LOGIN} replace />;

  return (
    <PageWrap>
      {failed ? (
        <ErrorState message={t('auth.portalUnavailable')} onRetry={retry} />
      ) : (
        <LoadingState text={t('auth.signingIn')} />
      )}
    </PageWrap>
  );
}
