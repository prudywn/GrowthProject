/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'hhttp://growthpartners.co.ke/',
  generateRobotsTxt: true, // Generate robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/_next',
          '/_error',
          '/404',
          '/500',
          '/*.json$',
          '/*?*',
        ],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://growthpartners.co.ke/'}/sitemap.xml`,
    ],
  },
  exclude: [
    '/server-sitemap.xml',
    '/admin/*',
    '/api/*',
    '/_next/*',
    '/_error',
    '/404',
    '/500',
  ],
  // Default transformation function
  transform: async (config, path) => {
    // Custom priority based on path depth and importance
    const getPriority = (path) => {
      if (path === '/') return 1.0;
      if (path.endsWith('/services') || path.endsWith('/about')) return 0.9;
      if (path.includes('/blog/') || path.includes('/services/')) return 0.8;
      return 0.7;
    };

    // Last modified date
    const lastmod = new Date().toISOString();

    return {
      loc: path, // URL
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: getPriority(path),
      lastmod,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // Additional configuration for dynamic routes
  // You'll need to implement getServerSideSitemap in your API routes
  // for dynamic content like blog posts, services, etc.
  additionalPaths: async (config) => [
    // Example for dynamic routes:
    // await config.transform(config, '/dynamic-page-1'),
  ],
  // Target directory where the sitemap will be written
  outDir: 'public',
  // Generate index sitemap (useful for large sites)
  generateIndexSitemap: false,
  // Auto-detect dynamic routes
  autoLastmod: true,
  // Custom sitemap size (default: 5000)
  sitemapSize: 5000,
  // Add trailing slash to URLs
  trailingSlash: false,
  // Add xhtml namespace
  xslUrl: '/sitemap.xsl', // Optional: Add if you have a custom XSL stylesheet
};
