import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Store } from 'lucide-react';
import { useAuth } from '@/hooks/auth/use-auth';
import { ROUTES } from '@/constants/routes';
import { brandColors } from '@/theme/brand';
import { fontFamily } from '@/theme';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${brandColors.pink100};
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

export default function VendorLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const email = String(fd.get('email') ?? '');
    const password = String(fd.get('password') ?? '');
    setLoading(true);
    setError(null);
    const err = await login(email, password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    navigate(ROUTES.VENDOR_DASHBOARD, { replace: true });
  };

  return (
    <Page>
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
          <Sub>Select your preferred method below</Sub>

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
              <Primary type="submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Login to Dashboard'}
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
              <InfoCallout>
                Create your vendor account with email and password. Our team
                will verify your details after you submit your profile.
              </InfoCallout>
              <Primary
                type="button"
                onClick={() =>
                  navigate(ROUTES.REGISTER, { state: { role: 'vendor' } })
                }
              >
                Continue to Register
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
        </Right>
      </Card>
    </Page>
  );
}
