import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthShell } from '@/components/auth/auth-shell';
import { SocialButtons } from '@/components/auth/social-buttons';
import { PasswordStrength } from '@/components/auth/password-strength';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useRegisterPage } from './helper';
import {
  AuthTitle,
  AuthSubtitle,
  Field,
  Label,
  Input,
  AuthFooter,
  ErrorMsg,
  RoleGroup,
  RoleLabel,
  StepDots,
  StepDot,
  VendorNote,
  CaptchaSlot,
} from '../login/styled';

export default function RegisterPage() {
  const { t } = useTranslation();
  const {
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
  } = useRegisterPage();

  if (verificationPending) {
    return (
      <AuthShell>
        <AuthTitle $palette={palette}>Verify your email</AuthTitle>
        <AuthSubtitle $palette={palette}>
          Enter the one-time code Clerk sent to {draft.email}.
        </AuthSubtitle>
        {error && <ErrorMsg $palette={palette}>{error}</ErrorMsg>}
        <Field $palette={palette}>
          <Label $palette={palette}>Verification code</Label>
          <Input
            $palette={palette}
            inputMode="numeric"
            autoComplete="one-time-code"
            value={verificationCode}
            onChange={event => setVerificationCode(event.target.value)}
          />
        </Field>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onClick={submitVerification}
        >
          Verify and continue
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <StepDots>
        {Array.from({ length: totalSteps }, (_, i) => (
          <StepDot key={i} $active={i < step} $palette={palette} />
        ))}
      </StepDots>

      <AuthTitle $palette={palette}>{t('auth.registerTitle')}</AuthTitle>
      <AuthSubtitle $palette={palette}>
        {step === 1
          ? t('auth.role')
          : step === 2
          ? t('auth.registerSubtitle')
          : t('auth.pendingApproval')}
      </AuthSubtitle>

      {step === 1 && <SocialButtons />}
      {error && <ErrorMsg $palette={palette}>{error}</ErrorMsg>}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Field $palette={palette}>
              <Label $palette={palette}>{t('auth.role')}</Label>
              <RoleGroup $palette={palette}>
                <RoleLabel $palette={palette} $active={role === 'customer'}>
                  <input
                    type="radio"
                    checked={role === 'customer'}
                    onChange={() => setRole('customer')}
                  />
                  {t('auth.customer')}
                </RoleLabel>
                <RoleLabel $palette={palette} $active={role === 'vendor'}>
                  <input
                    type="radio"
                    checked={role === 'vendor'}
                    onChange={() => setRole('vendor')}
                  />
                  {t('auth.vendor')}
                </RoleLabel>
              </RoleGroup>
            </Field>
            <Button variant="primary" size="lg" fullWidth onClick={nextStep}>
              {t('common.next')}
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Field $palette={palette}>
              <Label $palette={palette}>{t('auth.name')}</Label>
              <Input
                $palette={palette}
                value={draft.name}
                onChange={e => updateDraft({ name: e.target.value })}
                required
              />
            </Field>
            <Field $palette={palette}>
              <Label $palette={palette}>{t('auth.email')}</Label>
              <Input
                $palette={palette}
                type="email"
                value={draft.email}
                onChange={e => updateDraft({ email: e.target.value })}
                required
              />
            </Field>
            <Field $palette={palette}>
              <Label $palette={palette}>{t('auth.password')}</Label>
              <Input
                $palette={palette}
                type="password"
                value={draft.password}
                onChange={e => updateDraft({ password: e.target.value })}
                required
              />
              <PasswordStrength password={draft.password} />
            </Field>
            <Field $palette={palette}>
              <Label $palette={palette}>Phone number</Label>
              <Input
                $palette={palette}
                type="tel"
                value={draft.phone}
                onChange={e => updateDraft({ phone: e.target.value })}
                required
              />
            </Field>
            <Field $palette={palette}>
              <Label $palette={palette}>{t('auth.city')}</Label>
              <Input
                $palette={palette}
                value={draft.city}
                onChange={e => updateDraft({ city: e.target.value })}
                required
              />
            </Field>
            <Button variant="ghost" size="sm" onClick={prevStep}>
              {t('common.back')}
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                if (role === 'vendor') nextStep();
                else submitRegistration();
              }}
            >
              {role === 'vendor' ? t('common.next') : t('auth.register')}
            </Button>
          </motion.div>
        )}

        {step === 3 && role === 'vendor' && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <VendorNote $palette={palette}>
              {t('auth.pendingApproval')} —{' '}
              {t('marketplace.aboutValueTrustDesc')}
            </VendorNote>
            <Button variant="ghost" size="sm" onClick={prevStep}>
              {t('common.back')}
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              onClick={submitRegistration}
            >
              {t('auth.register')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <CaptchaSlot id="clerk-captcha" />

      <AuthFooter $palette={palette}>
        {t('auth.hasAccount')} <Link to={ROUTES.LOGIN}>{t('auth.login')}</Link>
      </AuthFooter>
    </AuthShell>
  );
}
