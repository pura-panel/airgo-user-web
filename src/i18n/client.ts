'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { isBrowser } from '@/lib/constants';
import { getCookie, setCookie } from '@/lib/cookies';
import { cookieName, fallbackLng, getOptions, languages } from './config';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(
  lng: string,
  ns?: string,
  options?: {
    keyPrefix: string;
  },
) {
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (getCookie(cookieName) === lng) return;
      setCookie(cookieName, lng);
    }, [lng]);
  }
  return ret;
}

export function getLanguage(language?: string) {
  const currentLanguage: string =
    language ||
    getCookie(cookieName) ||
    (isBrowser() && navigator?.language.split(',')[0]) ||
    '' ||
    fallbackLng;
  return currentLanguage;
}

export function useLanguage() {
  const { lng } = useParams<{ lng: string }>();
  const currentLanguage: string = getLanguage(lng);
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (language: string) => {
    setCookie(cookieName, language);
    router.push(pathname.replace(`/${currentLanguage}`, `/${language}`));
    router.refresh();
  };

  return {
    lng: currentLanguage,
    changeLanguage,
  };
}
