import { useCallback, useState } from 'react';

export function useCustomSearchInput(initial = '') {
  const [value, setValue] = useState(initial);

  const onChange = useCallback((next: string) => {
    setValue(next);
  }, []);

  const clear = useCallback(() => {
    setValue('');
  }, []);

  return { value, onChange, clear };
}
