import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Store } from 'lucide-react';
import { AccountAvatar } from '@/components/auth/account-avatar';
import { useAuth } from '@/hooks/auth/use-auth';
import { ROUTES } from '@/constants/routes';
import { brandColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';
import { getPostAuthPath, setAuthIntent } from '@/utils/auth/post-auth';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${brandColors.pink100};
  position: relative;

  ${media.belowMd} {
    padding: 0.5rem;
    align-items: flex-start;
  }

  ${media.belowSm} {
    padding: 0.25rem;
  }
`;

const SignedInCorner = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 5;
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  width: 100%;
  max-width: 1000px;
  border-radius: 1.5rem;
  overflow: hidden;
  background: ${brandColors.white};
  box-shadow: 0 16px 48px rgba(10, 10, 10, 0.1);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 440px;
  }
`;

const Left = styled.aside`
  padding: clamp(1.75rem, 4vw, 2.75rem);
  background: ${brandColors.pink50};
  color: ${brandColors.chocolate};

  @media (max-width: 900px) {
    display: none;
  }
`;

const LogoRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const LogoMark = styled.span`
  display: inline-flex;
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.65rem;
  background: ${brandColors.pink500};
  color: ${brandColors.white};
`;

const LogoWord = styled.span`
  font-family: ${fontFamily.display};
  font-weight: 800;
  font-size: 1.15rem;
`;

const Eyebrow = styled.p`
  margin: 0 0 0.75rem;
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.pink600};
`;

const Headline = styled.h1`
  margin: 0 0 0.75rem;
  font-family: ${fontFamily.display};
  font-size: clamp(1.75rem, 3vw, 2.15rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;

  em {
    font-family: ${fontFamily.emphasis};
    font-style: italic;
    color: ${brandColors.pink400};
    font-weight: 600;
  }
`;

const Rule = styled.hr`
  width: 3rem;
  height: 2px;
  border: none;
  background: ${brandColors.pink500};
  margin: 0 0 1rem;
`;

const Lead = styled.p`
  margin: 0 0 2rem;
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${brandColors.gray600};
`;

const Quote = styled.p`
  margin: 0;
  font-family: ${fontFamily.emphasis};
  font-style: italic;
  font-size: 0.9375rem;
  color: ${brandColors.gray600};
`;

const Right = styled.div`
  padding: clamp(1.75rem, 4vw, 2.5rem);

  ${media.belowMd} {
    padding: 1.15rem 1rem 1.5rem;
  }
`;

const Title = styled.h2`
  margin: 0 0 0.35rem;
  font-family: ${fontFamily.display};
  font-size: 1.5rem;
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

const Sub = styled.p`
  margin: 0 0 1.25rem;
  font-size: 0.875rem;
  color: ${brandColors.gray600};
`;

const Toggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
  padding: 0.25rem;
  margin-bottom: 1.25rem;
  border-radius: 9999px;
  background: ${brandColors.pink50};
`;

const ToggleBtn = styled.button<{ $active?: boolean }>`
  min-height: 40px;
  border: none;
  border-radius: 9999px;
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? brandColors.pink500 : 'transparent'};
  color: ${({ $active }) =>
    $active ? brandColors.white : brandColors.gray600};
  box-shadow: ${({ $active }) =>
    $active ? '0 2px 8px rgba(232, 0, 111, 0.28)' : 'none'};
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.9rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${brandColors.gray600};

  input {
    min-height: 46px;
    padding: 0.65rem 0.9rem;
    border-radius: 0.75rem;
    border: 1px solid ${brandColors.tan};
    font-family: ${fontFamily.body};
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${brandColors.chocolate};
    text-transform: none;
    letter-spacing: normal;
  }

  input:focus {
    outline: 2px solid rgba(232, 0, 111, 0.35);
    border-color: ${brandColors.pink500};
  }
`;

const PasswordWrap = styled.div`
  position: relative;

  input {
    width: 100%;
    padding-right: 2.75rem;
  }

  button {
    position: absolute;
    right: 0.65rem;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    color: ${brandColors.gray600};
    cursor: pointer;
    display: inline-flex;
  }
`;

const Forgot = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -0.35rem 0 0.9rem;

  a {
    font-size: 0.8125rem;
    font-weight: 600;
    color: ${brandColors.pink600};
    text-decoration: none;
  }
`;

const Primary = styled.button`
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 9999px;
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${brandColors.pink600};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Foot = styled.p`
  margin: 1.1rem 0 0;
  text-align: center;
  font-size: 0.875rem;
  color: ${brandColors.gray600};

  a {
    color: ${brandColors.pink600};
    font-weight: 700;
    text-decoration: none;
  }
`;

const ErrorText = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.8125rem;
  color: ${brandColors.danger500};
`;

const InfoCallout = styled.p`
  margin: 0 0 1rem;
  padding: 0.75rem 0.9rem;
  border-radius: 0.75rem;
  background: ${brandColors.pink100};
  font-size: 0.8125rem;
  line-height: 1.45;
  color: ${brandColors.pink600};
`;

const GoogleBtn = styled.button`
  width: 100%;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-bottom: 0.9rem;
  border-radius: 9999px;
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${brandColors.pink500};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const OrRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.75rem;
  margin: 0.25rem 0 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${brandColors.gray600};
`;

const OrLine = styled.span`
  height: 1px;
  background: ${brandColors.tan};
`;

export default function VendorLoginPage() {
  const navigate = useNavigate();
  const {
    login,
    signInWithGoogle,
    session,
    onboardingRequired,
    isLoading,
    isSignedIn,
    refreshSession,
    logout,
  } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [continuing, setContinuing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading || loading || googleLoading || continuing) return;
    if (onboardingRequired) {
      setAuthIntent('vendor');
      navigate(ROUTES.ONBOARDING, { replace: true });
      return;
    }
    if (!session) return;
    navigate(getPostAuthPath(session.user.role, session.user.vendorStatus), {
      replace: true,
    });
  }, [
    continuing,
    googleLoading,
    isLoading,
    loading,
    navigate,
    onboardingRequired,
    session,
  ]);

  const enterPortal = async () => {
    setContinuing(true);
    setError(null);
    setAuthIntent('vendor');
    const next = session ?? (await refreshSession());
    setContinuing(false);
    if (next) {
      navigate(getPostAuthPath(next.user.role, next.user.vendorStatus), {
        replace: true,
      });
      return;
    }
    navigate(ROUTES.AUTH_CONTINUE, { replace: true });
  };

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSignedIn) {
      await enterPortal();
      return;
    }
    const fd = new FormData(event.currentTarget);
    const email = String(fd.get('email') ?? '');
    const password = String(fd.get('password') ?? '');
    setLoading(true);
    setError(null);
    setAuthIntent('vendor');
    const err = await login(email, password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    navigate(ROUTES.AUTH_CONTINUE, { replace: true });
  };

  const onGoogle = async () => {
    if (isSignedIn) {
      await enterPortal();
      return;
    }
    setGoogleLoading(true);
    setError(null);
    setAuthIntent('vendor');
    const err = await signInWithGoogle();
    if (err) {
      setGoogleLoading(false);
      if (/already signed in/i.test(err)) {
        await enterPortal();
        return;
      }
      setError(err);
    }
  };

  const signedInPanel = isSignedIn && !isLoading;

  return (
    <Page>
      {signedInPanel ? (
        <SignedInCorner>
          <AccountAvatar />
        </SignedInCorner>
      ) : null}
      <Card>
        <Left>
          <LogoRow>
            <LogoMark>
              <Store size={16} />
            </LogoMark>
            <LogoWord>EventOK</LogoWord>
          </LogoRow>
          <Eyebrow>Vendor portal</Eyebrow>
          <Headline>
            Your events, your <em>business</em>, your dashboard.
          </Headline>
          <Rule />
          <Lead>
            Manage bookings, connect with clients, and take full control of your
            event business — all in one place.
          </Lead>
          <Quote>“Making every event extraordinary.”</Quote>
        </Left>

        <Right>
          <Title>Vendor Partner Portal</Title>
          <Sub>
            {signedInPanel
              ? 'You are signed in — continue to your portal'
              : 'Select your preferred method below'}
          </Sub>

          {signedInPanel ? (
            <div>
              {error ? <ErrorText>{error}</ErrorText> : null}
              <InfoCallout>
                Super admins open the admin portal. Vendors go to the waitlist
                until approved, then the vendor dashboard.
              </InfoCallout>
              <Primary
                type="button"
                disabled={continuing}
                onClick={() => void enterPortal()}
              >
                {continuing ? 'Opening portal…' : 'Continue to portal'}
              </Primary>
              <Foot>
                Wrong account?{' '}
                <button
                  type="button"
                  style={{
                    border: 'none',
                    background: 'none',
                    color: brandColors.pink600,
                    fontWeight: 700,
                    cursor: 'pointer',
                    font: 'inherit',
                  }}
                  onClick={() => void logout()}
                >
                  Sign out
                </button>
              </Foot>
            </div>
          ) : (
            <>
              <Toggle>
                <ToggleBtn
                  type="button"
                  $active={mode === 'login'}
                  onClick={() => setMode('login')}
                >
                  Login
                </ToggleBtn>
                <ToggleBtn
                  type="button"
                  $active={mode === 'register'}
                  onClick={() => setMode('register')}
                >
                  Register
                </ToggleBtn>
              </Toggle>

              {mode === 'login' ? (
                <form onSubmit={onLogin}>
                  {error ? <ErrorText>{error}</ErrorText> : null}
                  <GoogleBtn
                    type="button"
                    disabled={googleLoading || loading || isLoading}
                    onClick={() => void onGoogle()}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {googleLoading ? 'Redirecting…' : 'Sign in with Google'}
                  </GoogleBtn>
                  <OrRow>
                    <OrLine />
                    <span>or</span>
                    <OrLine />
                  </OrRow>
                  <Field>
                    Email or mobile number
                    <input
                      name="email"
                      type="email"
                      autoComplete="username"
                      required
                      placeholder="vendor@example.com"
                    />
                  </Field>
                  <Forgot>
                    <Link to={ROUTES.LOGIN}>Forgot Password?</Link>
                  </Forgot>
                  <Field>
                    Password
                    <PasswordWrap>
                      <input
                        name="password"
                        type={showPw ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPw(v => !v)}
                      >
                        {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </PasswordWrap>
                  </Field>
                  <Primary
                    type="submit"
                    disabled={loading || googleLoading || isLoading}
                  >
                    {loading || isLoading
                      ? 'Signing in…'
                      : 'Login to Dashboard'}
                  </Primary>
                  <Foot>
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      style={{
                        border: 'none',
                        background: 'none',
                        color: brandColors.pink600,
                        fontWeight: 700,
                        cursor: 'pointer',
                        font: 'inherit',
                      }}
                      onClick={() => setMode('register')}
                    >
                      Register
                    </button>
                  </Foot>
                </form>
              ) : (
                <div>
                  {error ? <ErrorText>{error}</ErrorText> : null}
                  <InfoCallout>
                    New vendors join a waitlist after signup. Once a super admin
                    approves your account, you can access the vendor portal.
                  </InfoCallout>
                  <GoogleBtn
                    type="button"
                    disabled={googleLoading}
                    onClick={() => void onGoogle()}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {googleLoading ? 'Redirecting…' : 'Continue with Google'}
                  </GoogleBtn>
                  <OrRow>
                    <OrLine />
                    <span>or</span>
                    <OrLine />
                  </OrRow>
                  <Primary
                    type="button"
                    onClick={() => {
                      setAuthIntent('vendor');
                      navigate(ROUTES.REGISTER, { state: { role: 'vendor' } });
                    }}
                  >
                    Continue with email
                  </Primary>
                  <Foot>
                    Already have an account?{' '}
                    <button
                      type="button"
                      style={{
                        border: 'none',
                        background: 'none',
                        color: brandColors.pink600,
                        fontWeight: 700,
                        cursor: 'pointer',
                        font: 'inherit',
                      }}
                      onClick={() => setMode('login')}
                    >
                      Login
                    </button>
                  </Foot>
                </div>
              )}
            </>
          )}
        </Right>
      </Card>
    </Page>
  );
}
