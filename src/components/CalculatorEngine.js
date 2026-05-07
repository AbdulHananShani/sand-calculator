// ============================================================
// FILE: src/components/CalculatorEngine.js
// PURPOSE: The interactive calculator UI component. Renders
//          input fields dynamically from calculator data and
//          runs the correct formula when user clicks Calculate.
//          All 10 calculator formulas are handled here.
// PLACEMENT: src/components/CalculatorEngine.js (New File)
// ============================================================

'use client';

import { useState } from 'react';
import { Calculator, RotateCcw, CheckCircle } from 'lucide-react';

// ============================================================
// ALL 10 CALCULATOR FORMULAS
// Kept here in the Client Component — safe from serialization
// ============================================================
const formulas = {

  // ── 1. Sand for Yards ──────────────────────────────────
  'sand-calculator-for-yards': (inputs) => {
    const l = parseFloat(inputs.length);
    const w = parseFloat(inputs.width);
    const d = parseFloat(inputs.depth) / 12;
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
    const cubicFeet   = l * w * d;
    const cubicYards  = cubicFeet / 27;
    const tonnes      = cubicYards * 1.35;
    const pounds      = tonnes * 2204.62;
    return [
      { label: 'Volume',         value: cubicFeet.toFixed(2),   unit: 'Cubic Feet' },
      { label: 'Volume',         value: cubicYards.toFixed(2),  unit: 'Cubic Yards' },
      { label: 'Weight',         value: tonnes.toFixed(2),      unit: 'Tonnes' },
      { label: 'Weight',         value: pounds.toFixed(0),      unit: 'Pounds' },
    ];
  },

  // ── 2. Sand for Pavers ─────────────────────────────────
  'sand-calculator-for-pavers': (inputs) => {
    const a = parseFloat(inputs.area);
    const d = parseFloat(inputs.depth) / 12;
    if (isNaN(a) || isNaN(d)) return null;
    const cubicFeet  = a * d;
    const cubicYards = cubicFeet / 27;
    const tonnes     = cubicYards * 1.35;
    const bags       = Math.ceil((tonnes * 2204.62) / 50);
    return [
      { label: 'Volume',              value: cubicFeet.toFixed(2),  unit: 'Cubic Feet' },
      { label: 'Volume',              value: cubicYards.toFixed(2), unit: 'Cubic Yards' },
      { label: 'Weight',              value: tonnes.toFixed(2),     unit: 'Tonnes' },
      { label: 'Bags Needed (50 lb)', value: bags,                  unit: 'Bags' },
    ];
  },

  // ── 3. Sand for Aquarium ───────────────────────────────
  'sand-calculator-for-aquarium': (inputs) => {
    const l = parseFloat(inputs.length);
    const w = parseFloat(inputs.width);
    const d = parseFloat(inputs.depth);
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
    const cubicInches = l * w * d;
    const cubicFeet   = cubicInches / 1728;
    const pounds      = cubicFeet * 100;
    const kg          = pounds * 0.453592;
    const bags        = Math.ceil(pounds / 10);
    return [
      { label: 'Volume',              value: cubicInches.toFixed(2), unit: 'Cubic Inches' },
      { label: 'Weight',              value: pounds.toFixed(1),      unit: 'Pounds' },
      { label: 'Weight',              value: kg.toFixed(1),          unit: 'Kilograms' },
      { label: 'Bags Needed (10 lb)', value: bags,                   unit: 'Bags' },
    ];
  },

  // ── 4. Sand for Pool ───────────────────────────────────
  'sand-calculator-for-pool': (inputs) => {
    const l = parseFloat(inputs.length);
    const w = parseFloat(inputs.width);
    const d = parseFloat(inputs.depth) / 12;
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
    const cubicFeet  = l * w * d;
    const cubicYards = cubicFeet / 27;
    const pounds     = cubicFeet * 100;
    const tonnes     = pounds / 2204.62;
    return [
      { label: 'Volume', value: cubicFeet.toFixed(2),  unit: 'Cubic Feet' },
      { label: 'Volume', value: cubicYards.toFixed(2), unit: 'Cubic Yards' },
      { label: 'Weight', value: pounds.toFixed(0),     unit: 'Pounds' },
      { label: 'Weight', value: tonnes.toFixed(2),     unit: 'Tonnes' },
    ];
  },

  // ── 5. Sand for Sandbox ────────────────────────────────
  'sand-calculator-for-sandbox': (inputs) => {
    const l = parseFloat(inputs.length);
    const w = parseFloat(inputs.width);
    const d = parseFloat(inputs.depth) / 12;
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
    const cubicFeet = l * w * d;
    const pounds    = cubicFeet * 100;
    const bags50    = Math.ceil(pounds / 50);
    const bags25    = Math.ceil(pounds / 25);
    return [
      { label: 'Volume',              value: cubicFeet.toFixed(2), unit: 'Cubic Feet' },
      { label: 'Weight',              value: pounds.toFixed(0),    unit: 'Pounds' },
      { label: 'Bags Needed (50 lb)', value: bags50,               unit: 'Bags' },
      { label: 'Bags Needed (25 lb)', value: bags25,               unit: 'Bags' },
    ];
  },

  // ── 6. Sand for Artificial Grass ──────────────────────
  'sand-calculator-for-artificial-grass': (inputs) => {
    const a = parseFloat(inputs.area);
    const r = parseFloat(inputs.rate);
    if (isNaN(a) || isNaN(r)) return null;
    const kg      = a * r;
    const tonnes  = kg / 1000;
    const bags    = Math.ceil(kg / 25);
    return [
      { label: 'Total Sand Required',    value: kg.toFixed(1),     unit: 'Kilograms' },
      { label: 'Total Sand Required',    value: tonnes.toFixed(3), unit: 'Tonnes' },
      { label: 'Bags Needed (25 kg)',    value: bags,              unit: 'Bags' },
      { label: 'Coverage Area',          value: a.toFixed(1),      unit: 'm²' },
    ];
  },

  // ── 7. Sand for Brickwork ──────────────────────────────
  'sand-calculator-for-brickwork': (inputs) => {
    const bricks = parseFloat(inputs.bricks);
    const joint  = parseFloat(inputs.joint);
    if (isNaN(bricks) || isNaN(joint)) return null;
    const baseTonnes     = (bricks / 1000) * 1.0;
    const adjustedTonnes = baseTonnes * (joint / 10);
    const kg             = adjustedTonnes * 1000;
    const cementBags     = Math.ceil(adjustedTonnes / 4);
    const mortarVol      = adjustedTonnes * 0.67;
    return [
      { label: 'Sharp Sand Required', value: adjustedTonnes.toFixed(3), unit: 'Tonnes' },
      { label: 'Sharp Sand Required', value: kg.toFixed(1),             unit: 'Kilograms' },
      { label: 'Cement Bags (25 kg)', value: cementBags,                unit: 'Bags' },
      { label: 'Mortar Volume',       value: mortarVol.toFixed(3),      unit: 'm³' },
    ];
  },

  // ── 8. Sand for Circles ────────────────────────────────
  'sand-calculator-for-circles': (inputs) => {
    const d     = parseFloat(inputs.diameter);
    const depth = parseFloat(inputs.depth) / 12;
    if (isNaN(d) || isNaN(depth)) return null;
    const radius    = d / 2;
    const areaSqFt  = Math.PI * radius * radius;
    const cubicFeet = areaSqFt * depth;
    const cubicYards = cubicFeet / 27;
    const pounds    = cubicFeet * 100;
    return [
      { label: 'Circle Area', value: areaSqFt.toFixed(2),   unit: 'ft²' },
      { label: 'Volume',      value: cubicFeet.toFixed(2),  unit: 'Cubic Feet' },
      { label: 'Volume',      value: cubicYards.toFixed(2), unit: 'Cubic Yards' },
      { label: 'Weight',      value: pounds.toFixed(0),     unit: 'Pounds' },
    ];
  },

  // ── 9. Sand for Mixing with Cement ────────────────────
  'sand-calculator-for-mixing-with-cement': (inputs) => {
    const vol   = parseFloat(inputs.volume);
    const ratio = parseFloat(inputs.ratio);
    if (isNaN(vol) || isNaN(ratio)) return null;
    const totalParts = ratio + 1;
    const sandVol    = (vol * ratio) / totalParts;
    const cementVol  = vol / totalParts;
    const sandKg     = sandVol * 1600;
    const cementKg   = cementVol * 1500;
    const bags25     = Math.ceil(cementKg / 25);
    return [
      { label: 'Sand Volume',        value: sandVol.toFixed(3),  unit: 'm³' },
      { label: 'Sand Weight',        value: sandKg.toFixed(1),   unit: 'kg' },
      { label: 'Cement Volume',      value: cementVol.toFixed(3), unit: 'm³' },
      { label: 'Cement Bags (25 kg)', value: bags25,             unit: 'Bags' },
    ];
  },

  // ── 10. Sand for Concrete ──────────────────────────────
  'sand-calculator-for-concrete': (inputs) => {
    const l     = parseFloat(inputs.length);
    const w     = parseFloat(inputs.width);
    const t     = parseFloat(inputs.thickness) / 12;
    const ratio = parseFloat(inputs.ratio);
    if (isNaN(l) || isNaN(w) || isNaN(t) || isNaN(ratio)) return null;
    const totalCubicFeet = l * w * t;
    const totalParts     = 1 + ratio + (ratio * 2);
    const sandFraction   = ratio / totalParts;
    const sandCubicFeet  = totalCubicFeet * sandFraction;
    const sandCubicYards = sandCubicFeet / 27;
    const sandPounds     = sandCubicFeet * 100;
    return [
      { label: 'Total Concrete Volume', value: totalCubicFeet.toFixed(2),  unit: 'ft³' },
      { label: 'Sand Required',         value: sandCubicFeet.toFixed(2),   unit: 'ft³' },
      { label: 'Sand Required',         value: sandCubicYards.toFixed(3),  unit: 'Cubic Yards' },
      { label: 'Sand Weight',           value: sandPounds.toFixed(0),      unit: 'Pounds' },
    ];
  },
};

