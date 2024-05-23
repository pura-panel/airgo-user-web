import { NextRequest } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import { cookieName, fallbackLng, languages } from './i18n';

export function middleware(request: NextRequest) {
  return i18nRouter(request, {
    defaultLocale: fallbackLng,
    locales: languages,
    localeCookie: cookieName,
  });
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
