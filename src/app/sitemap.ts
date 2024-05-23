import type { MetadataRoute } from 'next';
import { languages } from '@/i18n';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL as string,
      lastModified: new Date(),
      alternates: {
        languages: languages.reduce(
          (acc, lng) => {
            acc[lng] = `${SITE_URL}/${lng}`;
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
    },
  ];
}
