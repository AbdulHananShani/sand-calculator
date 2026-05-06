// ============================================================
// FILE: src/app/blog/page.js
// PURPOSE: Blog listing page showing all published blog posts.
//          Reads posts from blogs.json via blogUtils.
//          Accessible at /blog
// PLACEMENT: src/app/blog/page.js (New File)
// ============================================================

import Link from 'next/link';
import { getAllBlogs, formatDate } from '@/lib/blogUtils';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';

// ── SEO Metadata ─────────────────────────────────────────────
export const metadata = {
  title: 'Blog — Sand Calculator Tips, Guides & Construction Advice',
  description:
    'Read expert articles on sand calculation, construction tips, landscaping guides, and material estimation for your next project.',
};

// ── Blog Listing Page ────────────────────────────────────────
export default function BlogPage() {

  // Read all blogs from blogs.json
  const blogs = getAllBlogs();

  return (
    <div className="pt-20 pb-16">

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-b border-gray-800/50 py-16">
        <div className="section-wrapper text-center">

          {/* Page label */}
          <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 rounded-full px-4 py-2 mb-4">
            <BookOpen className="w-4 h-4 text-accent-400" />
            <span className="text-accent-400 text-sm font-medium">
              Articles & Guides
            </span>
          </div>

          {/* Page title */}
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Our <span className="text-gradient">Blog</span>
          </h1>

          {/* Page subtitle */}
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Expert tips, how-to guides, and construction advice to help you
            plan your sand and building material projects with confidence.
          </p>

        </div>
      </div>

      {/* ── Blog Content ─────────────────────────────────── */}
      <div className="section-wrapper mt-12">

        {/* ── No blogs state ───────────────────────────────── */}
        {blogs.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-white font-bold text-xl mb-2">
              No Posts Yet
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Blog posts will appear here once published by the admin.
            </p>
            <Link href="/admin" className="btn-primary inline-flex">
              Go to Admin Panel
            </Link>
          </div>
        )}

        {/* ── Blog Grid ────────────────────────────────────── */}
        {blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group block"
              >
                <article className="card-glass p-6 h-full flex flex-col gap-4 hover:border-accent-500/40 hover:-translate-y-1 transition-all duration-300">

                  {/* Category + read time */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-accent-500/10 text-accent-400 text-xs font-medium px-3 py-1 rounded-full border border-accent-500/20">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Blog title */}
                  <h2 className="text-white font-bold text-xl leading-tight group-hover:text-accent-400 transition-colors duration-200 flex-grow">
                    {blog.title}
                  </h2>

                  {/* Blog excerpt */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Blog meta footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">

                    {/* Author */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-primary-400" />
                      </div>
                      <span className="text-gray-400 text-xs">{blog.author}</span>
                    </div>

                    {/* Date + arrow */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{formatDate(blog.date)}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200 text-accent-400" />
                    </div>

                  </div>

                </article>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}