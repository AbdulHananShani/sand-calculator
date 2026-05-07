// ============================================================
// FILE: src/app/not-found.js
// PURPOSE: Custom 404 page. Important for SEO — prevents
//          Google from seeing broken pages. Shows helpful
//          navigation to keep users on the site.
// PLACEMENT: src/app/not-found.js (New File)
// ============================================================

import Link from 'next/link';
import { Home, Calculator, ArrowRight } from 'lucide-react';

// ── SEO Metadata ─────────────────────────────────────────────
export const metadata = {
  title: '404 — Page Not Found | Sand Calculator',
  description: 'The page you are looking for does not exist. Browse our free sand calculators instead.',
  robots: { index: false, follow: true },
};

// ── 404 Page Component ───────────────────────────────────────
export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="section-wrapper text-center py-20">

        {/* 404 number */}
        <div className="text-8xl md:text-9xl font-black text-gradient mb-4">
          404
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The page you are looking for does not exist or has been moved.
          Let us help you find what you need.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link href="/calculators" className="btn-secondary flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            View Calculators
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}