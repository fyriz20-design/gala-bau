import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { addToGallery } from '@/lib/gallery-store';

function isAuthorized(req: Request): boolean {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file      = formData.get('file')        as File   | null;
    const label     = (formData.get('label')       as string) ?? '';
    const alt       = (formData.get('alt')         as string) || label;
    const description = (formData.get('description') as string) ?? '';

    if (!file) {
      return NextResponse.json({ error: 'Keine Datei übermittelt.' }, { status: 400 });
    }

    // Sicherer Dateiname
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');

    // Hochladen in Vercel Blob
    const blob = await put(`gallery/${Date.now()}-${safeName}`, file, {
      access: 'public',
    });

    // Index aktualisieren
    const newItem = {
      id:          blob.url,
      src:         blob.url,
      alt:         alt || safeName,
      label,
      description,
    };

    const gallery = await addToGallery(newItem);
    return NextResponse.json({ success: true, item: newItem, gallery });
  } catch (err) {
    console.error('[upload]', err);
    return NextResponse.json({ error: 'Upload fehlgeschlagen.' }, { status: 500 });
  }
}
