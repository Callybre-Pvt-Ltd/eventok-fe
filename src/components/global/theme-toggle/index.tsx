import { Sun, Moon } from 'lucide-react';
import styled from 'styled-components';
import { useTheme } from '@/theme';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

const ToggleButton = styled.button<{
  $compact?: boolean;
  $mode: 'light' | 'dark';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ $compact }) => ($compact ? '2.25rem' : '2.5rem')};
  height: ${({ $compact }) => ($compact ? '2.25rem' : '2.5rem')};
  min-width: ${({ $compact }) => ($compact ? '2.25rem' : '2.5rem')};
  min-height: ${({ $compact }) => ($compact ? '2.25rem' : '2.5rem')};
  border-radius: 9999px;
  border: 1px solid var(--theme-toggle-border, var(--color-border));
  background: var(--theme-toggle-bg, var(--color-surface));
  color: var(--theme-toggle-color, var(--color-primary));
  cursor: pointer;
  padding: 0;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-2px) scale(1.05);
    border-color: var(--color-primary);
    background: var(--theme-toggle-hover-bg, var(--color-primary-light));
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.96);
  }

  svg {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  [data-theme='light'] & {
    --theme-toggle-border: var(--color-border);
    --theme-toggle-bg: #ffffff;
    --theme-toggle-color: var(--color-primary);
    --theme-toggle-hover-bg: #fff7ed;
  }

  [data-theme='dark'] & {
    --theme-toggle-border: var(--color-border);
    --theme-toggle-bg: var(--color-surface);
    --theme-toggle-color: var(--color-primary);
    --theme-toggle-hover-bg: var(--color-surface-elevated);
  }
`;

export function ThemeToggle({ compact = false, className }: ThemeToggleProps) {
  const { mode, toggleTheme } = useTheme();

  return (
    <ToggleButton
      type="button"
      $compact={compact}
      $mode={mode}
      onClick={toggleTheme}
      className={className}
      aria-label={
        mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {mode === 'dark' ? (
        <Sun size={compact ? 16 : 18} strokeWidth={2} />
      ) : (
        <Moon size={compact ? 16 : 18} strokeWidth={2} />
      )}
    </ToggleButton>
  );
}
