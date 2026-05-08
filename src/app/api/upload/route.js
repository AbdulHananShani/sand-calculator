// ============================================================
// FILE: src/app/api/upload/route.js
// PURPOSE: Handles image uploads to Cloudinary.
//          Receives image file from admin editor,
//          uploads to Cloudinary, returns the image URL.
// PLACEMENT: src/app/api/upload/route.js (New File)
// ============================================================

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// ── Configure Cloudinary ─────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── POST: Upload image to Cloudinary ─────────────────────────
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file     = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder:         'sand-calculator-blog',
      transformation: [
        { width: 1200, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    return NextResponse.json({
      url:       result.secure_url,
      public_id: result.public_id,
      width:     result.width,
      height:    result.height,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed: ' + error.message },
      { status: 500 }
    );
  }
}