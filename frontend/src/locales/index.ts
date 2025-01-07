import en from './en/global.json';
import ge from './ge/global.json';
import { SupportedLanguage } from './types';

export const resources = {
  en: {
    global: en,
  },
  ge: {
    global: ge,
  },
};

export const supportedLanguages: SupportedLanguage[] = [
    { code: 'en', name: 'English' },
    { code: 'ge', name: 'ქართული' },
  ];