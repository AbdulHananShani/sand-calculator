// ============================================================
// FILE: src/data/sandTypes.js
// PURPOSE: Complete sand type data for all 10 calculators.
//          Each sand type includes real density values,
//          recommendation level, usage description, and
//          properties. Used by CalculatorEngine for accurate
//          weight calculations and user guidance.
// PLACEMENT: src/data/sandTypes.js (New File)
// ============================================================

// ── Density reference (lbs per cubic foot) ──────────────────
// Source: Engineering Toolbox, ASTM standards, industry data
export const DENSITIES = {
  play_sand:         95,   // soft, washed, lightweight
  mason_sand:        100,  // fine, smooth, standard
  silica_sand:       100,  // pure quartz, consistent
  concrete_sand:     105,  // coarse, compacts well
  sharp_sand:        108,  // angular grains, strong
  polymeric_sand:    98,   // resin-coated, slightly lighter
  fill_sand:         110,  // dense, cheap bulk
  river_sand:        93,   // rounded grains, loose
  horticultural_sand:90,   // coarse grit, open structure
  aragonite_sand:    115,  // calcium carbonate, heavy
  black_sand:        102,  // basalt-based, decorative
  coarse_sand:       105,  // general coarse aggregate
  paver_base_sand:   105,  // compactible, crushed
  infill_sand:       98,   // rounded silica for turf
  dry_sand:          100,  // generic dry reference
  wet_sand:          120,  // 20% heavier when wet
};

