import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { CustomInitOptions, TAvailableLanguages } from '@/@types/i18next';

import enCommon from '@/locales/en/common.json';
import enAPI from '@/locales/en/api.json';
import enValidation from '@/locales/en/validation.json';

import ruCommon from '@/locales/ru/common.json';
import ruAPI from '@/locales/ru/api.json';
import ruValidation from '@/locales/ru/validation.json';
/**
 * Save a last selected language to the local storage.
 * @param language
 */
export const saveLastSelectedLanguage = (language: TAvailableLanguages) =>
  localStorage.setItem('language', language);

/** Get a last selected language from the local storage. */
export const getLastSelectedLanguage = () =>
  localStorage.getItem('language') as TAvailableLanguages;

i18n.on('languageChanged', saveLastSelectedLanguage);

export default i18n.use(initReactI18next).init({
  debug: true,
  supportedLngs: ['en', 'ru'],
  lng: getLastSelectedLanguage(),
  fallbackLng: 'en',
  ns: ['common', 'api', 'validation'],
  defaultNS: 'common',
  fallbackNS: 'common',
  resources: {
    en: { common: enCommon, api: enAPI, validation: enValidation },
    ru: { common: ruCommon, api: ruAPI, validation: ruValidation },
  },
  interpolation: {
    escapeValue: false,
  },
} satisfies CustomInitOptions);
