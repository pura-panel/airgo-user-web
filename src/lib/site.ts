import { Metadata, Viewport } from 'next';
import { languages } from '@/i18n';
import { SITE_URL } from './constants';

export const metadata: Metadata = {
  title: {
    default: 'AirGo | AirGo Panel',
    template: 'AirGo | %s | AirGo Panel',
  },
  keywords: ['AirGo', 'AirGo Panel'],
  description: 'AirGo Panel',
  other: {
    renderer: 'webkit',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
      },
      {
        url: '/favicon.ico',
        sizes: '48x48',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
    },
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: Object.fromEntries(languages.map((language) => [language, `/${language}`])),
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      'index': true,
      'follow': false,
      'noimageindex': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
  viewportFit: 'cover',
};
