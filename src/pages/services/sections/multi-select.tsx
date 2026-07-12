import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { MultiMenu, MultiOption, MultiTrigger, MultiWrap } from '../styled';

export interface MultiOptionItem {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: readonly MultiOptionItem[];
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  label,
  options,
  values,
  onChange,
  placeholder = 'Any',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('mousedown', onPointer);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const summary =
    values.length === 0
      ? placeholder
      : values.length === 1
      ? options.find(o => o.value === values[0])?.label ?? values[0]
      : `${values.length} selected`;

  const toggle = (value: string) => {
    onChange(
      values.includes(value)
        ? values.filter(v => v !== value)
        : [...values, value],
    );
  };

  return (
    <MultiWrap ref={wrapRef}>
      <span>{label}</span>
      <MultiTrigger
        type="button"
        $active={values.length > 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(prev => !prev)}
      >
        <span>{summary}</span>
        <ChevronDown size={16} aria-hidden />
      </MultiTrigger>
      {open ? (
        <MultiMenu id={listId} role="listbox" aria-multiselectable>
          {options.map(opt => {
            const selected = values.includes(opt.value);
            return (
              <MultiOption
                key={opt.value}
                type="button"
                role="option"
                aria-selected={selected}
                $selected={selected}
                onClick={() => toggle(opt.value)}
              >
                <span>{opt.label}</span>
                {selected ? <Check size={14} aria-hidden /> : null}
              </MultiOption>
            );
          })}
        </MultiMenu>
      ) : null}
    </MultiWrap>
  );
}
