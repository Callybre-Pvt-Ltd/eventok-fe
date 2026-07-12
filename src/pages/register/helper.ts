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
  city: string;
}

export function useRegisterPage() {
  const { palette } = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>('customer');
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<FormDraft>({
    name: '',
    email: '',
    password: '',
    city: '',
  });

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
    if (role === 'vendor') navigate(ROUTES.VENDOR_PENDING, { replace: true });
    else navigate(ROUTES.CUSTOMER_DASHBOARD, { replace: true });
  }, [register, navigate, role, draft]);

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
  };
}
