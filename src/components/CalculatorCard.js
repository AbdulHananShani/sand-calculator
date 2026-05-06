// ============================================================
// FILE: src/components/CalculatorCard.js
// PURPOSE: Individual calculator card component displayed in
//          the grid on the Home page and Calculators page.
//          Shows icon, name, intro text, and links to the
//          respective calculator page on click.
// PLACEMENT: src/components/CalculatorCard.js (New File)
// ============================================================

'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  Layers,
  Grid3x3,
  Fish,
  Waves,
  Castle,
  TreePine,
  BrickWall,
  Circle,
  FlaskConical,
  HardHat,
} from 'lucide-react';

// ── Icon Map ─────────────────────────────────────────────────
// Maps icon name string (from calculators.js) to Lucide component
const iconMap = {
  Layers,
  Grid3x3,
  Fish,
  Waves,
  Castle,
  TreePine,
  BrickWall,
  Circle,
  FlaskConical,
  HardHat,
};

// ── Color Map ─────────────────────────────────────────────────
// Each card gets a unique accent color for visual variety
const colorMap = [
  'from-teal-500 to-cyan-600',
  'from-violet-500 to-purple-600',
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-green-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-red-500 to-orange-600',
  'from-cyan-500 to-blue-600',
  'from-lime-500 to-emerald-600',
  'from-fuchsia-500 to-violet-600',
];

// ── CalculatorCard Component ─────────────────────────────────
// Props:
//   calculator — single calculator object from calculators.js
//   index      — position in array (used for color selection)
export default function CalculatorCard({ calculator, index }) {

  // Get the correct Lucide icon component from the icon name string
  const IconComponent = iconMap[calculator.icon] || Layers;

  // Get unique gradient color for this card
  const gradient = colorMap[index % colorMap.length];

  return (
    <Link
      href={`/calculators/${calculator.slug}`}
      className="group block"
    >
      <div className="card-glass p-6 h-full flex flex-col gap-4 hover:border-primary-500/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/20">

        {/* ── Card Icon ──────────────────────────────────── */}
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </div>

        {/* ── Card Content ───────────────────────────────── */}
        <div className="flex flex-col gap-2 flex-grow">

          {/* Calculator name */}
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-primary-400 transition-colors duration-200">
            {calculator.name}
          </h3>

          {/* Calculator intro text */}
          <p className="text-gray-400 text-sm leading-relaxed flex-grow">
            {calculator.intro}
          </p>

        </div>

        {/* ── Card Footer ────────────────────────────────── */}
        <div className="flex items-center gap-1 text-primary-400 text-sm font-medium mt-auto pt-2 border-t border-gray-700/50">
          <span>Calculate Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>

      </div>
    </Link>
  );
}