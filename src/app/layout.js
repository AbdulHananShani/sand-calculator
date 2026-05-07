// ============================================================
// FILE: src/app/layout.js
// PURPOSE: Root layout with complete SEO setup including
//          canonical URLs, JSON-LD schema, Open Graph images,
//          and all meta tags required for Google ranking.
// PLACEMENT: src/app/layout.js (REPLACE existing file)
// ============================================================

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ── Google Font setup ────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// ── Site base URL ────────────────────────────────────────────
const BASE_URL = 'https://sandcalculator.online';

// ── Site-wide SEO Metadata ───────────────────────────────────
export const metadata = {
  // ── Basic ──────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Sand Calculator — Free Online Sand Estimator Tools',
    template: '%s | Sand Calculator',
  },
  description:
    'Free online sand calculators for yards, pavers, aquarium, pool, sandbox, artificial grass, brickwork, circles, cement mixing, and concrete. Get instant accurate results.',
  keywords: [
    'sand calculator',
    'sand estimator',
    'how much sand do i need',
    'cubic yards of sand',
    'sand calculator for pavers',
    'aquarium sand calculator',
    'pool sand calculator',
    'sandbox sand calculator',
    'sand for artificial grass',
    'sand and cement calculator',
    'sand for concrete',
    'sand for brickwork',
    'sand calculator online free',
    'sand weight calculator',
    'sand volume calculator',
  ],

  // ── Canonical ──────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Authors ────────────────────────────────────────────────
  authors: [{ name: 'Sand Calculator', url: BASE_URL }],
  creator: 'Sand Calculator',
  publisher: 'Sand Calculator',

  // ── Open Graph ─────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Sand Calculator',
    title: 'Sand Calculator — Free Online Sand Estimator Tools',
    description:
      'Calculate exactly how much sand you need for any project. Free tools for yards, pavers, pools, aquariums, sandboxes and more.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Sand Calculator — Free Online Sand Estimator Tools',
      },
    ],
  },

  // ── Twitter ────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Sand Calculator — Free Online Sand Estimator Tools',
    description:
      'Calculate exactly how much sand you need for any project.',
    images: [`${BASE_URL}/og-image.png`],
  },

  // ── Robots ─────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Verification (add after Google Search Console setup) ───
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};

// ── Website JSON-LD Schema ───────────────────────────────────
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sand Calculator',
  url: BASE_URL,
  description:
    'Free online sand calculators for construction, landscaping, aquariums, pools, and more.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/calculators/{search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// ── Organization JSON-LD Schema ──────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sand Calculator',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@sandcalculator.online',
    contactType: 'customer service',
  },
};

// ── Root Layout Component ────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* ── Favicon tags ── */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* ── Theme color for mobile browsers ── */}
        <meta name="theme-color" content="#0d9488" />

        {/* ── Geo targeting (optional but helpful) ── */}
        <meta name="geo.region" content="US" />
        <meta name="language" content="English" />
      </head>
      <body className="bg-dark-950 text-gray-100 font-sans antialiased flex flex-col min-h-screen">

        {/* ── Site Header ── */}
        <Header />

        {/* ── Main content ── */}
        <main className="flex-grow">
          {children}
        </main>

        {/* ── Site Footer ── */}
        <Footer />

      </body>
    </html>
  );
}