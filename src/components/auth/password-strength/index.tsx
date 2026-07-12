import { useTranslation } from 'react-i18next';
import { usePasswordStrength } from './helper';
import { Wrap, Bar, BarFill, Label } from './styled';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { t } = useTranslation();
  const { palette, score, labelKey, color } = usePasswordStrength(password);

  if (!password) return null;

  return (
    <Wrap>
      <Bar $palette={palette}>
        <BarFill $width={(score / 4) * 100} $color={color} />
      </Bar>
      <Label $palette={palette} $color={color}>
        {t('marketplace.authPasswordStrength')}: {t(labelKey)}
      </Label>
    </Wrap>
  );
}
