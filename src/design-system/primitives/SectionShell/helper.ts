import { useRef } from 'react';
import { useDesignTokens } from '../../hooks/useDesignTokens';

export function useSectionShell() {
  const { colors } = useDesignTokens();
  const ref = useRef<HTMLElement>(null);
  return { colors, ref };
}
