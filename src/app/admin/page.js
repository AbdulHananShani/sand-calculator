// ============================================================
// FILE: src/app/admin/page.js
// PURPOSE: Complete admin panel with:
//          - Supabase database for permanent blog storage
//          - Markdown editor with H1-H6, bold, italic, lists
//          - Cloudinary image upload inside editor
//          - Blog management (view, delete)
// PLACEMENT: src/app/admin/page.js (REPLACE)
// ============================================================

'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Lock, Plus, Trash2, Eye, LogOut,
  FileText, CheckCircle, Upload, Image,
} from 'lucide-react';

// ── Admin Panel Component ────────────────────────────────────
export default function AdminPage() {

  // ── Auth state ───────────────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword]     = useState('');
  const [authError, setAuthError]   = useState('');

  // ── Blog form state ──────────────────────────────────────
  const [title, setTitle]       = useState('');
  const [excerpt, setExcerpt]   = useState('');
  const [content, setContent]   = useState('');
  const [author, setAuthor]     = useState('Admin');
  const [category, setCategory] = useState('General');

  // ── Markdown preview toggle ──────────────────────────────
  const [showPreview, setShowPreview] = useState(false);

  // ── UI state ─────────────────────────────────────────────
  const [blogs, setBlogs]               = useState([]);
  const [successMsg, setSuccessMsg]     = useState('');
  const [errorMsg, setErrorMsg]         = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading]   = useState(false);
  const [activeTab, setActiveTab]       = useState('create');

  // ── File input ref for image upload ─────────────────────
  const fileInputRef = useRef(null);

  // ── Blog categories ──────────────────────────────────────
  const categories = [
    'General', 'Construction', 'Landscaping',
    'DIY', 'Aquarium', 'Pool & Spa', 'Tips & Tricks',
  ];

  // ── Markdown toolbar buttons ─────────────────────────────
  const markdownTools = [
    { label: 'H1',     insert: '# ',          tip: 'Heading 1' },
    { label: 'H2',     insert: '## ',         tip: 'Heading 2' },
    { label: 'H3',     insert: '### ',        tip: 'Heading 3' },
    { label: 'H4',     insert: '#### ',       tip: 'Heading 4' },
    { label: 'B',      insert: '**text**',    tip: 'Bold' },
    { label: 'I',      insert: '*text*',      tip: 'Italic' },
    { label: '— —',    insert: '---',         tip: 'Divider' },
    { label: '• List', insert: '- item\n- item\n- item', tip: 'Bullet List' },
    { label: '1. List',insert: '1. item\n2. item\n3. item', tip: 'Numbered List' },
    { label: '" "',    insert: '> quote text', tip: 'Blockquote' },
    { label: 'Link',   insert: '[link text](https://url.com)', tip: 'Hyperlink' },
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
      setBlogs(Array.isArray(data) ? data : []);
    } catch {
      setBlogs([]);
    }
  };

  // ── Handle login ─────────────────────────────────────────
  const handleLogin = () => {
    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    if (password === correct) {
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  // ── Insert markdown at cursor position ───────────────────
  const insertMarkdown = (insert) => {
    const textarea = document.getElementById('blog-content');
    if (!textarea) return;

    const start  = textarea.selectionStart;
    const end    = textarea.selectionEnd;
    const before = content.substring(0, start);
    const after  = content.substring(end);

    const newContent = before + insert + after;
    setContent(newContent);

    // Restore cursor position after insert
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + insert.length;
      textarea.selectionEnd   = start + insert.length;
    }, 10);
  };

  // ── Handle image upload to Cloudinary ────────────────────
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select an image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image must be under 5MB.');
      return;
    }

    setIsUploading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res  = await fetch('/api/upload', {
        method: 'POST',
        body:   formData,
      });
      const data = await res.json();

      if (data.url) {
        // Insert image markdown at cursor
        const altText  = file.name.replace(/\.[^/.]+$/, '');
        const imgMd    = `\n![${altText}](${data.url})\n`;
        insertMarkdown(imgMd);
        setSuccessMsg('Image uploaded successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg('Image upload failed. Please try again.');
      }
    } catch {
      setErrorMsg('Upload error. Check your Cloudinary settings.');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ── Render markdown preview (basic) ──────────────────────
  const renderPreview = (text) => {
    return text
      .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-bold text-white mt-4 mb-2">$1</h4>')
      .replace(/^### (.+)$/gm,  '<h3 class="text-xl font-bold text-white mt-6 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm,   '<h2 class="text-2xl font-bold text-white mt-8 mb-3">$1</h2>')
      .replace(/^# (.+)$/gm,    '<h1 class="text-3xl font-bold text-white mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
      .replace(/\*(.+?)\*/g,     '<em class="italic text-gray-300">$1</em>')
      .replace(/^> (.+)$/gm,    '<blockquote class="border-l-4 border-primary-500 pl-4 text-gray-300 italic my-4">$1</blockquote>')
      .replace(/^- (.+)$/gm,    '<li class="text-gray-400 ml-4 list-disc">$1</li>')
      .replace(/^\d+\. (.+)$/gm,'<li class="text-gray-400 ml-4 list-decimal">$1</li>')
      .replace(/^---$/gm,        '<hr class="border-gray-700 my-6"/>')
      .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="w-full rounded-xl my-4 max-w-2xl"/>')
      .replace(/\[(.+?)\]\((.+?)\)/g,  '<a href="$2" class="text-primary-400 underline">$1</a>')
      .replace(/\n\n/g, '</p><p class="text-gray-400 leading-relaxed mb-4">')
      .replace(/^(?!<[hbielp])/gm, '');
  };

  // ── Handle blog submission ───────────────────────────────
  const handleSubmit = async () => {
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setErrorMsg('Please fill in Title, Excerpt, and Content.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/blogs', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ title, excerpt, content, author, category }),
      });

      if (res.ok) {
        setSuccessMsg('Blog post published successfully!');
        setTitle('');
        setExcerpt('');
        setContent('');
        setAuthor('Admin');
        setCategory('General');
        setShowPreview(false);
        fetchBlogs();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to publish. Please try again.');
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
            <div className="w-16 h-16 rounded-2xl bg-accent-600/20 border border-accent-500/30 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-accent-400" />
            </div>
            <h1 className="text-2xl font-black text-white text-center mb-2">
              Admin Access
            </h1>
            <p className="text-gray-500 text-sm text-center mb-8">
              Enter your admin password to manage blog posts
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
                className="input-field"
              />
              {authError && (
                <p className="text-red-400 text-sm">{authError}</p>
              )}
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
            TAB 1: CREATE POST
        ============================================================ */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Main Form ────────────────────────────────── */}
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

                {/* Author + Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">Author</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Admin"
                      className="input-field"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">Category</label>
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
                    Excerpt <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Short summary shown on blog listing page (under 160 characters)..."
                    rows={2}
                    className="input-field resize-none"
                  />
                </div>

                {/* ── Markdown Editor ────────────────────── */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-300 text-sm font-medium">
                      Content <span className="text-red-400">*</span>
                    </label>
                    {/* Preview toggle */}
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="text-xs text-primary-400 hover:text-primary-300 border border-primary-500/30 px-3 py-1 rounded-lg transition-colors"
                    >
                      {showPreview ? 'Edit Mode' : 'Preview Mode'}
                    </button>
                  </div>

                  {/* ── Markdown Toolbar ─────────────────── */}
                  {!showPreview && (
                    <div className="flex flex-wrap gap-1 p-2 bg-dark-950 border border-gray-700 rounded-t-xl border-b-0">

                      {/* Formatting buttons */}
                      {markdownTools.map((tool) => (
                        <button
                          key={tool.label}
                          onClick={() => insertMarkdown(tool.insert)}
                          title={tool.tip}
                          className="px-2.5 py-1.5 text-xs font-mono text-gray-300 hover:text-white bg-dark-800 hover:bg-dark-700 border border-gray-700 rounded-lg transition-all duration-150"
                        >
                          {tool.label}
                        </button>
                      ))}

                      {/* Image upload button */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        title="Upload Image"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-accent-400 bg-accent-500/10 hover:bg-accent-500/20 border border-accent-500/30 rounded-lg transition-all duration-150 disabled:opacity-50"
                      >
                        {isUploading ? (
                          <>
                            <Upload className="w-3 h-3 animate-bounce" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Image className="w-3 h-3" />
                            Add Image
                          </>
                        )}
                      </button>

                      {/* Hidden file input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />

                    </div>
                  )}

                  {/* ── Editor / Preview Area ─────────────── */}
                  {showPreview ? (
                    // Preview mode
                    <div
                      className="min-h-64 p-4 bg-dark-900 border border-gray-600 rounded-xl text-gray-400 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: `<p class="text-gray-400 leading-relaxed mb-4">${renderPreview(content)}</p>`
                      }}
                    />
                  ) : (
                    // Edit mode
                    <textarea
                      id="blog-content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder={`Write your blog content here using Markdown...

# Main Heading
## Sub Heading
### Smaller Heading

Normal paragraph text here.

**Bold text** and *italic text*

- Bullet point one
- Bullet point two

1. Numbered item one
2. Numbered item two

> Blockquote text here

Use the toolbar above to insert formatting or upload images.`}
                      rows={20}
                      className="input-field resize-y font-mono text-sm rounded-t-none border-t-0"
                    />
                  )}

                  {/* Character count */}
                  <p className="text-gray-600 text-xs text-right">
                    {content.split(/\s+/).filter(Boolean).length} words
                    {' · '}
                    ~{Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)} min read
                  </p>
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

            {/* ── Sidebar ──────────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="card-glass p-6 sticky top-24">

                <h3 className="text-white font-bold text-base mb-4 pb-3 border-b border-gray-700/50">
                  Markdown Guide
                </h3>

                <div className="flex flex-col gap-3 text-xs font-mono">
                  {[
                    { syntax: '# Heading 1',    result: 'Large heading' },
                    { syntax: '## Heading 2',   result: 'Medium heading' },
                    { syntax: '### Heading 3',  result: 'Small heading' },
                    { syntax: '**bold**',        result: 'Bold text' },
                    { syntax: '*italic*',        result: 'Italic text' },
                    { syntax: '- item',          result: 'Bullet list' },
                    { syntax: '1. item',         result: 'Numbered list' },
                    { syntax: '> quote',         result: 'Blockquote' },
                    { syntax: '[text](url)',     result: 'Hyperlink' },
                    { syntax: '![alt](url)',     result: 'Image' },
                    { syntax: '---',             result: 'Divider line' },
                  ].map((item) => (
                    <div key={item.syntax} className="flex items-center justify-between gap-2">
                      <code className="text-primary-400 bg-primary-600/10 px-2 py-0.5 rounded">
                        {item.syntax}
                      </code>
                      <span className="text-gray-500">{item.result}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Click toolbar buttons to insert formatting at cursor position.
                    Use "Add Image" to upload and insert images anywhere in content.
                  </p>
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
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="card-glass p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1 flex-grow">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs bg-accent-500/10 text-accent-400 border border-accent-500/20 px-2 py-0.5 rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-gray-500 text-xs">{blog.read_time}</span>
                      </div>
                      <h3 className="text-white font-semibold">{blog.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-1">{blog.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-primary-400 bg-primary-600/10 border border-primary-500/20 hover:bg-primary-600/20 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </a>
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