import { useState } from 'react';
import { useSignIn } from '@clerk/react/legacy';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_MIN_LENGTH } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { useTheme } from '@/theme';

export type ResetStage = 'email' | 'code' | 'success';

const clerkMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'errors' in error) {
    const first = (
      error as { errors?: { longMessage?: string; message?: string }[] }
    ).errors?.[0];
    if (first) return first.longMessage ?? first.message ?? '';
  }
  return error instanceof Error ? error.message : 'Unable to reset password';
};

export function useForgotPasswordPage() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { isLoaded, signIn } = useSignIn();
  const { activateSession } = useAuth();
  const navigate = useNavigate();
  const [stage, setStage] = useState<ResetStage>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendCode = async () => {
    if (!isLoaded || !signIn) return;
    await signIn.create({
      strategy: 'reset_password_email_code',
      identifier: email.trim(),
    });
    setStage('code');
  };

  const resetPassword = async () => {
    if (!isLoaded || !signIn) return;
    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(t('auth.passwordTooShort'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('auth.passwordMismatch'));
      return;
    }
    const result = await signIn.attemptFirstFactor({
      strategy: 'reset_password_email_code',
      code: code.trim(),
      password,
    });
    if (result.status !== 'complete' || !result.createdSessionId) {
      throw new Error('Password reset is incomplete');
    }
    const err = await activateSession(result.createdSessionId);
    if (err) throw new Error(err);
    setStage('success');
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (stage === 'email') await sendCode();
      else await resetPassword();
    } catch (caught) {
      setError(clerkMessage(caught));
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setLoading(true);
    setError(null);
    try {
      await sendCode();
    } catch (caught) {
      setError(clerkMessage(caught));
    } finally {
      setLoading(false);
    }
  };

  return {
    t,
    palette,
    stage,
    email,
    setEmail,
    code,
    setCode,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    submit,
    resend,
    finish: () => navigate(ROUTES.AUTH_CONTINUE, { replace: true }),
    backToEmail: () => {
      setError(null);
      setStage('email');
    },
  };
}
