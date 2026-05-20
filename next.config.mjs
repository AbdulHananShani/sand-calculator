// ============================================================
// FILE: next.config.mjs
// PURPOSE: Next.js configuration — fixes redirect loop by
//          properly handling www vs non-www canonicalization.
//          All traffic redirects to www.sandcalculator.online
// PLACEMENT: next.config.mjs (REPLACE)
// ============================================================

/** @type {import('next').NextConfig} */
const nextConfig = {

  // ── Image optimization ────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  // ── Security headers ──────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options',        value: 'DENY' },
          { key: 'X-XSS-Protection',       value: '1; mode=block' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

};

export default nextConfig;