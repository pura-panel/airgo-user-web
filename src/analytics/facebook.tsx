import Script from 'next/script';
import { FACEBOOK_ANALYTICS_ID } from '@/lib/constants';

export default function FacebookAnalytics() {
  return (
    FACEBOOK_ANALYTICS_ID && (
      <>
        <Script
          async
          defer
          crossOrigin='anonymous'
          src='https://connect.facebook.net/en_US/sdk.js'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.fbAsyncInit = function() {
              FB.init({
                appId: '${FACEBOOK_ANALYTICS_ID}',
                xfbml: true,
                version: 'v19.0'
              });
              FB.AppEvents.logPageView();
            };
            `,
          }}
        />
      </>
    )
  );
}
