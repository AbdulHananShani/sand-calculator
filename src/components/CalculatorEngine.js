// ============================================================
// FILE: src/components/CalculatorEngine.js
// PURPOSE: Advanced calculator engine with sand type selector.
//          Shows recommended sand types with descriptions,
//          uses real density values for accurate calculations,
//          and displays detailed results with sand properties.
// PLACEMENT: src/components/CalculatorEngine.js (REPLACE)
// ============================================================

'use client';

import { useState } from 'react';
import { Calculator, RotateCcw, CheckCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { sandTypesByCalculator, DENSITIES } from '@/data/sandTypes';

// -- All 10 calculator formulas -------------------------------------------
// Now use dynamic density from selected sand type
const formulas = {

  'sand-calculator-for-yards': (inputs, density) => {
    const l = parseFloat(inputs.length);
    const w = parseFloat(inputs.width);
    const d = parseFloat(inputs.depth) / 12;
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
    const cubicFeet  = l * w * d;
    const cubicYards = cubicFeet / 27;
    const pounds     = cubicFeet * density;
    const tonnes     = pounds / 2204.62;
    const bags50     = Math.ceil(pounds / 50);
    return [
      { label: 'Volume',              value: cubicFeet.toFixed(2),  unit: 'Cubic Feet' },
      { label: 'Volume',              value: cubicYards.toFixed(2), unit: 'Cubic Yards' },
      { label: 'Weight',              value: pounds.toFixed(0),     unit: 'Pounds' },
      { label: 'Weight',              value: tonnes.toFixed(2),     unit: 'Tonnes' },
      { label: 'Bags Needed (50 lb)', value: bags50,                unit: 'Bags' },
    ];
  },

  'sand-calculator-for-pavers': (inputs, density) => {
    const a = parseFloat(inputs.area);
    const d = parseFloat(inputs.depth) / 12;
    if (isNaN(a) || isNaN(d)) return null;
    const cubicFeet  = a * d;
    const cubicYards = cubicFeet / 27;
    const pounds     = cubicFeet * density;
    const tonnes     = pounds / 2204.62;
    const bags50     = Math.ceil(pounds / 50);
    return [
      { label: 'Volume',              value: cubicFeet.toFixed(2),  unit: 'Cubic Feet' },
      { label: 'Volume',              value: cubicYards.toFixed(2), unit: 'Cubic Yards' },
      { label: 'Weight',              value: pounds.toFixed(0),     unit: 'Pounds' },
      { label: 'Weight',              value: tonnes.toFixed(2),     unit: 'Tonnes' },
      { label: 'Bags Needed (50 lb)', value: bags50,                unit: 'Bags' },
    ];
  },

  'sand-calculator-for-aquarium': (inputs, density) => {
    const l = parseFloat(inputs.length);
    const w = parseFloat(inputs.width);
    const d = parseFloat(inputs.depth);
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
    const cubicInches = l * w * d;
    const cubicFeet   = cubicInches / 1728;
    const pounds      = cubicFeet * density;
    const kg          = pounds * 0.453592;
    const bags10      = Math.ceil(pounds / 10);
    return [
      { label: 'Volume',               value: cubicInches.toFixed(2), unit: 'Cubic Inches' },
      { label: 'Weight',               value: pounds.toFixed(1),      unit: 'Pounds' },
      { label: 'Weight',               value: kg.toFixed(1),          unit: 'Kilograms' },
      { label: 'Bags Needed (10 lb)',  value: bags10,                  unit: 'Bags' },
    ];
  },

  'sand-calculator-for-pool': (inputs, density) => {
    const l = parseFloat(inputs.length);
    const w = parseFloat(inputs.width);
    const d = parseFloat(inputs.depth) / 12;
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
    const cubicFeet  = l * w * d;
    const cubicYards = cubicFeet / 27;
    const pounds     = cubicFeet * density;
    const tonnes     = pounds / 2204.62;
    return [
      { label: 'Volume', value: cubicFeet.toFixed(2),  unit: 'Cubic Feet' },
      { label: 'Volume', value: cubicYards.toFixed(2), unit: 'Cubic Yards' },
      { label: 'Weight', value: pounds.toFixed(0),     unit: 'Pounds' },
      { label: 'Weight', value: tonnes.toFixed(2),     unit: 'Tonnes' },
    ];
  },

  'sand-calculator-for-sandbox': (inputs, density) => {
    const l = parseFloat(inputs.length);
    const w = parseFloat(inputs.width);
    const d = parseFloat(inputs.depth) / 12;
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
    const cubicFeet = l * w * d;
    const pounds    = cubicFeet * density;
    const bags50    = Math.ceil(pounds / 50);
    const bags25    = Math.ceil(pounds / 25);
    return [
      { label: 'Volume',              value: cubicFeet.toFixed(2), unit: 'Cubic Feet' },
      { label: 'Weight',              value: pounds.toFixed(0),    unit: 'Pounds' },
      { label: 'Bags Needed (50 lb)', value: bags50,               unit: 'Bags' },
      { label: 'Bags Needed (25 lb)', value: bags25,               unit: 'Bags' },
    ];
  },

  'sand-calculator-for-artificial-grass': (inputs, density) => {
    const a = parseFloat(inputs.area);
    const r = parseFloat(inputs.rate);
    if (isNaN(a) || isNaN(r)) return null;
    const kg      = a * r;
    const tonnes  = kg / 1000;
    const bags25  = Math.ceil(kg / 25);
    const pounds  = kg * 2.20462;
    return [
      { label: 'Total Sand Required', value: kg.toFixed(1),     unit: 'Kilograms' },
      { label: 'Total Sand Required', value: pounds.toFixed(0), unit: 'Pounds' },
      { label: 'Total Sand Required', value: tonnes.toFixed(3), unit: 'Tonnes' },
      { label: 'Bags Needed (25 kg)', value: bags25,            unit: 'Bags' },
    ];
  },

  'sand-calculator-for-brickwork': (inputs, density) => {
    const bricks = parseFloat(inputs.bricks);
    const joint  = parseFloat(inputs.joint);
    if (isNaN(bricks) || isNaN(joint)) return null;
    const baseTonnes     = (bricks / 1000) * 1.0;
    const adjustedTonnes = baseTonnes * (joint / 10);
    const kg             = adjustedTonnes * 1000;
    // Adjust for density — sharper/denser sand needs slightly less volume
    const densityFactor  = density / 100;
    const adjustedKg     = kg * densityFactor;
    const cementBags     = Math.ceil(adjustedTonnes / 4);
    return [
      { label: 'Sharp Sand Required',  value: (adjustedKg / 1000).toFixed(3), unit: 'Tonnes' },
      { label: 'Sharp Sand Required',  value: adjustedKg.toFixed(1),          unit: 'Kilograms' },
      { label: 'Cement Bags (25 kg)',  value: cementBags,                     unit: 'Bags' },
      { label: 'Mortar Volume (est.)', value: (adjustedTonnes * 0.67).toFixed(3), unit: 'm³' },
    ];
  },

  'sand-calculator-for-circles': (inputs, density) => {
    const d     = parseFloat(inputs.diameter);
    const depth = parseFloat(inputs.depth) / 12;
    if (isNaN(d) || isNaN(depth)) return null;
    const radius     = d / 2;
    const areaSqFt   = Math.PI * radius * radius;
    const cubicFeet  = areaSqFt * depth;
    const cubicYards = cubicFeet / 27;
    const pounds     = cubicFeet * density;
    const bags50     = Math.ceil(pounds / 50);
    return [
      { label: 'Circle Area', value: areaSqFt.toFixed(2),   unit: 'ft²' },
      { label: 'Volume',      value: cubicFeet.toFixed(2),  unit: 'Cubic Feet' },
      { label: 'Volume',      value: cubicYards.toFixed(2), unit: 'Cubic Yards' },
      { label: 'Weight',      value: pounds.toFixed(0),     unit: 'Pounds' },
      { label: 'Bags (50 lb)',value: bags50,                unit: 'Bags' },
    ];
  },

  'sand-calculator-for-mixing-with-cement': (inputs, density) => {
    const vol   = parseFloat(inputs.volume);
    const ratio = parseFloat(inputs.ratio);
    if (isNaN(vol) || isNaN(ratio)) return null;
    const totalParts = ratio + 1;
    const sandVol    = (vol * ratio) / totalParts;
    const cementVol  = vol / totalParts;
    // Use actual density for weight calculation
    const sandKg     = sandVol * (density * 16.0185); // convert lb/ft³ to kg/m³
    const cementKg   = cementVol * 1500;
    const bags25     = Math.ceil(cementKg / 25);
    return [
      { label: 'Sand Volume',         value: sandVol.toFixed(3),   unit: 'm³' },
      { label: 'Sand Weight',         value: sandKg.toFixed(1),    unit: 'kg' },
      { label: 'Cement Volume',       value: cementVol.toFixed(3), unit: 'm³' },
      { label: 'Cement Bags (25 kg)', value: bags25,               unit: 'Bags' },
    ];
  },

  'sand-calculator-for-concrete': (inputs, density) => {
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
    const sandPounds     = sandCubicFeet * density;
    return [
      { label: 'Total Concrete Volume', value: totalCubicFeet.toFixed(2),  unit: 'ft³' },
      { label: 'Sand Required',         value: sandCubicFeet.toFixed(2),   unit: 'ft³' },
      { label: 'Sand Required',         value: sandCubicYards.toFixed(3),  unit: 'Cubic Yards' },
      { label: 'Sand Weight',           value: sandPounds.toFixed(0),      unit: 'Pounds' },
    ];
  },
};

// -- CalculatorEngine Component -------------------------------------------
export default function CalculatorEngine({ calculator }) {

  const sandTypes = sandTypesByCalculator[calculator.slug] || [];
  const defaultSandType = sandTypes.find(s => s.recommended) || sandTypes[0];

  // -- State ----------------------------------------------------------
  const [inputs, setInputs]             = useState({});
  const [results, setResults]           = useState(null);
  const [error, setError]               = useState('');
  const [selectedSand, setSelectedSand] = useState(defaultSandType || null);
  const [expandedSand, setExpandedSand] = useState(null);

  // -- Handle input change -------------------------------------------
  const handleChange = (id, value) => {
    setInputs(prev => ({ ...prev, [id]: value }));
    setResults(null);
    setError('');
  };

  // -- Handle calculate -----------------------------------------------
  const handleCalculate = () => {
    const missing = calculator.inputs.filter(
      inp => !inputs[inp.id] || inputs[inp.id].trim() === ''
    );
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.map(m => m.label).join(', ')}`);
      return;
    }

    const formula  = formulas[calculator.slug];
    const density  = selectedSand ? selectedSand.density : DENSITIES.dry_sand;

    if (!formula) { setError('Formula not found.'); return; }

    const output = formula(inputs, density);
    if (!output) { setError('Invalid values. Please enter valid numbers.'); return; }

    setResults(output);
    setError('');
  };

  // -- Handle reset ---------------------------------------------------
  const handleReset = () => {
    setInputs({});
    setResults(null);
    setError('');
  };

  return (
    <div className="flex flex-col gap-6">

      {/* -- STEP 1: Sand Type Selector --------------------------------- */}
      {sandTypes.length > 0 && (
        <div className="card-glass p-6">

          {/* Header */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700/50">
            <div className="w-8 h-8 rounded-lg bg-accent-500/20 border border-accent-500/30 flex items-center justify-center">
              <span className="text-accent-400 text-sm font-bold">1</span>
            </div>
            <div>
              <h3 className="text-white font-bold">Select Sand Type</h3>
              <p className="text-gray-500 text-xs">Choose the right sand for accurate results</p>
            </div>
          </div>

          {/* Sand type cards */}
          <div className="flex flex-col gap-3">
            {sandTypes.map((sand) => {
              const isSelected = selectedSand?.id === sand.id;
              const isExpanded = expandedSand === sand.id;

              return (
                <div
                  key={sand.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isSelected
                      ? 'border-primary-500/60 bg-primary-600/10'
                      : 'border-gray-700/50 bg-dark-900/40 hover:border-gray-600'
                  }`}
                >
                  {/* Sand card header - two separate clickable areas */}
                  <div className="flex items-start gap-3 p-4">

                    {/* Left side - click to SELECT sand type */}
                    <div
                      onClick={() => {
                        setSelectedSand(sand);
                        setResults(null);
                      }}
                      className="flex items-start gap-3 flex-grow cursor-pointer"
                    >
                      {/* Radio indicator */}
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-primary-400 bg-primary-400'
                          : 'border-gray-600'
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>

                      {/* Sand info */}
                      <div className="flex-grow min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                            {sand.name}
                          </span>
                          {sand.badge && (
                            <span className="text-xs bg-accent-500/20 text-accent-300 border border-accent-500/30 px-2 py-0.5 rounded-full font-medium">
                              {sand.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-xs">{sand.tagline}</p>
                        <p className="text-primary-400 text-xs mt-1">
                          Density: {sand.density} lb/ft³
                        </p>
                      </div>
                    </div>

                    {/* Right side - click to EXPAND info (separate from select) */}
                    <button
                      type="button"
                      onClick={() => setExpandedSand(isExpanded ? null : sand.id)}
                      className="text-gray-500 hover:text-gray-300 flex-shrink-0 p-1 mt-0.5"
                      title="More info"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-700/30 pt-3 ml-8">

                      {/* Description */}
                      <p className="text-gray-400 text-xs leading-relaxed mb-3">
                        {sand.description}
                      </p>

                      {/* Properties */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {sand.properties.map((prop) => (
                          <span
                            key={prop}
                            className="text-xs bg-dark-800 text-gray-400 border border-gray-700 px-2 py-0.5 rounded-full"
                          >
                            {prop}
                          </span>
                        ))}
                      </div>

                      {/* Best for */}
                      <div className="mb-2">
                        <p className="text-gray-500 text-xs font-medium mb-1">Best for:</p>
                        <div className="flex flex-wrap gap-1">
                          {sand.bestFor.map((use) => (
                            <span
                              key={use}
                              className="text-xs bg-primary-600/10 text-primary-400 border border-primary-500/20 px-2 py-0.5 rounded-full"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Warning if any */}
                      {sand.warning && (
                        <div className="flex items-start gap-2 mt-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2">
                          <span className="text-amber-400 text-xs">⚠️</span>
                          <p className="text-amber-300 text-xs">{sand.warning}</p>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Selected sand summary */}
          {selectedSand && (
            <div className="mt-4 flex items-center gap-2 bg-primary-600/10 border border-primary-500/20 rounded-xl p-3">
              <CheckCircle className="w-4 h-4 text-primary-400 flex-shrink-0" />
              <p className="text-primary-300 text-xs">
                Using <strong>{selectedSand.name}</strong> — density {selectedSand.density} lb/ft³
              </p>
            </div>
          )}

        </div>
      )}

      {/* -- STEP 2: Input Fields ------------------------------------------ */}
      <div className="card-glass p-6 md:p-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700/50">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            sandTypes.length > 0
              ? 'bg-dark-800 border border-gray-700'
              : 'bg-primary-600/20 border border-primary-500/30'
          }`}>
            {sandTypes.length > 0 ? (
              <span className="text-gray-400 font-bold text-sm">2</span>
            ) : (
              <Calculator className="w-5 h-5 text-primary-400" />
            )}
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Enter Measurements</h2>
            <p className="text-gray-500 text-sm">Fill in all fields to calculate</p>
          </div>
        </div>

        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {calculator.inputs.map((input) => (
            <div key={input.id} className="flex flex-col gap-2">
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

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button onClick={handleCalculate} className="btn-primary flex items-center justify-center gap-2 flex-1">
            <Calculator className="w-4 h-4" />
            Calculate
          </button>
          <button onClick={handleReset} className="btn-secondary flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

      </div>

      {/* -- STEP 3: Results ------------------------------------------------ */}
      {results && (
        <div className="card-glass p-6 md:p-8 border-primary-500/30">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700/50">
            <div className="w-10 h-10 rounded-xl bg-green-600/20 border border-green-500/30 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Results</h2>
              <p className="text-gray-500 text-sm">
                Based on {selectedSand ? selectedSand.name : 'standard sand'} at {selectedSand ? selectedSand.density : 100} lb/ft³
              </p>
            </div>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((result, i) => (
              <div
                key={i}
                className="bg-dark-900/60 border border-gray-700/30 rounded-xl p-4 flex flex-col gap-1"
              >
                <span className="text-gray-500 text-xs uppercase tracking-wider">
                  {result.label}
                </span>
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

          {/* Sand type summary in results */}
          {selectedSand && (
            <div className="mt-6 p-4 bg-dark-900/40 border border-gray-700/30 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-500/20 border border-accent-500/30 flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-accent-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-1">
                    {selectedSand.name} {selectedSand.badge || ''}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {selectedSand.description}
                  </p>
                  {selectedSand.warning && (
                    <p className="text-amber-300 text-xs mt-2">
                      ⚠️ {selectedSand.warning}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-gray-600 text-xs mt-4 text-center">
            Results are estimates. Add 10% for waste. Actual weight varies with moisture content.
          </p>

        </div>
      )}

    </div>
  );
}