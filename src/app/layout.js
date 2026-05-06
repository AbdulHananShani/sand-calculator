// ============================================================
// FILE: src/app/layout.js
// PURPOSE: Root layout that wraps every page on the site.
//          Imports global CSS, sets metadata, and renders
//          Header and Footer around all page content.
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

// ── Site-wide SEO Metadata ───────────────────────────────────
export const metadata = {
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
  ],
  authors: [{ name: 'Sand Calculator' }],
  creator: 'Sand Calculator',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Sand Calculator',
    title: 'Sand Calculator — Free Online Sand Estimator Tools',
    description:
      'Calculate exactly how much sand you need for any project. Free tools for yards, pavers, pools, aquariums, sandboxes and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sand Calculator — Free Online Sand Estimator Tools',
    description:
      'Calculate exactly how much sand you need for any project.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Root Layout Component ────────────────────────────────────
// Wraps every page with HTML structure, Header, and Footer
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-dark-950 text-gray-100 font-sans antialiased flex flex-col min-h-screen">

        {/* ── Site Header — appears on every page ── */}
        <Header />

        {/* ── Main content area — each page renders here ── */}
        <main className="flex-grow">
          {children}
        </main>

        {/* ── Site Footer — appears on every page ── */}
        <Footer />

      </body>
    </html>
  );
}