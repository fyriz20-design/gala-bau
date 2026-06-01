'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

/* ── Typen ───────────────────────────────────────────── */
type GalleryItem = { id: string; src: string; alt: string; label: string; description: string };

type PendingFile = {
  id: string;
  file: File;
  preview: string;
  label: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  errorMsg?: string;
};

type Vorhaben = 'Umbau' | 'Anbau' | 'Neubau' | 'Sanierung' | 'Sonstiges';
type InquiryStatus = 'neu' | 'in-bearbeitung' | 'erledigt';

type Inquiry = {
  id: string;
  vorhaben: Vorhaben;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
};

/* ── Hilfsfunktionen ─────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2);

const STATUS_LABELS: Record<InquiryStatus, string> = {
  'neu': 'Neu',
  'in-bearbeitung': 'In Bearbeitung',
  'erledigt': 'Erledigt',
};

const STATUS_COLORS: Record<InquiryStatus, { bg: string; color: string; border: string }> = {
  'neu':            { bg: 'rgba(201,162,39,0.12)', color: '#d4b53a', border: 'rgba(201,162,39,0.4)' },
  'in-bearbeitung': { bg: 'rgba(52,152,219,0.12)', color: '#5dade2', border: 'rgba(52,152,219,0.4)' },
  'erledigt':       { bg: 'rgba(39,174,96,0.12)',  color: '#52be80', border: 'rgba(39,174,96,0.4)'  },
};

const VORHABEN_EMOJIS: Record<Vorhaben, string> = {
  Umbau: '🏗️', Anbau: '🏠', Neubau: '🏡', Sanierung: '🔨', Sonstiges: '💬',
};

const STATUS_NEXT: Record<InquiryStatus, InquiryStatus> = {
  'neu': 'in-bearbeitung',
  'in-bearbeitung': 'erledigt',
  'erledigt': 'neu',
};

/* ════════════════════════════════════════════════════════
   Passwort-Gate
════════════════════════════════════════════════════════ */
function PasswordGate({ onSuccess }: { onSuccess: (pw: string) => void }) {
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch('/api/admin/gallery', { headers: { 'x-admin-key': pw } });
    setLoading(false);
    if (res.ok) { sessionStorage.setItem('admin-key', pw); onSuccess(pw); }
    else setError(true);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f0f0f', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '360px', backgroundColor: '#242424', border: '1px solid #2e2e2e', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f0f0f0', letterSpacing: '0.04em', fontFamily: 'Georgia, serif' }}>
            GALA<span style={{ color: '#d4b53a' }}>-</span>BAU
          </div>
          <p style={{ color: '#8a8a8a', fontSize: '0.8rem', marginTop: '0.4rem' }}>Admin-Bereich</p>
        </div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a8a', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Passwort
            </label>
            <input
              type="password" autoFocus value={pw} onChange={e => setPw(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', backgroundColor: '#1a1a1a', border: `1px solid ${error ? '#c0392b' : '#2e2e2e'}`, color: '#f0f0f0', padding: '0.75rem 1rem', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
            />
            {error && <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.4rem' }}>Falsches Passwort.</p>}
          </div>
          <button type="submit" disabled={loading} style={{ backgroundColor: '#c9a227', color: '#fff', border: 'none', padding: '0.875rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Prüfe …' : 'Anmelden →'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Anfragen-Sektion
════════════════════════════════════════════════════════ */
function InquiriesSection({ adminKey }: { adminKey: string }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterVorhaben, setFilterVorhaben] = useState<Vorhaben | 'Alle'>('Alle');
  const [filterStatus, setFilterStatus] = useState<InquiryStatus | 'Alle'>('Alle');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadInquiries = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/inquiries', { headers: { 'x-admin-key': adminKey } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setInquiries(data); })
      .finally(() => setLoading(false));
  }, [adminKey]);

  useEffect(() => { loadInquiries(); }, [loadInquiries]);

  async function cycleStatus(inquiry: Inquiry) {
    const next = STATUS_NEXT[inquiry.status];
    setUpdatingId(inquiry.id);
    const res = await fetch('/api/admin/inquiries', {
      method: 'PATCH',
      headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: inquiry.id, status: next }),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.inquiries)) setInquiries(data.inquiries);
    }
    setUpdatingId(null);
  }

  async function deleteOne(id: string) {
    if (!confirm('Diese Anfrage wirklich löschen?')) return;
    const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.inquiries)) setInquiries(data.inquiries);
    }
  }

  const filtered = inquiries.filter(i => {
    if (filterVorhaben !== 'Alle' && i.vorhaben !== filterVorhaben) return false;
    if (filterStatus !== 'Alle' && i.status !== filterStatus) return false;
    return true;
  });

  const neuCount = inquiries.filter(i => i.status === 'neu').length;

  const VORHABEN_FILTER: (Vorhaben | 'Alle')[] = ['Alle', 'Umbau', 'Anbau', 'Neubau', 'Sanierung', 'Sonstiges'];
  const STATUS_FILTER: (InquiryStatus | 'Alle')[] = ['Alle', 'neu', 'in-bearbeitung', 'erledigt'];

  const chipBase: React.CSSProperties = {
    padding: '0.35rem 0.85rem',
    fontSize: '0.78rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid #3a3a3a',
    backgroundColor: '#1a1a1a',
    color: '#8a8a8a',
    letterSpacing: '0.03em',
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.15s',
  };

  return (
    <section>
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h2 style={{ color: '#d4b53a', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          Kundenanfragen · {inquiries.length}
          {neuCount > 0 && (
            <span style={{ backgroundColor: '#c9a227', color: '#0f0f0f', fontSize: '0.7rem', fontWeight: 800, padding: '0.1rem 0.5rem', borderRadius: '99px' }}>
              {neuCount} neu
            </span>
          )}
        </h2>
        <button
          onClick={loadInquiries}
          style={{ background: 'none', border: '1px solid #3a3a3a', color: '#8a8a8a', padding: '0.4rem 0.9rem', fontSize: '0.78rem', cursor: 'pointer' }}
        >
          ↻ Aktualisieren
        </button>
      </div>

      {/* ── Filter-Leiste ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        {/* Vorhaben */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {VORHABEN_FILTER.map(v => (
            <button
              key={v}
              onClick={() => setFilterVorhaben(v)}
              style={{
                ...chipBase,
                ...(filterVorhaben === v
                  ? { backgroundColor: 'rgba(201,162,39,0.15)', borderColor: '#c9a227', color: '#d4b53a' }
                  : {}),
              }}
            >
              {v !== 'Alle' ? `${VORHABEN_EMOJIS[v as Vorhaben]} ` : ''}{v}
            </button>
          ))}
        </div>

        {/* Trennlinie */}
        <div style={{ width: '1px', height: '24px', backgroundColor: '#2e2e2e', flexShrink: 0 }} />

        {/* Status */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {STATUS_FILTER.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                ...chipBase,
                ...(filterStatus === s
                  ? {
                      backgroundColor: s === 'Alle' ? 'rgba(201,162,39,0.15)' : STATUS_COLORS[s as InquiryStatus]?.bg,
                      borderColor: s === 'Alle' ? '#c9a227' : STATUS_COLORS[s as InquiryStatus]?.border,
                      color: s === 'Alle' ? '#d4b53a' : STATUS_COLORS[s as InquiryStatus]?.color,
                    }
                  : {}),
              }}
            >
              {s === 'Alle' ? 'Alle Status' : STATUS_LABELS[s as InquiryStatus]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Liste ── */}
      <div style={{ backgroundColor: '#242424', border: '1px solid #2e2e2e' }}>
        {loading ? (
          <p style={{ color: '#555', textAlign: 'center', padding: '3rem' }}>Lädt …</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#555', border: '1px dashed #2e2e2e', margin: '1.5rem' }}>
            <p>Keine Anfragen gefunden.</p>
            {inquiries.length > 0 && (
              <p style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>Filter zurücksetzen, um alle {inquiries.length} Anfragen zu sehen.</p>
            )}
          </div>
        ) : (
          <div>
            {filtered.map((inq, idx) => {
              const sc = STATUS_COLORS[inq.status];
              const isExp = expanded === inq.id;
              const date = new Date(inq.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

              return (
                <div
                  key={inq.id}
                  style={{
                    borderBottom: idx < filtered.length - 1 ? '1px solid #2e2e2e' : 'none',
                    backgroundColor: isExp ? '#1e1e1e' : 'transparent',
                  }}
                >
                  {/* ── Zeilen-Kopf ── */}
                  <div
                    onClick={() => setExpanded(isExp ? null : inq.id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto auto auto',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.9rem 1.25rem',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                  >
                    {/* Name + Vorhaben + Datum */}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <span style={{ color: '#f0f0f0', fontWeight: 600, fontSize: '0.9rem' }}>{inq.name}</span>
                        <span style={{ fontSize: '0.85rem' }}>{VORHABEN_EMOJIS[inq.vorhaben]}</span>
                        <span style={{ color: '#8a8a8a', fontSize: '0.8rem' }}>{inq.vorhaben}</span>
                      </div>
                      <div style={{ color: '#555', fontSize: '0.78rem', marginTop: '0.2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span>{inq.email}</span>
                        {inq.phone && <span>{inq.phone}</span>}
                        <span>{date}</span>
                      </div>
                    </div>

                    {/* Status-Badge (klickbar → nächster Status) */}
                    <button
                      onClick={e => { e.stopPropagation(); cycleStatus(inq); }}
                      disabled={updatingId === inq.id}
                      title="Status ändern"
                      style={{
                        backgroundColor: sc.bg,
                        border: `1px solid ${sc.border}`,
                        color: sc.color,
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        opacity: updatingId === inq.id ? 0.5 : 1,
                        flexShrink: 0,
                      }}
                    >
                      {updatingId === inq.id ? '…' : STATUS_LABELS[inq.status]}
                    </button>

                    {/* Löschen */}
                    <button
                      onClick={e => { e.stopPropagation(); deleteOne(inq.id); }}
                      title="Löschen"
                      style={{ flexShrink: 0, backgroundColor: 'transparent', border: '1px solid #3a3a3a', color: '#e74c3c', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                      </svg>
                    </button>

                    {/* Expand-Pfeil */}
                    <span style={{ color: '#555', fontSize: '0.8rem', flexShrink: 0 }}>
                      {isExp ? '▲' : '▼'}
                    </span>
                  </div>

                  {/* ── Ausgeklappte Nachricht ── */}
                  {isExp && (
                    <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #2a2a2a' }}>
                      <p style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', marginTop: '1rem' }}>
                        Nachricht
                      </p>
                      <p style={{ color: '#c0c0c0', fontSize: '0.9rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                        {inq.message}
                      </p>

                      {/* Schnell-Aktionen */}
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                        <a
                          href={`mailto:${inq.email}?subject=Ihre Anfrage: ${inq.vorhaben}`}
                          style={{ backgroundColor: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', color: '#d4b53a', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
                        >
                          ✉ Antworten
                        </a>
                        {inq.phone && (
                          <a
                            href={`tel:${inq.phone.replace(/\s/g, '')}`}
                            style={{ backgroundColor: 'rgba(52,152,219,0.1)', border: '1px solid rgba(52,152,219,0.3)', color: '#5dade2', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}
                          >
                            📞 Anrufen
                          </a>
                        )}

                        {/* Status-Wechsel-Buttons */}
                        {(['neu', 'in-bearbeitung', 'erledigt'] as InquiryStatus[])
                          .filter(s => s !== inq.status)
                          .map(s => {
                            const sc2 = STATUS_COLORS[s];
                            return (
                              <button
                                key={s}
                                onClick={() => updateStatus(inq.id, s)}
                                disabled={updatingId === inq.id}
                                style={{ backgroundColor: sc2.bg, border: `1px solid ${sc2.border}`, color: sc2.color, padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', opacity: updatingId === inq.id ? 0.5 : 1 }}
                              >
                                → {STATUS_LABELS[s]}
                              </button>
                            );
                          })
                        }
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Zusammenfassung */}
      {!loading && inquiries.length > 0 && (
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          {(['neu', 'in-bearbeitung', 'erledigt'] as InquiryStatus[]).map(s => {
            const count = inquiries.filter(i => i.status === s).length;
            const sc = STATUS_COLORS[s];
            return (
              <span key={s} style={{ fontSize: '0.78rem', color: sc.color }}>
                {STATUS_LABELS[s]}: <strong>{count}</strong>
              </span>
            );
          })}
        </div>
      )}
    </section>
  );

  async function updateStatus(id: string, newStatus: InquiryStatus) {
    setUpdatingId(id);
    const res = await fetch('/api/admin/inquiries', {
      method: 'PATCH',
      headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.inquiries)) setInquiries(data.inquiries);
    }
    setUpdatingId(null);
  }
}

/* ════════════════════════════════════════════════════════
   Haupt-Admin-Panel
════════════════════════════════════════════════════════ */
function AdminPanel({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  /* ── Galerie-State ── */
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);

  /* ── Upload-Queue ── */
  const [queue, setQueue] = useState<PendingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ done: 0, total: 0 });
  const [dragActive, setDragActive] = useState(false);

  /* ── Auswahl (Bulk-Delete) ── */
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  /* ── Tab-State ── */
  const [activeTab, setActiveTab] = useState<'anfragen' | 'galerie'>('anfragen');

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Bilder laden ── */
  const loadImages = useCallback(() => {
    setLoadingImages(true);
    fetch('/api/admin/gallery', { headers: { 'x-admin-key': adminKey } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setImages(data); })
      .finally(() => setLoadingImages(false));
  }, [adminKey]);

  useEffect(() => { loadImages(); }, [loadImages]);

  /* ── Dateien zur Queue hinzufügen ── */
  function addFiles(files: FileList | File[]) {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    const newItems: PendingFile[] = imageFiles.map(f => ({
      id: uid(), file: f,
      preview: URL.createObjectURL(f),
      label: f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      status: 'pending',
    }));
    setQueue(prev => [...prev, ...newItems]);
  }

  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setDragActive(true); };
  const onDragLeave = () => setDragActive(false);
  const onDrop      = (e: React.DragEvent) => { e.preventDefault(); setDragActive(false); addFiles(e.dataTransfer.files); };

  async function uploadAll() {
    const pending = queue.filter(f => f.status === 'pending');
    if (!pending.length) return;
    setIsUploading(true);
    setUploadProgress({ done: 0, total: pending.length });

    for (const item of pending) {
      setQueue(prev => prev.map(f => f.id === item.id ? { ...f, status: 'uploading' } : f));
      try {
        const fd = new FormData();
        fd.append('file', item.file); fd.append('label', item.label); fd.append('alt', item.label || item.file.name);
        const res = await fetch('/api/admin/upload', { method: 'POST', headers: { 'x-admin-key': adminKey }, body: fd });
        if (res.ok) {
          const data = await res.json();
          setImages(data.gallery ?? []);
          setQueue(prev => prev.map(f => f.id === item.id ? { ...f, status: 'done' } : f));
        } else {
          setQueue(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', errorMsg: 'Fehler beim Upload' } : f));
        }
      } catch {
        setQueue(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', errorMsg: 'Netzwerkfehler' } : f));
      }
      setUploadProgress(p => ({ ...p, done: p.done + 1 }));
    }
    setIsUploading(false);
  }

  function clearDone() {
    setQueue(prev => {
      prev.filter(f => f.status === 'done' || f.status === 'pending').forEach(f => URL.revokeObjectURL(f.preview));
      return prev.filter(f => f.status !== 'done');
    });
  }

  async function deleteOne(id: string) {
    if (!confirm('Dieses Bild wirklich löschen?')) return;
    await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, { method: 'DELETE', headers: { 'x-admin-key': adminKey } });
    setImages(prev => prev.filter(i => i.id !== id));
    setSelected(prev => { const next = new Set(prev); next.delete(id); return next; });
  }

  async function deleteSelected() {
    if (!confirm(`${selected.size} Bild(er) wirklich löschen?`)) return;
    setBulkDeleting(true);
    const res = await fetch('/api/admin/gallery', {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: Array.from(selected) }),
    });
    if (res.ok) { const data = await res.json(); setImages(data.gallery ?? []); setSelected(new Set()); }
    setBulkDeleting(false);
  }

  const toggleSelect = (id: string) => setSelected(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const selectAll = () => setSelected(new Set(images.map(i => i.id)));
  const deselectAll = () => setSelected(new Set());
  const allSelected = images.length > 0 && selected.size === images.length;

  const S = {
    card: { backgroundColor: '#242424', border: '1px solid #2e2e2e', padding: '1.5rem' } as React.CSSProperties,
    label: { display: 'block', fontSize: '0.75rem', color: '#8a8a8a', marginBottom: '0.35rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' },
    input: { width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e', color: '#f0f0f0', padding: '0.6rem 0.8rem', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit' } as React.CSSProperties,
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.6rem 1.25rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: 'none',
    borderBottom: active ? '2px solid #c9a227' : '2px solid transparent',
    backgroundColor: 'transparent',
    color: active ? '#d4b53a' : '#555',
    transition: 'color 0.15s',
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f', paddingBottom: '4rem' }}>

      {/* ── Header ── */}
      <div style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2e2e2e', padding: '1rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#f0f0f0', fontWeight: 700 }}>
              GALA<span style={{ color: '#d4b53a' }}>-</span>BAU
            </span>
            <span style={{ color: '#555', fontSize: '0.8rem', marginLeft: '0.75rem' }}>/ Admin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/" style={{ color: '#8a8a8a', fontSize: '0.8rem', textDecoration: 'none' }}>← Zur Website</a>
            <button onClick={onLogout} style={{ backgroundColor: 'transparent', border: '1px solid #2e2e2e', color: '#8a8a8a', padding: '0.45rem 1rem', fontSize: '0.8rem', cursor: 'pointer' }}>
              Abmelden
            </button>
          </div>
        </div>
      </div>

      {/* ── Tab-Navigation ── */}
      <div style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2e2e2e' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', gap: '0' }}>
          <button style={tabStyle(activeTab === 'anfragen')} onClick={() => setActiveTab('anfragen')}>
            Kundenanfragen
          </button>
          <button style={tabStyle(activeTab === 'galerie')} onClick={() => setActiveTab('galerie')}>
            Galerie
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', display: 'grid', gap: '2rem' }}>

        {/* ════════════════════════════════════════════════
            TAB: ANFRAGEN
        ════════════════════════════════════════════════ */}
        {activeTab === 'anfragen' && (
          <InquiriesSection adminKey={adminKey} />
        )}

        {/* ════════════════════════════════════════════════
            TAB: GALERIE
        ════════════════════════════════════════════════ */}
        {activeTab === 'galerie' && (
          <>
            {/* SEKTION 1: BILDER HOCHLADEN */}
            <section>
              <h2 style={{ color: '#d4b53a', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Bilder hochladen
              </h2>
              <div style={S.card}>
                <div
                  onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${dragActive ? '#c9a227' : '#3a3a3a'}`,
                    backgroundColor: dragActive ? 'rgba(201,162,39,0.06)' : '#1a1a1a',
                    padding: '2.5rem 2rem', textAlign: 'center', cursor: 'pointer',
                    marginBottom: '1.5rem', transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={dragActive ? '#c9a227' : '#555'} strokeWidth="1.5" style={{ margin: '0 auto 0.75rem', display: 'block' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <p style={{ color: '#8a8a8a', fontWeight: 500 }}>Fotos hier ablegen</p>
                  <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.3rem' }}>oder klicken zum Auswählen · Mehrere Bilder gleichzeitig möglich · JPG, PNG, WEBP</p>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => { if (e.target.files) addFiles(e.target.files); e.target.value = ''; }} />

                {queue.length > 0 && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <p style={{ color: '#8a8a8a', fontSize: '0.8rem' }}>
                        {queue.filter(f => f.status === 'done').length}/{queue.length} hochgeladen
                        {isUploading && ` – lädt hoch (${uploadProgress.done}/${uploadProgress.total}) …`}
                      </p>
                      <button onClick={clearDone} style={{ background: 'none', border: 'none', color: '#555', fontSize: '0.8rem', cursor: 'pointer' }}>Erledigte entfernen</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {queue.map(item => (
                        <div key={item.id} style={{ backgroundColor: '#1a1a1a', border: `1px solid ${item.status === 'error' ? '#c0392b55' : item.status === 'done' ? '#2d5a1b55' : '#2e2e2e'}`, overflow: 'hidden' }}>
                          <div style={{ position: 'relative', paddingTop: '66%', overflow: 'hidden' }}>
                            <img src={item.preview} alt={item.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: item.status === 'uploading' ? 0.5 : 1 }} />
                            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: item.status === 'done' ? '#27ae60' : item.status === 'error' ? '#c0392b' : item.status === 'uploading' ? '#c9a227' : '#333', color: '#fff', fontSize: '0.7rem', padding: '0.15rem 0.4rem', fontWeight: 700 }}>
                              {item.status === 'done' ? '✓' : item.status === 'error' ? '✕' : item.status === 'uploading' ? '…' : '⏳'}
                            </div>
                            {item.status !== 'uploading' && (
                              <button onClick={e => { e.stopPropagation(); URL.revokeObjectURL(item.preview); setQueue(prev => prev.filter(f => f.id !== item.id)); }} style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✕</button>
                            )}
                          </div>
                          <div style={{ padding: '0.6rem' }}>
                            <input value={item.label} onChange={e => setQueue(prev => prev.map(f => f.id === item.id ? { ...f, label: e.target.value } : f))} placeholder="Kategorie / Label" disabled={item.status === 'uploading' || item.status === 'done'} style={{ ...S.input, fontSize: '0.8rem', padding: '0.45rem 0.6rem' }} />
                            {item.errorMsg && <p style={{ color: '#e74c3c', fontSize: '0.75rem', marginTop: '0.25rem' }}>{item.errorMsg}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={uploadAll} disabled={isUploading || !queue.some(f => f.status === 'pending')} style={{ backgroundColor: '#c9a227', color: '#fff', border: 'none', padding: '0.875rem 2rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: isUploading ? 'not-allowed' : 'pointer', opacity: isUploading || !queue.some(f => f.status === 'pending') ? 0.6 : 1 }}>
                      {isUploading ? `Hochladen … (${uploadProgress.done}/${uploadProgress.total})` : `${queue.filter(f => f.status === 'pending').length} Bild(er) hochladen →`}
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* SEKTION 2: GALERIE VERWALTEN */}
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <h2 style={{ color: '#d4b53a', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Galerie verwalten · {images.length} Bild{images.length !== 1 ? 'er' : ''}
                </h2>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  {images.length > 0 && (
                    <button onClick={allSelected ? deselectAll : selectAll} style={{ background: 'none', border: '1px solid #3a3a3a', color: '#8a8a8a', padding: '0.45rem 0.9rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                      {allSelected ? 'Auswahl aufheben' : 'Alle auswählen'}
                    </button>
                  )}
                  {selected.size > 0 && (
                    <button onClick={deleteSelected} disabled={bulkDeleting} style={{ backgroundColor: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.5)', color: '#e74c3c', padding: '0.45rem 0.9rem', fontSize: '0.8rem', cursor: 'pointer', opacity: bulkDeleting ? 0.6 : 1 }}>
                      {bulkDeleting ? 'Wird gelöscht …' : `${selected.size} löschen`}
                    </button>
                  )}
                </div>
              </div>
              <div style={S.card}>
                {loadingImages ? (
                  <p style={{ color: '#555', textAlign: 'center', padding: '2rem' }}>Lädt …</p>
                ) : images.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#555', border: '1px dashed #2e2e2e' }}>
                    <p>Noch keine Bilder hochgeladen.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {images.map(img => {
                      const isSel = selected.has(img.id);
                      return (
                        <div key={img.id} style={{ backgroundColor: '#1a1a1a', border: `2px solid ${isSel ? '#c9a227' : '#2e2e2e'}`, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.15s' }} onClick={() => toggleSelect(img.id)}>
                          <div style={{ position: 'relative', paddingTop: '75%' }}>
                            <img src={img.src} alt={img.alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', width: '20px', height: '20px', backgroundColor: isSel ? '#c9a227' : 'rgba(0,0,0,0.6)', border: `2px solid ${isSel ? '#c9a227' : 'rgba(255,255,255,0.4)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {isSel && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2"><polyline points="2 6 5 9 10 3"/></svg>}
                            </div>
                          </div>
                          <div style={{ padding: '0.6rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ overflow: 'hidden' }}>
                              {img.label && <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f0f0f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.label}</p>}
                              <p style={{ fontSize: '0.7rem', color: '#555', marginTop: '0.1rem' }}>Klicken zum Auswählen</p>
                            </div>
                            <button onClick={e => { e.stopPropagation(); deleteOne(img.id); }} title="Löschen" style={{ flexShrink: 0, backgroundColor: 'transparent', border: '1px solid #3a3a3a', color: '#e74c3c', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Root-Export mit Auth-State
════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('admin-key');
    if (stored) {
      fetch('/api/admin/gallery', { headers: { 'x-admin-key': stored } })
        .then(r => { if (r.ok) setAdminKey(stored); });
    }
  }, []);

  function handleLogout() { sessionStorage.removeItem('admin-key'); setAdminKey(null); }

  if (!adminKey) return <PasswordGate onSuccess={setAdminKey} />;
  return <AdminPanel adminKey={adminKey} onLogout={handleLogout} />;
}
