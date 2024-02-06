import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { CustomInitOptions } from '@/@types/i18next';

import enCommon from '@/locales/en/common.json';
import enAPI from '@/locales/en/api.json';
import enValidation from '@/locales/en/validation.json';

export default i18n.use(initReactI18next).init({
  supportedLngs: ['en'],
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'api', 'validation'],
  defaultNS: 'common',
  fallbackNS: 'common',
  resources: {
    en: { common: enCommon, api: enAPI, validation: enValidation },
  },
  interpolation: {
    escapeValue: false,
  },
} satisfies CustomInitOptions);
