import { message } from 'antd';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/theme';
import { useAuth } from '@/hooks/auth/use-auth';
import { readNextPath } from '@/utils/auth/auth-return';

export function useSocialButtons(onSocial?: (p: 'google') => void) {
  const { palette } = useTheme();
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  // Google sign-in keeps the same ?next= destination as the password form.
  const nextPath = readNextPath(location.search);

  const handleGoogle = () => {
    onSocial?.('google');
    void signInWithGoogle(nextPath).then(error => {
      if (error) message.error(error);
    });
  };

  return { palette, handleGoogle };
}
