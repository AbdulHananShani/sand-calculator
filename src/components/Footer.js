// ============================================================
// FILE: src/components/Footer.js
// PURPOSE: Site-wide footer with logo, navigation links,
//          calculator links, and copyright notice.
//          Appears on every page via layout.js.
// PLACEMENT: src/components/Footer.js (New File)
// ============================================================

import Link from 'next/link';
import { Calculator, Mail, Globe } from 'lucide-react';

// ── Footer Calculator Links ──────────────────────────────────
const calculatorLinks = [
  { href: '/calculators/sand-calculator-for-yards',              label: 'Sand for Yards' },
  { href: '/calculators/sand-calculator-for-pavers',             label: 'Sand for Pavers' },
  { href: '/calculators/sand-calculator-for-aquarium',           label: 'Sand for Aquarium' },
  { href: '/calculators/sand-calculator-for-pool',               label: 'Sand for Pool' },
  { href: '/calculators/sand-calculator-for-sandbox',            label: 'Sand for Sandbox' },
  { href: '/calculators/sand-calculator-for-artificial-grass',   label: 'Sand for Artificial Grass' },
  { href: '/calculators/sand-calculator-for-brickwork',          label: 'Sand for Brickwork' },
  { href: '/calculators/sand-calculator-for-circles',            label: 'Sand for Circles' },
  { href: '/calculators/sand-calculator-for-mixing-with-cement', label: 'Sand for Cement' },
  { href: '/calculators/sand-calculator-for-concrete',           label: 'Sand for Concrete' },
];

const quickLinks = [
  { href: '/',             label: 'Home' },
  { href: '/calculators', label: 'All Calculators' },
  { href: '/blog',         label: 'Blog' },
  { href: '/about',        label: 'About Us' },
  { href: '/privacy',      label: 'Privacy Policy' },
];

// ── Footer Component ─────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-gray-800/50 mt-auto">

      {/* ── Main Footer Grid ─────────────────────────────── */}
      <div className="section-wrapper py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Column 1: Brand & Description ───────────── */}
          <div className="lg:col-span-1">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-900/40">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-gradient">Sand</span>
                <span className="text-gray-100"> Calculators</span>
              </span>
            </Link>

            {/* Brand description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Free professional sand calculators for construction, landscaping,
              aquariums, pools, and more. Get accurate results instantly.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-2">

              {/* Email link */}
              <a
                href="mailto:contact@sandcalc.com"
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>contact@sandcalc.com</span>
              </a>

              {/* Website link */}
              <a
                href="https://www.sandcalc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                <Globe className="w-4 h-4" />
                <span>www.sandcalc.com</span>
              </a>

            </div>
          </div>

          {/* ── Column 2: Quick Links ────────────────────── */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Calculators (first 5) ─────────── */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Calculators
            </h3>
            <ul className="flex flex-col gap-2">
              {calculatorLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Calculators (last 5) ──────────── */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              More Calculators
            </h3>
            <ul className="flex flex-col gap-2">
              {calculatorLinks.slice(5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────── */}
      <div className="border-t border-gray-800/50">
        <div className="section-wrapper py-4 flex flex-col sm:flex-row items-center justify-between gap-2">

          {/* Copyright */}
          <p className="text-gray-500 text-xs">
            © {currentYear} Sand Calculator. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-gray-500 text-xs hover:text-primary-400 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/about"
              className="text-gray-500 text-xs hover:text-primary-400 transition-colors duration-200"
            >
              About Us
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}