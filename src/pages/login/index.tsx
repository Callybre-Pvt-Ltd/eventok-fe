import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthShell } from '@/components/auth/auth-shell';
import { SocialButtons } from '@/components/auth/social-buttons';
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
} from './styled';

export default function LoginPage() {
  const { t } = useTranslation();
  const { palette, error, loading, authLoading, nextPath, onSubmit } =
    useLoginPage();

  return (
    <AuthShell>
      <AuthTitle $palette={palette}>{t('auth.loginTitle')}</AuthTitle>
      <AuthSubtitle $palette={palette}>{t('auth.loginSubtitle')}</AuthSubtitle>
      {error && (
        <ErrorMsg $palette={palette}>{t('auth.invalidCredentials')}</ErrorMsg>
      )}
      <AuthForm
        onSubmit={e => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          onSubmit(fd.get('email') as string, fd.get('password') as string);
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
            placeholder="you@example.com"
            required
          />
        </Field>
        <Field $palette={palette}>
          <Label $palette={palette}>{t('auth.password')}</Label>
          <Input
            as={motion.input}
            whileFocus={{ scale: 1.01 }}
            $palette={palette}
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
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
          <Link to={ROUTES.FORGOT_PASSWORD}>Forgot your password?</Link>
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
