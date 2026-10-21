import { useCallback, useEffect, useRef, useState } from 'react';

const REFERRAL_CODE = 'EVENTOK100';

export function useReferEarn() {
  const [copied, setCopied] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copy = useCallback(() => {
    void navigator.clipboard?.writeText(REFERRAL_CODE);
    setCopied(true);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
  }, []);

  return { code: REFERRAL_CODE, copied, copy, enteredCode, setEnteredCode };
}
