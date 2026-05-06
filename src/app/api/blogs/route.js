// ============================================================
// FILE: src/app/api/blogs/route.js
// PURPOSE: API route handlers for blog CRUD operations.
//          GET  — returns all blogs
//          POST — creates a new blog post
//          DELETE — removes a blog post by id
// PLACEMENT: src/app/api/blogs/route.js (New File)
// ============================================================

import { NextResponse } from 'next/server';
import { getAllBlogs, saveBlog, deleteBlog } from '@/lib/blogUtils';

// ── GET: Return all blog posts ───────────────────────────────
export async function GET() {
  try {
    const blogs = getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// ── POST: Create a new blog post ─────────────────────────────
export async function POST(request) {
  try {
    const body   = await request.json();
    const result = saveBlog(body);
    if (result.success) {
      return NextResponse.json(result.blog, { status: 201 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

// ── DELETE: Remove a blog post by id ─────────────────────────
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id               = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const result = deleteBlog(id);
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}