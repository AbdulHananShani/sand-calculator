// ============================================================
// FILE: src/app/admin/page.js
// PURPOSE: Complete admin panel with:
//          - Tiptap WYSIWYG editor (paste from Google Docs/Word)
//          - Cloudinary image upload anywhere in content
//          - Create, Edit, Delete blog posts
//          - Supabase permanent storage
// PLACEMENT: src/app/admin/page.js (REPLACE)
// ============================================================

'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Lock, Plus, Trash2, Eye, LogOut,
  FileText, CheckCircle, Edit, X, Save,
} from 'lucide-react';

// ── Dynamically import editor to avoid SSR issues ────────────
const RichTextEditor = dynamic(
  () => import('@/components/RichTextEditor'),
  { ssr: false, loading: () => (
    <div className="min-h-96 bg-dark-900 border border-gray-600 rounded-xl flex items-center justify-center">
      <p className="text-gray-500 text-sm">Loading editor...</p>
    </div>
  )}
);

// ── Blog categories ──────────────────────────────────────────
const categories = [
  'General', 'Construction', 'Landscaping',
  'DIY', 'Aquarium', 'Pool & Spa', 'Tips & Tricks',
];

// ── Empty form state ─────────────────────────────────────────
const emptyForm = {
  title:    '',
  excerpt:  '',
  content:  '',
  author:   'Admin',
  category: 'General',
};

