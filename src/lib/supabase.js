// ============================================================
// FILE: src/lib/supabase.js
// PURPOSE: Supabase client initialization for both client-side
//          and server-side usage. Used by all blog operations.
// PLACEMENT: src/lib/supabase.js (New File)
// ============================================================

import { createClient } from '@supabase/supabase-js';

// ── Supabase URL and Keys from environment variables ─────────
const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseService = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ── Public client — used for reading blogs (frontend) ────────
export const supabase = createClient(supabaseUrl, supabaseAnon);

// ── Admin client — used for writing/deleting blogs (API) ─────
// Uses service role key that bypasses Row Level Security
export const supabaseAdmin = createClient(supabaseUrl, supabaseService || supabaseAnon);