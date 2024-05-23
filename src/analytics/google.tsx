import {
  GoogleAnalytics as Analytics,
  GoogleTagManager as TagManager,
} from '@next/third-parties/google';
import { GOOGLE_ANALYTICS_ID, GOOGLE_TAG_MANAGER_ID } from '@/lib/constants';

/**
 * header script
 */
export function GoogleTagManager() {
  return GOOGLE_TAG_MANAGER_ID && <TagManager gtmId={GOOGLE_TAG_MANAGER_ID} />;
}

/**
 * body script
 */
export function GoogleAnalytics() {
  return GOOGLE_ANALYTICS_ID && <Analytics gaId={GOOGLE_ANALYTICS_ID} />;
}
