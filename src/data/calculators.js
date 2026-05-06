// ============================================================
// FILE: src/data/calculators.js
// PURPOSE: Central metadata store for all 10 sand calculators.
//          Contains ONLY serializable data (no functions).
//          Formulas are handled inside each calculator component.
// PLACEMENT: src/data/calculators.js (REPLACE existing file)
// ============================================================

export const calculators = [

  // ── 1. Sand for Yards ──────────────────────────────────
  {
    slug: 'sand-calculator-for-yards',
    name: 'Sand Calculator for Yards',
    icon: 'Layers',
    intro: 'Calculate exact cubic yards of sand needed for any landscaping or construction project.',
    description: `Accurately estimating sand quantity in cubic yards is essential for landscaping,
    grading, and construction projects. Our sand calculator for yards uses the standard volume
    formula — length multiplied by width multiplied by depth — to compute the exact amount of
    sand required. Whether you are working on a yard leveling project, a garden bed, or a
    construction site, knowing the precise cubic yards of sand prevents over-ordering and reduces
    material waste. Sand density typically ranges from 1.4 to 1.7 tonnes per cubic meter depending
    on moisture content and grain size. Use this sand yardage calculator to plan your bulk sand
    purchase with confidence and avoid costly project delays.`,
    inputs: [
      { id: 'length', label: 'Length', placeholder: 'e.g. 20 (feet) — the longest side of your area', unit: 'ft' },
      { id: 'width',  label: 'Width',  placeholder: 'e.g. 15 (feet) — the shorter side of your area', unit: 'ft' },
      { id: 'depth',  label: 'Depth',  placeholder: 'e.g. 4 (inches) — how deep the sand layer should be', unit: 'in' },
    ],
  },

  // ── 2. Sand for Pavers ─────────────────────────────────
  {
    slug: 'sand-calculator-for-pavers',
    name: 'Sand Calculator for Pavers',
    icon: 'Grid3x3',
    intro: 'Find the precise amount of bedding sand required under pavers for a stable, level surface.',
    description: `Installing pavers correctly requires a precise layer of bedding sand — typically
    1 inch deep — beneath each paver to ensure a level, stable, and long-lasting surface. Our
    sand calculator for pavers computes the exact volume and weight of coarse sand needed based
    on the total paver area and desired sand bed depth. Proper sand bedding prevents paver
    shifting, cracking, and uneven settling over time. Whether you are laying a patio, driveway,
    pathway, or pool deck with concrete or natural stone pavers, this calculator ensures you
    purchase the correct amount of bedding sand. Input your project dimensions and get instant
    results in cubic feet, cubic yards, and tonnes.`,
    inputs: [
      { id: 'area',  label: 'Paver Area',       placeholder: 'e.g. 200 (sq ft) — total area to be paved', unit: 'ft²' },
      { id: 'depth', label: 'Sand Bed Depth',   placeholder: 'e.g. 1 (inch) — typically 1 inch for pavers', unit: 'in' },
    ],
  },

  // ── 3. Sand for Aquarium ───────────────────────────────
  {
    slug: 'sand-calculator-for-aquarium',
    name: 'Sand Calculator for Aquarium',
    icon: 'Fish',
    intro: 'Calculate the pounds of aquarium sand needed for a perfect substrate depth in your fish tank.',
    description: `Choosing the right amount of aquarium sand substrate is critical for the health
    of your fish, plants, and beneficial bacteria colonies. Our aquarium sand calculator helps
    you determine the exact pounds of sand needed based on your tank dimensions and desired
    substrate depth. A substrate depth of 1 to 2 inches suits most freshwater community tanks,
    while planted tanks and saltwater reef tanks often require 3 to 4 inches for proper root
    growth and biological filtration. Fine-grain sand is preferred for bottom-dwelling fish like
    corydoras and jawfish. Use this fish tank sand calculator to avoid cloudiness from excess
    sand and ensure optimal water circulation through your aquarium substrate.`,
    inputs: [
      { id: 'length', label: 'Tank Length',     placeholder: 'e.g. 48 (inches) — inner length of your tank', unit: 'in' },
      { id: 'width',  label: 'Tank Width',      placeholder: 'e.g. 13 (inches) — inner width of your tank', unit: 'in' },
      { id: 'depth',  label: 'Substrate Depth', placeholder: 'e.g. 2 (inches) — 1-2in for fish, 3-4in for plants', unit: 'in' },
    ],
  },

  // ── 4. Sand for Pool ───────────────────────────────────
  {
    slug: 'sand-calculator-for-pool',
    name: 'Sand Calculator for Pool',
    icon: 'Waves',
    intro: 'Estimate the sand needed for pool base leveling or pool filter media replacement.',
    description: `Sand plays two critical roles in pool construction and maintenance: as a
    compacted base layer beneath an above-ground pool liner, and as filter media inside a
    sand filter system. Our pool sand calculator covers both use cases. For pool base sand,
    a 2 to 3 inch compacted layer of mason sand protects the liner from punctures and creates
    a smooth, comfortable pool floor. For pool filter sand, the standard replacement is number
    20 silica sand, with most residential filters requiring 50 to 600 pounds depending on filter
    tank diameter. Enter your pool dimensions and sand depth to get precise quantities in
    cubic yards and pounds for your next pool project or filter maintenance.`,
    inputs: [
      { id: 'length', label: 'Pool Length',      placeholder: 'e.g. 24 (feet) — outer length of pool base area', unit: 'ft' },
      { id: 'width',  label: 'Pool Width',       placeholder: 'e.g. 12 (feet) — outer width of pool base area', unit: 'ft' },
      { id: 'depth',  label: 'Sand Layer Depth', placeholder: 'e.g. 2 (inches) — typically 2-3 inches for pool base', unit: 'in' },
    ],
  },

  // ── 5. Sand for Sandbox ────────────────────────────────
  {
    slug: 'sand-calculator-for-sandbox',
    name: 'Sand Calculator for Sandbox',
    icon: 'Castle',
    intro: 'Find out exactly how many bags of play sand you need to fill your sandbox perfectly.',
    description: `Filling a sandbox with the right amount of play sand ensures a safe, fun, and
    comfortable play experience for children. Our sandbox sand calculator determines the exact
    volume and number of 50-pound bags of play sand required based on your sandbox dimensions
    and desired fill depth. Most experts recommend filling a sandbox to about one-third to
    one-half of its total depth for safe and enjoyable play. Washed, fine-grain play sand is
    the safest option for children sandboxes as it is free of sharp edges and harmful
    contaminants. Use this sandbox sand estimator to purchase just the right amount of play
    sand without over-buying or leaving the sandbox too shallow for digging and building.`,
    inputs: [
      { id: 'length', label: 'Sandbox Length',   placeholder: 'e.g. 6 (feet) — inner length of sandbox', unit: 'ft' },
      { id: 'width',  label: 'Sandbox Width',    placeholder: 'e.g. 4 (feet) — inner width of sandbox', unit: 'ft' },
      { id: 'depth',  label: 'Sand Fill Depth',  placeholder: 'e.g. 8 (inches) — typically 8-12 inches for kids', unit: 'in' },
    ],
  },

  // ── 6. Sand for Artificial Grass ──────────────────────
  {
    slug: 'sand-calculator-for-artificial-grass',
    name: 'Sand Calculator for Artificial Grass',
    icon: 'TreePine',
    intro: 'Calculate kilograms of silica sand infill needed to stabilize and weigh down artificial turf.',
    description: `Silica sand infill is an essential component of a professional artificial grass
    installation. It weighs down the turf, keeps the fibers upright, provides stability underfoot,
    and improves drainage performance. Our artificial grass sand calculator estimates the exact
    kilograms of silica sand infill required based on your lawn area and the recommended infill
    rate. Most artificial turf manufacturers recommend 4 to 7 kilograms of sand per square meter
    of artificial grass. Rounded, washed silica sand with a grain size of 0.3 to 0.8mm is the
    industry standard for artificial turf infill. Use this calculator before purchasing infill
    sand to ensure your synthetic lawn looks natural, performs well, and lasts for years.`,
    inputs: [
      { id: 'area', label: 'Turf Area',    placeholder: 'e.g. 50 (sq meters) — total artificial grass area', unit: 'm²' },
      { id: 'rate', label: 'Infill Rate',  placeholder: 'e.g. 5 (kg/m²) — manufacturer recommended rate (4-7 kg/m²)', unit: 'kg/m²' },
    ],
  },

  // ── 7. Sand for Brickwork ──────────────────────────────
  {
    slug: 'sand-calculator-for-brickwork',
    name: 'Sand Calculator for Brickwork',
    icon: 'BrickWall',
    intro: 'Estimate the tonnes of sharp sand required for mortar in brick laying projects.',
    description: `Calculating the correct amount of sand for brickwork mortar is essential to
    avoid multiple trips to the builder merchant and keep your bricklaying project on schedule.
    Our brickwork sand calculator estimates the volume of sharp sand needed based on the number
    of bricks and the standard mortar mix ratio. A standard mortar mix for brickwork uses a
    1:4 ratio of cement to sharp sand by volume. On average, approximately 1 tonne of sand is
    required per 1,000 bricks laid using a 10mm mortar joint. Whether you are building a
    garden wall, house extension, or retaining wall, use this brick mortar sand calculator to
    accurately plan your material quantities and reduce waste on site.`,
    inputs: [
      { id: 'bricks', label: 'Number of Bricks',          placeholder: 'e.g. 500 — total bricks to be laid', unit: 'bricks' },
      { id: 'joint',  label: 'Mortar Joint Thickness',    placeholder: 'e.g. 10 (mm) — standard joint is 10mm', unit: 'mm' },
    ],
  },

  // ── 8. Sand for Circles ────────────────────────────────
  {
    slug: 'sand-calculator-for-circles',
    name: 'Sand Calculator for Circles',
    icon: 'Circle',
    intro: 'Calculate sand volume for circular areas like round patios, fire pits, or garden beds.',
    description: `Circular and curved landscaping features require a different calculation approach
    than rectangular areas. Our circular sand calculator uses the standard circle area formula
    — pi multiplied by radius squared — to accurately determine the volume of sand needed for
    round patios, circular garden beds, fire pit bases, round sandboxes, or any other
    circular project area. Accurately calculating sand for circular areas prevents under-ordering
    which causes project delays or over-ordering which wastes money. Enter the diameter or
    radius of your circular area and the required sand depth to instantly get results in cubic
    feet, cubic yards, and weight in tonnes and pounds.`,
    inputs: [
      { id: 'diameter', label: 'Circle Diameter', placeholder: 'e.g. 10 (feet) — measure across the widest point', unit: 'ft' },
      { id: 'depth',    label: 'Sand Depth',      placeholder: 'e.g. 3 (inches) — how deep the sand layer should be', unit: 'in' },
    ],
  },

  // ── 9. Sand for Mixing with Cement ────────────────────
  {
    slug: 'sand-calculator-for-mixing-with-cement',
    name: 'Sand Calculator for Mixing with Cement',
    icon: 'FlaskConical',
    intro: 'Calculate sand and cement quantities for mortar or render based on your chosen mix ratio.',
    description: `Getting the sand-to-cement ratio right is fundamental to producing strong,
    durable mortar for plastering, rendering, or general masonry work. Our sand and cement
    calculator computes the exact quantities of both sharp sand and cement needed based on
    your total mortar volume requirement and chosen mix ratio. Common mortar mix ratios include
    3:1 (strong structural mortar), 4:1 (general purpose brickwork mortar), and 5:1 (pointing
    and rendering). Using the correct sand-cement ratio ensures proper workability, adhesion,
    and compressive strength of the finished mortar. This calculator is ideal for plasterers,
    bricklayers, and DIY builders who want accurate material quantities before starting any
    cement and sand mixing project.`,
    inputs: [
      { id: 'volume', label: 'Total Mortar Volume', placeholder: 'e.g. 0.5 (cubic meters) — total mortar needed', unit: 'm³' },
      { id: 'ratio',  label: 'Sand:Cement Ratio',   placeholder: 'e.g. 4 — enter the sand part only (e.g. 4 for 4:1 mix)', unit: ':1' },
    ],
  },

  // ── 10. Sand for Concrete ──────────────────────────────
  {
    slug: 'sand-calculator-for-concrete',
    name: 'Sand Calculator for Concrete',
    icon: 'HardHat',
    intro: 'Compute the fine aggregate sand quantity needed for concrete mixing by volume or weight.',
    description: `Sand, or fine aggregate, is a critical component of concrete mix that fills
    the voids between coarse aggregate particles and improves workability and density. Our
    concrete sand calculator determines the exact amount of fine aggregate sand required based
    on your concrete volume and mix design. A standard C20 concrete mix uses a 1:2:4 ratio
    of cement, sand, and gravel, while a stronger C25 mix uses 1:1.5:3. The correct proportion
    of sand in concrete prevents cracking, improves strength, and ensures a smooth finish.
    Whether you are mixing concrete for a foundation, driveway, slab, or column, use this
    sand for concrete calculator to accurately estimate your fine aggregate requirements
    before placing your order at the builder merchant.`,
    inputs: [
      { id: 'length',    label: 'Slab Length',     placeholder: 'e.g. 10 (feet) — length of the concrete area', unit: 'ft' },
      { id: 'width',     label: 'Slab Width',      placeholder: 'e.g. 8 (feet) — width of the concrete area', unit: 'ft' },
      { id: 'thickness', label: 'Slab Thickness',  placeholder: 'e.g. 4 (inches) — typical slab is 4 inches thick', unit: 'in' },
      { id: 'ratio',     label: 'Sand Part in Mix', placeholder: 'e.g. 2 — for 1:2:4 mix enter 2 for sand part', unit: 'parts' },
    ],
  },

];