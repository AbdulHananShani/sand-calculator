// ============================================================
// FILE: src/app/robots.txt/route.js
// PURPOSE: Generates robots.txt file that tells search engine
//          crawlers which pages to index and which to skip.
//          Accessible at /robots.txt
// PLACEMENT: src/app/robots.txt/route.js (New File)
// ============================================================

export async function GET() {
  const robotsTxt = `# Sand Calculator - robots.txt
# Allow all search engines to crawl all pages

User-agent: *
Allow: /

# Block admin page from search engines
Disallow: /admin

# Sitemap location
Sitemap: https://sandcalculator.online/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}