// ── Admin Panel Component ────────────────────────────────────
export default function AdminPage() {

  // ── Auth ─────────────────────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword]     = useState('');
  const [authError, setAuthError]   = useState('');

  // ── Form state ───────────────────────────────────────────
  const [form, setForm]         = useState(emptyForm);
  const [editingId, setEditingId] = useState(null); // null = create, id = edit

  // ── UI state ─────────────────────────────────────────────
  const [blogs, setBlogs]               = useState([]);
  const [successMsg, setSuccessMsg]     = useState('');
  const [errorMsg, setErrorMsg]         = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab]       = useState('create');

  // ── Load blogs when logged in ────────────────────────────
  useEffect(() => {
    if (isLoggedIn) fetchBlogs();
  }, [isLoggedIn]);

  // ── Auto-clear messages ──────────────────────────────────
  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(''), 4000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  // ── Fetch blogs ──────────────────────────────────────────
  const fetchBlogs = async () => {
    try {
      const res  = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch {
      setBlogs([]);
    }
  };

  // ── Login ────────────────────────────────────────────────
  const handleLogin = () => {
    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    if (password === correct) {
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  // ── Start editing a post ─────────────────────────────────
  const handleStartEdit = (blog) => {
    setForm({
      title:    blog.title,
      excerpt:  blog.excerpt,
      content:  blog.content,
      author:   blog.author,
      category: blog.category,
    });
    setEditingId(blog.id);
    setActiveTab('create'); // switch to editor tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Cancel editing ───────────────────────────────────────
  const handleCancelEdit = () => {
    setForm(emptyForm);
    setEditingId(null);
    setErrorMsg('');
    setSuccessMsg('');
  };

  // ── Submit (create or update) ────────────────────────────
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      setErrorMsg('Please fill in Title, Excerpt, and Content.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const isEditing = !!editingId;
      const url       = '/api/blogs';
      const method    = isEditing ? 'PUT' : 'POST';
      const body      = isEditing
        ? { ...form, id: editingId }
        : form;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });

      if (res.ok) {
        setSuccessMsg(isEditing ? 'Post updated successfully!' : 'Post published successfully!');
        setForm(emptyForm);
        setEditingId(null);
        fetchBlogs();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Delete post ──────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSuccessMsg('Post deleted successfully.');
        if (editingId === id) handleCancelEdit();
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
            <div className="w-16 h-16 rounded-2xl bg-accent-600/20 border border-accent-500/30 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-accent-400" />
            </div>
            <h1 className="text-2xl font-black text-white text-center mb-2">
              Admin Access
            </h1>
            <p className="text-gray-500 text-sm text-center mb-8">
              Enter your admin password to manage blog posts
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
              className="flex flex-col gap-3"
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="input-field"
                autoComplete="current-password"
              />
              {authError && <p className="text-red-400 text-sm">{authError}</p>}
              <button type="submit" className="btn-primary w-full">
                Login to Admin Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // ADMIN DASHBOARD
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
              {blogs.length} post{blogs.length !== 1 ? 's' : ''} published
              {editingId && (
                <span className="ml-2 text-accent-400 font-medium">
                  — Editing post
                </span>
              )}
            </p>
          </div>
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
            {editingId ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {editingId ? 'Edit Post' : 'Create Post'}
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

        {/* ── Messages ─────────────────────────────────────── */}
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
            TAB 1: CREATE / EDIT POST
        ============================================================ */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* ── Main Form ─────────────────────────────────── */}
            <div className="lg:col-span-3 card-glass p-8">

              {/* Edit mode banner */}
              {editingId && (
                <div className="flex items-center justify-between bg-accent-500/10 border border-accent-500/30 rounded-xl p-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4 text-accent-400" />
                    <span className="text-accent-400 text-sm font-medium">
                      Editing existing post — changes will update the live post
                    </span>
                  </div>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 text-gray-400 hover:text-white text-xs transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Cancel Edit
                  </button>
                </div>
              )}

              <h2 className="text-white font-bold text-xl mb-6 pb-4 border-b border-gray-700/50">
                {editingId ? 'Edit Blog Post' : 'New Blog Post'}
              </h2>

              <div className="flex flex-col gap-5">

                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 text-sm font-medium">
                    Post Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. How Much Sand Do You Need for a Patio?"
                    className="input-field"
                  />
                </div>

                {/* Author + Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">Author</label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      placeholder="Admin"
                      className="input-field"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
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
                    Excerpt <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    placeholder="Short summary shown on blog listing page..."
                    rows={2}
                    className="input-field resize-none"
                  />
                  <p className="text-gray-600 text-xs text-right">
                    {form.excerpt.length}/160 characters
                  </p>
                </div>

                {/* ── Rich Text Editor ───────────────────── */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 text-sm font-medium">
                    Content <span className="text-red-400">*</span>
                  </label>

                  {/* Paste tip */}
                  <div className="bg-primary-600/10 border border-primary-500/20 rounded-xl p-3 text-xs text-primary-400">
                    💡 Paste directly from Google Docs or Microsoft Word — headings, bold text, lists and formatting are preserved automatically!
                  </div>

                  {/* Tiptap editor */}
                  <RichTextEditor
                    content={form.content}
                    onChange={(html) => setForm({ ...form, content: html })}
                    placeholder="Start writing or paste from Google Docs / Word..."
                  />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-primary flex items-center justify-center gap-2 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingId ? (
                      <>
                        <Save className="w-4 h-4" />
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        {isSubmitting ? 'Publishing...' : 'Publish Post'}
                      </>
                    )}
                  </button>
                  {editingId && (
                    <button
                      onClick={handleCancelEdit}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* ── Sidebar Tips ──────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="card-glass p-6 sticky top-24">
                <h3 className="text-white font-bold text-base mb-4 pb-3 border-b border-gray-700/50">
                  Editor Guide
                </h3>
                <div className="flex flex-col gap-3 text-xs text-gray-400">
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-medium">Paste from Docs</span>
                    <span>Copy from Google Docs or Word, paste here — structure is kept automatically.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-medium">Add Images</span>
                    <span>Click "Add Image" in toolbar, upload from your device. Image goes at cursor position.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-medium">Headings</span>
                    <span>Use H1-H4 buttons for section headings. H2 is best for main sections.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-medium">Undo/Redo</span>
                    <span>Ctrl+Z to undo, Ctrl+Y to redo. Or use toolbar buttons.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-medium">Edit Posts</span>
                    <span>Go to Manage Posts tab, click Edit on any post to modify it.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================
            TAB 2: MANAGE POSTS
        ============================================================ */}
        {activeTab === 'manage' && (
          <div>
            {blogs.length === 0 ? (
              <div className="text-center py-16 card-glass">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 font-medium">No posts published yet</p>
                <p className="text-gray-600 text-sm mt-1">
                  Create your first post using the Create Post tab
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className={`card-glass p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 ${
                      editingId === blog.id ? 'border-accent-500/50 bg-accent-500/5' : ''
                    }`}
                  >
                    {/* Post info */}
                    <div className="flex flex-col gap-1 flex-grow">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs bg-accent-500/10 text-accent-400 border border-accent-500/20 px-2 py-0.5 rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-gray-500 text-xs">{blog.read_time}</span>
                        {editingId === blog.id && (
                          <span className="text-xs bg-accent-500/20 text-accent-300 px-2 py-0.5 rounded-full">
                            Currently editing
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-semibold">{blog.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-1">{blog.excerpt}</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">

                      {/* View */}
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-primary-400 bg-primary-600/10 border border-primary-500/20 hover:bg-primary-600/20 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </a>

                      {/* Edit */}
                      <button
                        onClick={() => handleStartEdit(blog)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-accent-400 bg-accent-500/10 border border-accent-500/20 hover:bg-accent-500/20 transition-all"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
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