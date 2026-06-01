import { put, list, del } from '@vercel/blob';

export type GalleryItem = {
  id: string;       // = Blob-URL des Bildes (eindeutig)
  src: string;      // = Blob-URL des Bildes (öffentliche URL)
  alt: string;
  label: string;
  description: string;
};

const INDEX_PREFIX = 'ojf-gallery-index';

/* ── Index aus Vercel Blob lesen ─────────────────────── */
async function readIndex(): Promise<GalleryItem[]> {
  try {
    const { blobs } = await list({ prefix: INDEX_PREFIX });
    if (blobs.length === 0) return [];
    // Neueste Index-Datei nehmen
    const latest = blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    const res = await fetch(latest.url, { cache: 'no-store' });
    if (!res.ok) return [];
    return (await res.json()) as GalleryItem[];
  } catch {
    return [];
  }
}

/* ── Index in Vercel Blob schreiben ──────────────────── */
async function writeIndex(items: GalleryItem[]): Promise<void> {
  // Alte Index-Dateien löschen
  const { blobs } = await list({ prefix: INDEX_PREFIX });
  if (blobs.length > 0) {
    await del(blobs.map(b => b.url));
  }
  // Neue Index-Datei schreiben
  await put(
    `${INDEX_PREFIX}-${Date.now()}.json`,
    JSON.stringify(items, null, 2),
    { access: 'public', contentType: 'application/json' }
  );
}

/* ── Öffentliche API ─────────────────────────────────── */

export async function getGallery(): Promise<GalleryItem[]> {
  return readIndex();
}

export async function addToGallery(item: GalleryItem): Promise<GalleryItem[]> {
  const items = await readIndex();
  const updated = [item, ...items]; // neueste zuerst
  await writeIndex(updated);
  return updated;
}

export async function removeFromGallery(id: string): Promise<GalleryItem[]> {
  const items = await readIndex();
  const updated = items.filter(i => i.id !== id);
  await writeIndex(updated);
  return updated;
}
