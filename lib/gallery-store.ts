import { put, list, del } from '@vercel/blob';

export type GalleryItem = {
  id: string;          // Blob-URL (eindeutiger Schlüssel)
  src: string;         // Blob-URL (öffentliche Bild-URL)
  alt: string;
  label: string;
  description: string;
};

const INDEX_PREFIX = 'ojf-gallery-index';

/* ── Interner Index-Lese/Schreib-Helfer ─────────────── */

async function readIndex(): Promise<GalleryItem[]> {
  try {
    const { blobs } = await list({ prefix: INDEX_PREFIX });
    if (blobs.length === 0) return [];
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

async function writeIndex(items: GalleryItem[]): Promise<void> {
  const { blobs } = await list({ prefix: INDEX_PREFIX });
  if (blobs.length > 0) {
    await del(blobs.map(b => b.url));
  }
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
  const updated = [item, ...items];
  await writeIndex(updated);
  return updated;
}

export async function removeFromGallery(id: string): Promise<GalleryItem[]> {
  const items = await readIndex();
  const updated = items.filter(i => i.id !== id);
  await writeIndex(updated);
  return updated;
}

/** Mehrere Einträge auf einmal aus dem Index entfernen */
export async function bulkRemoveFromGallery(ids: string[]): Promise<GalleryItem[]> {
  const idSet = new Set(ids);
  const items = await readIndex();
  const updated = items.filter(i => !idSet.has(i.id));
  await writeIndex(updated);
  return updated;
}
