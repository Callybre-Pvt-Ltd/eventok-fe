import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/use-auth';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';
import type { UserRole } from '@/types';

interface FormDraft {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
}

export function useRegisterPage() {
  const { palette } = useTheme();
  const { register, verifyRegistration, verificationPending } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>('customer');
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<FormDraft>({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
  });
  const [verificationCode, setVerificationCode] = useState('');

  const totalSteps = role === 'vendor' ? 3 : 2;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const updateDraft = (partial: Partial<FormDraft>) =>
    setDraft(d => ({ ...d, ...partial }));

  const submitRegistration = useCallback(async () => {
    setLoading(true);
    setError(null);
    const err = await register({ ...draft, role });
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
  }, [register, role, draft]);

  const submitVerification = useCallback(async () => {
    setLoading(true);
    setError(null);
    const err = await verifyRegistration(verificationCode);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    navigate(
      role === 'vendor' ? ROUTES.VENDOR_PENDING : ROUTES.CUSTOMER_DASHBOARD,
      { replace: true },
    );
  }, [navigate, role, verificationCode, verifyRegistration]);

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
    submitRegistration,
    verificationPending,
    verificationCode,
    setVerificationCode,
    submitVerification,
  };
}
