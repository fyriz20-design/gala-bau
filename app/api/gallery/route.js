import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { blobs } = await list();
    const urls = blobs.map((blob) => blob.url);
    return NextResponse.json({ urls });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
