// ============================================================
// FILE: src/app/blog/[slug]/page.js
// PURPOSE: Individual blog post page. Reads the specific post
//          from blogs.json by slug and renders full content.
//          Accessible at /blog/[slug]
// PLACEMENT: src/app/blog/[slug]/page.js (New File)
// ============================================================

import { getBlogBySlug, getAllBlogs, formatDate } from '@/lib/blogUtils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';

// ── Generate static paths for all blog posts ─────────────────
export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

// ── Generate dynamic SEO metadata per blog post ──────────────
export async function generateMetadata({ params }) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

// ── Blog Post Page Component ─────────────────────────────────
export default function BlogPostPage({ params }) {

  // Find the blog post by slug
  const blog = getBlogBySlug(params.slug);

  // Show 404 if slug doesn't match any post
  if (!blog) notFound();

  return (
    <div className="pt-20 pb-16">

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-b border-gray-800/50 py-12">
        <div className="section-wrapper">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary-400 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-300 truncate max-w-xs">{blog.title}</span>
          </div>

          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-block bg-accent-500/10 text-accent-400 text-xs font-medium px-3 py-1 rounded-full border border-accent-500/20">
              {blog.category}
            </span>
          </div>

          {/* Post title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 max-w-4xl leading-tight">
            {blog.title}
          </h1>

          {/* Post meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">

            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-primary-400" />
              </div>
              <span>{blog.author}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{formatDate(blog.date)}</span>
            </div>

            {/* Read time */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{blog.readTime}</span>
            </div>

          </div>

        </div>
      </div>

      {/* ── Blog Content Area ─────────────────────────────── */}
      <div className="section-wrapper mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* ── Main Content ───────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="card-glass p-8 md:p-10">

              {/* Excerpt / intro */}
              <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-primary-500 pl-4 mb-8 italic">
                {blog.excerpt}
              </p>

              {/* Full blog content */}
              <div className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-p:text-gray-400 prose-p:leading-relaxed
                prose-strong:text-white
                prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                prose-li:text-gray-400
                prose-blockquote:border-primary-500 prose-blockquote:text-gray-300">
                {blog.content.split('\n').map((paragraph, i) => (
                  paragraph.trim() !== '' && (
                    <p key={i} className="mb-4 text-gray-400 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>

            </div>

            {/* Back to blog button */}
            <div className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Posts
              </Link>
            </div>

          </div>

          {/* ── Sidebar ────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="card-glass p-6 sticky top-24">

              {/* Sidebar title */}
              <h3 className="text-white font-bold text-base mb-4 pb-3 border-b border-gray-700/50">
                Post Details
              </h3>

              {/* Details list */}
              <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Author</span>
                  <span className="text-gray-300 text-sm font-medium">{blog.author}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Published</span>
                  <span className="text-gray-300 text-sm font-medium">{formatDate(blog.date)}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Read Time</span>
                  <span className="text-gray-300 text-sm font-medium">{blog.readTime}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Category</span>
                  <span className="inline-flex items-center gap-1 text-accent-400 text-sm font-medium">
                    <Tag className="w-3 h-3" />
                    {blog.category}
                  </span>
                </div>

              </div>

              {/* Divider */}
              <div className="border-t border-gray-700/50 my-4" />

              {/* CTA to calculators */}
              <div className="flex flex-col gap-2">
                <p className="text-gray-500 text-xs">
                  Need to calculate sand for your project?
                </p>
                <Link
                  href="/calculators"
                  className="btn-primary text-sm text-center py-2"
                >
                  Use Our Calculators
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}