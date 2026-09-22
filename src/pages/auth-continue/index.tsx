import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LoadingState } from '@/components/global/loading-state';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { readNextPath } from '@/utils/auth/auth-return';
import { getPostAuthPath } from '@/utils/auth/post-auth';

/** Resolves the correct portal after Clerk sign-in / SSO completes. */
export default function AuthContinuePage() {
  const { session, isLoading, isSignedIn, onboardingRequired, refreshSession } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Read, never consumed: this render can run more than once (StrictMode remounts),
  // and a value that disappeared on the first read sent people to the wrong page.
  const nextPath = readNextPath(location.search);
  const [retrying, setRetrying] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!isSignedIn || session || onboardingRequired || isLoading) return;
    const timer = window.setTimeout(() => setTimedOut(true), 12_000);
    return () => window.clearTimeout(timer);
  }, [isLoading, isSignedIn, onboardingRequired, session]);

  if (onboardingRequired) return <Navigate to={ROUTES.ONBOARDING} replace />;

  if (session) {
    // An explicit destination (e.g. checkout) wins over the default landing page.
    return (
      <Navigate
        to={
          nextPath ??
          getPostAuthPath(session.user.role, session.user.vendorStatus)
        }
        replace
      />
    );
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
                navigate(
                  nextPath ??
                    getPostAuthPath(next.user.role, next.user.vendorStatus),
                  { replace: true },
                );
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

  return <LoadingState />;
}
