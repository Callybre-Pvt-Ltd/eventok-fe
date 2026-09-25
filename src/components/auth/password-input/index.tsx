import { Eye, EyeOff } from 'lucide-react';
import { usePasswordInput } from './helper';
import { PasswordField, ToggleButton, Wrap } from './styled';

interface PasswordInputProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

export function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
  autoComplete = 'current-password',
  required,
}: PasswordInputProps) {
  const { palette, visible, toggle, toggleLabel } = usePasswordInput();

  return (
    <Wrap>
      <PasswordField
        $palette={palette}
        name={name}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange ? e => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
      <ToggleButton
        type="button"
        $palette={palette}
        aria-label={toggleLabel}
        aria-pressed={visible}
        onClick={toggle}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </ToggleButton>
    </Wrap>
  );
}
