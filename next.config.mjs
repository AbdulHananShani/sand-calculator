// ============================================================
// FILE: next.config.mjs
// PURPOSE: Next.js configuration with optimized settings for
//          Vercel deployment. Includes API timeout handling
//          and image optimization for Cloudinary.
// PLACEMENT: next.config.mjs (REPLACE)
// ============================================================

/** @type {import('next').NextConfig} */
const nextConfig = {

  // ── Image optimization — allow Cloudinary images ─────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  // ── Headers for better SEO and security ──────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
        ],
      },
      // Cache static assets
      {
        source: '/(.*)\\.(ico|svg|png|jpg|jpeg|webp|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // ── Redirects — canonical domain ─────────────────────────
  // Ensures sandcalculator.online redirects to www version
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sandcalculator.online' }],
        destination: 'https://www.sandcalculator.online/:path*',
        permanent: true,
      },
    ];
  },

};

export default nextConfig;