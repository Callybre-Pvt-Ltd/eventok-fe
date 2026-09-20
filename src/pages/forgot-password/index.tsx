import { useState } from 'react';
import { useClerk } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import { AuthShell } from '@/components/auth/auth-shell';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';
import {
  AuthForm,
  AuthSubtitle,
  AuthTitle,
  ErrorMsg,
  Field,
  Input,
  Label,
} from '../login/styled';

export default function ForgotPasswordPage() {
  const { palette } = useTheme();
  const clerk = useClerk();
  const signIn = clerk.client.signIn;
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!clerk.loaded) return;
    setLoading(true);
    setError(null);
    try {
      if (step === 'email') {
        await signIn.create({
          strategy: 'reset_password_email_code',
          identifier: email,
        });
        setStep('code');
      } else {
        await signIn.attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code,
        });
        const result = await signIn.resetPassword({ password });
        if (result.status !== 'complete' || !result.createdSessionId) {
          throw new Error('Password reset is incomplete');
        }
        await clerk.setActive({ session: result.createdSessionId });
        navigate(ROUTES.ONBOARDING, { replace: true });
      }
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Unable to reset password',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <AuthTitle $palette={palette}>Reset your password</AuthTitle>
      <AuthSubtitle $palette={palette}>
        {step === 'email'
          ? 'We will email you a one-time code.'
          : 'Enter the code and a new password.'}
      </AuthSubtitle>
      {error && <ErrorMsg $palette={palette}>{error}</ErrorMsg>}
      <AuthForm
        onSubmit={event => {
          event.preventDefault();
          void submit();
        }}
      >
        {step === 'email' ? (
          <Field $palette={palette}>
            <Label $palette={palette}>Email</Label>
            <Input
              $palette={palette}
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Field>
        ) : (
          <>
            <Field $palette={palette}>
              <Label $palette={palette}>Verification code</Label>
              <Input
                $palette={palette}
                value={code}
                onChange={event => setCode(event.target.value)}
              />
            </Field>
            <Field $palette={palette}>
              <Label $palette={palette}>New password</Label>
              <Input
                $palette={palette}
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Field>
          </>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        >
          {step === 'email' ? 'Send code' : 'Reset password'}
        </Button>
      </AuthForm>
    </AuthShell>
  );
}
