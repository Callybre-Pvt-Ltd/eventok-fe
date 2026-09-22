import { AuthenticateWithRedirectCallback } from '@clerk/react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { readNextPath, withNextPath } from '@/utils/auth/auth-return';

/**
 * Lands the Google round trip.
 *
 * Clerk's redirect props are plain strings, so the `?next=` destination has to be
 * re-attached here from the callback URL — otherwise the shopper completes sign-in
 * and gets dropped on their default landing page instead of back at checkout.
 */
export default function SsoCallbackPage() {
  const location = useLocation();
  const target = withNextPath(
    ROUTES.AUTH_CONTINUE,
    readNextPath(location.search),
  );

  return (
    <AuthenticateWithRedirectCallback
      signInFallbackRedirectUrl={target}
      signUpFallbackRedirectUrl={target}
      signInForceRedirectUrl={target}
      signUpForceRedirectUrl={target}
      continueSignUpUrl={ROUTES.ONBOARDING}
    />
  );
}
