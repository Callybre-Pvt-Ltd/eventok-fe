import { useCallback, useState } from 'react';

const DISMISS_KEY = 'eventok.appBanner.dismissed';

export function useAnnouncementBar() {
  const [visible, setVisible] = useState(() => {
    try {
      return window.sessionStorage.getItem(DISMISS_KEY) !== '1';
    } catch {
      return true;
    }
  });

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  return { visible, dismiss };
}
