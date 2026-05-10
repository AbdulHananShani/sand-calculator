// ============================================================
// FILE: src/app/blog/[slug]/page.js
// PURPOSE: Blog post page with:
//          - Full HTML content rendering (from Tiptap)
//          - Auto-generated Table of Contents from headings
//          - TOC sticky sidebar on left
//          - Post details sidebar on right
// PLACEMENT: src/app/blog/[slug]/page.js (REPLACE)
// ============================================================

import { getBlogBySlug, getAllBlogs, formatDate } from '@/lib/blogUtils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar, Tag, List } from 'lucide-react';

// ── Generate static paths ────────────────────────────────────
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

// ── SEO Metadata ─────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
    },
  };
}

// ── Extract headings from HTML for Table of Contents ─────────
function extractHeadings(html) {
  if (!html) return [];
  const headings = [];
  const regex = /<h([1-3])[^>]*>(.*?)<\/h[1-3]>/gi;
  let match;
  let index = 0;

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    // Strip any HTML tags from heading text
    const text  = match[2].replace(/<[^>]+>/g, '').trim();
    const id    = `heading-${index}`;
    headings.push({ level, text, id });
    index++;
  }
  return headings;
}

// ── Add IDs to headings in HTML for anchor links ─────────────
function addHeadingIds(html) {
  if (!html) return '';
  let index = 0;
  return html.replace(/<h([1-3])([^>]*)>(.*?)<\/h[1-3]>/gi, (match, level, attrs, content) => {
    const id = `heading-${index}`;
    index++;
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
}

// ── Blog Post Page Component ─────────────────────────────────
export default async function BlogPostPage({ params }) {

  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  // Extract headings for TOC and add IDs to content
  const headings    = extractHeadings(blog.content);
  const htmlContent = addHeadingIds(blog.content);
  const hasToc      = headings.length >= 3;

  return (
    <div className="pt-20 pb-16">

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-b border-gray-800/50 py-12">
        <div className="section-wrapper">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-300 truncate max-w-xs">{blog.title}</span>
          </div>

          {/* Category */}
          <div className="mb-4">
            <span className="inline-block bg-accent-500/10 text-accent-400 text-xs font-medium px-3 py-1 rounded-full border border-accent-500/20">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 max-w-4xl leading-tight">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-primary-400" />
              </div>
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{formatDate(blog.created_at)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{blog.read_time}</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Blog Content ─────────────────────────────────── */}
      <div className="section-wrapper mt-10">
        <div className={`grid gap-8 ${hasToc ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1 lg:grid-cols-4'}`}>

          {/* ── LEFT: Table of Contents ────────────────────── */}
          {hasToc && (
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div
                className="card-glass p-5 sticky top-24 overflow-y-auto"
                style={{ maxHeight: 'calc(100vh - 8rem)' }}
              >

                {/* TOC header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50">
                  <List className="w-4 h-4 text-primary-400" />
                  <h3 className="text-white font-bold text-sm">
                    Table of Contents
                  </h3>
                </div>

                {/* TOC links */}
                <nav className="flex flex-col gap-1">
                  {headings.map((heading, i) => (
                    <a
                      key={i}
                      href={`#${heading.id}`}
                      className={`text-xs leading-relaxed transition-colors duration-200 hover:text-primary-400 py-0.5 ${
                        heading.level === 1
                          ? 'text-gray-300 font-semibold'
                          : heading.level === 2
                          ? 'text-gray-400 pl-2 border-l border-gray-700/50'
                          : 'text-gray-500 pl-4 border-l border-gray-700/30'
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>

              </div>
            </div>
          )}

          {/* ── MIDDLE: Main Content ───────────────────────── */}
          <div className={`order-1 lg:order-2 ${hasToc ? 'lg:col-span-6' : 'lg:col-span-3'}`}>
            <div className="card-glass p-8 md:p-10">

              {/* Excerpt */}
              <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-primary-500 pl-4 mb-8 italic">
                {blog.excerpt}
              </p>

              {/* ── Rendered HTML Content from Tiptap ── */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

            </div>

            {/* Back link */}
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

          {/* ── RIGHT: Post Details Sidebar ───────────────── */}
          <div className={`order-3 ${hasToc ? 'lg:col-span-3' : 'lg:col-span-1'}`}>
            <div className="card-glass p-6 sticky top-24">

              <h3 className="text-white font-bold text-base mb-4 pb-3 border-b border-gray-700/50">
                Post Details
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Author</span>
                  <span className="text-gray-300 text-sm font-medium">{blog.author}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Published</span>
                  <span className="text-gray-300 text-sm font-medium">{formatDate(blog.created_at)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Read Time</span>
                  <span className="text-gray-300 text-sm font-medium">{blog.read_time}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Category</span>
                  <span className="inline-flex items-center gap-1 text-accent-400 text-sm font-medium">
                    <Tag className="w-3 h-3" />
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-700/50 my-4" />

              <div className="flex flex-col gap-2">
                <p className="text-gray-500 text-xs">Need to calculate sand?</p>
                <Link href="/calculators" className="btn-primary text-sm text-center py-2">
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