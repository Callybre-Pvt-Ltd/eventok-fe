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
import { vendorService } from '@/services/vendorService';

export interface FormDraft {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  phone: string;
  city: string;
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
  const {
    register,
    resendRegistrationCode,
    verifyRegistration,
    session,
    isSignedIn,
    refreshSession,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = readNextPath(location.search);
  const initialRole =
    (location.state as { role?: UserRole } | null)?.role === 'vendor'
      ? 'vendor'
      : 'customer';

  const isLoggedIn = Boolean(isSignedIn && session?.user);
  const hasVendorProfile = Boolean(session?.user?.vendorId);
  const existingVendorStatus = session?.user?.vendorStatus;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [step, setStep] = useState(1);
  const [stage, setStage] = useState<RegisterStage>('form');
  const [draft, setDraft] = useState<FormDraft>({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phone: session?.user?.phone || '',
    city: session?.user?.city || '',
  });
  const [verificationCode, setVerificationCode] = useState('');

  // Keep draft in sync if session loads asynchronously
  useEffect(() => {
    if (session?.user) {
      setDraft(prev => ({
        ...prev,
        name: prev.name || session.user.name || '',
        email: prev.email || session.user.email || '',
        phone: prev.phone || session.user.phone || '',
        city: prev.city || session.user.city || '',
      }));
    }
  }, [session?.user]);

  // Google sign-up reads this selection before redirecting to Clerk.
  useEffect(() => {
    setAuthIntent(role === 'vendor' ? 'vendor' : 'customer');
  }, [role]);

  const totalSteps = isLoggedIn
    ? role === 'vendor'
      ? 2
      : 1
    : role === 'vendor'
    ? 3
    : 2;

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
    if (isLoggedIn && role === 'vendor') {
      if (hasVendorProfile) {
        setError(
          'You already have a vendor profile associated with this account.',
        );
        return;
      }
      const businessName = draft.businessName.trim();
      if (!businessName) {
        setError('Please enter your business name');
        return;
      }
      setLoading(true);
      setError(null);
      const res = await vendorService.createProfile({
        business_name: businessName,
        owner_name: draft.name.trim() || session?.user?.name || undefined,
        mobile_number: draft.phone.trim() || undefined,
        city: draft.city.trim() || undefined,
      });
      if (res.error || !res.data) {
        setLoading(false);
        setError(res.error || 'Failed to create vendor profile');
        return;
      }
      await refreshSession();
      setLoading(false);
      setStage('success');
      return;
    }

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
      role: role === 'vendor' ? 'vendor' : 'customer',
    });
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    setStage('verify');
  }, [
    draft,
    hasVendorProfile,
    isLoggedIn,
    refreshSession,
    register,
    role,
    session?.user,
    t,
  ]);

  const continueFromDetails = () => {
    if (isLoggedIn && role === 'vendor') {
      void submitRegistration();
      return;
    }
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

  const finish = () => {
    if (isLoggedIn && role === 'vendor') {
      navigate(withNextPath(ROUTES.VENDOR_PENDING, nextPath), {
        replace: true,
      });
      return;
    }
    navigate(withNextPath(ROUTES.AUTH_CONTINUE, nextPath), { replace: true });
  };

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
    isLoggedIn,
    hasVendorProfile,
    existingVendorStatus,
    sessionUser: session?.user,
    navigate,
  };
}
