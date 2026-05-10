// ============================================================
// FILE: src/app/api/blogs/route.js
// PURPOSE: Blog API with full CRUD — now includes PUT for
//          editing existing posts. All ops use Supabase.
// PLACEMENT: src/app/api/blogs/route.js (REPLACE)
// ============================================================

import { NextResponse } from 'next/server';
import { getAllBlogs, saveBlog, deleteBlog } from '@/lib/blogUtils';
import { supabaseAdmin } from '@/lib/supabase';
import { generateSlug, calculateReadTime } from '@/lib/blogUtils';

// ── GET: Return all blog posts ───────────────────────────────
export async function GET() {
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// ── POST: Create a new blog post ─────────────────────────────
export async function POST(request) {
  try {
    const body   = await request.json();
    const result = await saveBlog(body);
    if (result.success) {
      return NextResponse.json(result.blog, { status: 201 });
    }
    return NextResponse.json({ error: result.error }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

// ── PUT: Update an existing blog post ────────────────────────
export async function PUT(request) {
  try {
    const body     = await request.json();
    const { id }   = body;

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const readTime = calculateReadTime(body.content);

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .update({
        title:      body.title,
        excerpt:    body.excerpt,
        content:    body.content,
        author:     body.author,
        category:   body.category,
        read_time:  readTime,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// ── DELETE: Remove a blog post by id ─────────────────────────
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const result = await deleteBlog(id);
    if (result.success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: result.error }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}