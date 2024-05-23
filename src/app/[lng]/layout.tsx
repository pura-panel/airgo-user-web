import { Noto_Sans as FontSans } from 'next/font/google';
import { cookies } from 'next/headers';
import { BodyAnalytics, HeadAnalytics } from '@/analytics';
import { dir, languages } from '@/i18n';
import LayoutFooter from '@/layout/footer';
import { LayoutHeader } from '@/layout/header';
import LayoutScroll from '@/layout/scroll';
import { AuthProvider, ReactQueryProvider } from '@/providers';
import { DEFAULT_MODE, DEFAULT_SYSTEM_MODE, DEFAULT_THEME } from '@/lib/constants';
import { getCookie } from '@/lib/cookies';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import '../../../tailwind.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export { metadata, viewport } from '@/lib/site';

export async function generateStaticParams() {
  return languages.map((lng: string) => ({ lng }));
}

function getMode() {
  let mode = getCookie('mode', { cookies }) || DEFAULT_MODE;
  if (mode === 'system') mode = getCookie('systemMode', { cookies }) || DEFAULT_SYSTEM_MODE;
  return mode;
}

function getTheme() {
  return getCookie('theme', { cookies }) || DEFAULT_THEME;
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const mode = getMode();
  const theme = getTheme();
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      data-mode={mode}
      data-theme={theme}
      style={{
        colorScheme: mode,
      }}
      suppressHydrationWarning
    >
      <head>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
        <HeadAnalytics />
      </head>
      <body className={cn('w-screen overflow-x-hidden font-sans antialiased', fontSans.variable)}>
        <ReactQueryProvider>
          <AuthProvider>
            <LayoutHeader />
            <main className='relative min-h-[calc(100vh-65px-85px)]'>{children}</main>
            <LayoutFooter />
          </AuthProvider>
          <LayoutScroll />
          <Toaster closeButton richColors visibleToasts={9} />
        </ReactQueryProvider>
        <BodyAnalytics />
      </body>
    </html>
  );
}
