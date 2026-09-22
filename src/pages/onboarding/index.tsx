import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { useTheme } from '@/theme';
import type { UserRole } from '@/types';
import {
  consumeAuthIntent,
  getPostAuthPath,
  peekAuthIntent,
} from '@/utils/auth/post-auth';
import {
  AuthTitle,
  AuthSubtitle,
  AuthForm,
  Field,
  Label,
  Input,
  ErrorMsg,
  SubmitRow,
} from '../login/styled';

export default function OnboardingPage() {
  const { palette } = useTheme();
  const { session, isLoading, onboardingRequired, completeOnboarding } =
    useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const role: UserRole = peekAuthIntent() === 'vendor' ? 'vendor' : 'customer';
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!session) return;
    consumeAuthIntent();
    navigate(getPostAuthPath(session.user.role, session.user.vendorStatus), {
      replace: true,
    });
  }, [navigate, session]);

  if (isLoading) return null;
  if (!onboardingRequired && !session)
    return <Navigate to={ROUTES.LOGIN} replace />;

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    const message = await completeOnboarding({ name, phone, city, role });
    setSubmitting(false);
    if (message) {
      setError(message);
      return;
    }
    consumeAuthIntent();
  };

  return (
    <AuthShell showVendorCta={false}>
      <AuthTitle $palette={palette}>Complete your EventOK profile</AuthTitle>
      <AuthSubtitle $palette={palette}>
        Your Clerk account is ready. Add the details EventOK needs to continue.
      </AuthSubtitle>
      {error && <ErrorMsg $palette={palette}>{error}</ErrorMsg>}
      <AuthForm
        onSubmit={event => {
          event.preventDefault();
          void submit();
        }}
      >
        <Field $palette={palette}>
          <Label $palette={palette}>Full name</Label>
          <Input
            $palette={palette}
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Field>
        <Field $palette={palette}>
          <Label $palette={palette}>Phone number</Label>
          <Input
            $palette={palette}
            type="tel"
            value={phone}
            onChange={event => setPhone(event.target.value)}
          />
        </Field>
        <Field $palette={palette}>
          <Label $palette={palette}>City</Label>
          <Input
            $palette={palette}
            value={city}
            onChange={event => setCity(event.target.value)}
          />
        </Field>
        <SubmitRow>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={submitting}
          >
            Continue
          </Button>
        </SubmitRow>
      </AuthForm>
    </AuthShell>
  );
}
