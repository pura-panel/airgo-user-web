import { DEFAULT_LANGUAGE } from '@/lib/constants';
import i18nrc from '../../.i18nrc';

export const fallbackLng = DEFAULT_LANGUAGE || i18nrc.entryLocale;

export const languages = i18nrc.outputLocales;
export const defaultNS = 'index';
export const cookieName = 'language';

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns: Array.isArray(ns) ? ns : [ns],
  };
}
