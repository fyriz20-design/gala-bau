import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getGallery, removeFromGallery } from '@/lib/gallery-store';

function isAuthorized(req: Request): boolean {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD;
}

// GET /api/admin/gallery  →  alle Bilder abrufen
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const gallery = await getGallery();
  return NextResponse.json(gallery);
}

// DELETE /api/admin/gallery?id=<blob-url>  →  Bild löschen
export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Keine ID angegeben.' }, { status: 400 });
  }

  try {
    await del(id);                          // Bilddatei aus Blob löschen
    const gallery = await removeFromGallery(id); // Index aktualisieren
    return NextResponse.json({ success: true, gallery });
  } catch (err) {
    console.error('[delete]', err);
    return NextResponse.json({ error: 'Löschen fehlgeschlagen.' }, { status: 500 });
  }
}
