/* eslint-disable @typescript-eslint/no-unused-vars */

import { CustomTypeOptions, InitOptions } from 'i18next';

type TAvailableLocales = 'en';

type TAvailableNamespaces = 'common' | 'api' | 'validation';

type TResources = {
  common: TCommonResource;
  api: TAPIResource;
  validation: TValidationResource;
};

interface CustomInitOptions<T = object> extends InitOptions<T> {
  resources: Record<TAvailableLocales, TResources>;
  lng: TAvailableLocales;
  fallbackLng: TAvailableLocales | FallbackLng;
  supportedLngs: readonly TAvailableLocales[];
  ns: readonly TAvailableNamespaces[];
  defaultNS: TAvailableNamespaces;
  fallbackNS: TAvailableNamespaces;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    ns: TAvailableNamespaces[];
    resources: TResources;
  }
}
