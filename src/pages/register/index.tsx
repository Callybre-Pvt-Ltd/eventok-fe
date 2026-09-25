import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthShell } from '@/components/auth/auth-shell';
import { SocialButtons } from '@/components/auth/social-buttons';
import { PasswordStrength } from '@/components/auth/password-strength';
import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useRegisterPage } from './helper';
import {
  AuthTitle,
  AuthSubtitle,
  AuthForm,
  Field,
  FieldHint,
  Label,
  Input,
  AuthFooter,
  ErrorMsg,
  LinkRow,
  RoleGroup,
  RoleLabel,
  StepBody,
  StepDots,
  StepDot,
  SuccessIcon,
  TextButton,
  VendorNote,
  CaptchaSlot,
} from './styled';

const stepMotion = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

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
    continueFromDetails,
    submitRegistration,
    stage,
    verificationCode,
    setVerificationCode,
    submitVerification,
    resendCode,
    changeEmail,
    finish,
  } = useRegisterPage();

  if (stage === 'success') {
    return (
      <AuthShell>
        <SuccessIcon $palette={palette}>
          <CheckCircle2 size={36} aria-hidden />
        </SuccessIcon>
        <AuthTitle $palette={palette}>{t('auth.successTitle')}</AuthTitle>
        <AuthSubtitle $palette={palette}>
          {role === 'vendor'
            ? t('auth.successVendorSubtitle')
            : t('auth.successSubtitle')}
        </AuthSubtitle>
        <Button variant="primary" size="lg" fullWidth onClick={finish}>
          {t('auth.continueToSite')}
        </Button>
      </AuthShell>
    );
  }

  if (stage === 'verify') {
    return (
      <AuthShell>
        <AuthTitle $palette={palette}>{t('auth.verifyTitle')}</AuthTitle>
        <AuthSubtitle $palette={palette}>
          {t('auth.verifySubtitle', { email: draft.email })}
        </AuthSubtitle>
        {error && <ErrorMsg $palette={palette}>{error}</ErrorMsg>}
        <AuthForm
          onSubmit={event => {
            event.preventDefault();
            void submitVerification();
          }}
        >
          <Field $palette={palette}>
            <Label $palette={palette}>{t('auth.verificationCode')}</Label>
            <Input
              $palette={palette}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={verificationCode}
              onChange={event => setVerificationCode(event.target.value)}
              required
            />
          </Field>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            {t('auth.verifyAndContinue')}
          </Button>
          <LinkRow>
            <TextButton type="button" $palette={palette} onClick={changeEmail}>
              {t('auth.changeEmail')}
            </TextButton>
            <TextButton
              type="button"
              $palette={palette}
              onClick={() => void resendCode()}
            >
              {t('auth.resendCode')}
            </TextButton>
          </LinkRow>
        </AuthForm>
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
          <motion.div key="step1" {...stepMotion}>
            <StepBody>
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
            </StepBody>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" {...stepMotion}>
            <AuthForm
              onSubmit={event => {
                event.preventDefault();
                continueFromDetails();
              }}
            >
              <Field $palette={palette}>
                <Label $palette={palette}>{t('auth.name')}</Label>
                <Input
                  $palette={palette}
                  autoComplete="name"
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
                  autoComplete="email"
                  value={draft.email}
                  onChange={e => updateDraft({ email: e.target.value })}
                  required
                />
              </Field>
              <Field $palette={palette}>
                <Label $palette={palette}>{t('auth.password')}</Label>
                <PasswordInput
                  autoComplete="new-password"
                  value={draft.password}
                  onChange={password => updateDraft({ password })}
                  required
                />
                <FieldHint $palette={palette}>
                  {t('auth.passwordHint')}
                </FieldHint>
                <PasswordStrength password={draft.password} />
              </Field>
              <Field $palette={palette}>
                <Label $palette={palette}>{t('auth.confirmPassword')}</Label>
                <PasswordInput
                  autoComplete="new-password"
                  value={draft.confirmPassword}
                  onChange={confirmPassword => updateDraft({ confirmPassword })}
                  required
                />
              </Field>
              <CaptchaSlot id="clerk-captcha" />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                {role === 'vendor' ? t('common.next') : t('auth.register')}
              </Button>
              <Button variant="ghost" size="sm" onClick={prevStep}>
                {t('common.back')}
              </Button>
            </AuthForm>
          </motion.div>
        )}

        {step === 3 && role === 'vendor' && (
          <motion.div key="step3" {...stepMotion}>
            <StepBody>
              <VendorNote $palette={palette}>
                {t('auth.pendingApproval')} —{' '}
                {t('marketplace.aboutValueTrustDesc')}
              </VendorNote>
              <CaptchaSlot id="clerk-captcha" />
              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                onClick={() => void submitRegistration()}
              >
                {t('auth.register')}
              </Button>
              <Button variant="ghost" size="sm" onClick={prevStep}>
                {t('common.back')}
              </Button>
            </StepBody>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthFooter $palette={palette}>
        {t('auth.hasAccount')} <Link to={ROUTES.LOGIN}>{t('auth.login')}</Link>
      </AuthFooter>
    </AuthShell>
  );
}
