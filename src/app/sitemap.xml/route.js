// ============================================================
// FILE: src/app/sitemap.xml/route.js
// PURPOSE: Generates dynamic sitemap.xml for Google Search
//          Console. Lists all pages with priority and update
//          frequency. Critical for SEO and Google indexing.
//          Accessible at /sitemap.xml
// PLACEMENT: src/app/sitemap.xml/route.js (New File)
// ============================================================

import { calculators } from '@/data/calculators';
import { getAllBlogs } from '@/lib/blogUtils';

export async function GET() {
  // Base URL of your website
  const baseUrl = 'https://sandcalculator.online';

  // Current date for lastmod
  const today = new Date().toISOString().split('T')[0];

  // ── Static pages ─────────────────────────────────────────
  const staticPages = [
    { url: '/',         priority: '1.0', changefreq: 'weekly' },
    { url: '/calculators', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog',     priority: '0.8', changefreq: 'daily'  },
    { url: '/about',    priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy',  priority: '0.5', changefreq: 'monthly' },
  ];

  // ── Calculator pages ──────────────────────────────────────
  const calculatorPages = calculators.map((calc) => ({
    url: `/calculators/${calc.slug}`,
    priority: '0.9',
    changefreq: 'monthly',
  }));

  // ── Blog pages ────────────────────────────────────────────
  const blogs = getAllBlogs();
  const blogPages = blogs.map((blog) => ({
    url: `/blog/${blog.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));

  // ── Combine all pages ─────────────────────────────────────
  const allPages = [...staticPages, ...calculatorPages, ...blogPages];

  // ── Generate XML ──────────────────────────────────────────
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}