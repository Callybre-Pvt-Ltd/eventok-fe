import { useCallback, useEffect, useState } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { readNextPath, withNextPath } from '@/utils/auth/auth-return';
import { useAuth } from '@/hooks/auth/use-auth';
import { PASSWORD_MIN_LENGTH } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';
import type { UserRole } from '@/types';
import { setAuthIntent } from '@/utils/auth/post-auth';

interface FormDraft {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterStage = 'form' | 'verify' | 'success';

const validateDraft = (
  draft: FormDraft,
  t: (key: string) => string,
): string | null => {
  if (!draft.name.trim() || !draft.email.trim() || !draft.password) {
    return t('auth.fillAllFields');
  }
  if (draft.password.length < PASSWORD_MIN_LENGTH) {
    return t('auth.passwordTooShort');
  }
  if (draft.password !== draft.confirmPassword) {
    return t('auth.passwordMismatch');
  }
  return null;
};

export function useRegisterPage() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { register, resendRegistrationCode, verifyRegistration } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = readNextPath(location.search);
  const initialRole =
    (location.state as { role?: UserRole } | null)?.role === 'vendor'
      ? 'vendor'
      : 'customer';
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [step, setStep] = useState(1);
  const [stage, setStage] = useState<RegisterStage>('form');
  const [draft, setDraft] = useState<FormDraft>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [verificationCode, setVerificationCode] = useState('');

  // The intent decides which profile the silent post-verification provisioning
  // creates, and it also covers Google sign-up started from this page.
  useEffect(() => {
    setAuthIntent(role === 'vendor' ? 'vendor' : 'customer');
  }, [role]);

  const totalSteps = role === 'vendor' ? 3 : 2;

  const nextStep = () => {
    setError(null);
    setStep(s => Math.min(s + 1, totalSteps));
  };
  const prevStep = () => {
    setError(null);
    setStep(s => Math.max(s - 1, 1));
  };

  const updateDraft = (partial: Partial<FormDraft>) =>
    setDraft(d => ({ ...d, ...partial }));

  const submitRegistration = useCallback(async () => {
    const invalid = validateDraft(draft, t);
    if (invalid) {
      setError(invalid);
      return;
    }
    setLoading(true);
    setError(null);
    const err = await register({
      name: draft.name,
      email: draft.email,
      password: draft.password,
    });
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    setStage('verify');
  }, [register, draft, t]);

  const continueFromDetails = () => {
    const invalid = validateDraft(draft, t);
    if (invalid) {
      setError(invalid);
      return;
    }
    if (role === 'vendor') nextStep();
    else void submitRegistration();
  };

  const submitVerification = useCallback(async () => {
    setLoading(true);
    setError(null);
    const err = await verifyRegistration(verificationCode);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    setStage('success');
  }, [verificationCode, verifyRegistration]);

  const resendCode = useCallback(async () => {
    setError(null);
    const err = await resendRegistrationCode();
    if (err) setError(err);
    else message.success(t('auth.codeResent'));
  }, [resendRegistrationCode, t]);

  const changeEmail = () => {
    setError(null);
    setVerificationCode('');
    setStage('form');
  };

  const finish = () =>
    navigate(withNextPath(ROUTES.AUTH_CONTINUE, nextPath), { replace: true });

  return {
    palette,
    error,
    loading,
    role,
    setRole,
    step,
    totalSteps,
    nextStep,
    prevStep,
    draft,
    updateDraft,
    continueFromDetails,
    submitRegistration,
    stage,
    verificationCode,
    setVerificationCode,
    submitVerification,
    resendCode,
    changeEmail,
    finish,
  };
}
