import { put, list, del } from '@vercel/blob';

export type Vorhaben = 'Umbau' | 'Anbau' | 'Neubau' | 'Sanierung' | 'Sonstiges';
export type InquiryStatus = 'neu' | 'in-bearbeitung' | 'erledigt';

export type Inquiry = {
  id: string;
  vorhaben: Vorhaben;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  createdAt: string; // ISO 8601
};

const INDEX_PREFIX = 'ojf-inquiries-index';

/* ── Interner Index-Lese/Schreib-Helfer ─────────────── */

async function readIndex(): Promise<Inquiry[]> {
  try {
    const { blobs } = await list({ prefix: INDEX_PREFIX });
    if (blobs.length === 0) return [];
    const latest = blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    const res = await fetch(latest.url, { cache: 'no-store' });
    if (!res.ok) return [];
    return (await res.json()) as Inquiry[];
  } catch {
    return [];
  }
}

async function writeIndex(items: Inquiry[]): Promise<void> {
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

export async function getInquiries(): Promise<Inquiry[]> {
  return readIndex();
}

export async function addInquiry(
  data: Omit<Inquiry, 'id' | 'status' | 'createdAt'>
): Promise<Inquiry[]> {
  const items = await readIndex();
  const newItem: Inquiry = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: 'neu',
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...items];
  await writeIndex(updated);
  return updated;
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<Inquiry[]> {
  const items = await readIndex();
  const updated = items.map(i => (i.id === id ? { ...i, status } : i));
  await writeIndex(updated);
  return updated;
}

export async function deleteInquiry(id: string): Promise<Inquiry[]> {
  const items = await readIndex();
  const updated = items.filter(i => i.id !== id);
  await writeIndex(updated);
  return updated;
}

export async function bulkDeleteInquiries(ids: string[]): Promise<Inquiry[]> {
  const idSet = new Set(ids);
  const items = await readIndex();
  const updated = items.filter(i => !idSet.has(i.id));
  await writeIndex(updated);
  return updated;
}
