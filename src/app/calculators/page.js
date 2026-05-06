// ============================================================
// FILE: src/app/calculators/page.js
// PURPOSE: Calculators listing page — shows all 10 calculator
//          cards in a full page grid. Accessible at /calculators
// PLACEMENT: src/app/calculators/page.js (New File)
// ============================================================

import CalculatorGrid from '@/components/CalculatorGrid';

// ── SEO Metadata for Calculators page ───────────────────────
export const metadata = {
  title: 'All Sand Calculators — Free Online Sand Estimation Tools',
  description:
    'Browse all 10 free sand calculators. Calculate sand for yards, pavers, aquariums, pools, sandboxes, artificial grass, brickwork, circles, cement, and concrete.',
};

// ── Calculators Page Component ───────────────────────────────
export default function CalculatorsPage() {
  return (
    <div className="pt-20">

      {/* ── Page Header Banner ───────────────────────────── */}
      <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-b border-gray-800/50 py-16">
        <div className="section-wrapper text-center">

          {/* Page label */}
          <div className="inline-flex items-center gap-2 bg-primary-600/10 border border-primary-500/20 rounded-full px-4 py-2 mb-4">
            <span className="text-primary-400 text-sm font-medium">
              All Tools
            </span>
          </div>

          {/* Page title */}
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Sand <span className="text-gradient">Calculators</span>
          </h1>

          {/* Page subtitle */}
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Professional sand estimation tools built with real-life engineering
            formulas. Choose a calculator below to get started instantly.
          </p>

        </div>
      </div>

      {/* ── Calculator Grid Section ───────────────────────── */}
      <CalculatorGrid />

    </div>
  );
}