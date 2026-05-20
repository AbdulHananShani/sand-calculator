// ============================================================
// FILE: src/app/robots.txt/route.js
// PURPOSE: Robots.txt — updated to use www canonical domain.
//          Points sitemap to correct www URL.
// PLACEMENT: src/app/robots.txt/route.js (REPLACE)
// ============================================================

export async function GET() {
  const robotsTxt = `# Sand Calculator - robots.txt
User-agent: *
Allow: /
Disallow: /admin

# Canonical sitemap
Sitemap: https://www.sandcalculator.online/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain' },
  });
}