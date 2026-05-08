// ============================================================
// FILE: src/lib/blogUtils.js
// PURPOSE: Blog helper functions now using Supabase database
//          instead of local JSON file. Handles all CRUD ops.
//          Used by blog pages, admin panel, and API routes.
// PLACEMENT: src/lib/blogUtils.js (REPLACE existing file)
// ============================================================

import { supabase, supabaseAdmin } from './supabase';

// ── Generate URL-friendly slug from title ────────────────────
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Format date for display ──────────────────────────────────
// e.g. "January 5, 2025"
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
}

// ── Calculate read time from content ────────────────────────
export function calculateReadTime(content) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

// ── READ: Get all blogs — sorted newest first ────────────────
export async function getAllBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  return data || [];
}

// ── READ: Get single blog by slug ────────────────────────────
export async function getBlogBySlug(slug) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

// ── WRITE: Save new blog post ────────────────────────────────
export async function saveBlog(blogData) {
  try {
    const slug     = generateSlug(blogData.title);
    const readTime = calculateReadTime(blogData.content);

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .insert([{
        title:     blogData.title,
        slug,
        excerpt:   blogData.excerpt,
        content:   blogData.content,
        author:    blogData.author   || 'Admin',
        category:  blogData.category || 'General',
        read_time: readTime,
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, blog: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ── DELETE: Remove blog post by id ───────────────────────────
export async function deleteBlog(id) {
  try {
    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}