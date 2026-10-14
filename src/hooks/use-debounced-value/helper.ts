import { useEffect, useState } from 'react';

const DEFAULT_DELAY_MS = 300;

/** Value that settles `delay` ms after the last change — keeps a search box from firing
 *  a request on every keystroke. */
export function useDebouncedValue<T>(value: T, delay = DEFAULT_DELAY_MS): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
