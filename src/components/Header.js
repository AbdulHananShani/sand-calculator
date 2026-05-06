// ============================================================
// FILE: src/components/Header.js
// PURPOSE: Site-wide navigation header with logo, nav links,
//          and mobile hamburger menu. Appears on every page
//          via layout.js. Sticky on scroll with blur effect.
// PLACEMENT: src/components/Header.js (New File)
// ============================================================

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calculator } from 'lucide-react';

// ── Navigation Links Data ────────────────────────────────────
const navLinks = [
  { href: '/',             label: 'Home' },
  { href: '/calculators', label: 'Calculators' },
  { href: '/blog',         label: 'Blog' },
  { href: '/about',        label: 'About' },
];

// ── Header Component ─────────────────────────────────────────
export default function Header() {
  const pathname = usePathname();

  // Mobile menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  // Scrolled state for background blur effect
  const [scrolled, setScrolled] = useState(false);

  // ── Detect scroll position ───────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Close mobile menu on route change ───────────────────
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="section-wrapper">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ─────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            {/* Logo icon with gradient background */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-900/40 group-hover:shadow-primary-700/50 transition-all duration-200">
              <Calculator className="w-5 h-5 text-white" />
            </div>

            {/* Logo text */}
            <span className="text-lg font-bold">
              <span className="text-gradient">Sand</span>
              <span className="text-gray-100"> Calculator</span>
            </span>
          </Link>

          {/* ── Desktop Navigation ───────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

          </nav>

          {/* ── Mobile Hamburger Button ───────────────────── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>
      </div>

      {/* ── Mobile Dropdown Menu ──────────────────────────── */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-dark-900/95 backdrop-blur-md border-t border-gray-800/50 px-4 py-3 flex flex-col gap-1">

          {/* Mobile nav links */}
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

        </div>
      </div>

    </header>
  );
}