// ── CalculatorEngine Component ───────────────────────────────
// Props:
//   calculator — single calculator object from calculators.js
export default function CalculatorEngine({ calculator }) {

  // ── State ────────────────────────────────────────────────
  const [inputs, setInputs]   = useState({});
  const [results, setResults] = useState(null);
  const [error, setError]     = useState('');

  // ── Handle input change ──────────────────────────────────
  const handleChange = (id, value) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
    setResults(null);
    setError('');
  };

  // ── Handle calculate button click ────────────────────────
  const handleCalculate = () => {
    // Check all fields are filled
    const missing = calculator.inputs.filter(
      (inp) => !inputs[inp.id] || inputs[inp.id].trim() === ''
    );
    if (missing.length > 0) {
      setError(`Please fill in all fields: ${missing.map((m) => m.label).join(', ')}`);
      return;
    }

    // Run the formula for this calculator
    const formula = formulas[calculator.slug];
    if (!formula) {
      setError('Calculator formula not found.');
      return;
    }

    const output = formula(inputs);
    if (!output) {
      setError('Invalid input values. Please enter valid numbers.');
      return;
    }

    setResults(output);
    setError('');
  };

  // ── Handle reset button click ────────────────────────────
  const handleReset = () => {
    setInputs({});
    setResults(null);
    setError('');
  };

  return (
    <div className="flex flex-col gap-6">

      {/* ── Input Fields Card ────────────────────────────── */}
      <div className="card-glass p-6 md:p-8">

        {/* Card header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700/50">
          <div className="w-10 h-10 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Enter Measurements</h2>
            <p className="text-gray-500 text-sm">Fill in all fields to calculate</p>
          </div>
        </div>

        {/* Dynamic input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {calculator.inputs.map((input) => (
            <div key={input.id} className="flex flex-col gap-2">

              {/* Input label — htmlFor links label to input for accessibility */}
              <label
                htmlFor={`field-${input.id}`}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="text-gray-300 text-sm font-medium">
                  {input.label}
                </span>
                <span className="text-xs bg-primary-600/10 text-primary-400 border border-primary-500/20 px-2 py-0.5 rounded-full">
                  {input.unit}
                </span>
              </label>

              {/* Input field — id and name added for accessibility and autofill */}
              <input
                type="number"
                id={`field-${input.id}`}
                name={`field-${input.id}`}
                min="0"
                step="any"
                value={inputs[input.id] || ''}
                onChange={(e) => handleChange(input.id, e.target.value)}
                placeholder={input.placeholder}
                className="input-field"
                autoComplete="off"
              />

            </div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleCalculate}
            className="btn-primary flex items-center justify-center gap-2 flex-1"
          >
            <Calculator className="w-4 h-4" />
            Calculate
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

      </div>

      {/* ── Results Card ─────────────────────────────────── */}
      {results && (
        <div className="card-glass p-6 md:p-8 border-primary-500/30">

          {/* Results header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700/50">
            <div className="w-10 h-10 rounded-xl bg-green-600/20 border border-green-500/30 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Calculation Results</h2>
              <p className="text-gray-500 text-sm">Based on your measurements</p>
            </div>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((result, i) => (
              <div
                key={i}
                className="bg-dark-900/60 border border-gray-700/30 rounded-xl p-4 flex flex-col gap-1"
              >
                {/* Result label */}
                <span className="text-gray-500 text-xs uppercase tracking-wider">
                  {result.label}
                </span>
                {/* Result value */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-gradient">
                    {result.value}
                  </span>
                  <span className="text-gray-400 text-sm font-medium">
                    {result.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Results note */}
          <p className="text-gray-600 text-xs mt-4 text-center">
            These results are estimates. Actual quantities may vary based on
            sand moisture content, compaction, and waste factor.
          </p>

        </div>
      )}

    </div>
  );
}