import { AuthenticateWithRedirectCallback } from '@clerk/react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { LoadingState } from '@/components/global/loading-state';
import { ROUTES } from '@/constants/routes';
import { readNextPath, withNextPath } from '@/utils/auth/auth-return';

/**
 * Lands the Google round trip.
 *
 * Clerk's redirect props are plain strings, so the `?next=` destination has to be
 * re-attached here from the callback URL — otherwise the shopper completes sign-in
 * and gets dropped on their default landing page instead of back at checkout.
 *
 * The callback component renders nothing itself, so a loader is shown alongside it
 * instead of a blank screen while Clerk finishes the sign-in.
 */
export default function SsoCallbackPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const target = withNextPath(
    ROUTES.AUTH_CONTINUE,
    readNextPath(location.search),
  );

  return (
    <>
      <LoadingState text={t('auth.signingIn')} />
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl={target}
        signUpFallbackRedirectUrl={target}
        signInForceRedirectUrl={target}
        signUpForceRedirectUrl={target}
        continueSignUpUrl={target}
      />
    </>
  );
}