// ── Sand types organized by calculator slug ──────────────────
export const sandTypesByCalculator = {

  // ── 1. Sand for Yards ──────────────────────────────────────
  'sand-calculator-for-yards': [
    {
      id:          'fill_sand',
      name:        'Fill Sand',
      density:     DENSITIES.fill_sand,
      recommended: false,
      badge:       null,
      tagline:     'Best for filling large areas cheaply',
      description: 'Dense, affordable sand for bulk filling, grading, and leveling large yard areas. Not ideal for top layers.',
      properties:  ['Cheap', 'Dense', 'Good compaction', 'Basic leveling'],
      bestFor:     ['Large area filling', 'Sub-base layers', 'Grading'],
      warning:     null,
    },
    {
      id:          'mason_sand',
      name:        'Mason Sand',
      density:     DENSITIES.mason_sand,
      recommended: true,
      badge:       '⭐ MOST POPULAR',
      tagline:     'Best all-round choice for yards',
      description: 'Fine, clean sand with smooth texture. Perfect for leveling, top dressing, and general yard use. Easy to spread and work with.',
      properties:  ['Fine texture', 'Easy to spread', 'Clean', 'Versatile'],
      bestFor:     ['Yard leveling', 'Top dressing', 'General landscaping'],
      warning:     null,
    },
    {
      id:          'river_sand',
      name:        'River Sand',
      density:     DENSITIES.river_sand,
      recommended: false,
      badge:       null,
      tagline:     'Natural, rounded grains for organic feel',
      description: 'Naturally rounded grains from riverbeds. Softer texture, good drainage. Slightly less stable than angular sands.',
      properties:  ['Rounded grains', 'Natural look', 'Good drainage', 'Soft texture'],
      bestFor:     ['Garden beds', 'Natural landscaping', 'Drainage layers'],
      warning:     'Less compaction than angular sands',
    },
    {
      id:          'horticultural_sand',
      name:        'Horticultural Sand',
      density:     DENSITIES.horticultural_sand,
      recommended: false,
      badge:       null,
      tagline:     'Best for mixing with garden soil',
      description: 'Coarse grit sand that improves soil drainage and aeration when mixed into garden beds and lawn top dressing.',
      properties:  ['Improves drainage', 'Aerates soil', 'Coarse grit', 'Garden safe'],
      bestFor:     ['Soil amendment', 'Lawn top dressing', 'Garden bed drainage'],
      warning:     null,
    },
  ],

  // ── 2. Sand for Pavers ─────────────────────────────────────
  'sand-calculator-for-pavers': [
    {
      id:          'concrete_sand',
      name:        'Concrete Sand',
      density:     DENSITIES.concrete_sand,
      recommended: true,
      badge:       '⭐ BEST FOR PAVER BASE',
      tagline:     'Strong base layer with excellent compaction',
      description: 'Coarse, angular sand that compacts tightly under pavers. Creates a solid, stable base that resists shifting and settling over time.',
      properties:  ['Strong compaction', 'Angular grains', 'Excellent stability', 'Drainage'],
      bestFor:     ['Paver base layer', 'Driveway pavers', 'Heavy load areas'],
      warning:     null,
    },
    {
      id:          'polymeric_sand',
      name:        'Polymeric Sand',
      density:     DENSITIES.polymeric_sand,
      recommended: true,
      badge:       '⭐ BEST FOR PAVER JOINTS',
      tagline:     'Hardens to prevent weeds and insects',
      description: 'Sand mixed with polymer binders. When wet and dried, it hardens to lock pavers in place, prevent weed growth and stop ant infiltration.',
      properties:  ['Hardens when wet', 'Weed prevention', 'Ant resistant', 'Locks pavers'],
      bestFor:     ['Paver joint filling', 'Patio joints', 'Walkway joints'],
      warning:     'More expensive — use for joints only, not base layer',
    },
    {
      id:          'mason_sand',
      name:        'Mason Sand',
      density:     DENSITIES.mason_sand,
      recommended: false,
      badge:       null,
      tagline:     'Smooth finish for residential patios',
      description: 'Fine, clean sand sometimes used between pavers for a smoother finish. Less stable than concrete sand but easier to level.',
      properties:  ['Fine texture', 'Smooth finish', 'Easy leveling', 'Clean'],
      bestFor:     ['Light residential patios', 'Decorative paving', 'Paver joints'],
      warning:     'Can shift more than concrete sand under heavy loads',
    },
    {
      id:          'sharp_sand',
      name:        'Sharp Sand',
      density:     DENSITIES.sharp_sand,
      recommended: false,
      badge:       null,
      tagline:     'Angular grains for maximum stability',
      description: 'Coarse, angular grit sand providing excellent compaction and drainage. Similar to concrete sand, widely used in UK paving projects.',
      properties:  ['Angular grains', 'Maximum compaction', 'Good drainage', 'Strong base'],
      bestFor:     ['UK paving projects', 'Block paving base', 'High load areas'],
      warning:     null,
    },
  ],

  // ── 3. Sand for Aquarium ───────────────────────────────────
  'sand-calculator-for-aquarium': [
    {
      id:          'silica_sand',
      name:        'Silica Sand',
      density:     DENSITIES.silica_sand,
      recommended: true,
      badge:       '⭐ BEST FOR FRESHWATER',
      tagline:     'Popular, affordable, natural freshwater substrate',
      description: 'Pure quartz silica sand is the most popular freshwater aquarium substrate. pH neutral, safe for all fish, natural appearance.',
      properties:  ['pH neutral', 'Affordable', 'Natural look', 'Fish safe'],
      bestFor:     ['Freshwater community tanks', 'Planted tanks', 'Bottom dwellers'],
      warning:     null,
    },
    {
      id:          'aragonite_sand',
      name:        'Aragonite Sand',
      density:     DENSITIES.aragonite_sand,
      recommended: true,
      badge:       '⭐ BEST FOR MARINE TANKS',
      tagline:     'Raises pH — essential for saltwater reef tanks',
      description: 'Calcium carbonate sand that slowly dissolves to maintain alkaline pH. Essential for saltwater and reef aquariums. Supports beneficial bacteria.',
      properties:  ['Raises pH', 'Calcium carbonate', 'Reef safe', 'Biological filtration'],
      bestFor:     ['Saltwater tanks', 'Reef aquariums', 'Cichlid tanks'],
      warning:     'Not suitable for low-pH freshwater fish like discus',
    },
    {
      id:          'play_sand',
      name:        'Play Sand (Washed)',
      density:     DENSITIES.play_sand,
      recommended: false,
      badge:       null,
      tagline:     'Budget option for non-sensitive fish',
      description: 'Washed play sand can work in freshwater tanks as a budget substrate. Must be thoroughly rinsed before use. Check for chemicals.',
      properties:  ['Cheap', 'Widely available', 'Fine texture', 'Requires rinsing'],
      bestFor:     ['Budget freshwater setups', 'Non-planted tanks'],
      warning:     'Always rinse thoroughly. Avoid brands with added chemicals.',
    },
    {
      id:          'black_sand',
      name:        'Black Sand',
      density:     DENSITIES.black_sand,
      recommended: false,
      badge:       null,
      tagline:     'Enhances fish colors with dramatic contrast',
      description: 'Basalt-based black sand creates stunning contrast that makes fish colors pop. Popular in aquascaping and planted tank setups.',
      properties:  ['Dramatic look', 'Enhances colors', 'Aquascaping', 'Fish safe'],
      bestFor:     ['Aquascaping', 'Planted tanks', 'Betta tanks', 'Show tanks'],
      warning:     null,
    },
  ],

  // ── 4. Sand for Pool ───────────────────────────────────────
  'sand-calculator-for-pool': [
    {
      id:          'mason_sand',
      name:        'Mason Sand',
      density:     DENSITIES.mason_sand,
      recommended: true,
      badge:       '⭐ BEST FOR POOL BASE',
      tagline:     'Smooth, fine sand — standard for pool installation',
      description: 'Mason sand is the industry standard for above-ground pool bases. Fine, smooth texture protects liner from punctures and creates level surface.',
      properties:  ['Fine texture', 'Protects liner', 'Easy leveling', 'Smooth surface'],
      bestFor:     ['Above-ground pool base', 'Pool liner protection', 'Small to medium pools'],
      warning:     null,
    },
    {
      id:          'concrete_sand',
      name:        'Concrete Sand',
      density:     DENSITIES.concrete_sand,
      recommended: false,
      badge:       null,
      tagline:     'Better drainage for large or heavy pools',
      description: 'Coarser than mason sand. Better drainage properties. Used for in-ground pool bases or very large above-ground pools requiring extra support.',
      properties:  ['Strong compaction', 'Better drainage', 'Coarser texture', 'Heavy duty'],
      bestFor:     ['In-ground pool bases', 'Large above-ground pools', 'Heavy foundations'],
      warning:     'Coarser texture may feel rougher underfoot',
    },
    {
      id:          'play_sand',
      name:        'Play Sand',
      density:     DENSITIES.play_sand,
      recommended: false,
      badge:       null,
      tagline:     'Softest option but less stable',
      description: 'Very fine and soft. Provides comfortable surface but can shift and compact unevenly over time. Better for temporary or small pools.',
      properties:  ['Very soft', 'Fine texture', 'Comfortable', 'Lightweight'],
      bestFor:     ['Temporary pools', 'Small kiddie pools', 'Short-term setups'],
      warning:     'Can shift more easily — not ideal for permanent installations',
    },
  ],

  // ── 5. Sand for Sandbox ────────────────────────────────────
  'sand-calculator-for-sandbox': [
    {
      id:          'play_sand',
      name:        'Play Sand',
      density:     DENSITIES.play_sand,
      recommended: true,
      badge:       '⭐ BEST FOR CHILDREN',
      tagline:     'Soft, washed, and child-safe',
      description: 'Specifically manufactured for children\'s play. Washed, screened, and free of sharp edges, harmful minerals, and contaminants. The safest choice.',
      properties:  ['Child safe', 'No sharp edges', 'Washed & screened', 'Soft texture'],
      bestFor:     ['Children\'s sandboxes', 'School play areas', 'Residential sandboxes'],
      warning:     null,
    },
    {
      id:          'river_sand',
      name:        'Natural River Sand',
      density:     DENSITIES.river_sand,
      recommended: false,
      badge:       null,
      tagline:     'Natural feel but requires screening',
      description: 'Naturally rounded river sand has a soft, natural texture. Must be properly washed and screened before use in children\'s play areas.',
      properties:  ['Natural texture', 'Rounded grains', 'Soft feel', 'Natural look'],
      bestFor:     ['Natural play areas', 'Adults\' sandboxes'],
      warning:     'Must be washed and screened — check for debris and organisms',
    },
    {
      id:          'mason_sand',
      name:        'Mason Sand',
      density:     DENSITIES.mason_sand,
      recommended: false,
      badge:       null,
      tagline:     'Fine and clean but not specifically child-rated',
      description: 'Clean, fine sand. Suitable for sandboxes but not specifically manufactured or tested for children\'s play like certified play sand.',
      properties:  ['Fine texture', 'Clean', 'Affordable', 'Easy to source'],
      bestFor:     ['Adult sandboxes', 'Decorative sandboxes', 'Sand art'],
      warning:     'Not certified child-safe — check local standards before use',
    },
  ],

  // ── 6. Sand for Artificial Grass ──────────────────────────
  'sand-calculator-for-artificial-grass': [
    {
      id:          'silica_sand',
      name:        'Silica Sand (Infill)',
      density:     DENSITIES.silica_sand,
      recommended: true,
      badge:       '⭐ BEST INFILL',
      tagline:     'Keeps turf blades upright and drains perfectly',
      description: 'Rounded, washed silica sand is the standard infill for artificial grass. Keeps fibers upright, improves drainage, and adds weight to hold turf down.',
      properties:  ['Rounded grains', 'Perfect drainage', 'Holds blades upright', 'Industry standard'],
      bestFor:     ['All artificial grass infill', 'Residential lawns', 'Sports pitches'],
      warning:     'Use 0.3–0.8mm grain size for best results',
    },
    {
      id:          'sharp_sand',
      name:        'Sharp Sand (Base)',
      density:     DENSITIES.sharp_sand,
      recommended: true,
      badge:       '⭐ BEST BASE LAYER',
      tagline:     'Excellent drainage base under artificial turf',
      description: 'Angular sharp sand compacts firmly and drains excellently. Used as the sub-base layer underneath artificial grass installation.',
      properties:  ['Excellent drainage', 'Compacts firmly', 'Angular grains', 'Stable base'],
      bestFor:     ['Artificial grass sub-base', 'Drainage layer', 'Foundation layer'],
      warning:     'Use as base layer only — not as infill',
    },
    {
      id:          'coarse_sand',
      name:        'Coarse Sand',
      density:     DENSITIES.coarse_sand,
      recommended: false,
      badge:       null,
      tagline:     'Alternative base option for budget projects',
      description: 'Coarse construction sand can substitute for sharp sand as a base layer in budget artificial grass projects.',
      properties:  ['Affordable', 'Good compaction', 'Widely available', 'Budget option'],
      bestFor:     ['Budget installations', 'Small areas'],
      warning:     'Less drainage efficiency than sharp sand',
    },
  ],

  // ── 7. Sand for Brickwork ──────────────────────────────────
  'sand-calculator-for-brickwork': [
    {
      id:          'sharp_sand',
      name:        'Sharp Sand',
      density:     DENSITIES.sharp_sand,
      recommended: true,
      badge:       '⭐ STANDARD FOR MORTAR',
      tagline:     'Industry standard for brickwork mortar',
      description: 'Sharp sand is the professional standard for brickwork mortar. Angular grains create strong bond with cement. Used in 1:3 to 1:6 cement:sand ratios.',
      properties:  ['Strong bond', 'Angular grains', 'Professional standard', 'High strength'],
      bestFor:     ['All brickwork mortar', 'Block laying', 'Garden walls', 'House extensions'],
      warning:     null,
    },
    {
      id:          'mason_sand',
      name:        'Mason Sand',
      density:     DENSITIES.mason_sand,
      recommended: false,
      badge:       null,
      tagline:     'Smoother finish mortar for pointing work',
      description: 'Finer than sharp sand. Produces smoother mortar finish. Often used for pointing and render work rather than structural brickwork.',
      properties:  ['Fine texture', 'Smooth mortar', 'Good workability', 'Pointing work'],
      bestFor:     ['Pointing', 'Rendering', 'Decorative brickwork', 'Smooth finishes'],
      warning:     'Less structural strength than sharp sand for load-bearing walls',
    },
    {
      id:          'coarse_sand',
      name:        'Coarse Sand',
      density:     DENSITIES.coarse_sand,
      recommended: false,
      badge:       null,
      tagline:     'Budget option for non-structural brickwork',
      description: 'General coarse sand can be used for non-structural garden walls and decorative brickwork where maximum strength is not critical.',
      properties:  ['Affordable', 'Widely available', 'Good workability'],
      bestFor:     ['Garden walls', 'Non-structural work', 'Budget projects'],
      warning:     'Not recommended for load-bearing or structural brickwork',
    },
  ],

  // ── 8. Sand for Circles ────────────────────────────────────
  'sand-calculator-for-circles': [
    {
      id:          'mason_sand',
      name:        'Mason Sand',
      density:     DENSITIES.mason_sand,
      recommended: true,
      badge:       '⭐ MOST VERSATILE',
      tagline:     'Best all-round sand for circular features',
      description: 'Fine, clean mason sand works perfectly for circular patios, garden beds, fire pit bases and decorative circular features.',
      properties:  ['Fine texture', 'Easy to level', 'Clean', 'Versatile'],
      bestFor:     ['Round patios', 'Fire pit bases', 'Circular garden beds'],
      warning:     null,
    },
    {
      id:          'concrete_sand',
      name:        'Concrete Sand',
      density:     DENSITIES.concrete_sand,
      recommended: false,
      badge:       null,
      tagline:     'For structural circular paved areas',
      description: 'Use concrete sand when your circular feature involves paving or requires strong structural support and good drainage.',
      properties:  ['Strong base', 'Good drainage', 'Compacts well'],
      bestFor:     ['Circular paved areas', 'Round patios with pavers', 'Structural bases'],
      warning:     null,
    },
    {
      id:          'play_sand',
      name:        'Play Sand',
      density:     DENSITIES.play_sand,
      recommended: false,
      badge:       null,
      tagline:     'For circular sandpits and play areas',
      description: 'Use play sand for circular children\'s sandpits and play areas. Safe, soft and specifically designed for play.',
      properties:  ['Child safe', 'Soft', 'Fine texture'],
      bestFor:     ['Circular sandpits', 'Play area bases', 'Children\'s areas'],
      warning:     null,
    },
  ],

  // ── 9. Sand for Mixing with Cement ────────────────────────
  'sand-calculator-for-mixing-with-cement': [
    {
      id:          'sharp_sand',
      name:        'Sharp Sand',
      density:     DENSITIES.sharp_sand,
      recommended: true,
      badge:       '⭐ BEST FOR MORTAR',
      tagline:     'Maximum strength mortar for all masonry',
      description: 'Angular grains of sharp sand create the strongest mortar when mixed with cement. Used in structural and non-structural masonry throughout the industry.',
      properties:  ['Maximum strength', 'Angular grains', 'Professional standard', 'All uses'],
      bestFor:     ['Structural mortar', 'Brickwork', 'Blockwork', 'General masonry'],
      warning:     null,
    },
    {
      id:          'mason_sand',
      name:        'Mason Sand',
      density:     DENSITIES.mason_sand,
      recommended: false,
      badge:       null,
      tagline:     'Smoother workable mix for rendering',
      description: 'Finer sand produces more workable, smoother mortar. Preferred for render, plaster, and decorative pointing where finish matters more than strength.',
      properties:  ['Smooth mix', 'Easy to work', 'Fine finish', 'Good workability'],
      bestFor:     ['Rendering', 'Plastering', 'Pointing', 'Decorative work'],
      warning:     'Lower compressive strength than sharp sand mixes',
    },
    {
      id:          'coarse_sand',
      name:        'Coarse Sand',
      density:     DENSITIES.coarse_sand,
      recommended: false,
      badge:       null,
      tagline:     'General purpose cement mixing',
      description: 'Standard coarse construction sand suitable for general cement mixing work where precise specifications are not required.',
      properties:  ['Affordable', 'Widely available', 'General purpose'],
      bestFor:     ['General repairs', 'Non-critical work', 'Budget projects'],
      warning:     'Variable quality — check for clay or silt content',
    },
  ],

  // ── 10. Sand for Concrete ──────────────────────────────────
  'sand-calculator-for-concrete': [
    {
      id:          'concrete_sand',
      name:        'Concrete Sand',
      density:     DENSITIES.concrete_sand,
      recommended: true,
      badge:       '⭐ STANDARD FINE AGGREGATE',
      tagline:     'The industry standard for concrete mixing',
      description: 'Concrete sand (also called sharp sand or coarse sand) is the standard fine aggregate for concrete. Meets ASTM C33 grading requirements for structural concrete.',
      properties:  ['ASTM C33 compliant', 'Consistent grading', 'Maximum strength', 'Industry standard'],
      bestFor:     ['All concrete work', 'Foundations', 'Slabs', 'Driveways', 'Columns'],
      warning:     null,
    },
    {
      id:          'sharp_sand',
      name:        'Sharp Sand',
      density:     DENSITIES.sharp_sand,
      recommended: false,
      badge:       null,
      tagline:     'Strong alternative fine aggregate',
      description: 'Angular sharp sand can substitute as fine aggregate in concrete mixes. Widely used in UK concrete mixing. Produces strong, durable concrete.',
      properties:  ['Angular grains', 'Strong concrete', 'Good bond', 'UK standard'],
      bestFor:     ['UK concrete projects', 'General concrete mixing', 'Structural work'],
      warning:     null,
    },
    {
      id:          'mason_sand',
      name:        'Mason Sand',
      density:     DENSITIES.mason_sand,
      recommended: false,
      badge:       null,
      tagline:     'Smoother finish concrete — non-structural only',
      description: 'Fine mason sand in concrete produces a smoother finish but lower strength. Use only for non-structural decorative concrete work.',
      properties:  ['Smooth finish', 'Decorative concrete', 'Fine texture'],
      bestFor:     ['Decorative concrete', 'Pathways', 'Non-structural slabs'],
      warning:     'Not suitable for structural concrete — reduces compressive strength',
    },
  ],

};