import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthShell } from '@/components/auth/auth-shell';
import { SocialButtons } from '@/components/auth/social-buttons';
import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { withNextPath } from '@/utils/auth/auth-return';
import { useLoginPage } from './helper';
import {
  AuthTitle,
  AuthSubtitle,
  AuthForm,
  Field,
  Label,
  Input,
  AuthFooter,
  ErrorMsg,
  TextButton,
} from './styled';

export default function LoginPage() {
  const { t } = useTranslation();
  const {
    palette,
    error,
    loading,
    authLoading,
    nextPath,
    onSubmit,
    needsCode,
    code,
    setCode,
    onVerifyCode,
    cancelCode,
  } = useLoginPage();

  if (needsCode) {
    return (
      <AuthShell>
        <AuthTitle $palette={palette}>{t('auth.deviceVerifyTitle')}</AuthTitle>
        <AuthSubtitle $palette={palette}>
          {t('auth.deviceVerifySubtitle')}
        </AuthSubtitle>
        {error && <ErrorMsg $palette={palette}>{error}</ErrorMsg>}
        <AuthForm
          onSubmit={e => {
            e.preventDefault();
            void onVerifyCode();
          }}
        >
          <Field $palette={palette}>
            <Label $palette={palette}>{t('auth.verificationCode')}</Label>
            <Input
              $palette={palette}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={e => setCode(e.target.value)}
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
          <TextButton type="button" $palette={palette} onClick={cancelCode}>
            {t('auth.backToLogin')}
          </TextButton>
        </AuthForm>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <AuthTitle $palette={palette}>{t('auth.loginTitle')}</AuthTitle>
      <AuthSubtitle $palette={palette}>{t('auth.loginSubtitle')}</AuthSubtitle>
      {error && <ErrorMsg $palette={palette}>{error}</ErrorMsg>}
      <AuthForm
        onSubmit={e => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          void onSubmit(
            fd.get('email') as string,
            fd.get('password') as string,
          );
        }}
      >
        <Field $palette={palette}>
          <Label $palette={palette}>{t('auth.email')}</Label>
          <Input
            as={motion.input}
            whileFocus={{ scale: 1.01 }}
            $palette={palette}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </Field>
        <Field $palette={palette}>
          <Label $palette={palette}>{t('auth.password')}</Label>
          <PasswordInput name="password" placeholder="••••••••" required />
        </Field>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading || authLoading}
          disabled={authLoading}
        >
          {t('auth.login')}
        </Button>
        <AuthFooter $palette={palette}>
          <Link to={ROUTES.FORGOT_PASSWORD}>{t('auth.forgotPassword')}</Link>
        </AuthFooter>
      </AuthForm>
      <SocialButtons dividerPosition="above" />
      <AuthFooter $palette={palette}>
        {t('auth.noAccount')}{' '}
        <Link to={withNextPath(ROUTES.REGISTER, nextPath)}>
          {t('auth.register')}
        </Link>
      </AuthFooter>
    </AuthShell>
  );
}
