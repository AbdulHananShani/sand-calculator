// ============================================================
// FILE: src/app/about/page.js
// PURPOSE: About Us page. Describes the website, its mission,
//          and the team. Required for AdSense approval and
//          user trust. Accessible at /about
// PLACEMENT: src/app/about/page.js (New File)
// ============================================================

import Link from 'next/link';
import { Calculator, Target, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';

// ── SEO Metadata ─────────────────────────────────────────────
export const metadata = {
  title: 'About Us — Sand Calculator',
  description:
    'Learn about Sand Calculator — our mission to provide free, accurate, and professional sand estimation tools for construction, landscaping, and DIY projects worldwide.',
};

// ── Our values data ──────────────────────────────────────────
const values = [
  {
    icon: Target,
    title: 'Accuracy First',
    description:
      'Every calculator uses real-life engineering formulas verified by construction professionals. We never guess — we calculate.',
  },
  {
    icon: Users,
    title: 'Built for Everyone',
    description:
      'Whether you are a professional contractor, a landscaper, or a weekend DIY enthusiast, our tools are designed to be simple and instantly useful.',
  },
  {
    icon: Award,
    title: 'Always Free',
    description:
      'All 10 sand calculators are completely free to use with no registration, no hidden fees, and no limits. Professional results, zero cost.',
  },
  {
    icon: Calculator,
    title: 'Real Formulas',
    description:
      'We use industry-standard formulas for volume, weight, and material estimation — the same methods used by engineers and contractors on job sites.',
  },
];

// ── What we offer list ───────────────────────────────────────
const offerings = [
  'Sand Calculator for Yards — cubic yard estimation for landscaping',
  'Sand Calculator for Pavers — bedding sand for patio and driveway projects',
  'Sand Calculator for Aquarium — substrate depth for fish tanks',
  'Sand Calculator for Pool — base sand and filter media estimation',
  'Sand Calculator for Sandbox — play sand bag count for children',
  'Sand Calculator for Artificial Grass — silica infill for synthetic turf',
  'Sand Calculator for Brickwork — sharp sand for mortar and masonry',
  'Sand Calculator for Circles — volume estimation for circular areas',
  'Sand Calculator for Mixing with Cement — sand and cement ratios',
  'Sand Calculator for Concrete — fine aggregate for concrete slabs',
];

// ── About Page Component ─────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="pt-20 pb-16">

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-b border-gray-800/50 py-16">
        <div className="section-wrapper text-center">

          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-primary-600/10 border border-primary-500/20 rounded-full px-4 py-2 mb-4">
            <Users className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">
              Who We Are
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            About <span className="text-gradient">Sand Calculator</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We build free, accurate, and professional sand estimation tools
            for construction workers, landscapers, aquarium hobbyists,
            and DIY enthusiasts around the world.
          </p>

        </div>
      </div>

      <div className="section-wrapper mt-12">

        {/* ── Mission Section ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-center">

          {/* Left — Mission text */}
          <div>
            <h2 className="text-3xl font-black text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Sand Calculator was created with one simple goal: to eliminate
              guesswork from sand estimation. Before tools like ours existed,
              contractors and homeowners had to manually calculate volumes,
              convert units, and estimate bag counts — a process prone to
              costly errors.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              We built a suite of 10 specialized calculators, each designed
              for a specific use case, using the same formulas trusted by
              civil engineers and construction professionals. Our tools save
              time, reduce material waste, and help you plan your projects
              with confidence.
            </p>
            <p className="text-gray-400 leading-relaxed">
              From a small backyard sandbox to a large commercial paving
              project, Sand Calculator gives you accurate, instant results
              completely free of charge.
            </p>
          </div>

          {/* Right — Stats card */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '10',    label: 'Free Calculators' },
              { value: '100%',  label: 'Accuracy Focused' },
              { value: 'Free',  label: 'Always & Forever' },
              { value: 'Fast',  label: 'Instant Results' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="card-glass p-6 text-center flex flex-col gap-2"
              >
                <span className="text-3xl font-black text-gradient">
                  {stat.value}
                </span>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* ── Our Values ────────────────────────────────── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2">
              Our Values
            </h2>
            <p className="text-gray-400">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="card-glass p-6 flex flex-col gap-4">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary-400" />
                  </div>
                  {/* Title */}
                  <h3 className="text-white font-bold text-lg">
                    {value.title}
                  </h3>
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── What We Offer ─────────────────────────────── */}
        <div className="card-glass p-8 md:p-10 mb-16">
          <h2 className="text-3xl font-black text-white mb-2">
            What We Offer
          </h2>
          <p className="text-gray-400 mb-8">
            A complete library of sand calculators for every project type
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {offerings.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Section ───────────────────────────────── */}
        <div className="text-center bg-gradient-to-r from-primary-900/30 to-accent-900/20 border border-primary-700/30 rounded-2xl p-10">
          <h2 className="text-3xl font-black text-white mb-3">
            Ready to Calculate?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Choose from our 10 free professional sand calculators and get
            accurate results for your project in seconds.
          </p>
          <Link
            href="/calculators"
            className="btn-primary inline-flex items-center gap-2"
          >
            Explore All Calculators
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}