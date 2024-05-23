import nextPWA from 'next-pwa';

const ENV_KYES = [
  'DEFAULT_MODE',
  'DEFAULT_THEME',
  'DEFAULT_LANGUAGE',
  'SITE_URL',
  'API_URL',
  'EMAIL',
  'GITHUB_LINK',
  'TWITTER_LINK',
  'DISCORD_LINK',
  'INSTAGRAM_LINK',
  'LINKEDIN_LINK',
  'TELEGRAM_LINK',
  'GOOGLE_TAG_MANAGER_ID',
  'GOOGLE_ANALYTICS_ID',
  'YANDEX_ANALYTICS_ID',
  'FACEBOOK_ANALYTICS_ID',
  'BAIDU_ANALYTICS_ID',
];

const env = Object.fromEntries(ENV_KYES.map((key) => [key, process.env[key]]));

/** @type {import('next').NextConfig} */
const nextConfig = {
  env,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

export default withPWA(nextConfig);
