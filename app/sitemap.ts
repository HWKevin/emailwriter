import type { MetadataRoute } from 'next';
import { seoPages } from '@/data/seoPages';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://emailwriter.zenrypro.com';

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...seoPages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
