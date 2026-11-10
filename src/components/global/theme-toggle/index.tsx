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
  border: 1px solid var(--theme-toggle-border, rgba(124, 58, 237, 0.2));
  background: var(--theme-toggle-bg, rgba(255, 255, 255, 0.95));
  color: var(--theme-toggle-color, #7c3aed);
  cursor: pointer;
  padding: 0;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 2px 8px var(--theme-toggle-shadow, rgba(124, 58, 237, 0.08));

  &:hover {
    transform: translateY(-2px) scale(1.05);
    border-color: var(--color-primary, #7c3aed);
    background: var(--theme-toggle-hover-bg, #ede9fe);
    color: var(--color-primary, #7c3aed);
    box-shadow: 0 4px 14px var(--theme-toggle-shadow, rgba(124, 58, 237, 0.22));
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary, #7c3aed);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.96);
  }

  svg {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  [data-theme='dark'] & {
    --theme-toggle-border: rgba(167, 139, 250, 0.3);
    --theme-toggle-bg: rgba(20, 26, 50, 0.9);
    --theme-toggle-color: #c4b5fd;
    --theme-toggle-hover-bg: #1e1838;
    --theme-toggle-shadow: rgba(0, 0, 0, 0.4);
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
