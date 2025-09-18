import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const base = 'https://minhlocgroup.com';
    const routes: string[] = [
        '/',
        '/about',
        '/projects',
        '/contact',
        '/sam',
        '/business-areas',
        '/sam/sam-ngoc-linh-tuoi-10-nam',
        '/sam/sam-han-quoc-hop-100g',
    ];

    const now = new Date();
    return routes.map((url) => ({ url: `${base}${url}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 }));
}
