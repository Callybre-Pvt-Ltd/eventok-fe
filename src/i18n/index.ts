import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { common } from './locales/en/common';
import { auth } from './locales/en/auth';
import { landing } from './locales/en/landing';
import { customer } from './locales/en/customer';
import { vendor } from './locales/en/vendor';
import { admin } from './locales/en/admin';
import { nav } from './locales/en/nav';
import { marketplace } from './locales/en/marketplace';
import { categoriesPage } from './locales/en/categories';
import { servicesPage } from './locales/en/services';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        common,
        auth,
        landing,
        customer,
        vendor,
        admin,
        nav,
        marketplace,
        categoriesPage,
        servicesPage,
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
