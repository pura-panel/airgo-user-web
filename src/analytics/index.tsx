import BaiduAnalytics from './baidu';
import FacebookAnalytics from './facebook';
import { GoogleAnalytics, GoogleTagManager } from './google';
import YandexAnalytics from './yandex';

export function HeadAnalytics() {
  return (
    <>
      <GoogleTagManager />
    </>
  );
}

export function BodyAnalytics() {
  return (
    <>
      <GoogleAnalytics />
      <YandexAnalytics />
      <FacebookAnalytics />
      <BaiduAnalytics />
    </>
  );
}
