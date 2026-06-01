/**
 * GET /api/gallery-public
 * Öffentlicher Endpoint – gibt die aktuellen Galerie-Bilder aus Vercel Blob zurück.
 * Kein Auth nötig, da nur lesend.
 */
import { NextResponse } from 'next/server';
import { getGallery } from '@/lib/gallery-store';

export const revalidate = 0; // Kein Caching – immer aktuelle Daten

export async function GET() {
  try {
    const gallery = await getGallery();
    return NextResponse.json(gallery);
  } catch {
    return NextResponse.json([]);
  }
}
