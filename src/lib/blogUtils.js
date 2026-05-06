// ============================================================
// FILE: src/lib/blogUtils.js
// PURPOSE: Helper functions for reading and writing blog posts
//          stored in src/data/blogs.json (static JSON storage).
//          Used by the Blog page, Blog post page, and Admin page.
// PLACEMENT: src/lib/blogUtils.js
// ============================================================

import fs from 'fs';
import path from 'path';

// ── Path to the blogs JSON file ──────────────────────────────
// Resolves to: D:\sand-calculator\src\data\blogs.json
const blogsFilePath = path.join(process.cwd(), 'src', 'data', 'blogs.json');

// ── READ: Get all blog posts ─────────────────────────────────
// Returns array of all blog posts sorted by date (newest first)
export function getAllBlogs() {
  try {
    const fileContents = fs.readFileSync(blogsFilePath, 'utf8');
    const blogs = JSON.parse(fileContents);
    // Sort by date descending (newest post first)
    return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    // Return empty array if file doesn't exist or is empty
    return [];
  }
}

// ── READ: Get a single blog post by slug ─────────────────────
// Used on the individual blog post page /blog/[slug]
export function getBlogBySlug(slug) {
  const blogs = getAllBlogs();
  return blogs.find((blog) => blog.slug === slug) || null;
}

// ── WRITE: Save a new blog post ──────────────────────────────
// Called from the Admin page when admin submits a new post
export function saveBlog(blogData) {
  try {
    const blogs = getAllBlogs();

    // Generate a URL-friendly slug from the title
    const slug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')   // replace non-alphanumeric with dash
      .replace(/^-+|-+$/g, '');       // trim leading/trailing dashes

    // Build the new blog post object
    const newBlog = {
      id: Date.now().toString(),       // unique ID using timestamp
      slug,
      title: blogData.title,
      excerpt: blogData.excerpt,
      content: blogData.content,
      author: blogData.author || 'Admin',
      date: new Date().toISOString(),  // current date/time in ISO format
      category: blogData.category || 'General',
      readTime: Math.ceil(blogData.content.split(' ').length / 200) + ' min read',
    };

    // Add new blog to beginning of array (newest first)
    blogs.unshift(newBlog);

    // Write updated array back to blogs.json
    fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2), 'utf8');

    return { success: true, blog: newBlog };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ── DELETE: Remove a blog post by id ─────────────────────────
// Called from Admin page when admin deletes a post
export function deleteBlog(id) {
  try {
    const blogs = getAllBlogs();
    const filtered = blogs.filter((blog) => blog.id !== id);
    fs.writeFileSync(blogsFilePath, JSON.stringify(filtered, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ── UTILITY: Format date for display ─────────────────────────
// Converts ISO date string to readable format e.g. "January 5, 2025"
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}