import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthShell } from '@/components/auth/auth-shell';
import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useForgotPasswordPage } from './helper';
import {
  AuthFooter,
  AuthForm,
  AuthSubtitle,
  AuthTitle,
  ErrorMsg,
  Field,
  FieldHint,
  Input,
  Label,
  LinkRow,
  SuccessIcon,
  TextButton,
} from '../login/styled';

export default function ForgotPasswordPage() {
  const {
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
    finish,
    backToEmail,
  } = useForgotPasswordPage();

  if (stage === 'success') {
    return (
      <AuthShell>
        <SuccessIcon $palette={palette}>
          <CheckCircle2 size={36} aria-hidden />
        </SuccessIcon>
        <AuthTitle $palette={palette}>{t('auth.resetSuccessTitle')}</AuthTitle>
        <AuthSubtitle $palette={palette}>
          {t('auth.resetSuccessSubtitle')}
        </AuthSubtitle>
        <Button variant="primary" size="lg" fullWidth onClick={finish}>
          {t('auth.continueToSite')}
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <AuthTitle $palette={palette}>{t('auth.resetTitle')}</AuthTitle>
      <AuthSubtitle $palette={palette}>
        {stage === 'email'
          ? t('auth.resetEmailSubtitle')
          : t('auth.resetCodeSubtitle', { email })}
      </AuthSubtitle>
      {error && <ErrorMsg $palette={palette}>{error}</ErrorMsg>}
      <AuthForm
        onSubmit={event => {
          event.preventDefault();
          void submit();
        }}
      >
        {stage === 'email' ? (
          <Field $palette={palette}>
            <Label $palette={palette}>{t('auth.email')}</Label>
            <Input
              $palette={palette}
              type="email"
              autoComplete="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </Field>
        ) : (
          <>
            <Field $palette={palette}>
              <Label $palette={palette}>{t('auth.verificationCode')}</Label>
              <Input
                $palette={palette}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={event => setCode(event.target.value)}
                required
              />
            </Field>
            <Field $palette={palette}>
              <Label $palette={palette}>{t('auth.newPassword')}</Label>
              <PasswordInput
                autoComplete="new-password"
                value={password}
                onChange={setPassword}
                required
              />
              <FieldHint $palette={palette}>{t('auth.passwordHint')}</FieldHint>
            </Field>
            <Field $palette={palette}>
              <Label $palette={palette}>{t('auth.confirmPassword')}</Label>
              <PasswordInput
                autoComplete="new-password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                required
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
          {stage === 'email' ? t('auth.sendCode') : t('auth.resetPassword')}
        </Button>
        {stage === 'code' ? (
          <LinkRow>
            <TextButton type="button" $palette={palette} onClick={backToEmail}>
              {t('auth.changeEmail')}
            </TextButton>
            <TextButton
              type="button"
              $palette={palette}
              disabled={loading}
              onClick={() => void resend()}
            >
              {t('auth.resendCode')}
            </TextButton>
          </LinkRow>
        ) : null}
      </AuthForm>
      <AuthFooter $palette={palette}>
        <Link to={ROUTES.LOGIN}>{t('auth.backToLogin')}</Link>
      </AuthFooter>
    </AuthShell>
  );
}
