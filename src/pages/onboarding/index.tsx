import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { useTheme } from '@/theme';
import type { UserRole } from '@/types';
import {
  AuthTitle,
  AuthSubtitle,
  Field,
  Label,
  Input,
  ErrorMsg,
  RoleGroup,
  RoleLabel,
} from '../login/styled';

const destination = (role: UserRole, vendorStatus?: string) => {
  if (role === 'admin') return ROUTES.ADMIN_DASHBOARD;
  if (role === 'vendor') {
    return vendorStatus === 'pending'
      ? ROUTES.VENDOR_PENDING
      : ROUTES.VENDOR_DASHBOARD;
  }
  return ROUTES.CUSTOMER_DASHBOARD;
};

export default function OnboardingPage() {
  const { palette } = useTheme();
  const { session, isLoading, onboardingRequired, completeOnboarding } =
    useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (session)
      navigate(destination(session.user.role, session.user.vendorStatus), {
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
    if (message) setError(message);
  };

  return (
    <AuthShell>
      <AuthTitle $palette={palette}>Complete your EventOK profile</AuthTitle>
      <AuthSubtitle $palette={palette}>
        Your Clerk account is ready. Add the details EventOK needs to continue.
      </AuthSubtitle>
      {error && <ErrorMsg $palette={palette}>{error}</ErrorMsg>}
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
      <Field $palette={palette}>
        <Label $palette={palette}>Account type</Label>
        <RoleGroup $palette={palette}>
          <RoleLabel $palette={palette} $active={role === 'customer'}>
            <input
              type="radio"
              checked={role === 'customer'}
              onChange={() => setRole('customer')}
            />
            Client
          </RoleLabel>
          <RoleLabel $palette={palette} $active={role === 'vendor'}>
            <input
              type="radio"
              checked={role === 'vendor'}
              onChange={() => setRole('vendor')}
            />
            Vendor
          </RoleLabel>
        </RoleGroup>
      </Field>
      <Button
        variant="primary"
        size="lg"
        fullWidth
        loading={submitting}
        onClick={submit}
      >
        Continue
      </Button>
    </AuthShell>
  );
}
