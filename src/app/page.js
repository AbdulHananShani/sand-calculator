// ============================================================
// FILE: src/app/page.js
// PURPOSE: Home page / Landing page of the website.
//          Renders HeroSection, CalculatorGrid, and a
//          Blog preview section dynamically from blogs.json.
//          This is the root route — accessible at "/"
// PLACEMENT: src/app/page.js (REPLACE existing file)
// ============================================================

import HeroSection from '@/components/HeroSection';
import CalculatorGrid from '@/components/CalculatorGrid';
import Link from 'next/link';
import { getAllBlogs, formatDate } from '@/lib/blogUtils';
import { ArrowRight, BookOpen } from 'lucide-react';

// ── Home Page Component ──────────────────────────────────────
// This is a Server Component — blogs are read from JSON on server
export default function HomePage() {

  // Read latest 3 blog posts from blogs.json
  const allBlogs = getAllBlogs();
  const latestBlogs = allBlogs.slice(0, 3);

  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────── */}
      <HeroSection />

      {/* ── Section 2: Calculator Grid ───────────────────── */}
      <CalculatorGrid
        title="All Sand Calculators"
        subtitle="Choose from 10 professional sand calculators built with real-life engineering formulas. Get instant, accurate results for any project."
      />

      {/* ── Section 3: Blog Preview ──────────────────────── */}
      {latestBlogs.length > 0 && (
        <section className="py-16 md:py-24 bg-dark-900/50">
          <div className="section-wrapper">

            {/* ── Blog Section Header ───────────────────── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">

              <div>
                {/* Section label */}
                <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 rounded-full px-4 py-2 mb-4">
                  <BookOpen className="w-4 h-4 text-accent-400" />
                  <span className="text-accent-400 text-sm font-medium">
                    Latest Articles
                  </span>
                </div>

                {/* Section title */}
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  From Our Blog
                </h2>
              </div>

              {/* View all blogs link */}
              <Link
                href="/blog"
                className="flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200 flex-shrink-0"
              >
                View All Posts
                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>

            {/* ── Blog Cards Grid ───────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group block"
                >
                  <div className="card-glass p-6 h-full flex flex-col gap-4 hover:border-accent-500/40 hover:-translate-y-1 transition-all duration-300">

                    {/* Blog category badge */}
                    <span className="inline-block bg-accent-500/10 text-accent-400 text-xs font-medium px-3 py-1 rounded-full border border-accent-500/20 w-fit">
                      {blog.category}
                    </span>

                    {/* Blog title */}
                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-accent-400 transition-colors duration-200">
                      {blog.title}
                    </h3>

                    {/* Blog excerpt */}
                    <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                      {blog.excerpt}
                    </p>

                    {/* Blog meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-700/50 text-xs text-gray-500">
                      <span>{blog.author}</span>
                      <div className="flex items-center gap-2">
                        <span>{blog.readTime}</span>
                        <span>•</span>
                        <span>{formatDate(blog.date)}</span>
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── Section 4: Stats Banner ──────────────────────── */}
      <section className="py-16 border-t border-gray-800/50">
        <div className="section-wrapper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            {/* Stat 1 */}
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-gradient">10+</span>
              <span className="text-gray-400 text-sm">Sand Calculators</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-gradient">100%</span>
              <span className="text-gray-400 text-sm">Free to Use</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-gradient">Real</span>
              <span className="text-gray-400 text-sm">Engineering Formulas</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-black text-gradient">Fast</span>
              <span className="text-gray-400 text-sm">Instant Results</span>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}