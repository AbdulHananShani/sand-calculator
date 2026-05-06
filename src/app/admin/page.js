// ============================================================
// FILE: src/app/admin/page.js
// PURPOSE: Admin panel for creating and deleting blog posts.
//          Protected by a password stored in .env.local.
//          Posts are saved to src/data/blogs.json via API route.
//          Accessible at /admin
// PLACEMENT: src/app/admin/page.js (New File)
// ============================================================

'use client';

import { useState, useEffect } from 'react';
import { Lock, Plus, Trash2, Eye, LogOut, FileText, CheckCircle } from 'lucide-react';

// ── Admin Panel Component ────────────────────────────────────
export default function AdminPage() {

  // ── Auth state ───────────────────────────────────────────
  const [isLoggedIn, setIsLoggedIn]     = useState(false);
  const [password, setPassword]         = useState('');
  const [authError, setAuthError]       = useState('');

  // ── Blog form state ──────────────────────────────────────
  const [title, setTitle]               = useState('');
  const [excerpt, setExcerpt]           = useState('');
  const [content, setContent]           = useState('');
  const [author, setAuthor]             = useState('Admin');
  const [category, setCategory]         = useState('General');

  // ── UI state ─────────────────────────────────────────────
  const [blogs, setBlogs]               = useState([]);
  const [successMsg, setSuccessMsg]     = useState('');
  const [errorMsg, setErrorMsg]         = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab]       = useState('create'); // 'create' | 'manage'

  // ── Blog categories ──────────────────────────────────────
  const categories = [
    'General', 'Construction', 'Landscaping',
    'DIY', 'Aquarium', 'Pool & Spa', 'Tips & Tricks',
  ];

  // ── Load blogs when logged in ────────────────────────────
  useEffect(() => {
    if (isLoggedIn) fetchBlogs();
  }, [isLoggedIn]);

  // ── Fetch all blogs from API ─────────────────────────────
  const fetchBlogs = async () => {
    try {
      const res  = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch {
      setBlogs([]);
    }
  };

  // ── Handle login ─────────────────────────────────────────
  const handleLogin = () => {
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    if (password === correctPassword) {
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  // ── Handle blog submission ───────────────────────────────
  const handleSubmit = async () => {
    // Validate fields
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setErrorMsg('Please fill in Title, Excerpt, and Content.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, content, author, category }),
      });

      if (res.ok) {
        setSuccessMsg('Blog post published successfully!');
        // Reset form
        setTitle('');
        setExcerpt('');
        setContent('');
        setAuthor('Admin');
        setCategory('General');
        // Refresh blog list
        fetchBlogs();
      } else {
        setErrorMsg('Failed to publish post. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Handle blog deletion ─────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSuccessMsg('Post deleted successfully.');
        fetchBlogs();
      }
    } catch {
      setErrorMsg('Failed to delete post.');
    }
  };

  // ============================================================
  // LOGIN SCREEN
  // ============================================================
  if (!isLoggedIn) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-4">
          <div className="card-glass p-8">

            {/* Lock icon */}
            <div className="w-16 h-16 rounded-2xl bg-accent-600/20 border border-accent-500/30 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-accent-400" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-black text-white text-center mb-2">
              Admin Access
            </h1>
            <p className="text-gray-500 text-sm text-center mb-8">
              Enter your admin password to manage blog posts
            </p>

            {/* Password input */}
            <div className="flex flex-col gap-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
                className="input-field"
              />

              {/* Error message */}
              {authError && (
                <p className="text-red-400 text-sm">{authError}</p>
              )}

              {/* Login button */}
              <button onClick={handleLogin} className="btn-primary w-full">
                Login to Admin Panel
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // ADMIN DASHBOARD (after login)
  // ============================================================
  return (
    <div className="pt-20 pb-16">

      {/* ── Admin Header ─────────────────────────────────── */}
      <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-b border-gray-800/50 py-10">
        <div className="section-wrapper flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-black text-white mb-1">
              Admin <span className="text-gradient">Panel</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your blog posts — {blogs.length} post{blogs.length !== 1 ? 's' : ''} published
            </p>
          </div>

          {/* Logout button */}
          <button
            onClick={() => setIsLoggedIn(false)}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>

        </div>
      </div>

      <div className="section-wrapper mt-8">

        {/* ── Tab Navigation ───────────────────────────────── */}
        <div className="flex gap-2 mb-8 bg-dark-900 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'create'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            Create Post
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'manage'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Manage Posts ({blogs.length})
          </button>
        </div>

        {/* ── Success / Error Messages ─────────────────────── */}
        {successMsg && (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm">{successMsg}</p>
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm">{errorMsg}</p>
          </div>
        )}

        {/* ============================================================
            TAB 1: CREATE POST
        ============================================================ */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Create Post Form ─────────────────────────── */}
            <div className="lg:col-span-2 card-glass p-8">
              <h2 className="text-white font-bold text-xl mb-6 pb-4 border-b border-gray-700/50">
                New Blog Post
              </h2>

              <div className="flex flex-col gap-5">

                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 text-sm font-medium">
                    Post Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. How Much Sand Do You Need for a Patio?"
                    className="input-field"
                  />
                </div>

                {/* Author + Category row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Author */}
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">
                      Author
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Admin"
                      className="input-field"
                    />
                  </div>

                  {/* Category */}
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="input-field"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Excerpt */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 text-sm font-medium">
                    Excerpt / Summary <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Write a short 1-2 sentence summary shown on the blog listing page..."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 text-sm font-medium">
                    Full Content <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write the full blog post content here. Use blank lines to separate paragraphs..."
                    rows={12}
                    className="input-field resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  {isSubmitting ? 'Publishing...' : 'Publish Post'}
                </button>

              </div>
            </div>

            {/* ── Tips Sidebar ─────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="card-glass p-6 sticky top-24">
                <h3 className="text-white font-bold text-base mb-4 pb-3 border-b border-gray-700/50">
                  Writing Tips
                </h3>
                <ul className="flex flex-col gap-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400 font-bold">1.</span>
                    Write a clear, keyword-rich title for better SEO
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400 font-bold">2.</span>
                    Keep the excerpt under 160 characters for meta description
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400 font-bold">3.</span>
                    Use blank lines between paragraphs in the content
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400 font-bold">4.</span>
                    Choose the most relevant category for the post
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400 font-bold">5.</span>
                    Aim for at least 300 words for better search rankings
                  </li>
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================
            TAB 2: MANAGE POSTS
        ============================================================ */}
        {activeTab === 'manage' && (
          <div>

            {/* No posts state */}
            {blogs.length === 0 && (
              <div className="text-center py-16 card-glass">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 font-medium">No posts published yet</p>
                <p className="text-gray-600 text-sm mt-1">
                  Create your first post using the Create Post tab
                </p>
              </div>
            )}

            {/* Posts list */}
            {blogs.length > 0 && (
              <div className="flex flex-col gap-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="card-glass p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >

                    {/* Post info */}
                    <div className="flex flex-col gap-1 flex-grow">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs bg-accent-500/10 text-accent-400 border border-accent-500/20 px-2 py-0.5 rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-gray-500 text-xs">{blog.readTime}</span>
                      </div>
                      <h3 className="text-white font-semibold">{blog.title}</h3>
                      <p className="text-gray-500 text-sm">{blog.excerpt}</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-primary-400 bg-primary-600/10 border border-primary-500/20 hover:bg-primary-600/20 transition-all duration-200"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}