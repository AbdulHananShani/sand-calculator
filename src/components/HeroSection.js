// ============================================================
// FILE: src/components/HeroSection.js
// PURPOSE: Landing page hero section with headline, subtext,
//          CTA buttons, and animated background grid.
//          Used only on the Home page (src/app/page.js).
// PLACEMENT: src/components/HeroSection.js (New File)
// ============================================================

'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, CheckCircle } from 'lucide-react';

// ── Trust badges shown in hero ───────────────────────────────
const trustBadges = [
  '10 Professional Calculators',
  'Real-Life Formulas',
  'Instant Accurate Results',
  '100% Free to Use',
];

// ── HeroSection Component ────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* ── Animated Background ──────────────────────────── */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* ── Gradient Orbs (decorative background blobs) ── */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* ── Radial gradient overlay ───────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-transparent to-dark-950" />

      {/* ── Hero Content ─────────────────────────────────── */}
      <div className="relative z-10 section-wrapper text-center py-20">

        {/* ── Top Badge ────────────────────────────────────── */}
        <div className="inline-flex items-center gap-2 bg-primary-600/10 border border-primary-500/20 rounded-full px-4 py-2 mb-8">
          <Calculator className="w-4 h-4 text-primary-400" />
          <span className="text-primary-400 text-sm font-medium">
            Professional Sand Estimation Tools
          </span>
        </div>

        {/* ── Main Headline ─────────────────────────────────── */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          Calculate Sand
          <span className="block text-gradient">
            Like a Pro
          </span>
        </h1>

        {/* ── Subheadline ───────────────────────────────────── */}
        <p className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Stop guessing. Use our free professional sand calculators to get
          exact quantities for any project — from backyard sandboxes to
          large-scale construction sites.
        </p>

        {/* ── CTA Buttons ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">

          {/* Primary CTA */}
          <Link
            href="/calculators"
            className="btn-primary flex items-center gap-2 text-base px-8 py-4"
          >
            Explore All Calculators
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/blog"
            className="btn-secondary flex items-center gap-2 text-base px-8 py-4"
          >
            Read Our Blog
          </Link>

        </div>

        {/* ── Trust Badges ──────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 text-gray-400 text-sm"
            >
              <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span>{badge}</span>
            </div>
          ))}
        </div>

        {/* ── Scroll indicator ──────────────────────────────── */}
        <div className="mt-20 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-600 text-xs uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>

      </div>
    </section>
  );
}