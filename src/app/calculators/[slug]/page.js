// ============================================================
// FILE: src/app/calculators/[slug]/page.js
// PURPOSE: Dynamic page that renders the correct calculator
//          based on the URL slug. Handles all 10 calculators
//          from a single file using the slug to match data.
//          Also renders the SEO description below calculator.
// PLACEMENT: src/app/calculators/[slug]/page.js (New File)
// ============================================================

import { calculators } from '@/data/calculators';
import { notFound } from 'next/navigation';
import CalculatorEngine from '@/components/CalculatorEngine';

// ── Generate static paths for all 10 calculators ────────────
// This tells Next.js to pre-render all calculator pages at build time
export async function generateStaticParams() {
  return calculators.map((calc) => ({
    slug: calc.slug,
  }));
}

// ── Generate dynamic SEO metadata per calculator ────────────
export async function generateMetadata({ params }) {
  const calculator = calculators.find((c) => c.slug === params.slug);
  if (!calculator) return {};
  return {
    title: `${calculator.name} — Free Online Tool`,
    description: calculator.description.slice(0, 160),
  };
}

// ── Calculator Page Component ────────────────────────────────
export default function CalculatorPage({ params }) {
  // Find the matching calculator by slug
  const calculator = calculators.find((c) => c.slug === params.slug);

  // Show 404 if slug doesn't match any calculator
  if (!calculator) notFound();

  return (
    <div className="pt-20 pb-16">

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-b border-gray-800/50 py-12">
        <div className="section-wrapper">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-primary-400 transition-colors">Home</a>
            <span>/</span>
            <a href="/calculators" className="hover:text-primary-400 transition-colors">Calculators</a>
            <span>/</span>
            <span className="text-gray-300">{calculator.name}</span>
          </div>

          {/* Page title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
            {calculator.name}
          </h1>

          {/* Intro */}
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            {calculator.intro}
          </p>

        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="section-wrapper mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left Column: Calculator Engine ───────────── */}
          <div className="lg:col-span-2">
            <CalculatorEngine calculator={calculator} />
          </div>

          {/* ── Right Column: Info Sidebar ────────────────── */}
          <div className="lg:col-span-1">
            <div className="card-glass p-6 sticky top-24">

              {/* Sidebar title */}
              <h3 className="text-white font-bold text-lg mb-4 pb-3 border-b border-gray-700/50">
                How to Use
              </h3>

              {/* Step by step instructions */}
              <ol className="flex flex-col gap-3">
                {calculator.inputs.map((input, i) => (
                  <li key={input.id} className="flex items-start gap-3">
                    {/* Step number */}
                    <span className="w-6 h-6 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {/* Step text */}
                    <div>
                      <p className="text-gray-300 text-sm font-medium">
                        Enter {input.label}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        Unit: {input.unit}
                      </p>
                    </div>
                  </li>
                ))}

                {/* Final step */}
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {calculator.inputs.length + 1}
                  </span>
                  <div>
                    <p className="text-gray-300 text-sm font-medium">
                      Click Calculate
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      View detailed results instantly
                    </p>
                  </div>
                </li>
              </ol>

              {/* Disclaimer */}
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <p className="text-gray-500 text-xs leading-relaxed">
                  Results are estimates based on standard engineering formulas.
                  Always verify with a professional for large or critical projects.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* ── SEO Description Section ───────────────────── */}
        <div className="mt-12 card-glass p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            About the {calculator.name}
          </h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line">
            {calculator.description}
          </p>
        </div>

      </div>
    </div>
  );
}