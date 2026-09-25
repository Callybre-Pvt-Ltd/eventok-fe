import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LoadingState } from '@/components/global/loading-state';
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
export default function AuthContinuePage() {
  const { t } = useTranslation();
  const { session, isLoading, isSignedIn, refreshSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Read, never consumed: this render can run more than once (StrictMode remounts),
  // and a value that disappeared on the first read sent people to the wrong page.
  const nextPath = readNextPath(location.search);
  const [retrying, setRetrying] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!isSignedIn || session || isLoading) return;
    const timer = window.setTimeout(() => setTimedOut(true), 12_000);
    return () => window.clearTimeout(timer);
  }, [isLoading, isSignedIn, session]);

  if (session) {
    // An explicit destination (e.g. checkout) wins over the default landing page.
    return <Navigate to={nextPath ?? landingPath(session)} replace />;
  }

  if (!isSignedIn && !isLoading) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (isSignedIn && timedOut) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '1.5rem',
          textAlign: 'center',
          gap: '1rem',
        }}
      >
        <p>We could not open your portal yet.</p>
        <button
          type="button"
          disabled={retrying}
          onClick={() => {
            setRetrying(true);
            setTimedOut(false);
            void refreshSession().then(next => {
              setRetrying(false);
              if (next) {
                navigate(nextPath ?? landingPath(next), { replace: true });
              } else {
                setTimedOut(true);
              }
            });
          }}
        >
          {retrying ? 'Retrying…' : 'Try again'}
        </button>
      </div>
    );
  }

  return <LoadingState text={t('auth.signingIn')} />;
}
