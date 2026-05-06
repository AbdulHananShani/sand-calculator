// ============================================================
// FILE: src/components/CalculatorGrid.js
// PURPOSE: Renders the full grid of all 10 calculator cards.
//          Used on both the Home page and Calculators page.
//          Imports calculator data and maps over it to render
//          individual CalculatorCard components.
// PLACEMENT: src/components/CalculatorGrid.js (New File)
// ============================================================

import CalculatorCard from '@/components/CalculatorCard';
import { calculators } from '@/data/calculators';

// ── CalculatorGrid Component ─────────────────────────────────
// Props:
//   title    — section heading text (optional)
//   subtitle — section subheading text (optional)
export default function CalculatorGrid({ title, subtitle }) {
  return (
    <section className="py-16 md:py-24">
      <div className="section-wrapper">

        {/* ── Section Header ───────────────────────────── */}
        {title && (
          <div className="text-center mb-12 md:mb-16">

            {/* Section label */}
            <div className="inline-flex items-center gap-2 bg-primary-600/10 border border-primary-500/20 rounded-full px-4 py-2 mb-4">
              <span className="text-primary-400 text-sm font-medium">
                Free Online Tools
              </span>
            </div>

            {/* Section title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              {title}
            </h2>

            {/* Section subtitle */}
            {subtitle && (
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}

          </div>
        )}

        {/* ── Calculator Cards Grid ────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {calculators.map((calculator, index) => (
            <CalculatorCard
              key={calculator.slug}
              calculator={calculator}
              index={index}
            />
          ))}
        </div>

        {/* ── Grid Footer Note ─────────────────────────── */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            All calculators use real-life engineering formulas.
            Results are estimates — always verify with a professional for large projects.
          </p>
        </div>

      </div>
    </section>
  );
}
