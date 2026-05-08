// ============================================================
// FILE: src/app/sitemap.xml/route.js
// PURPOSE: Dynamic sitemap — updated to await async
//          getAllBlogs() from Supabase database.
// PLACEMENT: src/app/sitemap.xml/route.js (REPLACE)
// ============================================================

import { calculators } from '@/data/calculators';
import { getAllBlogs } from '@/lib/blogUtils';

export async function GET() {
  const baseUrl = 'https://sandcalculator.online';
  const today   = new Date().toISOString().split('T')[0];

  // ── Static pages ─────────────────────────────────────────
  const staticPages = [
    { url: '/',            priority: '1.0', changefreq: 'weekly'  },
    { url: '/calculators', priority: '0.9', changefreq: 'weekly'  },
    { url: '/blog',        priority: '0.8', changefreq: 'daily'   },
    { url: '/about',       priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy',     priority: '0.5', changefreq: 'monthly' },
  ];

  // ── Calculator pages ──────────────────────────────────────
  const calculatorPages = calculators.map((calc) => ({
    url:        `/calculators/${calc.slug}`,
    priority:   '0.9',
    changefreq: 'monthly',
  }));

  // ── Blog pages — await async Supabase call ────────────────
  const blogs     = await getAllBlogs();
  const blogPages = Array.isArray(blogs)
    ? blogs.map((blog) => ({
        url:        `/blog/${blog.slug}`,
        priority:   '0.7',
        changefreq: 'monthly',
      }))
    : [];

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
    headers: { 'Content-Type': 'application/xml' },
  });
}