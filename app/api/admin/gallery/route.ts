import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getGallery, removeFromGallery, bulkRemoveFromGallery } from '@/lib/gallery-store';

function isAuthorized(req: Request): boolean {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD;
}

/* ── GET /api/admin/gallery ── alle Bilder abrufen ── */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const gallery = await getGallery();
  return NextResponse.json(gallery);
}

/* ── DELETE /api/admin/gallery ─────────────────────────
   Einzeln:  ?id=<blob-url>                  (Query-Param)
   Mehrere:  Body { ids: string[] }          (JSON-Body)
────────────────────────────────────────────────────── */
export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  try {
    // Versuche JSON-Body zu lesen (Bulk-Delete)
    const body = await request.json().catch(() => null) as { ids?: string[] } | null;

    if (body?.ids && Array.isArray(body.ids) && body.ids.length > 0) {
      // ── Bulk-Delete ──────────────────────────────────
      await Promise.allSettled(body.ids.map(id => del(id)));
      const gallery = await bulkRemoveFromGallery(body.ids);
      return NextResponse.json({ success: true, deleted: body.ids.length, gallery });
    }

    // ── Einzel-Delete via Query-Param ─────────────────
    const id = new URL(request.url).searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Keine ID angegeben.' }, { status: 400 });
    }
    await del(id);
    const gallery = await removeFromGallery(id);
    return NextResponse.json({ success: true, gallery });

  } catch (err) {
    console.error('[delete]', err);
    return NextResponse.json({ error: 'Löschen fehlgeschlagen.' }, { status: 500 });
  }
}
