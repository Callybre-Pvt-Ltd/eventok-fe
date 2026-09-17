import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useHomePage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('common.appName')} — ${t(
      'storefront.trendingTitle',
    )}`;
  }, [t]);
}
