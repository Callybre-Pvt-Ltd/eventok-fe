import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { readNextPath } from '@/utils/auth/auth-return';
import { getPostAuthPath, peekAuthIntent } from '@/utils/auth/post-auth';
import type { Session } from '@/types';

/** Shoppers land on the storefront; the vendor login sends vendors to their portal. */
const landingPath = (session: Session) =>
  peekAuthIntent() === 'vendor'
    ? getPostAuthPath(session.user.role, session.user.vendorStatus)
    : ROUTES.HOME;

/** Resolves the correct portal after Clerk sign-in / SSO completes. */
export function useAuthContinuePage() {
  const { session, isLoading, isSignedIn, sessionFailed, refreshSession } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Read, never consumed: this render can run more than once (StrictMode remounts),
  // and a value that disappeared on the first read sent people to the wrong page.
  const nextPath = readNextPath(location.search);
  const [retrying, setRetrying] = useState(false);

  const retry = () => {
    setRetrying(true);
    void refreshSession().then(next => {
      setRetrying(false);
      if (next) navigate(nextPath ?? landingPath(next), { replace: true });
    });
  };

  return {
    // An explicit destination (e.g. checkout) wins over the default landing page.
    redirectTo: session ? nextPath ?? landingPath(session) : null,
    toLogin: !session && !isSignedIn && !isLoading,
    failed: isSignedIn && !session && !isLoading && sessionFailed && !retrying,
    retry,
  };
}
