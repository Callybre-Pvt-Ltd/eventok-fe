import { useTheme } from '@/theme';
import { useAuth } from '@/hooks/auth/use-auth';

export function useSocialButtons(onSocial?: (p: 'google') => void) {
  const { palette } = useTheme();
  const { signInWithGoogle } = useAuth();
  const handleGoogle = () => {
    onSocial?.('google');
    void signInWithGoogle();
  };
  return { palette, handleGoogle };
}
