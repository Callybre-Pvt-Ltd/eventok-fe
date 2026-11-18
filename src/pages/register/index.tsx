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
    isLoggedIn,
    hasVendorProfile,
    existingVendorStatus,
    sessionUser,
    navigate,
  } = useRegisterPage();

  if (hasVendorProfile) {
    return (
      <AuthShell>
        <SuccessIcon $palette={palette}>
          <CheckCircle2 size={36} aria-hidden />
        </SuccessIcon>
        <AuthTitle $palette={palette}>Vendor Profile Exists</AuthTitle>
        <AuthSubtitle $palette={palette}>
          You already have a vendor profile associated with{' '}
          {sessionUser?.email ?? 'your account'} (Status:{' '}
          {existingVendorStatus ?? 'pending'}).
        </AuthSubtitle>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => {
            navigate(
              existingVendorStatus === 'approved'
                ? ROUTES.VENDOR_DASHBOARD
                : ROUTES.VENDOR_PENDING,
              { replace: true },
            );
          }}
        >
          {existingVendorStatus === 'approved'
            ? 'Go to Vendor Dashboard'
            : 'View Application Status'}
        </Button>
      </AuthShell>
    );
  }

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
          {role === 'vendor' && isLoggedIn
            ? 'View Application Status'
            : t('auth.continueToSite')}
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
        {isLoggedIn && role === 'vendor'
          ? 'Apply for a Vendor profile using your authenticated account'
          : step === 1
          ? t('auth.role')
          : step === 2
          ? t('auth.registerSubtitle')
          : t('auth.pendingApproval')}
      </AuthSubtitle>

      {step === 1 && !isLoggedIn && <SocialButtons />}
      {error && <ErrorMsg $palette={palette}>{error}</ErrorMsg>}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" {...stepMotion}>
            <StepBody>
              {isLoggedIn && (
                <VendorNote $palette={palette}>
                  {role === 'vendor'
                    ? `You are applying as a Vendor using your account (${sessionUser?.email}). Your current role and credentials will remain untouched.`
                    : `You are currently signed in as ${
                        sessionUser?.name || sessionUser?.email
                      }.`}
                </VendorNote>
              )}
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
              {isLoggedIn && role === 'customer' ? (
                <Button variant="primary" size="lg" fullWidth onClick={finish}>
                  {t('auth.continueToSite')}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={nextStep}
                >
                  {isLoggedIn ? 'Continue to Vendor Details' : t('common.next')}
                </Button>
              )}
            </StepBody>
          </motion.div>
        )}

        {step === 2 && isLoggedIn && role === 'vendor' && (
          <motion.div key="step2-vendor-auth" {...stepMotion}>
            <AuthForm
              onSubmit={event => {
                event.preventDefault();
                continueFromDetails();
              }}
            >
              <VendorNote $palette={palette}>
                Registering Vendor profile for{' '}
                <strong>{sessionUser?.email}</strong>
              </VendorNote>
              <Field $palette={palette}>
                <Label $palette={palette}>Business Name *</Label>
                <Input
                  $palette={palette}
                  value={draft.businessName}
                  onChange={e => updateDraft({ businessName: e.target.value })}
                  placeholder="e.g. Royal Decorators"
                  required
                />
              </Field>
              <Field $palette={palette}>
                <Label $palette={palette}>Owner / Contact Name</Label>
                <Input
                  $palette={palette}
                  value={draft.name}
                  onChange={e => updateDraft({ name: e.target.value })}
                  placeholder="Owner name"
                />
              </Field>
              <Field $palette={palette}>
                <Label $palette={palette}>Mobile Number</Label>
                <Input
                  $palette={palette}
                  type="tel"
                  value={draft.phone}
                  onChange={e => updateDraft({ phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </Field>
              <Field $palette={palette}>
                <Label $palette={palette}>{t('auth.city')}</Label>
                <Input
                  $palette={palette}
                  value={draft.city}
                  onChange={e => updateDraft({ city: e.target.value })}
                  placeholder="e.g. Mumbai, Delhi, Jaipur"
                />
              </Field>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                Submit Vendor Application
              </Button>
              <Button variant="ghost" size="sm" onClick={prevStep}>
                {t('common.back')}
              </Button>
            </AuthForm>
          </motion.div>
        )}

        {step === 2 && !isLoggedIn && (
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

        {step === 3 && !isLoggedIn && role === 'vendor' && (
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

      {!isLoggedIn && (
        <AuthFooter $palette={palette}>
          {t('auth.hasAccount')}{' '}
          <Link to={ROUTES.LOGIN}>{t('auth.login')}</Link>
        </AuthFooter>
      )}
    </AuthShell>
  );
}
