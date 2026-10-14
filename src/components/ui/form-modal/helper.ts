import { useTheme } from '@/theme';

export function useFormModal() {
  const { palette } = useTheme();
  return { palette };
}
